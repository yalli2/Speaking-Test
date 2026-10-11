/* Aplicación: rutas y páginas */
(function (g) {
  const SP = g.SP, esc = SP.esc;
  const root = document.getElementById('app');
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  const UNITS = { 5: { name: 'Unidad 5 · La casa', ko: '집 (방·가구·묘사)', ic: '🏠' }, 7: { name: 'Unidad 7 · La ciudad', ko: '도시 (길 찾기·지도·지하철)', ic: '🏙️' } };
  const itemsOf = u => SP.ITEMS.filter(i => i.unit === u);
  const acc = n => { const p = SP.progress.get()[n]; return p && p.a ? Math.round(p.c / p.a * 100) : null; };
  const kindsOf = n => { const m = { mc: '객관식', pick: '모두 고르기', type: '말하기·쓰기', order: '문장 만들기', click: '지도에서 찾기' }; return Array.from(new Set(SP.GENS[n].map(x => x.t))).map(k => m[k]); };

  function itemCard(it) {
    const a = acc(it.n);
    return `<article class="icard" data-unit="${it.unit}">
      <a class="icard-main" href="#/q/${it.n}/study">
        <div class="icard-top"><span class="num">${String(it.n).padStart(2, '0')}</span><span class="ic">${it.ic}</span></div>
        <h4 lang="es">${esc(it.q)}</h4>
        <p class="ko">${esc(it.ko)}</p>
        <p class="ex" lang="es">${esc(it.a)}</p>
      </a>
      <div class="icard-foot">
        <span class="acc ${a === null ? '' : a >= 80 ? 'hi' : a >= 50 ? 'mid' : 'lo'}">${a === null ? '아직 연습 전' : '정답률 ' + a + '%'}</span>
        <a class="btn small ghost" href="#/q/${it.n}/study">학습</a>
        <a class="btn small primary" href="#/q/${it.n}/practice">연습</a>
      </div>
    </article>`;
  }

  /* ---------- HOME ---------- */
  function home() {
    root.innerHTML = `
    <header class="hero">
      <div class="hero-in">
        <p class="eyebrow">Examen oral de español · Segundo semestre</p>
        <h1>스페인어 말하기 수행평가,<br><em>그림으로 보고 · 듣고 · 말하며</em> 대비해요</h1>
        <p class="lead">2학년 스페인어 회화Ⅰ 듣기/말하기 수행평가 (Unidad 5 · 7, 16개 질문). 질문마다 그림·지도와 함께 표현을 익히고, 문제는 풀 때마다 새로 만들어져요.</p>
        <div class="cta"><a class="btn primary lg" href="#/exam">🎤 모의시험 시작 (랜덤 6문항)</a><a class="btn ghost lg" href="#/play/all/mix/20">⚡ 전체 랜덤 연습</a></div>
        <ul class="stats"><li><b>16</b><span>시험 질문</span></li><li><b>${SP.genCount()}</b><span>문제 유형</span></li><li><b>∞</b><span>랜덤 생성</span></li><li><b>🔊 🎤</b><span>듣기·말하기</span></li></ul>
      </div>
    </header>
    ${[5, 7].map(u => `<section class="unit" id="u${u}"><div class="unit-head"><div><p class="eyebrow">${UNITS[u].ic} ${UNITS[u].ko}</p><h2>${UNITS[u].name}</h2></div><a class="btn ghost" href="#/play/u${u}/mix/15">Unidad ${u} 전체 연습 →</a></div><div class="cards">${itemsOf(u).map(itemCard).join('')}</div></section>`).join('')}
    <section class="howto"><h2>이렇게 공부하세요</h2>
      <ol class="steps">
        <li><b>1. 학습</b><span>질문별 필수 표현, 문장 틀, 그림·지도를 보고 🔊 소리를 따라 말해요.</span></li>
        <li><b>2. 연습</b><span>객관식 → 문장 만들기 → 말하기·쓰기 순서로 난이도를 올려요. 틀린 문제는 설명이 나와요.</span></li>
        <li><b>3. 모의시험</b><span>시험처럼 랜덤 6문항을 마이크로 대답해 보고, 체크리스트로 부족한 부분을 확인해요.</span></li>
      </ol></section>`;
  }

  /* ---------- UNIT ---------- */
  function unitPage(u) {
    root.innerHTML = `<header class="pagehead"><a class="back" href="#/">← 처음으로</a><p class="eyebrow">${UNITS[u].ic} ${UNITS[u].ko}</p><h1>${UNITS[u].name}</h1><div class="cta"><a class="btn primary" href="#/play/u${u}/mix/15">전체 랜덤 연습 (15문제)</a><a class="btn ghost" href="#/play/u${u}/choice/15">객관식만</a><a class="btn ghost" href="#/play/u${u}/speak/10">말하기·쓰기만</a></div></header><div class="cards">${itemsOf(+u).map(itemCard).join('')}</div>`;
  }

  /* ---------- ITEM ---------- */
  function itemPage(n, tab) {
    const it = SP.ITEMS[n - 1];
    if (!it) { location.hash = '#/'; return; }
    const prev = n > 1 ? n - 1 : null, next = n < 16 ? n + 1 : null;
    root.innerHTML = `
      <header class="pagehead item">
        <a class="back" href="#/">← 처음으로</a>
        <p class="eyebrow">Unidad ${it.unit} · 질문 ${n} / 16 · ${esc(it.ko)}</p>
        <h1 class="qbig" lang="es">${esc(it.q)} <button class="say big" data-say="${esc(it.q.replace(/\s*\([^)]*\)/g, '').replace(/\s\/\s/g, ' o '))}" aria-label="질문 듣기">🔊</button></h1>
        <p class="modelline" lang="es"><span class="lab">모범 답안</span> ${esc(it.a)}</p>
        <nav class="tabs" role="tablist"><a role="tab" class="${tab === 'study' ? 'on' : ''}" href="#/q/${n}/study">📖 학습</a><a role="tab" class="${tab === 'practice' ? 'on' : ''}" href="#/q/${n}/practice">✍️ 연습</a></nav>
      </header>
      <div id="tabbody"></div>
      <nav class="pager">${prev ? `<a href="#/q/${prev}/${tab}">← Q${prev}</a>` : '<span></span>'}${next ? `<a href="#/q/${next}/${tab}">Q${next} →</a>` : '<span></span>'}</nav>`;
    const body = $('#tabbody');
    if (tab === 'study') {
      body.innerHTML = `<div class="study">${SP.STUDY[n]()}<div class="cta center"><a class="btn primary lg" href="#/q/${n}/practice">이제 연습해 볼까요? →</a></div></div>`;
      $$('.stripwrap', body).forEach(w => { const i = +w.dataset.scroll || 0; w.scrollLeft = Math.max(0, i * 62 - 80); });
    } else practiceSetup(body, n);
  }

  function practiceSetup(body, n) {
    const a = acc(n);
    body.innerHTML = `<section class="panel setup">
      <h3>연습 설정</h3>
      <p class="muted">이 질문에는 <b>${kindsOf(n).join(' · ')}</b> 유형이 있고, 풀 때마다 새로운 그림과 문장으로 생성돼요.${a === null ? '' : ` (지금까지 정답률 ${a}%)`}</p>
      <fieldset class="seg-group"><legend>유형</legend>
        <label><input type="radio" name="mode" value="mix" checked><span>섞어서 <small>모든 유형</small></span></label>
        <label><input type="radio" name="mode" value="choice"><span>선택·터치 <small>쉬움</small></span></label>
        <label><input type="radio" name="mode" value="speak"><span>말하기·쓰기 <small>시험과 같은 방식</small></span></label>
      </fieldset>
      <fieldset class="seg-group"><legend>문제 수</legend>
        <label><input type="radio" name="n" value="5"><span>5문제</span></label>
        <label><input type="radio" name="n" value="10" checked><span>10문제</span></label>
        <label><input type="radio" name="n" value="20"><span>20문제</span></label>
      </fieldset>
      <label class="check"><input type="checkbox" id="listen"> <span>🎧 듣기 모드 — 질문을 소리로만 들려주고 글자는 가려요</span></label>
      <div class="cta"><button class="btn primary lg" id="go">연습 시작</button></div>
    </section>`;
    $('#go', body).onclick = () => {
      const mode = $('input[name=mode]:checked', body).value, cnt = $('input[name=n]:checked', body).value;
      location.hash = `#/play/${n}/${mode}/${cnt}${$('#listen', body).checked ? '/L' : ''}`;
    };
  }

  /* ---------- PLAY ---------- */
  function play(target, mode, cnt, listen) {
    let items;
    if (target === 'all') items = SP.ITEMS.map(i => i.n);
    else if (/^u\d$/.test(target)) items = itemsOf(+target[1]).map(i => i.n);
    else items = [+target];
    const back = /^\d+$/.test(target) ? `#/q/${target}/practice` : (/^u/.test(target) ? `#/unit/${target[1]}` : '#/');
    root.innerHTML = '';
    SP.runSession(root, { items, mode, n: Math.min(40, +cnt || 10), listenMode: !!listen, back });
  }

  /* ---------- EXAM ---------- */
  function exam() {
    root.innerHTML = `<header class="pagehead"><a class="back" href="#/">← 처음으로</a><p class="eyebrow">Simulacro de examen oral</p><h1>모의시험</h1></header>
    <section class="panel setup">
      <h3>시험처럼 연습해요</h3>
      <ul class="plain">
        <li>Unidad 5에서 3문항, Unidad 7에서 3문항이 <b>랜덤</b>으로 나와요. (매번 다른 그림!)</li>
        <li>질문은 소리로 들을 수 있고, <b>🎤 마이크로 말하거나</b> 입력해서 답해요.</li>
        <li>답안은 문장 체크리스트(관사·성수일치·숫자 등)로 채점돼요.</li>
        <li>문항당 걸린 시간이 표시돼요. 말하기 시험은 <b>1문항당 약 1분</b> 안에 대답하는 연습을 하세요.</li>
      </ul>
      <label class="check"><input type="checkbox" id="listen"> <span>🎧 듣기 모드 (질문 글자 가리기)</span></label>
      <div class="cta"><button class="btn primary lg" id="go">모의시험 시작</button></div>
    </section>`;
    $('#go').onclick = () => {
      const a = SP.sample([1, 2, 3, 4, 5, 6], 3), b = SP.sample([7, 8, 9, 10, 11, 12, 13, 14, 15, 16], 3);
      const items = a.concat(b).sort((x, y) => x - y);
      const listenMode = $('#listen').checked;
      const questions = items.map(it => SP.makeQuestion(it, 'speak'));
      SP.runSession(root, { questions, exam: true, listenMode, back: '#/exam' });
    };
  }

  /* ---------- PROGRESS ---------- */
  function progress() {
    const p = SP.progress.get(), w = SP.store.get('wrong', []);
    const total = Object.values(p).reduce((a, e) => a + e.a, 0), right = Object.values(p).reduce((a, e) => a + e.c, 0);
    root.innerHTML = `<header class="pagehead"><a class="back" href="#/">← 처음으로</a><p class="eyebrow">Mi progreso</p><h1>내 연습 기록</h1><p class="lead">이 기기의 브라우저에만 저장돼요. 지금까지 <b>${total}</b>문제 중 <b>${right}</b>문제 정답${total ? ` (${Math.round(right / total * 100)}%)` : ''}.</p></header>
    <section class="panel"><h3>질문별 정답률</h3><div class="bars">${SP.ITEMS.map(it => { const e = p[it.n]; const a = e && e.a ? Math.round(e.c / e.a * 100) : 0; return `<a class="bar" href="#/q/${it.n}/practice"><span class="b-n">Q${it.n}</span><span class="b-q" lang="es">${esc(it.q.slice(0, 44))}${it.q.length > 44 ? '…' : ''}</span><span class="b-track"><i class="${a >= 80 ? 'hi' : a >= 50 ? 'mid' : 'lo'}" style="width:${e && e.a ? Math.max(a, 4) : 0}%"></i></span><span class="b-v">${e && e.a ? a + '% · ' + e.a + '문제' : '—'}</span></a>`; }).join('')}</div></section>
    <section class="panel"><h3>오답 노트 <small>(최근 ${w.length}개)</small></h3>${w.length ? `<ul class="review">${w.map(x => `<li><b>Q${x.item}</b> ${esc(x.title)}<div class="model"><span class="lab">모범 답안</span><b lang="es">${esc(x.model)}</b> <button class="say" data-say="${esc(x.model)}">🔊</button></div></li>`).join('')}</ul>` : '<p class="muted">아직 틀린 문제가 없어요.</p>'}</section>
    <div class="cta center"><button class="btn ghost" id="reset">기록 지우기</button></div>`;
    $('#reset').onclick = () => { if (confirm('연습 기록과 오답 노트를 모두 지울까요?')) { SP.progress.reset(); progress(); } };
  }

  /* ---------- ROUTER ---------- */
  function route() {
    const h = location.hash.replace(/^#\/?/, '') || '';
    const p = h.split('/');
    if (SP.speech) SP.speech.stop();
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    const key = p[0] === 'unit' ? 'u' + p[1] : p[0] === 'q' && SP.ITEMS[p[1] - 1] ? 'u' + SP.ITEMS[p[1] - 1].unit : (p[0] === 'play' || !p[0] ? 'home' : p[0]);
    $$('.nav a').forEach(a => a.classList.toggle('on', a.dataset.r === key));
    if (p[0] === 'q' && p[1]) itemPage(+p[1], p[2] === 'practice' ? 'practice' : 'study');
    else if (p[0] === 'unit') unitPage(p[1]);
    else if (p[0] === 'play') play(p[1], p[2] || 'mix', p[3], p[4] === 'L');
    else if (p[0] === 'exam') exam();
    else if (p[0] === 'progress') progress();
    else home();
    window.scrollTo({ top: 0 });
  }
  window.addEventListener('hashchange', route);
  route();
})(window);
