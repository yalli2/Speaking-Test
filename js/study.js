/* Páginas de estudio (학습): vocabulario, estructuras y mapas para cada pregunta */
(function (g) {
  const SP = g.SP, esc = SP.esc;
  SP.popPhrase = SP.popPhrase || null;

  const say = (t, cls) => `<button class="say ${cls || ''}" data-say="${esc(t)}" aria-label="듣기: ${esc(t)}">🔊</button>`;
  const sec = (title, body, cls) => `<section class="panel ${cls || ''}"><h3>${title}</h3>${body}</section>`;
  const tip = (html) => `<div class="tip">💡 ${html}</div>`;
  const frame = segs => `<div class="frame">${segs.map(s => `<span class="seg ${s[1] || ''}">${esc(s[0])}</span>`).join('')}</div>`;
  const qa = (q, a, ko) => `<div class="qa"><div class="q"><span>Q</span><b lang="es">${esc(q)}</b>${say(q)}</div><div class="a"><span>A</span><b lang="es">${esc(a)}</b>${say(a)}</div>${ko ? `<div class="ko">${esc(ko)}</div>` : ''}</div>`;
  const vcard = (ic, es, ko, speak) => `<button class="vcard" data-say="${esc(speak || es)}"><div class="v-ic">${ic}</div><div class="v-es" lang="es">${esc(es)}</div><div class="v-ko">${esc(ko)}</div></button>`;
  const grid = (cards, cls) => `<div class="vgrid ${cls || ''}">${cards.join('')}</div>`;
  const cap = SP.cap;
  const roomLabel = r => SP.indef(r);

  const S = {};

  S[1] = () => [
    sec('이 문제는 이렇게 나와요', qa('¿Qué es esto?', 'Es un cuarto de baño.', '집의 방 그림을 보여 주면 "Es un/una + 방 이름"으로 대답해요.') + frame([['Es', 'k'], ['un / una', 'a'], ['방 이름', 'n']])),
    sec('집의 방 (Las habitaciones de la casa)', `<div class="roomgrid">${SP.ROOMS.map(r => `<button class="roomcard" data-say="Es ${roomLabel(r)}">${SP.roomScene(r, r.items.slice(0, 3).map(id => ({ id, n: 1 })))}<div class="rc-name" lang="es">${esc(cap(roomLabel(r)))}</div><div class="v-ko">${esc(r.ko)}</div></button>`).join('')}</div>` + tip('카드를 누르면 소리가 나와요. 남성명사(-o 등)는 <b>un</b>, 여성명사(-a 등)는 <b>una</b>! <b>cuarto de baño</b>는 줄여서 <b>baño</b>라고도 해요.')),
    sec('관사 한눈에 보기', `<table class="tbl"><tr><th>남성 (un)</th><th>여성 (una)</th></tr><tr><td lang="es">un salón · un dormitorio · un comedor · un cuarto de baño · un jardín · un garaje</td><td lang="es">una cocina · una terraza · una habitación</td></tr></table>`)
  ].join('');

  S[2] = () => [
    sec('이 문제는 이렇게 나와요', qa('¿Qué es esto?', 'Es una lavadora.', '물건 그림을 보고 "Es un/una + 물건"으로 대답해요. (예: una cocina de gas, un ordenador)') + frame([['Es', 'k'], ['un / una', 'a'], ['물건', 'n']])),
    sec('집 안의 물건 (Los objetos)', grid(SP.THINGS.map(id => { const o = SP.OBJ[id]; return vcard(SP.ico(o.ic, 56), SP.indef(o), o.ko, 'Es ' + SP.indef(o)); })) + tip('<b>cocina</b>는 "부엌"이고, <b>cocina de gas</b>는 "가스레인지"예요. <b>ordenador</b>는 스페인의 "컴퓨터"(중남미에서는 computadora)!'))
  ].join('');

  S[3] = () => {
    const rs = ['dormitorio', 'cocina', 'salon', 'bano', 'comedor'].map(SP.room);
    return [
      sec('이 문제는 이렇게 나와요', qa('¿Qué hay en el dormitorio?', 'Hay una cama, un armario, un escritorio y una silla.', '그림 속 물건을 모두 찾아 "Hay + un/una …" 으로 나열해요.') + frame([['Hay', 'k'], ['una cama,', 'n'], ['un armario,', 'n'], ['un escritorio', 'n'], ['y', 'k'], ['una silla.', 'n']]) + tip('<b>hay</b>는 "있다(존재)". 단수·복수 모두 hay 하나로 써요. 마지막 물건 앞에는 <b>y</b>를 넣어요.')),
      ...rs.map(r => {
        const ent = r.items.slice(0, 6).map(id => ({ id, n: 1 }));
        return sec(`${cap(SP.def(r))} — ${r.ko}`, `<div class="roomwide">${SP.roomScene(r, ent, { labels: true })}</div><p class="sample" lang="es">Hay ${SP.joinY(ent.slice(0, 4).map(e => SP.indef(SP.OBJ[e.id])))}. ${say('Hay ' + SP.joinY(ent.slice(0, 4).map(e => SP.indef(SP.OBJ[e.id]))) + '.')}</p>`);
      })
    ].join('');
  };

  S[4] = () => {
    const r = SP.room('salon'), ent = [{ id: 'sofa', n: 1 }, { id: 'mesa', n: 1 }, { id: 'silla', n: 3 }, { id: 'television', n: 1 }];
    return [
      sec('이 문제는 이렇게 나와요', qa('¿Qué hay en tu salón?', 'En mi salón hay un sofá, una mesa, tres sillas y una televisión.', '내 거실(또는 다른 방)에 있는 물건을 <b>3개 이상</b> 말해요. 실제 우리 집 이야기여도 좋아요!'.replace(/<[^>]+>/g, '')) + frame([['En mi salón', 'k'], ['hay', 'k'], ['un sofá,', 'n'], ['una mesa,', 'n'], ['tres sillas', 'n'], ['y', 'k'], ['una televisión.', 'n']])),
      sec('그림으로 연습', `<div class="roomwide">${SP.roomScene(r, ent, { labels: true })}</div>`),
      sec('수량 말하기', `<p>같은 물건이 여러 개면 <b>숫자 + 복수형</b>을 써요.</p>${grid([['una silla', '1'], ['dos sillas', '2'], ['tres sillas', '3'], ['cuatro sillas', '4'], ['cinco sillas', '5']].map(x => vcard(SP.ico('🪑', 40), x[0], x[1] + '개')), 'small')}${tip('복수형: 모음으로 끝나면 <b>-s</b> (silla → sillas), 자음으로 끝나면 <b>-es</b> (ordenador → ordenadores)')}`),
      sec('"내 방" 표현 바꿔 쓰기', `<ul class="plain" lang="es"><li>En mi dormitorio hay …</li><li>En mi cocina hay …</li><li>En el salón de mi casa hay …</li><li>En mi cuarto de baño hay …</li></ul>`)
    ].join('');
  };

  S[5] = () => {
    const nums = [...Array(20)].map((_, i) => i + 1);
    return [
      sec('이 문제는 이렇게 나와요', qa('¿Cuántas habitaciones tiene tu casa?', 'Mi casa tiene cuatro habitaciones.', '방의 개수를 숫자(스페인어)로 말해요.') + frame([['(Mi casa)', 'k'], ['tiene', 'k'], ['cuatro', 'n'], ['habitaciones.', 'k']]) + tip('habitación은 여성명사 → 1개일 땐 <b>una habitación</b> (uno 아님!). 2개부터는 <b>habitaciones</b>.')),
      sec('숫자 1–20', grid(nums.map(n => vcard(`<span class="bignum">${n}</span>`, SP.numWords(n), '', SP.numWords(n))), 'small')),
      sec('평면도 예시', `<div class="threecol">${[2, 4, 6].map(n => `<div class="ex">${SP.floorPlan(n)}<p lang="es">Mi casa tiene ${SP.numWords(n)} habitaciones. ${say('Mi casa tiene ' + SP.numWords(n) + ' habitaciones.')}</p></div>`).join('')}</div>`),
      tip('악센트가 있는 숫자: <b>dieciséis</b>(16), <b>veintidós</b>(22), <b>veintitrés</b>(23), <b>veintiséis</b>(26)')
    ].join('');
  };

  S[6] = () => {
    const keys = ['pequeno', 'grande', 'moderno', 'antiguo', 'luminoso', 'oscuro', 'comodo', 'bonito', 'tranquilo', 'ruidoso', 'acogedor', 'limpio'];
    const ex = [{ dw: SP.DWELL[0], big: 0, modern: 1, bright: 1, adjs: ['pequeno', 'moderno', 'luminoso'] }, { dw: SP.DWELL[1], big: 1, modern: 0, bright: 0, adjs: ['grande', 'antiguo', 'oscuro'] }];
    return [
      sec('이 문제는 이렇게 나와요', qa('¿Cómo es tu casa?', 'Es un piso pequeño, moderno y luminoso.', '집을 형용사 2~3개로 묘사해요. 형용사는 명사의 성·수에 맞춰요.') + frame([['Es', 'k'], ['un piso', 'n'], ['pequeño,', 'a'], ['moderno', 'a'], ['y', 'k'], ['luminoso.', 'a']]) + tip('<b>piso</b>(남성) → pequeño, moderno · <b>casa</b>(여성) → pequeña, moderna. 단, <b>grande</b>는 남·여 같은 모양!')),
      sec('형용사 (남성 / 여성)', grid(keys.map(k => { const A = SP.ADJ[k]; return vcard(`<span class="adjpair">${esc(A.m)}<i>/</i>${esc(A.f)}</span>`, A.m === A.f ? A.m : A.m + ' / ' + A.f, A.ko, A.m + ', ' + A.f); }), 'wide')),
      sec('집의 종류', grid(SP.DWELL.map(d => vcard(SP.ico('🏠', 44), SP.indef(d), d.ko + ' · ' + (d.g === 'm' ? '남성' : '여성'))), 'small')),
      sec('그림으로 연습', `<div class="threecol two">${ex.map(h => `<div class="ex">${SP.houseSvg(h)}<p lang="es">${esc(`Es ${SP.indef(h.dw)} ${SP.joinY(h.adjs.map(k => SP.ADJ[k][h.dw.g]))}.`)} ${say(`Es ${SP.indef(h.dw)} ${SP.joinY(h.adjs.map(k => SP.ADJ[k][h.dw.g]))}.`)}</p></div>`).join('')}</div>`)
    ].join('');
  };

  S[7] = () => {
    const hun = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
    return [
      sec('이 문제는 이렇게 나와요', qa('¿Dónde está el banco más cercano?', 'Está un poco lejos, a unos quinientos metros.', '가장 가까운 곳이 어디 있는지 거리로 대답해요. "a unos …" = 약 ~') + frame([['Está', 'k'], ['un poco lejos,', 'a'], ['a unos', 'k'], ['quinientos', 'n'], ['metros.', 'k']])),
      sec('거리 표현', `<table class="tbl dist"><tr><th>표현</th><th>뜻</th><th>대략</th></tr>${[['muy cerca / al lado', '아주 가까워요', '~100 m'], ['cerca', '가까워요', '~300 m'], ['un poco lejos', '조금 멀어요', '~600 m'], ['lejos', '멀어요', '700–900 m'], ['muy lejos', '아주 멀어요', '1 km~']].map(r => `<tr><td lang="es"><b>${r[0]}</b> ${say('Está ' + r[0])}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</table>`),
      sec('거리 그림 예시', `<div class="threecol">${[[50, '🏦'], [300, '💊'], [800, '🏥']].map(x => `<div class="ex">${SP.distanceSvg(x[1], x[0])}<p lang="es">Está ${(x[0] <= 100 ? 'muy cerca' : x[0] <= 300 ? 'cerca' : 'lejos')}, a unos ${SP.numWords(x[0])} metros. ${say('Está ' + (x[0] <= 100 ? 'muy cerca' : x[0] <= 300 ? 'cerca' : 'lejos') + ', a unos ' + SP.numWords(x[0]) + ' metros.')}</p></div>`).join('')}</div>`),
      sec('100 단위 숫자', grid(hun.map(n => vcard(`<span class="bignum">${SP.fmt(n)}</span>`, SP.numWords(n), '', SP.numWords(n) + ' metros')), 'small') + tip('<b>500 quinientos · 700 setecientos · 900 novecientos</b>는 규칙에서 벗어나요! 100은 <b>cien</b>, 101부터는 <b>ciento</b>.'))
    ].join('');
  };

  S[8] = () => [
    sec('이 문제는 이렇게 나와요', qa('¿Sabes si hay una papelería por aquí cerca?', 'Sí, en esta misma calle, a unos cinco minutos.', '근처에 가게가 있는지 묻는 질문이에요. 두 가지로 대답할 수 있어요.') + `<div class="two-ans"><div class="ans yes"><b>✅ 있을 때</b><p lang="es">Sí, en esta misma calle, a unos 5 minutos. ${say('Sí, en esta misma calle, a unos cinco minutos.')}</p></div><div class="ans no"><b>❌ 모를 때</b><p lang="es">Lo siento, no soy de aquí. ${say('Lo siento, no soy de aquí.')}</p></div></div>`),
    sec('핵심 표현', `<ul class="plain"><li lang="es"><b>por aquí cerca</b> = 이 근처에</li><li lang="es"><b>en esta misma calle</b> = 바로 이 길에</li><li lang="es"><b>en la calle de al lado</b> = 옆 길에</li><li lang="es"><b>a unos cinco minutos</b> = 약 5분 거리에</li><li lang="es"><b>Lo siento, no soy de aquí.</b> = 미안해요, 저는 이 동네 사람이 아니에요.</li></ul>`),
    sec('가게·장소 어휘', grid(SP.PLACES.map(p => vcard(SP.ico(p.ic, 44), SP.indef(p), p.ko, '¿Sabes si hay ' + SP.indef(p) + ' por aquí cerca?')), 'small')),
    sec('그 밖의 장소 (지도에 나온 어휘)', grid(SP.PLACES_EXTRA.map(p => vcard(SP.ico(p.ic, 44), p.es === 'correos' ? 'Correos' : SP.indef(p), p.ko)), 'small'))
  ].join('');

  const cityStudy = formal => {
    const p = SP.place('libreria'), r = SP.cityRoute('libreria', 2, formal);
    return `<div class="ex wide">${SP.cityMapSvg({ start: 2, route: r, hi: 'libreria', showNums: true })}<p class="sample" lang="es">${esc(formal ? 'Sí, ' + r.text.charAt(0).toLowerCase() + r.text.slice(1) : r.text)} ${say(r.text)}</p></div>`;
  };

  S[9] = () => [
    sec('이 문제는 이렇게 나와요', qa('¿Sabe usted dónde está la librería?', 'Sí, siga todo recto y gire en la segunda calle a la izquierda.', 'usted(존댓말)로 물으면 <b>usted 명령형</b>으로 대답해요.'.replace(/<[^>]+>/g, '')) + frame([['Sí,', 'k'], ['siga', 'a'], ['todo recto', 'k'], ['y', 'k'], ['gire', 'a'], ['en la segunda calle', 'n'], ['a la izquierda.', 'n']])),
    sec('tú ↔ usted 명령형', `<table class="tbl"><tr><th>동사</th><th>tú (친구)</th><th>usted (존댓말)</th></tr>${[['seguir 따라가다', 'sigue', 'siga'], ['girar 돌다', 'gira', 'gire'], ['tomar 타다·들어서다', 'toma', 'tome'], ['cruzar 건너다', 'cruza', 'cruce'], ['pasar 지나가다', 'pasa', 'pase'], ['continuar 계속 가다', 'continúa', 'continúe']].map(r => `<tr><td>${r[0]}</td><td lang="es">${r[1]} ${say(r[1])}</td><td lang="es"><b>${r[2]}</b> ${say(r[2])}</td></tr>`).join('')}</table>${tip('-ar 동사: usted은 <b>-e</b> (girar → gire) · -er/-ir 동사: <b>-a</b> (seguir → siga). 규칙은 반대로 바뀐다고 기억하세요!')}`),
    sec('방향·순서 표현', grid([['todo recto', '직진'], ['a la izquierda', '왼쪽으로'], ['a la derecha', '오른쪽으로'], ['la primera calle', '첫 번째 길'], ['la segunda calle', '두 번째 길'], ['la tercera calle', '세 번째 길'], ['al final de la calle', '길 끝에서'], ['enfrente de', '맞은편에'], ['al lado de', '옆에'], ['entre … y …', '~와 ~ 사이에']].map(x => vcard('', x[0], x[1])), 'small')),
    sec('지도로 연습 (usted)', cityStudy(true))
  ].join('');

  S[10] = () => {
    const p = SP.place('banco'), r = SP.cityRoute('banco', 2, false);
    return [
      sec('이 문제는 이렇게 나와요', qa('¿Cómo puedo ir al banco?', 'Sigue todo recto y toma la segunda calle a la derecha. Gira a la izquierda.', '도시 지도를 보고 tú(반말) 명령형으로 길을 안내해요.') + frame([['Sigue', 'a'], ['todo recto', 'k'], ['y', 'k'], ['toma', 'a'], ['la segunda calle', 'n'], ['a la derecha.', 'n']])),
      sec('예시 — 🧍에서 은행까지', `<div class="ex wide">${SP.cityMapSvg({ start: 2, route: r, hi: 'banco', showNums: true })}<p class="sample" lang="es">${esc(r.text)} ${say(r.text)}</p></div>` + tip('🧍에서 위로 올라가며 가로 길을 세요: 첫 번째 길 = <b>la primera calle</b>. 도착한 길에서 장소가 <b>왼쪽/오른쪽</b>에 보이면 "está a la izquierda/derecha".')),
      sec('al / a la', `<table class="tbl"><tr><th>남성</th><th>여성</th></tr><tr><td lang="es">¿Cómo puedo ir <b>al</b> banco? (a + el = al)</td><td lang="es">¿Cómo puedo ir <b>a la</b> farmacia?</td></tr></table>`),
      sec('지도 속 장소 36곳', `<div class="ex wide">${SP.cityMapSvg({ start: 2, showNums: true })}</div>`),
      sec('장소 어휘', grid(SP.PLACES.map(p => vcard(SP.ico(p.ic, 44), SP.def(p), p.ko, '¿Cómo puedo ir ' + SP.a_def(p) + '?')), 'small'))
    ].join('');
  };

  S[11] = () => {
    const fixed = { L1: '2', L2: '3', T: 'Hidalgo', A: 'Cuatro Caminos', B: 'Universidad' };
    const s1 = SP.METRO['2'].st, s3 = SP.METRO['3'].st;
    const iA = s1.indexOf('Allende'), i1 = s1.indexOf('Hidalgo'), i2 = s3.indexOf('Hidalgo'), iB = s3.indexOf('Centro Médico');
    return [
      sec('이 문제는 이렇게 나와요', qa('¿Cómo puedo ir a la estación Franklin?', 'Toma la línea 5 en la estación Del Sol, en dirección Monte Tabor y baja en Santa Ana. Allí cambia a la línea 2 en dirección La Cisterna y baja en la cuarta parada.', '지하철 노선도를 보고 환승 경로를 설명해요.') +
        `<div class="metroframe"><div class="seg-line"><span class="seg a">Toma la línea 5</span><span class="seg n">en la estación Del Sol,</span><span class="seg k">en dirección Monte Tabor</span><span class="seg n">y baja en Santa Ana.</span></div><div class="seg-line"><span class="seg a">Allí cambia a la línea 2</span><span class="seg k">en dirección La Cisterna</span><span class="seg n">y baja en la cuarta parada.</span></div></div>` + tip('<b>dirección</b> 뒤에는 가는 방향의 <b>종착역 이름</b>을 써요. <b>baja en la cuarta parada</b> = 네 번째 정거장에서 내려요. parada(여성) → primera, segunda, tercera, cuarta …')),
      sec('핵심 어휘', grid([['la línea', '노선'], ['la estación', '역'], ['la parada', '정거장'], ['en dirección …', '~ 방향으로'], ['tomar', '타다'], ['bajar(se)', '내리다'], ['cambiar a …', '~로 갈아타다'], ['allí', '거기서'], ['el transbordo', '환승']].map(x => vcard('', x[0], x[1])), 'small')),
      sec('서수 (여성형)', grid([...Array(12)].map((_, i) => vcard(`<span class="bignum">${i + 1}ª</span>`, SP.ordF(i + 1), '', 'la ' + SP.ordF(i + 1) + ' parada')), 'small')),
      sec('연습 노선도 — Ciudad de México', `<div class="ex wide"><div class="strips"><div class="strip-title">🚇 Línea 2</div><div class="stripwrap" data-scroll="${iA}">${SP.metroStripSvg('2', iA, i1, { marks: { [iA]: '🧍', [i1]: '🔁' } })}</div><div class="strip-title">🚇 Línea 3</div><div class="stripwrap" data-scroll="${i2}">${SP.metroStripSvg('3', i2, iB, { marks: { [i2]: '🔁', [iB]: '🏁' } })}</div></div><p class="sample" lang="es">Toma la línea 2 en la estación Allende, en dirección Cuatro Caminos, y baja en Hidalgo. Allí cambia a la línea 3 en dirección Universidad y baja en la ${SP.ordF(Math.abs(iB - i2))} parada. ${say('Toma la línea 2 en la estación Allende, en dirección Cuatro Caminos, y baja en Hidalgo. Allí cambia a la línea 3 en dirección Universidad y baja en la ' + SP.ordF(Math.abs(iB - i2)) + ' parada.')}</p></div>`),
      sec('모든 노선 (Metro de la Ciudad de México)', SP.metroLines.map(l => `<div class="strip-title">🚇 Línea ${l} <small>${esc(SP.METRO[l].st[0])} ⇄ ${esc(SP.METRO[l].st[SP.METRO[l].st.length - 1])}</small></div><div class="stripwrap">${SP.metroStripSvg(l, -1, -1, {})}</div>`).join('') + tip('● 흰 원 = 다른 노선으로 갈아탈 수 있는 환승역이에요. 수행평가 지도에 나온 실제 노선 정보를 단순화했어요.'))
    ].join('');
  };

  S[12] = () => [
    sec('이 문제는 이렇게 나와요', qa('¿Nueva York tiene un monumento famoso? ¿Cómo se llama?', 'Sí, se llama Estatua de la Libertad.', '도시의 유명한 장소(monumento, museo, parque, río …)를 말해요.') + frame([['Sí,', 'k'], ['se llama', 'a'], ['Estatua de la Libertad.', 'n']]) + tip('<b>un monumento famoso / un museo famoso / un parque famoso / un río famoso</b> (남성) · <b>una plaza famosa / una calle famosa</b> (여성)')),
    ...Object.keys(SP.MONU).map(c => sec(`📍 ${c}`, grid(SP.MONU[c].map(m => vcard(`<span class="bigemoji">${m.ic}</span>`, m.name, m.kind, `Sí, se llama ${m.name}`)), 'small')))
  ].join('');

  S[13] = () => {
    const dirs = [['el norte', '북'], ['el sur', '남'], ['el este', '동'], ['el oeste', '서'], ['el noreste', '북동'], ['el noroeste', '북서'], ['el sureste', '남동'], ['el suroeste', '남서'], ['el centro', '중앙']];
    const table = key => SP.geoCountries(key).filter(c => c.es !== 'Rusia').map(c => { const w = SP.geoWhere(key, c.es); const nb = w.nbs[0]; return `<tr><td><b>${esc(c.es)}</b></td><td lang="es">Está en el ${w.reg.label} de ${w.cont}${nb ? `, al ${nb.d} de ${esc(nb.n)}` : ''}. ${say(`${c.es} está en el ${w.reg.label} de ${w.cont}${nb ? `, al ${nb.d} de ${nb.n}` : ''}.`)}</td></tr>`; }).join('');
    return [
      sec('이 문제는 이렇게 나와요', qa('¿Dónde está Colombia?', 'Está en el norte de Sudamérica, al noreste de Ecuador.', 'PPT 지도를 보고 나라의 위치를 말해요.') + frame([['Está en', 'k'], ['el norte', 'a'], ['de Sudamérica,', 'n'], ['al noreste', 'a'], ['de Ecuador.', 'n']])),
      sec('방위', grid(dirs.map(d => vcard('', d[0], d[1], d[0].replace('el ', ''))), 'small') + `<div class="compass-row">${tip('<b>en el</b> norte de … (대륙 안에서의 위치) / <b>al</b> noreste <b>de</b> … (다른 나라를 기준으로 한 방향)')}</div>`),
      sec('Sudamérica', `<div class="ex wide">${SP.geoMapSvg('sa', { compass: true })}</div><details class="more"><summary>나라별 예문 보기</summary><table class="tbl">${table('sa')}</table></details>`),
      sec('Asia', `<div class="ex wide">${SP.geoMapSvg('as', { compass: true })}</div><p class="muted">※ 러시아(Rusia)는 지도 위쪽, 일본(Japón)은 오른쪽에 있어요.</p><details class="more"><summary>나라별 예문 보기</summary><table class="tbl">${table('as')}</table></details>`)
    ].join('');
  };

  S[14] = () => {
    const pp = SP.popPhrase;
    return [
      sec('이 문제는 이렇게 나와요', qa('¿Cuántos habitantes tiene La Paz? (877.363)', 'Tiene casi novecientos mil habitantes.', '큰 숫자는 어림해서 "casi(거의) / más de(~ 넘게) / unos(약)"로 말할 수 있어요.') + frame([['Tiene', 'k'], ['casi', 'a'], ['novecientos mil', 'n'], ['habitantes.', 'k']])),
      sec('어림 표현', `<table class="tbl"><tr><th>표현</th><th>쓰는 때</th><th>예</th></tr><tr><td lang="es"><b>casi</b></td><td>조금 모자랄 때</td><td lang="es">877.363 → casi novecientos mil</td></tr><tr><td lang="es"><b>más de</b></td><td>조금 넘을 때</td><td lang="es">525.294 → más de quinientos mil</td></tr><tr><td lang="es"><b>unos / aproximadamente</b></td><td>거의 같을 때</td><td lang="es">400.000 → unos cuatrocientos mil</td></tr></table>`),
      sec('큰 숫자 읽기', `<table class="tbl nums">${[[100, 'cien'], [101, 'ciento uno'], [200, 'doscientos'], [500, 'quinientos'], [700, 'setecientos'], [900, 'novecientos'], [1000, 'mil'], [2000, 'dos mil'], [21000, 'veintiún mil'], [100000, 'cien mil'], [877363, null], [1000000, 'un millón'], [2500000, null]].map(r => { const w = r[1] || SP.numWords(r[0]); return `<tr><td class="num">${SP.fmt(r[0])}</td><td lang="es">${esc(w)} ${say(w)}</td></tr>`; }).join('')}</table>${tip('<b>mil</b>은 복수형이 없어요 (dos mil). <b>millón</b>은 복수형 <b>millones</b> (dos millones). 숫자 읽기에서 <b>y</b>는 30~99의 십·일 사이에만! (treinta y cinco)')}`),
      sec('도시별 인구 (연습용 근사값)', `<table class="tbl">${SP.POP.map(([c, n]) => { const t = pp ? pp(n).text : ''; return `<tr><td><b>${esc(c)}</b></td><td class="num">${SP.fmt(n)}</td><td lang="es">${esc(t)} ${say(t)}</td></tr>`; }).join('')}</table>`)
    ].join('');
  };

  S[15] = () => [
    sec('이 문제는 이렇게 나와요', qa('¿De qué parte de Corea eres?', 'Soy de Andong.', '내 고향(도시)을 말해요. 위치까지 덧붙이면 더 좋아요!') + frame([['Soy de', 'a'], ['Andong,', 'n'], ['en el este', 'a'], ['de Corea.', 'k']]) + tip('<b>ser de + 장소</b> = ~ 출신이다. (Soy de Busan.) <b>vivir en + 장소</b> = ~에 산다. (Vivo en Dongtan.)')),
    sec('한국 지도', `<div class="ex wide narrow">${SP.krMapSvg({})}</div><p class="muted">🟢 Dongtan(동탄)은 초록 점으로 표시했어요.</p>`),
    sec('도시별 문장', `<table class="tbl">${GEO.kr.cities.map(c => { const t = `Soy de ${c.es}, en el ${SP.krRegion(c)} de Corea.`; return `<tr><td><b>${esc(c.es)}</b></td><td lang="es">${esc(t)} ${say(t)}</td></tr>`; }).join('')}</table>`)
  ].join('');

  S[16] = () => [
    sec('이 문제는 이렇게 나와요', qa('¿Cómo es Dongtan?', 'Dongtan es una ciudad pequeña y moderna. No es una ciudad turística.', '도시의 특징을 형용사로 말해요. ciudad는 여성명사!') + frame([['Dongtan', 'n'], ['es', 'k'], ['una ciudad', 'k'], ['pequeña', 'a'], ['y', 'k'], ['moderna.', 'a']]) + tip('부정문: <b>No es una ciudad turística.</b> (관광 도시가 아니에요) · 긍정문: <b>Es una ciudad turística.</b>')),
    sec('도시 묘사 형용사 (여성형)', grid(['pequeno', 'grande', 'enorme', 'moderno', 'antiguo', 'tranquilo', 'ruidoso', 'bonito', 'animado', 'limpio', 'turistico', 'famoso', 'historico'].map(k => { const A = SP.ADJ[k]; return vcard('', A.f, A.ko + (A.opp ? ' ↔ ' + SP.ADJ[A.opp].f : ''), A.f); }), 'small')),
    sec('도시 예문', `<div class="cardlist">${SP.CITY_DESC.map(c => { const t = `${c.n} es una ciudad ${SP.joinY(c.adj.map(k => SP.ADJ[k].f))}. ${c.tur ? 'Es una ciudad turística.' : 'No es una ciudad turística.'}`; return `<div class="cityex"><b>📍 ${esc(c.n)}</b><p lang="es">${esc(t)} ${say(t)}</p></div>`; }).join('')}</div>`)
  ].join('');

  SP.STUDY = S;
})(window);
