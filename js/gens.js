/* Generadores de ejercicios para las 16 preguntas del examen oral.
   Cada generador devuelve un objeto de pregunta; se ejecutan al azar → siempre ejercicios nuevos. */
(function (g) {
  const SP = g.SP;
  const { pick, sample, shuffle, between, rand, cap, esc } = SP;
  const has = SP.has;

  /* ---------- constructores ---------- */
  function mcQ(base, correct, wrongs, opt) {
    opt = opt || {};
    const seen = new Set([SP.norm(correct)]);
    const ws = [];
    wrongs.forEach(w => { const n = SP.norm(w); if (!seen.has(n)) { seen.add(n); ws.push(w); } });
    const all = shuffle([correct].concat(ws.slice(0, opt.n ? opt.n - 1 : 3)));
    return Object.assign({ kind: 'mc', options: all.map((t, i) => ({ id: String(i), text: t, html: opt.html ? opt.html(t) : null })), correct: String(all.indexOf(correct)) }, base);
  }
  function typeQ(base, check, model, opt) { return Object.assign({ kind: 'type', check, model }, base, opt || {}); }
  function orderQ(base, tokens, check, model, extra) { return Object.assign({ kind: 'order', tokens: shuffle(tokens), check, model }, base, extra || {}); }

  /* rúbrica: parts = [{label, ok}] */
  function rubric(parts, extra) {
    const ok = parts.every(p => p.ok);
    return Object.assign({ ok, parts }, extra || {});
  }
  function accentNote(text, models) {
    const t = SP.lowp(text);
    for (const m of models) if (SP.norm(m) === SP.norm(text) && SP.lowp(m) !== t) return '철자는 맞지만 악센트(á, é, í, ó, ú, ñ)를 확인하세요: ' + m;
    return '';
  }
  function exact(models, label) {
    return text => {
      const m = SP.matchAny(text, models);
      if (m.ok) return { ok: true, msg: m.accent ? accentNote(text, models) : '' };
      return { ok: false, near: m.near, msg: m.near ? '거의 맞았어요! 철자·관사를 다시 확인하세요.' : '' };
    };
  }
  const nameQ = (it) => SP.cap(SP.def(it));

  /* frase de objeto con cantidad */
  const phr = e => e.n === 1 ? SP.indef(SP.OBJ[e.id]) : `${SP.numWords(e.n)} ${SP.OBJ[e.id].pl}`;
  const haySentence = (entries) => `Hay ${SP.joinY(entries.map(phr))}.`;
  function listCheck(entries, minCount) {
    return text => {
      const parts = [{ label: 'Hay …', ok: has(text, 'hay') }];
      let count = 0;
      entries.forEach(e => {
        const o = SP.OBJ[e.id];
        const nounFound = has(text, o.es) || has(text, o.pl);
        let ok;
        if (e.n === 1) ok = has(text, SP.indef(o)); else ok = has(text, o.pl) && (has(text, SP.numWords(e.n)) || new RegExp('(^|\\s)' + e.n + '\\s').test(SP.norm(text)));
        if (ok) count++;
        parts.push({ label: phr(e), ok, hint: nounFound && !ok ? '관사·수 확인' : '' });
      });
      if (minCount) {
        const p2 = [parts[0], { label: `${minCount}개 이상 말하기 (지금 ${count}개)`, ok: count >= minCount }];
        parts.slice(1).filter(p => p.ok).forEach(p => p2.push(p));
        return rubric(p2);
      }
      return rubric(parts);
    };
  }
  /* para la pregunta 4: cualquier objeto de la habitación, mínimo 3 */
  function freeListCheck(room, minCount) {
    return text => {
      const found = [], wrongArt = [];
      room.items.forEach(id => {
        const o = SP.OBJ[id];
        if (has(text, SP.indef(o)) || (has(text, o.pl) && /(^|\s)(dos|tres|cuatro|cinco|seis|2|3|4|5|6|varias|muchas|muchos)\s/.test(SP.norm(text)))) found.push(o);
        else if (has(text, o.es) || has(text, o.pl)) wrongArt.push(o);
      });
      const parts = [{ label: 'Hay …', ok: has(text, 'hay') }, { label: `${minCount}개 이상 (지금 ${found.length}개)`, ok: found.length >= minCount }];
      found.forEach(o => parts.push({ label: SP.indef(o), ok: true }));
      wrongArt.forEach(o => parts.push({ label: o.es, ok: false, hint: '관사(un/una)나 수를 확인' }));
      return rubric(parts);
    };
  }

  const ROOM_MC = ['salon', 'cocina', 'dormitorio', 'bano', 'comedor', 'jardin', 'garaje'];
  const esRoom = r => `Es ${SP.indef(r)}.`;

  /* =============== UNIDAD 5 =============== */
  const G = {};

  /* 1. ¿Qué es esto? (habitaciones) */
  G[1] = [
    { t: 'mc', f() {
      const r = SP.room(pick(ROOM_MC)), sc = SP.randomRoomScene(r, 4);
      const others = ROOM_MC.filter(x => x !== r.id).map(SP.room);
      return mcQ({ item: 1, title: '¿Qué es esto?', ko: '집의 방 그림을 보고 알맞은 답을 고르세요.', visual: sc.svg, say: '¿Qué es esto?', model: esRoom(r), explain: `${r.es} = ${r.ko}` },
        esRoom(r), sample(others, 3).map(esRoom));
    } },
    { t: 'type', f() {
      const r = SP.room(pick(ROOM_MC)), sc = SP.randomRoomScene(r, 4);
      return typeQ({ item: 1, title: '¿Qué es esto?', ko: '그림을 보고 "Es un/una …" 문장으로 말하거나 쓰세요.', visual: sc.svg, say: '¿Qué es esto?', explain: `${r.es} = ${r.ko} (${r.g === 'm' ? '남성 → un' : '여성 → una'})`, hint: 'Es + un/una + 방 이름' },
        exact([esRoom(r), SP.indef(r)]), esRoom(r));
    } },
    { t: 'mc', f() {
      const r = SP.room(pick(ROOM_MC)), pool = shuffle(ROOM_MC.filter(x => x !== r.id)).slice(0, 3).map(SP.room);
      const opts = [r].concat(pool);
      const correctText = r.es;
      return mcQ({ item: 1, title: `¿Cuál es ${SP.def(r)}?`, ko: `알맞은 그림을 고르세요. (${r.es} = ${r.ko})`, say: `¿Cuál es ${SP.def(r)}?`, model: esRoom(r), explain: `${r.es} = ${r.ko}` },
        correctText, pool.map(x => x.es), { html: t => { const rr = SP.ROOMS.find(x => x.es === t); return SP.randomRoomScene(rr, 3).svg; } });
    } },
    { t: 'mc', f() {
      const r = SP.room(pick(ROOM_MC));
      const ok = r.g === 'm' ? 'un' : 'una';
      return mcQ({ item: 1, title: `Es ___ ${r.es}.`, ko: `빈칸에 알맞은 관사를 고르세요. (${r.ko})`, visual: SP.randomRoomScene(r, 3).svg, model: esRoom(r), explain: `${r.es}은(는) ${r.g === 'm' ? '남성명사 → un' : '여성명사 → una'}` },
        ok, [r.g === 'm' ? 'una' : 'un', r.g === 'm' ? 'unos' : 'unas', 'el'], { n: 3 });
    } },
    { t: 'mc', f() {
      const r = SP.room(pick(ROOM_MC));
      return mcQ({ item: 1, title: `¿Cómo se dice "${r.ko}" en español?`, ko: '한국어에 해당하는 스페인어를 고르세요.', model: esRoom(r), explain: `${r.ko} = ${r.es}` },
        esRoom(r), sample(SP.ROOMS.filter(x => x.id !== r.id), 3).map(esRoom));
    } }
  ];

  /* 2. ¿Qué es esto? (objetos) */
  const esThing = o => `Es ${SP.indef(o)}.`;
  G[2] = [
    { t: 'mc', f() {
      const o = SP.OBJ[pick(SP.THINGS)];
      return mcQ({ item: 2, title: '¿Qué es esto?', ko: '물건 그림을 보고 알맞은 답을 고르세요.', visual: `<div class="bigico">${SP.ico(o.ic, 140)}</div>`, say: '¿Qué es esto?', model: esThing(o), explain: `${o.es} = ${o.ko}` },
        esThing(o), sample(SP.THINGS.filter(x => x !== o.id), 3).map(x => esThing(SP.OBJ[x])));
    } },
    { t: 'type', f() {
      const o = SP.OBJ[pick(SP.THINGS)];
      return typeQ({ item: 2, title: '¿Qué es esto?', ko: '"Es un/una …" 문장으로 답하세요.', visual: `<div class="bigico">${SP.ico(o.ic, 140)}</div>`, say: '¿Qué es esto?', explain: `${o.es} = ${o.ko} (${o.g === 'm' ? 'un' : 'una'})`, hint: 'Es + un/una + 물건' },
        exact([esThing(o), SP.indef(o)]), esThing(o));
    } },
    { t: 'mc', f() {
      const o = SP.OBJ[pick(SP.THINGS)], others = sample(SP.THINGS.filter(x => x !== o.id), 3);
      return mcQ({ item: 2, title: `¿Cuál es ${SP.def(o)}?`, ko: `알맞은 그림을 고르세요. (${o.es} = ${o.ko})`, say: `¿Cuál es ${SP.def(o)}?`, model: esThing(o), explain: `${o.es} = ${o.ko}` },
        o.es, others.map(x => SP.OBJ[x].es), { html: t => { const oo = Object.values(SP.OBJ).find(x => x.es === t); return `<div class="bigico">${SP.ico(oo.ic, 84)}</div>`; } });
    } },
    { t: 'mc', f() {
      const o = SP.OBJ[pick(SP.THINGS)];
      const wrong = SP.OBJ[pick(SP.THINGS.filter(x => x !== o.id))];
      return mcQ({ item: 2, title: `"${o.ko}" = ?`, ko: '한국어 뜻에 맞는 스페인어를 고르세요. (관사까지 확인!)', visual: `<div class="bigico">${SP.ico(o.ic, 100)}</div>`, model: esThing(o), explain: `${o.es}은(는) ${o.g === 'm' ? '남성 → un' : '여성 → una'}` },
        SP.indef(o), [(o.g === 'm' ? 'una ' : 'un ') + o.es, SP.indef(wrong), (wrong.g === 'm' ? 'una ' : 'un ') + wrong.es]);
    } },
    { t: 'mc', f() {
      const o = SP.OBJ[pick(SP.THINGS)];
      return mcQ({ item: 2, title: `¿Cómo se dice "${o.ko}"?`, ko: '스페인어를 고르세요.', model: esThing(o), explain: `${o.ko} = ${o.es}` },
        esThing(o), sample(SP.THINGS.filter(x => x !== o.id), 3).map(x => esThing(SP.OBJ[x])));
    } }
  ];

  /* 3. ¿Qué hay en el dormitorio? */
  const ROOM_HAY = ['salon', 'cocina', 'dormitorio', 'bano', 'comedor'];
  function sceneEntries(room, n, allowPlural) {
    const ids = sample(room.items, Math.min(n, room.items.length));
    return ids.map(id => ({ id, n: allowPlural && id === 'silla' ? between(1, 3) : 1 }));
  }
  G[3] = [
    { t: 'pick', f() {
      const r = SP.room(pick(ROOM_HAY)), ent = sceneEntries(r, between(3, 5));
      const inScene = ent.map(e => e.id);
      const pool = Object.keys(SP.OBJ).filter(id => !r.items.includes(id) && !['coche', 'arbol', 'flores', 'bicicleta'].includes(id));
      const wrong = sample(pool, 3);
      const opts = shuffle(inScene.concat(wrong));
      return { kind: 'pick', item: 3, title: `¿Qué hay en ${SP.def(r) === 'el ' + r.es ? 'el' : 'la'} ${r.es}?`.replace(/^¿Qué hay en el el/, '¿Qué hay en el'), ko: `그림에 있는 물건을 모두 고르세요. (${r.ko})`, visual: SP.roomScene(r, ent), say: `¿Qué hay en ${r.g === 'm' ? 'el' : 'la'} ${r.es}?`,
        options: opts.map(id => ({ id, text: SP.indef(SP.OBJ[id]), html: SP.ico(SP.OBJ[id].ic, 30) + ' ' + esc(SP.indef(SP.OBJ[id])) })), correctSet: inScene, model: haySentence(ent), explain: '물건 앞에는 un/una를 붙여요: Hay + un/una + 명사' };
    } },
    { t: 'type', f() {
      const r = SP.room(pick(ROOM_HAY)), ent = sceneEntries(r, between(3, 4));
      return typeQ({ item: 3, title: `¿Qué hay en ${r.g === 'm' ? 'el' : 'la'} ${r.es}?`, ko: `그림을 보고 "Hay …" 로 있는 물건을 모두 말하거나 쓰세요. (${r.ko})`, visual: SP.roomScene(r, ent), say: `¿Qué hay en ${r.g === 'm' ? 'el' : 'la'} ${r.es}?`, hint: 'Hay + un/una + 명사, ... y + un/una + 명사', explain: ent.map(e => `${SP.OBJ[e.id].es} = ${SP.OBJ[e.id].ko}`).join(' · ') },
        listCheck(ent), haySentence(ent));
    } },
    { t: 'mc', f() {
      const r = SP.room(pick(ROOM_HAY)), ent = sceneEntries(r, 3);
      const pool = Object.keys(SP.OBJ).filter(id => !r.items.includes(id) && !['coche', 'arbol', 'flores'].includes(id));
      const wrongs = [0, 1, 2].map(() => { const e2 = ent.map(e => ({ id: e.id, n: 1 })); e2[rand(e2.length)] = { id: pick(pool), n: 1 }; if (rand(2)) e2[rand(e2.length)] = { id: pick(pool), n: 1 }; return haySentence(e2); });
      return mcQ({ item: 3, title: `¿Qué hay en ${r.g === 'm' ? 'el' : 'la'} ${r.es}?`, ko: '그림과 일치하는 문장을 고르세요.', visual: SP.roomScene(r, ent), say: `¿Qué hay en ${r.g === 'm' ? 'el' : 'la'} ${r.es}?`, model: haySentence(ent), explain: ent.map(e => `${SP.OBJ[e.id].es} = ${SP.OBJ[e.id].ko}`).join(' · ') }, haySentence(ent), wrongs);
    } },
    { t: 'order', f() {
      const r = SP.room(pick(ROOM_HAY)), ent = sceneEntries(r, 3);
      const toks = ['Hay'].concat(ent.map((e, i) => phr(e) + (i < ent.length - 2 ? ',' : '')));
      toks.splice(toks.length - 1, 0, 'y'); toks[toks.length - 1] += '.';
      const wr = pick(Object.keys(SP.OBJ).filter(id => !r.items.includes(id) && !['coche', 'arbol', 'flores'].includes(id)));
      return orderQ({ item: 3, title: `¿Qué hay en ${r.g === 'm' ? 'el' : 'la'} ${r.es}?`, ko: '카드를 눌러 문장을 완성하세요. (그림에 없는 카드는 사용하지 않아요)', visual: SP.roomScene(r, ent), say: `¿Qué hay en ${r.g === 'm' ? 'el' : 'la'} ${r.es}?` },
        toks.concat([SP.indef(SP.OBJ[wr])]), listCheck(ent), haySentence(ent), { extraTokens: 1 });
    } }
  ];

  /* 4. ¿Qué hay en tu salón? (3 cosas o más) */
  G[4] = [
    { t: 'type', f() {
      const r = SP.room(pick(['salon', 'salon', 'cocina', 'dormitorio', 'comedor'])), ent = sceneEntries(r, 4, true);
      const q = pick([`¿Qué hay en tu ${r.es}?`, `¿Qué hay en ${r.g === 'm' ? 'el' : 'la'} ${r.es} de tu casa?`]);
      const mine = `En mi ${r.es} hay ${SP.joinY(ent.map(phr))}.`;
      return typeQ({ item: 4, title: q, ko: `"En mi ${r.es} hay …" 로 3개 이상 말하거나 쓰세요. (그림은 참고용)`, visual: SP.roomScene(r, ent, { labels: true }), say: q, hint: `En mi ${r.es} hay un/una …, un/una … y un/una …`, explain: '실제 내 방에 있는 물건을 말해도 돼요. 3개 이상, 관사(un/una)를 붙이세요.' },
        freeListCheck(r, 3), mine);
    } },
    { t: 'order', f() {
      const r = SP.room(pick(['salon', 'cocina', 'dormitorio', 'comedor'])), ent = sceneEntries(r, 4, true);
      const parts = ent.map((e, i) => phr(e) + (i < ent.length - 2 ? ',' : ''));
      parts.splice(parts.length - 1, 0, 'y'); parts[parts.length - 1] += '.';
      const toks = ['En', 'mi', r.es.split(' ')[0] === 'cuarto' ? 'cuarto de baño' : r.es, 'hay'].concat(parts);
      const q = `¿Qué hay en tu ${r.es}?`;
      return orderQ({ item: 4, title: q, ko: '카드를 눌러 문장을 완성하세요.', visual: SP.roomScene(r, ent), say: q },
        toks, text => { const c = freeListCheck(r, 3)(text); c.parts.unshift({ label: 'En mi ' + r.es, ok: has(text, 'en mi ' + r.es) }); c.ok = c.parts.every(p => p.ok); return c; }, `En mi ${r.es} hay ${SP.joinY(ent.map(phr))}.`);
    } },
    { t: 'pick', f() {
      const r = SP.room(pick(['salon', 'cocina', 'dormitorio', 'comedor'])), ok = sample(r.items, 4);
      const wrongPool = Object.keys(SP.OBJ).filter(id => !r.items.includes(id) && !['coche', 'arbol', 'flores', 'bicicleta'].includes(id));
      const wr = sample(wrongPool, 3);
      return { kind: 'pick', item: 4, title: `¿Qué hay en tu ${r.es}?`, ko: `${r.es}에 보통 있는 물건을 모두 고르세요. (${r.ko})`, say: `¿Qué hay en tu ${r.es}?`, options: shuffle(ok.concat(wr)).map(id => ({ id, text: SP.indef(SP.OBJ[id]), html: SP.ico(SP.OBJ[id].ic, 30) + ' ' + esc(SP.indef(SP.OBJ[id])) })), correctSet: ok, model: `En mi ${r.es} hay ${SP.joinY(ok.map(id => SP.indef(SP.OBJ[id])))}.`, explain: '말할 때는 En mi … hay un/una … 로 시작하세요.' };
    } },
    { t: 'mc', f() {
      const o = SP.OBJ[pick(['sofa', 'mesa', 'silla', 'cama', 'nevera', 'lavadora', 'armario', 'ordenador'])];
      return mcQ({ item: 4, title: `En mi casa hay ___ ${o.es}.`, ko: '빈칸에 알맞은 표현을 고르세요.', model: `Hay ${SP.indef(o)}.`, explain: `${o.es}: ${o.g === 'm' ? '남성' : '여성'} 단수 → ${o.g === 'm' ? 'un' : 'una'}` },
        o.g === 'm' ? 'un' : 'una', [o.g === 'm' ? 'una' : 'un', 'tres', 'el'].slice(0, 3), { n: 3 });
    } }
  ];

  /* 5. ¿Cuántas habitaciones tiene tu casa? */
  const roomsSentence = n => `Mi casa tiene ${n === 1 ? 'una' : SP.numWords(n)} ${n === 1 ? 'habitación' : 'habitaciones'}.`;
  const roomsAnswers = n => [roomsSentence(n), `Tiene ${n === 1 ? 'una' : SP.numWords(n)} ${n === 1 ? 'habitación' : 'habitaciones'}.`, `Mi casa tiene ${n} habitaciones.`, `Tiene ${n} habitaciones.`];
  G[5] = [
    { t: 'mc', f() {
      const n = between(1, 8);
      const ws = shuffle([1, 2, 3, 4, 5, 6, 7, 8].filter(x => x !== n)).slice(0, 3).map(roomsSentence);
      return mcQ({ item: 5, title: '¿Cuántas habitaciones tiene tu casa?', ko: '평면도의 방 개수를 세고 알맞은 문장을 고르세요.', visual: SP.floorPlan(n), say: '¿Cuántas habitaciones tiene tu casa?', model: roomsSentence(n), explain: `${n} = ${SP.numWords(n)}` }, roomsSentence(n), ws);
    } },
    { t: 'type', f() {
      const n = between(1, 9);
      return typeQ({ item: 5, title: '¿Cuántas habitaciones tiene tu casa?', ko: '평면도의 방 개수를 세어 "(Mi casa) tiene … habitaciones." 로 답하세요.', visual: SP.floorPlan(n), say: '¿Cuántas habitaciones tiene tu casa?', hint: `숫자를 스페인어로: ${SP.numWords(n)}`, explain: `${n} = ${SP.numWords(n)}` },
        exact(roomsAnswers(n)), roomsSentence(n));
    } },
    { t: 'mc', f() {
      const n = between(1, 20), toWord = rand(2);
      if (toWord) return mcQ({ item: 5, title: `${n} = ?`, ko: '숫자를 스페인어로 고르세요.', model: SP.numWords(n), say: SP.numWords(n), explain: `${n} = ${SP.numWords(n)}` }, SP.numWords(n), sample([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].filter(x => x !== n), 3).map(SP.numWords));
      return mcQ({ item: 5, title: SP.numWords(n), ko: '스페인어 숫자에 맞는 아라비아 숫자를 고르세요.', say: SP.numWords(n), model: String(n), explain: `${SP.numWords(n)} = ${n}` }, String(n), sample([...Array(20)].map((_, i) => i + 1).filter(x => x !== n), 3).map(String));
    } },
    { t: 'type', f() {
      const n = between(1, 20);
      return typeQ({ item: 5, title: `Escribe en letras: ${n}`, ko: '숫자를 스페인어 단어로 쓰세요. (예: 4 → cuatro)', hint: '악센트: dieciséis, veintidós, veintitrés, veintiséis', explain: `${n} = ${SP.numWords(n)}` },
        exact([SP.numWords(n)]), SP.numWords(n));
    } }
  ];

  /* 6. ¿Cómo es tu casa? */
  function houseAttrs() {
    const dw = pick(SP.DWELL), big = rand(2), modern = rand(2), bright = rand(2);
    const adjs = [big ? 'grande' : 'pequeno', modern ? 'moderno' : 'antiguo', bright ? 'luminoso' : 'oscuro'];
    return { dw, big, modern, bright, adjs };
  }
  const af = (k, g) => SP.ADJ[k][g];
  const houseSentence = (h, order) => { const a = (order || h.adjs).map(k => af(k, h.dw.g)); return `Es ${SP.indef(h.dw)} ${SP.joinY(a)}.`; };
  function houseCheck(h) {
    return text => {
      const parts = [{ label: `Es ${SP.indef(h.dw)}`, ok: has(text, SP.indef(h.dw)) || has(text, 'es ' + h.dw.es) && false }];
      parts[0].ok = has(text, SP.indef(h.dw));
      h.adjs.forEach(k => {
        const ok = has(text, af(k, h.dw.g)), other = h.dw.g === 'm' ? af(k, 'f') : af(k, 'm');
        parts.push({ label: af(k, h.dw.g), ok, hint: !ok && other !== af(k, h.dw.g) && has(text, other) ? `성·수 일치: ${h.dw.es}(${h.dw.g === 'm' ? '남성' : '여성'}) → ${af(k, h.dw.g)}` : '' });
      });
      return rubric(parts);
    };
  }
  G[6] = [
    { t: 'type', f() {
      const h = houseAttrs();
      return typeQ({ item: 6, title: `¿Cómo es tu ${h.dw.es}?`, ko: `그림을 보고 "Es un/una … (형용사 3개)" 로 말하거나 쓰세요. (${h.dw.es} = ${h.dw.ko})`, visual: SP.houseSvg(h), say: `¿Cómo es tu ${h.dw.es}?`, hint: `${h.dw.es}은(는) ${h.dw.g === 'm' ? '남성 → -o 형용사' : '여성 → -a 형용사'}`, explain: h.adjs.map(k => `${SP.ADJ[k][h.dw.g]} = ${SP.ADJ[k].ko}`).join(' · ') },
        houseCheck(h), houseSentence(h));
    } },
    { t: 'mc', f() {
      const h = houseAttrs(), ok = houseSentence(h);
      const flip = (k, g) => af(k, g === 'm' ? 'f' : 'm');
      const wr1 = `Es ${SP.indef(h.dw)} ${SP.joinY(h.adjs.map(k => flip(k, h.dw.g)))}.`;
      const k2 = h.adjs.slice(); const i = rand(3); k2[i] = SP.ADJ[k2[i]].opp; const wr2 = houseSentence(Object.assign({}, h, { adjs: k2 }));
      const k3 = h.adjs.map(k => SP.ADJ[k].opp || k); const wr3 = houseSentence(Object.assign({}, h, { adjs: k3 }));
      return mcQ({ item: 6, title: `¿Cómo es tu ${h.dw.es}?`, ko: '그림에 맞고 성·수 일치가 올바른 문장을 고르세요.', visual: SP.houseSvg(h), say: `¿Cómo es tu ${h.dw.es}?`, model: ok, explain: `${h.dw.es}은(는) ${h.dw.g === 'm' ? '남성' : '여성'} → 형용사도 ${h.dw.g === 'm' ? '-o' : '-a'}형` }, ok, [wr1, wr2, wr3]);
    } },
    { t: 'order', f() {
      const h = houseAttrs(), a = h.adjs.map(k => af(k, h.dw.g));
      const toks = ['Es', SP.indef(h.dw), a[0] + ',', a[1], 'y', a[2] + '.'];
      const wrong = h.adjs.map(k => af(k, h.dw.g === 'm' ? 'f' : 'm')).filter((x, i) => x !== a[i]);
      return orderQ({ item: 6, title: `¿Cómo es tu ${h.dw.es}?`, ko: '카드를 눌러 문장을 완성하세요.', visual: SP.houseSvg(h), say: `¿Cómo es tu ${h.dw.es}?` },
        toks.concat(wrong.slice(0, 1)), houseCheck(h), houseSentence(h), { extraTokens: wrong.slice(0, 1).length });
    } },
    { t: 'mc', f() {
      const d = pick(SP.DWELL), k = pick(['pequeno', 'moderno', 'luminoso', 'antiguo', 'bonito', 'tranquilo', 'comodo']);
      const A = SP.ADJ[k];
      return mcQ({ item: 6, title: `Mi ${d.es} es ___. (${A.ko})`, ko: `${d.es}은(는) ${d.g === 'm' ? '남성' : '여성'}명사예요. 알맞은 형용사를 고르세요.`, model: `Mi ${d.es} es ${A[d.g]}.`, explain: `${d.es} (${d.g === 'm' ? 'm' : 'f'}) → ${A[d.g]}` },
        A[d.g], [A[d.g === 'm' ? 'f' : 'm'], A[d.g] + 's', A.m.replace(/o$/, 'a') + 's'].filter(x => x !== A[d.g]), { n: 3 });
    } },
    { t: 'mc', f() {
      const k = pick(['pequeno', 'moderno', 'luminoso', 'antiguo', 'bonito', 'tranquilo', 'comodo', 'oscuro', 'ruidoso', 'limpio']);
      const A = SP.ADJ[k], opp = SP.ADJ[A.opp];
      return mcQ({ item: 6, title: `Lo contrario de "${A.m}"`, ko: '반대말을 고르세요.', model: opp.m, explain: `${A.m}(${A.ko}) ↔ ${opp.m}(${opp.ko})` }, opp.m, sample(Object.values(SP.ADJ).filter(x => x.m !== opp.m && x.m !== A.m && x.m !== 'grande').map(x => x.m), 3));
    } }
  ];

  /* =============== UNIDAD 7 =============== */
  const PL_SAMPLE = SP.PLACES.filter(p => !['parque', 'aparcamiento'].includes(p.id));

  /* 7. ¿Dónde está el banco más cercano? */
  const DIST = [50, 100, 150, 200, 250, 300, 400, 500, 600, 700, 800, 900, 1000];
  function distPhrase(d) { return d <= 100 ? 'muy cerca' : d <= 300 ? 'cerca' : d <= 600 ? 'un poco lejos' : d < 1000 ? 'lejos' : 'muy lejos'; }
  const distSentence = d => `Está ${distPhrase(d)}, a unos ${SP.numWords(d)} metros.`;
  G[7] = [
    { t: 'mc', f() {
      const p = pick(PL_SAMPLE), d = pick(DIST);
      return mcQ({ item: 7, title: `¿Dónde está ${SP.def(p)} más cercano?`.replace('el banco más cercano', 'el banco más cercano'), ko: `그림의 거리(${d}m)에 맞는 대답을 고르세요.`, visual: SP.distanceSvg(p.ic, d), say: `¿Dónde está ${SP.def(p)} más cercano?`, model: distSentence(d), explain: `${SP.numWords(d)} = ${d} · ${distPhrase(d)}` },
        distSentence(d), sample(DIST.filter(x => distPhrase(x) !== distPhrase(d)), 3).map(distSentence));
    } },
    { t: 'type', f() {
      const p = pick(PL_SAMPLE), d = pick(DIST);
      return typeQ({ item: 7, title: `¿Dónde está ${SP.def(p)} más cercano?`, ko: `거리 그림을 보고 "Está … , a unos … metros." 로 답하세요. (${p.es} = ${p.ko})`, visual: SP.distanceSvg(p.ic, d), say: `¿Dónde está ${SP.def(p)} más cercano?`, hint: `거리 표현: muy cerca(≤100m) · cerca · un poco lejos · lejos · muy lejos / ${d} = ${SP.numWords(d)}`, explain: `${d} m = ${SP.numWords(d)} metros` },
        text => rubric([{ label: `Está ${distPhrase(d)}`, ok: has(text, distPhrase(d)) }, { label: `a unos ${SP.numWords(d)} metros`, ok: (has(text, SP.numWords(d)) || new RegExp('(^|\\s)' + d + '(\\s|$)').test(SP.norm(text).replace(/\./g, ''))) && has(text, 'metros') }]), distSentence(d));
    } },
    { t: 'mc', f() {
      const d = pick([100, 200, 300, 400, 500, 600, 700, 800, 900]);
      return mcQ({ item: 7, title: String(d) + ' metros', ko: '스페인어로 알맞은 숫자를 고르세요.', model: SP.numWords(d), explain: `${d} = ${SP.numWords(d)}` }, SP.numWords(d), sample([100, 200, 300, 400, 500, 600, 700, 800, 900].filter(x => x !== d), 3).map(SP.numWords));
    } },
    { t: 'mc', f() {
      const d = pick([100, 200, 300, 400, 500, 600, 700, 800, 900]);
      return mcQ({ item: 7, title: SP.numWords(d) + ' metros', ko: '들리는/보이는 숫자와 같은 것을 고르세요.', say: SP.numWords(d) + ' metros', model: String(d), explain: `${SP.numWords(d)} = ${d}` }, String(d), sample([100, 200, 300, 400, 500, 600, 700, 800, 900].filter(x => x !== d), 3).map(String));
    } },
    { t: 'mc', f() {
      const d = pick(DIST), ph = distPhrase(d);
      return mcQ({ item: 7, title: `A ${d} metros → ¿cerca o lejos?`, ko: '거리에 어울리는 표현을 고르세요.', model: ph, explain: 'muy cerca(~100m) < cerca(~300m) < un poco lejos(~600m) < lejos < muy lejos(1km~)' }, ph, ['muy cerca', 'cerca', 'un poco lejos', 'lejos', 'muy lejos'].filter(x => x !== ph).slice(0, 3));
    } }
  ];

  /* 8. ¿Sabes si hay una papelería por aquí cerca? */
  function sc8() {
    const p = pick(PL_SAMPLE), yes = rand(3) > 0, n = pick([2, 3, 5, 10]);
    const yesS = `Sí, en esta misma calle, a unos ${SP.numWords(n)} minutos.`, noS = 'Lo siento, no soy de aquí.';
    return { p, yes, n, yesS, noS, q: `¿Sabes si hay ${SP.indef(p)} por aquí cerca?`, model: yes ? yesS : noS };
  }
  const vis8 = (p, yes, n) => `<div class="scenario"><div class="sc-bubble">🧑‍🎓 ❓ <b>${esc(SP.cap(SP.indef(p)))}</b> ${SP.ico(p.ic, 40)}</div><div class="sc-tag ${yes ? 'yes' : 'no'}">${yes ? `✅ 상황: 같은 길(esta misma calle)에 있고, 걸어서 ${n}분` : '❌ 상황: 나도 이 동네 사람이 아니라서 모른다'}</div></div>`;
  G[8] = [
    { t: 'mc', f() {
      const s = sc8();
      const wrongs = s.yes ? [s.noS, `Sí, en esta misma calle, a unos ${SP.numWords(s.n)} metros.`, `Sí, en la calle de al lado, a unos ${SP.numWords(s.n === 2 ? 3 : 2)} minutos.`] : [s.yesS, 'No, gracias.', 'Sí, soy de aquí.'];
      return mcQ({ item: 8, title: s.q, ko: '상황에 맞는 대답을 고르세요.', visual: vis8(s.p, s.yes, s.n), say: s.q, model: s.model, explain: s.yes ? 'Sí, en esta misma calle, a unos … minutos. = 네, 바로 이 길에 있어요, 한 … 분 거리예요.' : 'Lo siento, no soy de aquí. = 죄송해요, 저는 이 동네 사람이 아니에요.' }, s.model, wrongs);
    } },
    { t: 'type', f() {
      const s = sc8();
      return typeQ({ item: 8, title: s.q, ko: '상황에 맞게 대답하세요.', visual: vis8(s.p, s.yes, s.n), say: s.q, hint: s.yes ? 'Sí, en esta misma calle, a unos … minutos.' : 'Lo siento, no soy de aquí.', explain: s.yes ? `${s.n} = ${SP.numWords(s.n)}` : '' },
        s.yes ? (text => rubric([{ label: 'Sí', ok: has(text, 'si') }, { label: 'en esta misma calle', ok: has(text, 'en esta misma calle') }, { label: `a unos ${SP.numWords(s.n)} minutos`, ok: has(text, SP.numWords(s.n)) || new RegExp('(^|\\s)' + s.n + '\\s').test(SP.norm(text)) ? has(text, 'minutos') : false }])) :
          (text => rubric([{ label: 'Lo siento', ok: has(text, 'lo siento') }, { label: 'no soy de aquí', ok: has(text, 'no soy de aqui') }])), s.model);
    } },
    { t: 'order', f() {
      const s = sc8();
      const toks = s.yes ? ['Sí,', 'en', 'esta', 'misma', 'calle,', 'a', 'unos', SP.numWords(s.n), 'minutos.'] : ['Lo', 'siento,', 'no', 'soy', 'de', 'aquí.'];
      const extra = s.yes ? ['metros.'] : ['estoy'];
      return orderQ({ item: 8, title: s.q, ko: '카드를 순서대로 눌러 대답을 완성하세요.', visual: vis8(s.p, s.yes, s.n), say: s.q }, toks.concat(extra), exact([s.model]), s.model, { extraTokens: 1 });
    } },
    { t: 'mc', f() {
      const p = pick(PL_SAMPLE);
      return mcQ({ item: 8, title: `¿Sabes si hay ___ ${p.es} por aquí cerca?`, ko: `${p.es} = ${p.ko} · 알맞은 관사를 고르세요.`, visual: `<div class="bigico">${SP.ico(p.ic, 90)}</div>`, model: `¿Sabes si hay ${SP.indef(p)} por aquí cerca?`, explain: `${p.es}: ${p.g === 'm' ? '남성 → un' : '여성 → una'}` },
        p.g === 'm' ? 'un' : 'una', [p.g === 'm' ? 'una' : 'un', 'el', 'la'].filter(x => x !== (p.g === 'm' ? 'el' : 'la')).concat(['unos']).slice(0, 3), { n: 3 });
    } },
    { t: 'mc', f() {
      const n = pick([2, 3, 5, 10, 15, 20]);
      return mcQ({ item: 8, title: `a unos ${n} minutos`, ko: '"~분"을 스페인어로 읽으면?', model: `a unos ${SP.numWords(n)} minutos`, say: `a unos ${SP.numWords(n)} minutos`, explain: `${n} = ${SP.numWords(n)}` }, SP.numWords(n), sample([2, 3, 5, 10, 15, 20].filter(x => x !== n), 3).map(SP.numWords));
    } }
  ];

  /* ayuda para rutas */
  const routeDirsRubric = (r, formal) => text => {
    const parts = [
      { label: `${formal ? 'siga' : 'sigue'} todo recto`, ok: has(text, formal ? 'siga' : 'sigue') || has(text, 'todo recto') },
      { label: `${formal ? 'tome' : 'toma'} la ${SP.ordF(r.k)} calle a la ${r.dir1}`, ok: has(text, SP.ordF(r.k)) && has(text, r.dir1) }
    ];
    if (formal) parts.push({ label: 'usted형 (siga / tome / gire)', ok: has(text, 'siga') || has(text, 'tome') || has(text, 'gire') });
    else parts.push({ label: 'tú형 (sigue / toma / gira)', ok: has(text, 'sigue') || has(text, 'toma') || has(text, 'gira') });
    parts.push({ label: `${SP.def(r.place)} está a la ${r.side}`, ok: has(text, r.side) && (r.dir1 === r.side ? true : true) });
    if (r.passes > 0) parts.push({ label: `pasa ${r.passes === 1 ? 'la primera calle' : SP.numWords(r.passes) + ' calles'}`, ok: has(text, r.passes === 1 ? 'primera' : SP.numWords(r.passes)) });
    return rubric(parts);
  };
  const routeSetup = formal => {
    const p = pick(PL_SAMPLE), s = between(1, 3), r = SP.cityRoute(p.id, s, formal);
    return { p, s, r };
  };
  const routeWrongs = (p, s, formal, r) => {
    const out = [];
    const alt = (kk, dd) => { const V = formal ? ['Siga', 'tome'] : ['Sigue', 'toma']; return `${V[0]} todo recto y ${V[1]} la ${SP.ordF(kk)} calle a la ${dd}. ${r.t2}`; };
    out.push(alt(r.k, r.dir1 === 'izquierda' ? 'derecha' : 'izquierda'));
    out.push(alt(r.k === 3 ? 1 : r.k + 1, r.dir1));
    out.push(alt(r.k === 1 ? 3 : r.k - 1, r.dir1 === 'izquierda' ? 'derecha' : 'izquierda'));
    return out;
  };

  /* 9. ¿Sabe usted dónde está la librería? (formal) */
  const VERBS = [['sigue', 'siga', 'seguir'], ['gira', 'gire', 'girar'], ['toma', 'tome', 'tomar'], ['cruza', 'cruce', 'cruzar'], ['pasa', 'pase', 'pasar'], ['continúa', 'continúe', 'continuar']];
  G[9] = [
    { t: 'type', f() {
      const { p, s, r } = routeSetup(true);
      return typeQ({ item: 9, title: `¿Sabe usted dónde está ${SP.def(p)}?`, ko: `지도(경로 표시)를 보고 usted(존댓말) 명령형으로 길을 알려주세요. 출발 = 🧍`, visual: SP.cityMapSvg({ start: s, route: r, hi: p.id, showNums: true }), say: `¿Sabe usted dónde está ${SP.def(p)}?`, hint: 'Sí, siga todo recto y tome la … calle a la … ', explain: '존댓말 명령형: sigue→siga · toma→tome · gira→gire · cruza→cruce' },
        routeDirsRubric(r, true), 'Sí, ' + r.text.charAt(0).toLowerCase() + r.text.slice(1));
    } },
    { t: 'mc', f() {
      const { p, s, r } = routeSetup(true);
      return mcQ({ item: 9, title: `¿Sabe usted dónde está ${SP.def(p)}?`, ko: '지도의 경로와 일치하는 대답을 고르세요.', visual: SP.cityMapSvg({ start: s, route: r, hi: p.id, showNums: true }), say: `¿Sabe usted dónde está ${SP.def(p)}?`, model: r.text, explain: `${SP.ordF(r.k)} calle = ${r.k}번째 길 · ${r.dir1} = ${r.dir1 === 'izquierda' ? '왼쪽' : '오른쪽'}` }, r.text, routeWrongs(p, s, true, r));
    } },
    { t: 'mc', f() {
      const v = pick(VERBS);
      return mcQ({ item: 9, title: `Usted: ${v[0]} → ?`, ko: `"${v[2]}"의 tú 명령형 ${v[0]}를 usted(존댓말) 형태로 바꾸세요.`, model: v[1], explain: `${v[0]} (tú) → ${v[1]} (usted): -ar 동사는 -e, -er/-ir 동사는 -a` }, v[1], [v[0], v[2], v[1] + 's'].slice(0, 3), { n: 4 });
    } },
    { t: 'type', f() {
      const v = pick(VERBS);
      return typeQ({ item: 9, title: `(tú) ${v[0]} → (usted) ?`, ko: '존댓말 명령형을 쓰세요.', hint: '-ar → -e / -er·-ir → -a', explain: `${v[0]} → ${v[1]}` }, exact([v[1]]), v[1]);
    } },
    { t: 'click', f() {
      const { p, s, r } = routeSetup(true);
      return { kind: 'click', clickKind: 'tile', target: p.id, item: 9, title: 'Usted: ' + r.t1 + ' ' + r.t2, ko: '이 안내를 따라가 도착한 곳을 지도에서 누르세요. (출발 🧍)', visual: SP.cityMapSvg({ start: s, click: true, showNums: true }), say: r.text, model: r.text, explain: `${SP.def(p)} → ${p.ko}` };
    } }
  ];

  /* 10. ¿Cómo puedo ir al banco/...? (tú) */
  G[10] = [
    { t: 'type', f() {
      const { p, s, r } = routeSetup(false);
      return typeQ({ item: 10, title: `¿Cómo puedo ir ${SP.a_def(p)}?`, ko: `🧍(출발)에서 ${p.es}(${p.ko})까지 tú 명령형으로 길을 알려주세요.`, visual: SP.cityMapSvg({ start: s, hi: p.id, showNums: true }), say: `¿Cómo puedo ir ${SP.a_def(p)}?`, hint: 'Sigue todo recto y toma la … calle a la … ', explain: '길 세기: 🧍에서 위로 올라가며 가로길을 1ª, 2ª, 3ª(primera, segunda, tercera) calle로 센다.' },
        routeDirsRubric(r, false), r.text);
    } },
    { t: 'mc', f() {
      const { p, s, r } = routeSetup(false);
      return mcQ({ item: 10, title: `¿Cómo puedo ir ${SP.a_def(p)}?`, ko: '지도의 경로와 일치하는 안내를 고르세요.', visual: SP.cityMapSvg({ start: s, route: r, hi: p.id, showNums: true }), say: `¿Cómo puedo ir ${SP.a_def(p)}?`, model: r.text, explain: `${r.k}번째 길에서 ${r.dir1 === 'izquierda' ? '왼쪽' : '오른쪽'}으로` }, r.text, routeWrongs(p, s, false, r));
    } },
    { t: 'click', f() {
      const { p, s, r } = routeSetup(false);
      return { kind: 'click', clickKind: 'tile', target: p.id, item: 10, title: r.t1 + ' ' + r.t2, ko: '이 안내대로 갔을 때 도착하는 장소를 지도에서 누르세요. (출발 🧍)', visual: SP.cityMapSvg({ start: s, click: true, showNums: true }), say: r.text, model: r.text, explain: `${SP.def(p)} = ${p.ko}` };
    } },
    { t: 'order', f() {
      const { p, s, r } = routeSetup(false);
      const toks = ['Sigue', 'todo', 'recto', 'y', 'toma', 'la', SP.ordF(r.k), 'calle', 'a', 'la', r.dir1 + '.'];
      return orderQ({ item: 10, title: `¿Cómo puedo ir ${SP.a_def(p)}?`, ko: '카드를 눌러 첫 문장을 완성하세요.', visual: SP.cityMapSvg({ start: s, route: r, hi: p.id, showNums: true }), say: `¿Cómo puedo ir ${SP.a_def(p)}?` }, toks.concat([r.dir1 === 'izquierda' ? 'derecha' : 'izquierda']), exact([r.t1]), r.t1, { extraTokens: 1 });
    } },
    { t: 'mc', f() {
      const places = sample(PL_SAMPLE, 1)[0];
      return mcQ({ item: 10, title: `¿Cómo puedo ir ${SP.a_def(places)}?`, ko: '"~에 어떻게 가요?" 올바른 문장의 전치사 결합을 고르세요.', model: `al / a la`, explain: `a + el = al (el banco → al banco) / a + la 그대로 (la farmacia → a la farmacia)` },
        SP.a_def(places), [places.g === 'm' ? 'a la ' + places.es : 'al ' + places.es, places.g === 'm' ? 'a el ' + places.es : 'a el ' + places.es, 'en ' + SP.def(places)], { n: 4 });
    } }
  ];

  /* 11. metro */
  const metroVisual = r => `<div class="strips"><div class="strip-title">🚇 Línea ${r.L1}</div><div class="stripwrap" data-scroll="${r.iA}">${SP.metroStripSvg(r.L1, r.iA, r.i1, { marks: { [r.iA]: '🧍', [r.i1]: '🔁' } })}</div><div class="strip-title">🚇 Línea ${r.L2}</div><div class="stripwrap" data-scroll="${r.i2}">${SP.metroStripSvg(r.L2, r.i2, r.iB, { marks: { [r.i2]: '🔁', [r.iB]: '🏁' } })}</div></div>`;
  const metroWrongs = r => {
    const lines = SP.metroLines.filter(l => l !== r.L1 && l !== r.L2);
    const other = pick(lines);
    const swap = r.text.replace(`línea ${r.L1} `, `línea ${other} `);
    const dirSwap = r.text.replace(`dirección ${r.term1},`, `dirección ${r.term1 === SP.METRO[r.L1].st[0] ? SP.METRO[r.L1].st[SP.METRO[r.L1].st.length - 1] : SP.METRO[r.L1].st[0]},`);
    const nn = r.n === 1 ? 2 : r.n - 1; const ordSwap = r.text.replace(/baja en la \S+ parada/, `baja en la ${SP.ordF(nn)} parada`);
    const l2 = r.text.replace(`línea ${r.L2} `, `línea ${pick(lines.filter(l => l !== other))} `);
    return [swap, dirSwap, ordSwap, l2];
  };
  G[11] = [
    { t: 'type', f() {
      const r = SP.metroRoute();
      return typeQ({ item: 11, title: `¿Cómo puedo ir a la estación ${r.B}?`, ko: `지금 ${r.A}역(🧍)에 있어요. 노선도를 보고 환승 경로를 말하세요. (🔁 = 환승역, 🏁 = 도착역)`, visual: metroVisual(r), say: `¿Cómo puedo ir a la estación ${r.B}?`, hint: 'Toma la línea … en la estación …, en dirección …, y baja en … Allí cambia a la línea … en dirección … y baja en la … parada.', explain: `방향(dirección)은 가는 쪽 종착역 이름 · 정차역 수는 ${SP.ordF(r.n)} parada` },
        text => { const c = SP.metroCheck(text, r); const parts = c.got.map(x => ({ label: x, ok: true })).concat(c.miss.map(x => ({ label: x, ok: false }))); if (!c.ordered) parts.push({ label: '순서: 출발역 → 환승역', ok: false }); return rubric(parts); }, r.text, { metro: r });
    } },
    { t: 'mc', f() {
      const r = SP.metroRoute();
      return mcQ({ item: 11, title: `¿Cómo puedo ir a la estación ${r.B}?`, ko: `${r.A}역(🧍)에서 ${r.B}역(🏁)까지 알맞은 안내를 고르세요.`, visual: metroVisual(r), say: `¿Cómo puedo ir a la estación ${r.B}?`, model: r.text, explain: `${r.A} →(línea ${r.L1})→ ${r.T} →(línea ${r.L2})→ ${r.B}` }, r.text, metroWrongs(r), { n: 4 });
    } },
    { t: 'order', f() {
      const r = SP.metroRoute();
      const toks = [`Toma la línea ${r.L1}`, `en la estación ${r.A},`, `en dirección ${r.term1},`, `y baja en ${r.T}.`, `Allí cambia a la línea ${r.L2}`, `en dirección ${r.term2}`, `y baja en la ${r.n === 1 ? 'primera' : SP.ordF(r.n)} parada.`];
      return orderQ({ item: 11, title: `¿Cómo puedo ir a la estación ${r.B}?`, ko: '문장 조각을 순서대로 눌러 안내를 완성하세요.', visual: metroVisual(r), say: `¿Cómo puedo ir a la estación ${r.B}?`, segmented: true }, toks, exact([r.text]), r.text);
    } },
    { t: 'mc', f() {
      const n = between(1, 12);
      return mcQ({ item: 11, title: `Baja en la ___ parada. (${n})`, ko: '서수(여성형)를 고르세요. parada는 여성명사!', model: `la ${SP.ordF(n)} parada`, say: `Baja en la ${SP.ordF(n)} parada`, explain: `${n}번째 = ${SP.ordF(n)} (여성형: -a)` }, SP.ordF(n), sample([...Array(12)].map((_, i) => SP.ordF(i + 1)).filter(x => x !== SP.ordF(n)), 3));
    } },
    { t: 'mc', f() {
      const r = SP.metroRoute();
      return mcQ({ item: 11, title: `En dirección ___ (Línea ${r.L1}, desde ${r.A})`, ko: `${r.A}에서 ${r.T} 쪽으로 가려면 어느 종착역 방향일까요?`, visual: `<div class="stripwrap" data-scroll="${r.iA}">${SP.metroStripSvg(r.L1, r.iA, r.i1, { marks: { [r.iA]: '🧍', [r.i1]: '🔁' } })}</div>`, model: r.term1, explain: `가는 쪽 끝 역 이름이 dirección 뒤에 와요: ${r.term1}` }, r.term1, [SP.METRO[r.L1].st[0], SP.METRO[r.L1].st[SP.METRO[r.L1].st.length - 1]].filter(x => x !== r.term1).concat(sample(SP.METRO[r.L1].st.slice(1, -1), 2)), { n: 4 });
    } }
  ];

  /* 12. monumentos famosos */
  const CITIES12 = ['Nueva York', 'Barcelona', 'Londres', 'París', 'Roma', 'Madrid', 'Seúl', 'Tokio', 'Ciudad de México'];
  const KIND_ART = k => ({ monumento: ['un', 'm'], museo: ['un', 'm'], parque: ['un', 'm'], 'río': ['un', 'm'], puente: ['un', 'm'], edificio: ['un', 'm'], calle: ['una', 'f'], estadio: ['un', 'm'], palacio: ['un', 'm'], iglesia: ['una', 'f'], fuente: ['una', 'f'], plaza: ['una', 'f'], torre: ['una', 'f'], templo: ['un', 'm'] }[k]);
  const famoso = (kind) => KIND_ART(kind)[1] === 'm' ? 'famoso' : 'famosa';
  function monuQ() { const city = pick(CITIES12), m = pick(SP.MONU[city]); return { city, m }; }
  const cityPrefix = c => c;
  const nameKey = n => SP.norm(n).split(' ').filter(w => !['de', 'la', 'del', 'el', 'los', 'las'].includes(w));
  const monuCheck = (m) => text => {
    const t = SP.norm(text), keys = nameKey(m.name);
    const got = keys.filter(k => t.split(' ').some(w => w === k || (k.length > 4 && SP.lev(w, k) <= 1)));
    return rubric([{ label: 'Sí, se llama …', ok: has(text, 'se llama') || has(text, 'si') }, { label: m.name, ok: got.length >= Math.max(1, Math.ceil(keys.length * .75)) }]);
  };
  G[12] = [
    { t: 'type', f() {
      const { city, m } = monuQ();
      const kindArt = KIND_ART(m.kind)[0];
      const q = `¿${city} tiene ${kindArt} ${m.kind} ${famoso(m.kind)}? ¿Cómo se llama?`;
      return typeQ({ item: 12, title: q, ko: `${city}의 유명한 ${m.kind}을(를) 떠올려 "Sí, se llama …" 로 답하세요.`, visual: `<div class="bigico citybanner"><div class="cb-city">📍 ${esc(city)}</div><div class="cb-ico">${m.ic}</div></div>`, say: q, hint: `Sí, se llama ${m.name}.`, explain: `${m.name} (${m.kind})` }, monuCheck(m), `Sí, se llama ${m.name}.`);
    } },
    { t: 'mc', f() {
      const { city, m } = monuQ();
      const same = Object.entries(SP.MONU).flatMap(([c, l]) => l.filter(x => x.kind === m.kind && x.name !== m.name).map(x => x.name));
      const any = Object.values(SP.MONU).flat().filter(x => x.name !== m.name).map(x => x.name);
      const wr = sample(same.length >= 3 ? same : same.concat(any), 3);
      return mcQ({ item: 12, title: `¿Cómo se llama ${KIND_ART(m.kind)[0] === 'un' ? 'el' : 'la'} ${m.kind} ${famoso(m.kind)} de ${city}?`, ko: `${city}의 유명한 ${m.kind} 이름을 고르세요.`, visual: `<div class="bigico citybanner"><div class="cb-city">📍 ${esc(city)}</div><div class="cb-ico">${m.ic}</div></div>`, model: `Sí, se llama ${m.name}.`, explain: `${city}: ${m.name}` }, m.name, wr);
    } },
    { t: 'mc', f() {
      const { city, m } = monuQ();
      const wr = sample(CITIES12.filter(c => c !== city && !SP.MONU[c].some(x => x.name === m.name)), 3);
      return mcQ({ item: 12, title: `${m.ic} ${m.name} — ¿en qué ciudad está?`, ko: '어느 도시에 있을까요?', model: `${m.name} está en ${city}.`, explain: `${m.name} → ${city}` }, city, wr);
    } },
    { t: 'mc', f() {
      const { city, m } = monuQ(), a = KIND_ART(m.kind);
      const ok = `${a[0]} ${m.kind} ${famoso(m.kind)}`;
      const wr = [`${a[0] === 'un' ? 'una' : 'un'} ${m.kind} ${famoso(m.kind)}`, `${a[0]} ${m.kind} ${famoso(m.kind) === 'famoso' ? 'famosa' : 'famoso'}`, `${a[0] === 'un' ? 'una' : 'un'} ${m.kind} ${famoso(m.kind) === 'famoso' ? 'famosa' : 'famoso'}`];
      return mcQ({ item: 12, title: `¿${city} tiene ___?`, ko: `${m.kind}은(는) ${a[1] === 'm' ? '남성' : '여성'}명사. 관사와 형용사를 모두 맞춰 고르세요.`, model: `${city} tiene ${ok}.`, explain: `${m.kind}(${a[1]}) → ${ok}` }, ok, wr);
    } }
  ];

  /* 13. ¿Dónde está Colombia? */
  function geoSetup() {
    const key = rand(2) ? 'sa' : 'as';
    const cs = SP.geoCountries(key).filter(c => c.es !== 'Rusia');
    const c = pick(cs.filter(x => (x.adj || []).some(n => n !== 'Rusia')));
    const w = SP.geoWhere(key, c.es);
    return { key, c, w };
  }
  const geoSentence = (s, nb) => `Está en el ${s.w.reg.label} de ${s.w.cont}, al ${nb.d} de ${nb.n}.`;
  function geoCheck(s) {
    return text => {
      const regOk = s.w.reg.alts.some(a => has(text, 'en el ' + a) || has(text, 'el ' + a + ' de')),
        nbOk = s.w.nbs.some(nb => has(text, `al ${nb.d} de ${nb.n}`) || (has(text, nb.n) && has(text, nb.d)));
      return rubric([{ label: `Está en el ${s.w.reg.label} de ${s.w.cont}`, ok: regOk }, { label: 'al (방위) de (이웃나라)', ok: nbOk }]);
    };
  }
  G[13] = [
    { t: 'type', f() {
      const s = geoSetup(), nb = pick(s.w.nbs);
      return typeQ({ item: 13, title: `¿Dónde está ${s.c.es}?`, ko: `지도를 보고 "Está en el … de ${s.w.cont}, al … de …" 로 답하세요. (방위: norte · sur · este · oeste · noreste · noroeste · sureste · suroeste)`, visual: SP.geoMapSvg(s.key, { hi: s.c.es, compass: true }), say: `¿Dónde está ${s.c.es}?`, hint: `Está en el (norte/sur/este/oeste/centro) de ${s.w.cont}, al (noreste…) de ${s.w.nbs.map(n => n.n).join(' / ')}`, explain: s.w.nbs.map(n => `al ${n.d} de ${n.n}`).join(' · ') },
        geoCheck(s), geoSentence(s, nb));
    } },
    { t: 'mc', f() {
      const s = geoSetup(), nb = pick(s.w.nbs);
      const ok = geoSentence(s, nb);
      const opp = { norte: 'sur', sur: 'norte', este: 'oeste', oeste: 'este', noreste: 'suroeste', suroeste: 'noreste', noroeste: 'sureste', sureste: 'noroeste' };
      const wrongs = [`Está en el ${s.w.reg.label} de ${s.w.cont}, al ${opp[nb.d]} de ${nb.n}.`, `Está en el ${opp[s.w.reg.label] || 'centro'} de ${s.w.cont}, al ${nb.d} de ${nb.n}.`, `Está en el ${opp[s.w.reg.label] || 'norte'} de ${s.w.cont}, al ${opp[nb.d]} de ${nb.n}.`];
      return mcQ({ item: 13, title: `¿Dónde está ${s.c.es}?`, ko: '지도와 일치하는 문장을 고르세요.', visual: SP.geoMapSvg(s.key, { hi: s.c.es, compass: true }), say: `¿Dónde está ${s.c.es}?`, model: ok, explain: `${s.c.es}: ${s.w.reg.label} · ${s.w.nbs.map(n => `al ${n.d} de ${n.n}`).join(' · ')}` }, ok, wrongs);
    } },
    { t: 'click', f() {
      const key = rand(2) ? 'sa' : 'as';
      const cs = SP.geoCountries(key).filter(c => c.es !== 'Rusia'), c = pick(cs);
      return { kind: 'click', clickKind: 'ctry', target: c.es, item: 13, title: `¿Dónde está ${c.es}?`, ko: `지도에서 ${c.es}를 눌러 보세요. (이름이 가려진 지도)`, visual: SP.geoMapSvg(key, { click: true, labels: 'none', compass: true }), say: `¿Dónde está ${c.es}?`, model: `${c.es} está en el ${SP.geoRegion(key, c.es).label} de ${SP.contName(key)}.`, explain: '' };
    } },
    { t: 'mc', f() {
      const s = geoSetup(), nb = pick(s.w.nbs);
      const cs = SP.geoCountries(s.key).filter(c => c.es !== 'Rusia' && c.es !== s.c.es && c.es !== nb.n);
      const wr = sample(cs.filter(c => SP.compass(SP.geoCountries(s.key).find(x => x.es === nb.n), c) !== nb.d), 3).map(c => c.es);
      return mcQ({ item: 13, title: `¿Qué país está al ${nb.d} de ${nb.n}?`, ko: '지도를 참고해 알맞은 나라를 고르세요.', visual: SP.geoMapSvg(s.key, { compass: true }), say: `¿Qué país está al ${nb.d} de ${nb.n}?`, model: `${s.c.es} está al ${nb.d} de ${nb.n}.`, explain: `${s.c.es}: al ${nb.d} de ${nb.n}` }, s.c.es, wr);
    } }
  ];

  /* 14. ¿Cuántos habitantes tiene La Paz? */
  function popPhrase(n) {
    const r = Math.round(n / 100000) * 100000, d = Math.abs(n - r) / r;
    const qual = d < .012 ? 'unos' : (n < r ? 'casi' : 'más de');
    return { r, qual, text: `Tiene ${qual} ${SP.numWords(r)} habitantes.` };
  }
  const popCheck = (n) => text => {
    const pp = popPhrase(n), t = SP.norm(text);
    const exactOk = has(text, SP.numWords(n));
    const quals = ['casi', 'mas de', 'unos', 'aproximadamente', 'alrededor de', 'cerca de', 'exactamente'];
    const qOk = quals.some(q => has(text, q));
    const numOk = has(text, SP.numWords(pp.r)) || exactOk;
    return rubric([{ label: `${pp.qual} ${SP.numWords(pp.r)}`, ok: numOk && (qOk || exactOk) }, { label: 'habitantes', ok: has(text, 'habitantes') || has(text, 'habitante') }]);
  };
  const bigNum = () => { const tier = pick([2, 3, 3, 4, 4, 5, 6]); const lo = Math.pow(10, tier - 1), hi = Math.pow(10, tier) - 1; let n = between(lo, hi); if (tier >= 4) n = Math.round(n / (tier >= 6 ? 1000 : 10)) * (tier >= 6 ? 1000 : 10) || lo; return n; };
  G[14] = [
    { t: 'type', f() {
      const [city, n] = pick(SP.POP);
      return typeQ({ item: 14, title: `¿Cuántos habitantes tiene ${city}?`, ko: `(${SP.fmt(n)}명) "Tiene casi / más de / unos … habitantes." 로 대답하세요. (연습용 근사값)`, visual: `<div class="bigico citybanner"><div class="cb-city">👥 ${esc(city)}</div><div class="cb-num">${SP.fmt(n)}</div></div>`, say: `¿Cuántos habitantes tiene ${city}?`, hint: '정확히 읽거나, 어림해서 casi(거의) / más de(~이상) / unos(약) + 숫자', explain: `${SP.fmt(n)} = ${SP.numWords(n)}` },
        popCheck(n), popPhrase(n).text);
    } },
    { t: 'mc', f() {
      const [city, n] = pick(SP.POP), p = popPhrase(n);
      const alt = [p.r + 100000, p.r - 100000, p.r + 200000].filter(x => x > 0);
      const wr = alt.map(x => `Tiene ${(x > n ? 'casi' : 'más de')} ${SP.numWords(x)} habitantes.`);
      wr.push(`Tiene ${p.qual === 'casi' ? 'más de' : 'casi'} ${SP.numWords(p.r)} habitantes.`);
      return mcQ({ item: 14, title: `¿Cuántos habitantes tiene ${city}? (${SP.fmt(n)})`, ko: '숫자를 보고 가장 알맞은 어림 표현을 고르세요.', model: p.text, say: `¿Cuántos habitantes tiene ${city}?`, explain: `${SP.fmt(n)} ≈ ${SP.fmt(p.r)} → ${p.qual === 'casi' ? '조금 모자라면 casi' : p.qual === 'unos' ? '거의 같으면 unos' : '조금 넘으면 más de'}` }, p.text, wr);
    } },
    { t: 'type', f() {
      const n = bigNum();
      return typeQ({ item: 14, title: `Escribe en letras: ${SP.fmt(n)}`, ko: '숫자를 스페인어로 쓰세요. (점은 천 단위 구분)', hint: '100=cien, 101=ciento uno, 500=quinientos, 700=setecientos, 900=novecientos', explain: `${SP.fmt(n)} = ${SP.numWords(n)}` }, exact([SP.numWords(n)]), SP.numWords(n));
    } },
    { t: 'mc', f() {
      const n = bigNum();
      const mk = x => SP.numWords(x);
      const wr = [n + 100, n - 100, n * 10 > 1e7 ? n + 10 : n * 10, n + 1000].filter(x => x > 0 && x !== n);
      return mcQ({ item: 14, title: SP.fmt(n), ko: '이 숫자를 스페인어로 읽은 것을 고르세요.', model: mk(n), say: mk(n), explain: `${SP.fmt(n)} = ${mk(n)}` }, mk(n), wr.map(mk));
    } },
    { t: 'type', f() {
      const n = bigNum();
      return typeQ({ item: 14, title: '🔊 ¿Qué número es? (듣고 숫자로 쓰세요)', ko: '스피커 버튼을 눌러 듣고, 들린 숫자를 아라비아 숫자로 입력하세요.', say: SP.numWords(n), listen: true, hint: '점(.)은 입력하지 않아도 돼요', explain: `${SP.numWords(n)} = ${SP.fmt(n)}` },
        text => { const d = text.replace(/[.\s,]/g, ''); return rubric([{ label: SP.fmt(n), ok: d === String(n) }]); }, SP.fmt(n), { autoHideText: true });
    } }
  ];

  /* 15. ¿De qué parte de Corea eres? */
  const KCITIES = () => GEO.kr.cities;
  const krSentence = (c, withReg) => `Soy de ${c.es}${withReg ? ', en el ' + SP.krRegion(c) + ' de Corea' : ''}.`;
  G[15] = [
    { t: 'type', f() {
      const c = pick(KCITIES());
      return typeQ({ item: 15, title: '¿De qué parte de Corea eres?', ko: `(내 고향 = ${c.es}, 빨간 점) "Soy de …" 로 대답하세요. 위치까지 말하면 더 좋아요!`, visual: SP.krMapSvg({ hi: c.id }), say: '¿De qué parte de Corea eres?', hint: `Soy de ${c.es}, en el (norte/sur/este/oeste/centro) de Corea.`, explain: `${c.es}: ${SP.krRegion(c)} de Corea` },
        text => { const parts = [{ label: `Soy de ${c.es}`, ok: has(text, 'soy de ' + c.es) || has(text, 'soy de ' + c.es.replace('ú', 'u')) }]; const regs = ['norte', 'sur', 'este', 'oeste', 'centro', 'noreste', 'noroeste', 'sureste', 'suroeste']; const said = regs.filter(r => has(text, r)); if (said.length) parts.push({ label: `en el ${SP.krRegion(c)} de Corea`, ok: said.includes(SP.krRegion(c)) || SP.krRegion(c).includes(said[0]) }); return rubric(parts); }, krSentence(c, true));
    } },
    { t: 'click', f() {
      const c = pick(KCITIES());
      return { kind: 'click', clickKind: 'dot', target: c.id, item: 15, title: `Soy de ${c.es}.`, ko: `지도에서 ${c.es}를 눌러 보세요.`, visual: SP.krMapSvg({ click: true, labels: 'none' }), say: `Soy de ${c.es}`, model: krSentence(c, true), explain: `${c.es}: ${SP.krRegion(c)} de Corea` };
    } },
    { t: 'mc', f() {
      const c = pick(KCITIES()), r = SP.krRegion(c);
      const regs = ['norte', 'sur', 'este', 'oeste', 'centro', 'noreste', 'noroeste', 'sureste', 'suroeste'];
      return mcQ({ item: 15, title: `${c.es} está en el ___ de Corea.`, ko: '지도에서 위치를 확인하고 알맞은 방위를 고르세요.', visual: SP.krMapSvg({ hi: c.id }), model: krSentence(c, true), explain: `${c.es}: ${r}` }, r, regs.filter(x => x !== r));
    } },
    { t: 'mc', f() {
      const c = pick(KCITIES());
      return mcQ({ item: 15, title: `Yo ___ ${c.es}. (출신)`, ko: '"~출신이다"는 ser + de를 써요.', model: `Soy de ${c.es}.`, explain: 'ser + de + 장소 = ~출신이다 (Soy de Andong). estar/vivir en = ~에 있다/살다' }, 'soy de', ['estoy de', 'soy en', 'vivo de']);
    } },
    { t: 'mc', f() {
      const c = pick(KCITIES());
      return mcQ({ item: 15, title: `¿De qué parte de Corea eres?`, ko: `고향이 ${c.es}라면 알맞은 대답은?`, visual: SP.krMapSvg({ hi: c.id }), say: '¿De qué parte de Corea eres?', model: krSentence(c, true), explain: `Soy de ${c.es}` }, `Soy de ${c.es}.`, sample(KCITIES().filter(x => x.id !== c.id), 3).map(x => `Soy de ${x.es}.`));
    } }
  ];

  /* 16. ¿Cómo es Dongtan / Busan / Nueva York? */
  function citySentence(c) {
    const a = c.adj.map(k => SP.ADJ[k].f);
    return `${c.n} es una ciudad ${SP.joinY(a)}. ${c.tur ? 'Es una ciudad turística.' : 'No es una ciudad turística.'}`;
  }
  const cityCard = c => `<div class="citycard"><div class="cc-head">📍 ${esc(c.n)}</div><div class="cc-body">${c.adj.map(k => `<span class="chip ko">${esc(SP.ADJ[k].ko)}</span>`).join('')}<span class="chip ${c.tur ? 'ok' : 'no'}">${c.tur ? '🧳 관광지 O' : '🚫 관광지 X'}</span></div></div>`;
  function cityCheck(c) {
    return text => {
      const parts = [{ label: `${c.n} es una ciudad`, ok: has(text, 'es una ciudad') }];
      c.adj.forEach(k => {
        const A = SP.ADJ[k], ok = has(text, A.f);
        parts.push({ label: A.f, ok, hint: !ok && has(text, A.m) && A.m !== A.f ? 'ciudad는 여성 → ' + A.f : '' });
      });
      parts.push({ label: c.tur ? 'Es una ciudad turística' : 'No es una ciudad turística', ok: c.tur ? (has(text, 'es una ciudad turistica') && !has(text, 'no es una ciudad turistica')) : has(text, 'no es una ciudad turistica') });
      return rubric(parts);
    };
  }
  G[16] = [
    { t: 'type', f() {
      const c = pick(SP.CITY_DESC);
      return typeQ({ item: 16, title: `¿Cómo es ${c.n}?`, ko: '카드의 정보를 스페인어로 설명하세요. "… es una ciudad …(여성형) y …. (No) es una ciudad turística."', visual: cityCard(c), say: `¿Cómo es ${c.n}?`, hint: 'ciudad = 여성 → pequeña, moderna, tranquila …', explain: c.adj.map(k => `${SP.ADJ[k].f} = ${SP.ADJ[k].ko}`).join(' · ') },
        cityCheck(c), citySentence(c));
    } },
    { t: 'mc', f() {
      const c = pick(SP.CITY_DESC), ok = citySentence(c);
      const wr1 = ok.replace(/ciudad (.*?)\./, (m, a) => 'ciudad ' + c.adj.map(k => SP.ADJ[k].m).filter((x, i, arr) => arr.indexOf(x) === i).reduce((acc, x, i, arr) => arr.length === 1 ? x : acc, '') + '.');
      const flip = c.adj.map(k => SP.ADJ[k].m);
      const w1 = `${c.n} es una ciudad ${SP.joinY(flip)}. ${c.tur ? 'Es una ciudad turística.' : 'No es una ciudad turística.'}`;
      const w2 = `${c.n} es una ciudad ${SP.joinY(c.adj.map(k => SP.ADJ[k].f))}. ${c.tur ? 'No es una ciudad turística.' : 'Es una ciudad turística.'}`;
      const opp = c.adj.map((k, i) => i === 0 && SP.ADJ[k].opp ? SP.ADJ[SP.ADJ[k].opp].f : SP.ADJ[k].f);
      const w3 = `${c.n} es una ciudad ${SP.joinY(opp)}. ${c.tur ? 'Es una ciudad turística.' : 'No es una ciudad turística.'}`;
      return mcQ({ item: 16, title: `¿Cómo es ${c.n}?`, ko: '카드의 정보와 성·수 일치가 모두 맞는 문장을 고르세요.', visual: cityCard(c), say: `¿Cómo es ${c.n}?`, model: ok, explain: c.adj.map(k => `${SP.ADJ[k].f} = ${SP.ADJ[k].ko}`).join(' · ') }, ok, [w1, w2, w3]);
    } },
    { t: 'order', f() {
      const c = pick(SP.CITY_DESC), a = c.adj.map(k => SP.ADJ[k].f);
      const toks = [c.n, 'es', 'una', 'ciudad', a[0] + (a.length > 2 ? ',' : ''), ...(a.length > 2 ? [a[1], 'y', a[2] + '.'] : ['y', a[1] + '.'])];
      const ex = c.adj.map(k => SP.ADJ[k].m).filter((x, i) => x !== a[i]);
      return orderQ({ item: 16, title: `¿Cómo es ${c.n}?`, ko: '첫 문장을 카드로 완성하세요. ("남성형" 카드는 함정!)', visual: cityCard(c), say: `¿Cómo es ${c.n}?` }, toks.concat(ex.slice(0, 1)), text => { const r = cityCheck(c)(text); r.parts = r.parts.filter(p => !/turística/.test(p.label)); r.ok = r.parts.every(p => p.ok); return r; }, citySentence(c).split('. ')[0] + '.', { extraTokens: ex.slice(0, 1).length });
    } },
    { t: 'mc', f() {
      const k = pick(['pequeno', 'moderno', 'tranquilo', 'bonito', 'antiguo', 'animado', 'ruidoso', 'limpio']);
      const A = SP.ADJ[k], c = pick(SP.CITY_DESC);
      return mcQ({ item: 16, title: `${c.n} es una ciudad ___. (${A.ko})`, ko: 'ciudad는 여성명사 → 형용사도 여성형!', model: `${c.n} es una ciudad ${A.f}.`, explain: `${A.m}(남성) → ${A.f}(여성)` }, A.f, [A.m === A.f ? A.m + 's' : A.m, A.f + 's', A.m.replace(/o$/, 'a') + 'o'].filter(x => x !== A.f), { n: 3 });
    } },
    { t: 'mc', f() {
      const k = pick(['pequeno', 'moderno', 'tranquilo', 'bonito', 'antiguo', 'animado', 'ruidoso', 'limpio', 'luminoso', 'oscuro']);
      const A = SP.ADJ[k], O = SP.ADJ[A.opp];
      return mcQ({ item: 16, title: `Dongtan es una ciudad ${A.f}. → Busan NO es una ciudad ...`, ko: `반대말: ${A.f}(${A.ko})의 반대는?`, model: O.f, explain: `${A.f} ↔ ${O.f} (${O.ko})` }, O.f, sample(Object.values(SP.ADJ).filter(x => x.f !== O.f && x.f !== A.f).map(x => x.f), 3));
    } }
  ];

  SP.popPhrase = popPhrase;
  SP.GENS = G;
  SP.genCount = () => Object.values(G).reduce((a, l) => a + l.length, 0);

  /* ---------- API ---------- */
  SP.makeQuestion = function (item, kindWanted) {
    const list = G[item];
    let pool = list;
    if (kindWanted === 'choice') pool = list.filter(x => x.t === 'mc' || x.t === 'pick' || x.t === 'click');
    else if (kindWanted === 'speak') pool = list.filter(x => x.t === 'type' || x.t === 'order').filter(x => x.t === 'type');
    if (!pool.length) pool = list;
    const gen = pick(pool);
    const q = gen.f();
    q.gen = gen.t; q.item = item;
    return q;
  };

  SP.ITEMS = [
    { n: 1, unit: 5, q: '¿Qué es esto?', a: 'Es un cuarto de baño / una cocina / un salón …', ko: '집의 방 그림 보고 말하기', ic: '🛋️' },
    { n: 2, unit: 5, q: '¿Qué es esto?', a: 'Es una lavadora / una cocina de gas / un ordenador …', ko: '물건 그림 보고 말하기', ic: '🧺' },
    { n: 3, unit: 5, q: '¿Qué hay en el dormitorio?', a: 'Hay una cama, un armario, un escritorio, una silla …', ko: '방 그림 보고 있는 물건 말하기', ic: '🛏️' },
    { n: 4, unit: 5, q: '¿Qué hay en tu salón?', a: 'En mi salón hay un sofá, una mesa, tres sillas y una televisión.', ko: '우리 집 거실에 있는 물건 3개 이상', ic: '📺' },
    { n: 5, unit: 5, q: '¿Cuántas habitaciones tiene tu casa?', a: '(Mi casa) tiene cuatro habitaciones.', ko: '방 개수 숫자로 답하기', ic: '🔢' },
    { n: 6, unit: 5, q: '¿Cómo es tu casa?', a: 'Es un piso pequeño, moderno y luminoso.', ko: '집을 형용사로 묘사하기', ic: '🏠' },
    { n: 7, unit: 7, q: '¿Dónde está el banco más cercano?', a: 'Está un poco lejos, a unos quinientos metros.', ko: '거리 표현 + 숫자', ic: '🏦' },
    { n: 8, unit: 7, q: '¿Sabes si hay una papelería por aquí cerca?', a: 'Sí, en esta misma calle, a unos 5 minutos. / Lo siento, no soy de aquí.', ko: '근처 가게 묻고 답하기', ic: '✏️' },
    { n: 9, unit: 7, q: '¿Sabe usted dónde está la librería?', a: 'Sí, siga todo recto y gire en la segunda calle a la izquierda.', ko: '존댓말(usted)로 길 안내', ic: '📖' },
    { n: 10, unit: 7, q: '¿Cómo puedo ir al banco / el hotel / la farmacia …?', a: 'Sigue todo recto y toma la segunda calle a la derecha. Gira a la izquierda.', ko: '도시 지도 보고 길 안내', ic: '🗺️' },
    { n: 11, unit: 7, q: '¿Cómo puedo ir a la estación Franklin?', a: 'Toma la línea 5 en la estación Del Sol, en dirección Monte Tabor y baja en Santa Ana. Allí cambia a la línea 2 …', ko: '지하철 노선도 보고 환승 안내', ic: '🚇' },
    { n: 12, unit: 7, q: '¿Nueva York / Barcelona / Londres tiene un monumento famoso? ¿Cómo se llama?', a: 'Sí, se llama Estatua de la Libertad.', ko: '도시의 유명한 장소 말하기', ic: '🗽' },
    { n: 13, unit: 7, q: '¿Dónde está Colombia?', a: 'Está en el norte de Sudamérica, al noreste de Ecuador.', ko: '지도 보고 위치(방위) 말하기', ic: '🌎' },
    { n: 14, unit: 7, q: '¿Cuántos habitantes tiene La Paz? (877.363)', a: 'Tiene casi novecientos mil habitantes.', ko: '큰 숫자·인구 말하기', ic: '👥' },
    { n: 15, unit: 7, q: '¿De qué parte de Corea eres?', a: 'Soy de Andong.', ko: '내 고향 말하기', ic: '🇰🇷' },
    { n: 16, unit: 7, q: '¿Cómo es Dongtan / Busan / Nueva York …?', a: 'Dongtan es una ciudad pequeña y moderna. No es una ciudad turística.', ko: '도시를 형용사로 묘사하기', ic: '🌆' }
  ];
})(typeof window !== 'undefined' ? window : globalThis);
