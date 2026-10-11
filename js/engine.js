/* Motor de práctica: voz (escuchar/hablar), sesiones de preguntas, corrección y progreso */
(function (g) {
  const SP = g.SP, esc = SP.esc;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  /* ================= VOZ ================= */
  const speech = SP.speech = {
    voice: null,
    init() {
      if (!('speechSynthesis' in window)) return;
      const pickVoice = () => {
        const vs = speechSynthesis.getVoices();
        speech.voice = vs.find(v => /^es[-_]ES/i.test(v.lang)) || vs.find(v => /^es/i.test(v.lang)) || null;
      };
      pickVoice();
      speechSynthesis.onvoiceschanged = pickVoice;
    },
    speak(text, rate) {
      if (!('speechSynthesis' in window) || !text) return;
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text.replace(/[¿¡]/g, ''));
      u.lang = (speech.voice && speech.voice.lang) || 'es-ES';
      if (speech.voice) u.voice = speech.voice;
      u.rate = rate || .92;
      speechSynthesis.speak(u);
    },
    canListen() { return !!(window.SpeechRecognition || window.webkitSpeechRecognition); },
    rec: null,
    listen(onText, onEnd, onErr) {
      const R = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!R) { onErr && onErr('unsupported'); return null; }
      if (speech.rec) { try { speech.rec.abort(); } catch (e) { } }
      const r = new R();
      r.lang = 'es-ES'; r.interimResults = true; r.maxAlternatives = 1; r.continuous = false;
      r.onresult = e => { let t = ''; for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript; onText(t.trim(), e.results[e.results.length - 1].isFinal); };
      r.onerror = e => onErr && onErr(e.error);
      r.onend = () => { speech.rec = null; onEnd && onEnd(); };
      speech.rec = r;
      try { r.start(); } catch (e) { onErr && onErr('start'); }
      return r;
    },
    stop() { if (speech.rec) { try { speech.rec.stop(); } catch (e) { } } }
  };
  speech.init();

  /* números en dígitos → palabras (solo transcripciones de voz) */
  SP.digitsToWords = t => t.replace(/\d[\d.]*/g, m => { const n = parseInt(m.replace(/\./g, ''), 10); return isNaN(n) ? m : SP.numWords(n); });

  /* ================= PROGRESO ================= */
  SP.progress = {
    get() { return SP.store.get('prog', {}); },
    add(item, ok) { const p = SP.progress.get(); const e = p[item] || { a: 0, c: 0 }; e.a++; if (ok) e.c++; p[item] = e; SP.store.set('prog', p); },
    addWrong(q, answer) {
      const w = SP.store.get('wrong', []);
      w.unshift({ item: q.item, title: q.title, model: q.model || '', t: Date.now() });
      SP.store.set('wrong', w.slice(0, 40));
    },
    reset() { SP.store.set('prog', {}); SP.store.set('wrong', []); }
  };

  /* ================= SESIÓN ================= */
  const KIND_KO = { mc: '객관식', pick: '모두 고르기', type: '말하기·쓰기', order: '문장 만들기', click: '지도에서 찾기' };

  SP.buildQuestions = function (items, mode, n) {
    const qs = [];
    let order = [];
    while (qs.length < n) {
      if (!order.length) order = SP.shuffle(items);
      const it = order.pop();
      let q, tries = 0;
      do { q = SP.makeQuestion(it, mode); tries++; } while (tries < 4 && qs.some(x => x.title === q.title && x.model === q.model));
      qs.push(q);
    }
    return qs;
  };

  SP.runSession = function (root, cfg) {
    const qs = cfg.questions || SP.buildQuestions(cfg.items, cfg.mode, cfg.n);
    const S = { i: 0, correct: 0, results: [], t0: Date.now() };
    let qStart = Date.now(), timerId = null, answered = false;

    function stopTimer() { if (timerId) { clearInterval(timerId); timerId = null; } }

    function showQuestion() {
      speech.stop(); stopTimer();
      const q = qs[S.i]; answered = false; qStart = Date.now();
      const unit = SP.ITEMS[q.item - 1].unit;
      const pct = Math.round(S.i / qs.length * 100);
      root.innerHTML = `
      <section class="qwrap" data-kind="${q.kind}">
        <div class="qtop">
          <a class="back" href="${cfg.back || '#/'}">← ${cfg.exam ? '시험 종료' : '나가기'}</a>
          <span class="badge">Q${q.item}</span><span class="muted">Unidad ${unit} · ${KIND_KO[q.kind]}</span>
          <span class="count">${S.i + 1} / ${qs.length}</span>
          ${cfg.exam ? '<span class="timer" id="timer">0:00</span>' : ''}
        </div>
        <div class="progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pct}%"></i></div>
        ${q.visual ? `<div class="qvisual ${q.kind === 'click' ? 'clickzone' : ''}">${q.visual}</div>` : ''}
        <div class="qhead">
          <h2 class="qtitle ${cfg.listenMode ? 'blurred' : ''}" id="qtitle">${esc(q.title)}</h2>
          ${q.say ? `<button class="say big" data-say="${esc(q.say)}" aria-label="질문 듣기">🔊 <span>듣기</span></button>` : ''}
          ${cfg.listenMode ? `<button class="btn ghost small" id="reveal">글자 보기</button>` : ''}
        </div>
        ${q.ko ? `<p class="qko">${esc(q.ko)}</p>` : ''}
        <div class="qinput" id="qinput"></div>
        <div class="qfeedback" id="qfb" aria-live="polite"></div>
      </section>`;
      $$('.stripwrap', root).forEach(w => { const i = +w.dataset.scroll || 0; w.scrollLeft = Math.max(0, i * 62 - 80); });
      if (cfg.listenMode) $('#reveal', root).onclick = e => { $('#qtitle', root).classList.remove('blurred'); e.target.remove(); };
      if (cfg.exam) { timerId = setInterval(() => { const s = Math.floor((Date.now() - qStart) / 1000); const el = $('#timer', root); if (el) el.textContent = Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }, 500); }
      renderInput(q);
      if ((q.listen || cfg.listenMode) && q.say) setTimeout(() => speech.speak(q.say), 250);
    }

    function finish(ok, q, extra) {
      if (answered) return; answered = true; stopTimer(); speech.stop();
      if (ok) S.correct++;
      S.results.push({ q, ok, ms: Date.now() - qStart });
      SP.progress.add(q.item, ok);
      if (!ok) SP.progress.addWrong(q);
      $$('#qinput button, #qinput input', root).forEach(b => b.disabled = true);
      const fb = $('#qfb', root);
      const last = S.i === qs.length - 1;
      const parts = extra && extra.parts ? `<ul class="rubric">${extra.parts.map(p => `<li class="${p.ok ? 'ok' : 'bad'}"><span>${p.ok ? '✔' : '✖'}</span> ${esc(p.label)}${p.hint ? `<small>${esc(p.hint)}</small>` : ''}</li>`).join('')}</ul>` : '';
      const note = extra && extra.msg ? `<p class="note">${esc(extra.msg)}</p>` : '';
      fb.innerHTML = `<div class="fb ${ok ? 'ok' : (extra && extra.near ? 'near' : 'bad')}">
        <div class="fb-head">${ok ? '✅ 정답이에요!' : (extra && extra.near ? '🟡 거의 맞았어요' : '❌ 다시 확인해 봐요')}</div>
        ${parts}${note}
        ${q.model ? `<div class="model"><span class="lab">모범 답안</span><b lang="es">${esc(q.model)}</b><button class="say" data-say="${esc(q.model)}" aria-label="모범 답안 듣기">🔊</button></div>` : ''}
        ${q.explain ? `<p class="explain">💡 ${esc(q.explain)}</p>` : ''}
        <div class="fb-actions"><button class="btn primary" id="next">${last ? '결과 보기' : '다음 문제 →'}</button></div>
      </div>`;
      $('#next', root).focus({ preventScroll: true });
      $('#next', root).onclick = () => { if (last) summary(); else { S.i++; showQuestion(); window.scrollTo({ top: 0, behavior: 'smooth' }); } };
      fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function renderInput(q) {
      const box = $('#qinput', root);
      if (q.kind === 'mc') {
        box.innerHTML = `<div class="options ${q.options.some(o => o.html) ? 'visual' : ''}">${q.options.map(o => `<button class="opt" data-id="${o.id}">${o.html ? `<div class="opt-vis">${o.html}</div>` : ''}<span>${esc(o.text)}</span></button>`).join('')}</div>`;
        $$('.opt', box).forEach(b => b.onclick = () => {
          const ok = b.dataset.id === q.correct;
          $$('.opt', box).forEach(x => { x.disabled = true; if (x.dataset.id === q.correct) x.classList.add('right'); });
          if (!ok) b.classList.add('wrong');
          finish(ok, q, {});
        });
      } else if (q.kind === 'pick') {
        const sel = new Set();
        box.innerHTML = `<div class="options pick">${q.options.map(o => `<button class="opt chipopt" data-id="${esc(o.id)}" aria-pressed="false">${o.html || esc(o.text)}</button>`).join('')}</div><div class="actions"><button class="btn primary" id="check">확인</button></div>`;
        $$('.opt', box).forEach(b => b.onclick = () => { const id = b.dataset.id; if (sel.has(id)) { sel.delete(id); b.classList.remove('on'); b.setAttribute('aria-pressed', 'false'); } else { sel.add(id); b.classList.add('on'); b.setAttribute('aria-pressed', 'true'); } });
        $('#check', box).onclick = () => {
          const cs = new Set(q.correctSet);
          const wrong = [...sel].filter(x => !cs.has(x)), missed = [...cs].filter(x => !sel.has(x));
          $$('.opt', box).forEach(b => { const id = b.dataset.id; b.disabled = true; if (cs.has(id)) b.classList.add(sel.has(id) ? 'right' : 'missed'); else if (sel.has(id)) b.classList.add('wrong'); });
          const parts = [];
          if (!wrong.length && !missed.length) parts.push({ label: '모두 정확히 골랐어요', ok: true });
          if (missed.length) parts.push({ label: `빠뜨림: ${missed.map(id => SP.OBJ[id] ? SP.indef(SP.OBJ[id]) : id).join(', ')}`, ok: false });
          if (wrong.length) parts.push({ label: `없는 것: ${wrong.map(id => SP.OBJ[id] ? SP.indef(SP.OBJ[id]) : id).join(', ')}`, ok: false });
          finish(!wrong.length && !missed.length, q, { parts });
        };
      } else if (q.kind === 'type') {
        const canMic = speech.canListen();
        box.innerHTML = `
          <div class="typerow">
            <input id="ans" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${q.listen ? '들린 숫자를 입력' : '여기에 스페인어로 쓰거나, 🎤로 말해 보세요'}" aria-label="답안" ${q.listen ? 'inputmode="numeric"' : ''}>
            ${canMic && !q.listen ? `<button class="mic" id="mic" aria-label="말하기 시작"><span class="mic-ic">🎤</span><span class="mic-t">말하기</span></button>` : ''}
          </div>
          ${!canMic && !q.listen ? '<p class="micnote">🎤 말하기 인식은 Chrome·Edge·Safari 최신 버전에서 사용할 수 있어요. 지금은 입력으로 연습하고, 소리 내어 읽어 보세요!</p>' : ''}
          <div class="keys" aria-label="특수문자 입력">${['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'].map(c => `<button type="button" class="key" data-c="${c}">${c}</button>`).join('')}</div>
          ${q.hint ? `<details class="hint"><summary>힌트 보기</summary><p>${esc(q.hint)}</p></details>` : ''}
          <div class="actions"><button class="btn primary" id="check">확인</button>${cfg.exam ? '' : '<button class="btn ghost" id="skip">모르겠어요 (답 보기)</button>'}</div>`;
        const inp = $('#ans', box); let fromSpeech = false;
        $$('.key', box).forEach(k => k.onclick = () => { const p = inp.selectionStart || inp.value.length; inp.value = inp.value.slice(0, p) + k.dataset.c + inp.value.slice(inp.selectionEnd || p); inp.focus(); inp.selectionStart = inp.selectionEnd = p + 1; fromSpeech = false; });
        inp.oninput = () => { fromSpeech = false; };
        inp.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); $('#check', box).click(); } };
        const submit = () => {
          let text = inp.value.trim(); if (!text) { inp.focus(); return; }
          if (fromSpeech && !q.listen) text = SP.digitsToWords(text);
          const r = q.check(text);
          finish(!!r.ok, q, r);
        };
        $('#check', box).onclick = submit;
        const skip = $('#skip', box); if (skip) skip.onclick = () => finish(false, q, { parts: [], msg: '' });
        const mic = $('#mic', box);
        if (mic) mic.onclick = () => {
          if (mic.classList.contains('on')) { speech.stop(); return; }
          mic.classList.add('on'); $('.mic-t', mic).textContent = '듣는 중… (다시 누르면 멈춤)';
          speech.listen((t, fin) => { inp.value = t; fromSpeech = true; if (fin && cfg.exam) { } },
            () => { mic.classList.remove('on'); $('.mic-t', mic).textContent = '다시 말하기'; if (inp.value.trim()) inp.focus(); },
            err => { mic.classList.remove('on'); const m = err === 'not-allowed' || err === 'service-not-allowed' ? '마이크 권한을 허용해 주세요.' : err === 'no-speech' ? '소리가 들리지 않았어요. 다시 시도해 보세요.' : '음성 인식을 사용할 수 없어요. 입력으로 연습해 주세요.'; $('.mic-t', mic).textContent = m; });
        };
        setTimeout(() => { if (!cfg.exam || !canMic) inp.focus({ preventScroll: true }); }, 50);
      } else if (q.kind === 'order') {
        const tokens = q.tokens.map((t, i) => ({ t, i, used: false }));
        const chosen = [];
        box.innerHTML = `<div class="answerline" id="line" aria-label="내 문장"><span class="ph">카드를 눌러 문장을 만드세요</span></div><div class="bank" id="bank"></div><div class="actions"><button class="btn primary" id="check">확인</button><button class="btn ghost" id="clear">지우기</button></div>`;
        const draw = () => {
          $('#line', box).innerHTML = chosen.length ? chosen.map(c => `<button class="tok on" data-i="${c.i}">${esc(c.t)}</button>`).join('') : '<span class="ph">카드를 눌러 문장을 만드세요</span>';
          $('#bank', box).innerHTML = tokens.map(c => `<button class="tok" data-i="${c.i}" ${c.used ? 'disabled' : ''}>${esc(c.t)}</button>`).join('');
          $$('#bank .tok', box).forEach(b => b.onclick = () => { const c = tokens[+b.dataset.i]; c.used = true; chosen.push(c); draw(); });
          $$('#line .tok', box).forEach(b => b.onclick = () => { const k = chosen.findIndex(c => c.i === +b.dataset.i); const c = chosen.splice(k, 1)[0]; c.used = false; draw(); });
        };
        draw();
        $('#clear', box).onclick = () => { chosen.splice(0).forEach(c => c.used = false); draw(); };
        $('#check', box).onclick = () => {
          if (!chosen.length) return;
          const text = chosen.map(c => c.t).join(' ');
          const r = q.check(text);
          finish(!!r.ok, q, Object.assign({}, r, { msg: r.msg || (r.ok ? '' : '내 문장: ' + text) }));
        };
      } else if (q.kind === 'click') {
        const zone = $('.qvisual', root);
        box.innerHTML = '<p class="micnote">👆 위 그림에서 알맞은 곳을 직접 눌러 보세요.</p>';
        const sel = q.clickKind === 'tile' ? '.tile' : q.clickKind === 'ctry' ? '.ctry.clickable' : '.cdot';
        const keyOf = el => q.clickKind === 'ctry' ? el.dataset.es : el.dataset.id;
        $$(sel, zone).forEach(el => {
          el.setAttribute('tabindex', '0'); el.setAttribute('role', 'button');
          const act = () => {
            if (answered) return;
            const ok = keyOf(el) === q.target;
            $$(sel, zone).forEach(x => { if (keyOf(x) === q.target) x.classList.add('right'); });
            if (!ok) el.classList.add('wrong');
            finish(ok, q, {});
          };
          el.onclick = act; el.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); } };
        });
      }
    }

    function summary() {
      stopTimer();
      const total = qs.length, pct = Math.round(S.correct / total * 100);
      const wrong = S.results.filter(r => !r.ok);
      const medal = pct >= 90 ? '🏆' : pct >= 70 ? '🎉' : pct >= 50 ? '💪' : '📘';
      const msg = pct >= 90 ? '완벽해요! 시험 준비가 아주 잘 되어 있어요.' : pct >= 70 ? '아주 좋아요! 틀린 문제만 복습하면 완성이에요.' : pct >= 50 ? '좋은 출발이에요. 학습 탭에서 어휘를 다시 확인해 보세요.' : '괜찮아요, 학습 탭에서 표현을 익힌 뒤 다시 도전해 봐요.';
      const byItem = {};
      S.results.forEach(r => { const e = byItem[r.q.item] = byItem[r.q.item] || { a: 0, c: 0 }; e.a++; if (r.ok) e.c++; });
      root.innerHTML = `<section class="summary">
        <div class="medal">${medal}</div><h2>${S.correct} / ${total} <small>(${pct}%)</small></h2><p class="lead">${msg}</p>
        <div class="sum-items">${Object.keys(byItem).map(k => `<a class="chip2 ${byItem[k].c === byItem[k].a ? 'ok' : ''}" href="#/q/${k}/study">Q${k} · ${byItem[k].c}/${byItem[k].a}</a>`).join('')}</div>
        ${wrong.length ? `<h3>다시 볼 문제</h3><ul class="review">${wrong.map(r => `<li><b>Q${r.q.item}</b> ${esc(r.q.title)}<div class="model"><span class="lab">모범 답안</span><b lang="es">${esc(r.q.model || '')}</b> <button class="say" data-say="${esc(r.q.model || '')}">🔊</button></div></li>`).join('')}</ul>` : '<p class="lead">틀린 문제가 없어요! 👏</p>'}
        <div class="actions center"><button class="btn primary" id="again">같은 설정으로 새 문제 풀기</button><a class="btn ghost" href="${cfg.back || '#/'}">돌아가기</a></div>
      </section>`;
      $('#again', root).onclick = () => SP.runSession(root, Object.assign({}, cfg, { questions: null }));
      window.scrollTo({ top: 0 });
    }

    showQuestion();
  };

  /* ====== eventos globales: 🔊 ====== */
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-say]');
    if (b) { e.preventDefault(); speech.speak(b.dataset.say); b.classList.add('pulse'); setTimeout(() => b.classList.remove('pulse'), 600); }
  });
})(window);
