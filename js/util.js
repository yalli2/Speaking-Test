/* Utilidades generales: azar, normalización, números, ordinales */
(function (g) {
  const SP = g.SP = g.SP || {};

  SP.rand = n => Math.floor(Math.random() * n);
  SP.between = (a, b) => a + SP.rand(b - a + 1);
  SP.pick = a => a[SP.rand(a.length)];
  SP.shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = SP.rand(i + 1);[a[i], a[j]] = [a[j], a[i]]; } return a; };
  SP.sample = (a, n) => SP.shuffle(a).slice(0, n);
  SP.cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  SP.esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* texto sin acentos ni puntuación (para comparar) */
  SP.norm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[¿?¡!.,;:()"“”«»·\-–—]/g, ' ').replace(/\s+/g, ' ').trim();
  /* texto con acentos, sin puntuación */
  SP.lowp = s => String(s).toLowerCase().normalize('NFC').replace(/[¿?¡!.,;:()"“”«»·]/g, ' ').replace(/\s+/g, ' ').trim();

  SP.lev = (a, b) => {
    const m = a.length, n = b.length; if (!m) return n; if (!n) return m;
    let prev = Array.from({ length: n + 1 }, (_, j) => j);
    for (let i = 1; i <= m; i++) {
      const cur = [i];
      for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = cur;
    }
    return prev[n];
  };

  /* ¿el texto contiene la frase (sin acentos, por palabras completas)? */
  SP.has = (text, phrase) => {
    const t = ' ' + SP.norm(text) + ' ', p = ' ' + SP.norm(phrase) + ' ';
    return t.includes(p);
  };

  /* comparar con respuestas aceptadas */
  SP.matchAny = (text, answers) => {
    const t = SP.norm(text);
    if (!t) return { ok: false, near: false, accent: false };
    let near = false;
    for (const a of answers) {
      const n = SP.norm(a);
      if (n === t) return { ok: true, near: false, accent: SP.lowp(a) !== SP.lowp(text) };
      if (SP.lev(n, t) <= Math.max(1, Math.floor(n.length / 12))) near = true;
    }
    return { ok: false, near, accent: false };
  };

  /* ---------- números en español ---------- */
  const U = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte', 'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve'];
  const T = ['', '', '', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
  const H = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];
  const apo = s => s.replace(/veintiuno$/, 'veintiún').replace(/uno$/, 'un');
  function b100(n) { if (n < 30) return U[n]; const t = Math.floor(n / 10), u = n % 10; return T[t] + (u ? ' y ' + U[u] : ''); }
  function b1000(n) {
    if (n === 100) return 'cien';
    const h = Math.floor(n / 100), r = n % 100;
    return [h ? H[h] : '', r ? b100(r) : ''].filter(Boolean).join(' ');
  }
  SP.numWords = function (n) {
    if (n === 0) return 'cero';
    const parts = [];
    const mill = Math.floor(n / 1e6), mil = Math.floor((n % 1e6) / 1000), r = n % 1000;
    if (mill) parts.push(mill === 1 ? 'un millón' : apo(SP.numWords(mill)) + ' millones');
    if (mil) parts.push(mil === 1 ? 'mil' : apo(b1000(mil)) + ' mil');
    if (r) parts.push(b1000(r));
    return parts.join(' ');
  };
  /* números formateados al estilo español: 877.363 */
  SP.fmt = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  const ORD = ['', 'primera', 'segunda', 'tercera', 'cuarta', 'quinta', 'sexta', 'séptima', 'octava', 'novena', 'décima', 'undécima', 'duodécima', 'decimotercera', 'decimocuarta', 'decimoquinta'];
  SP.ordF = n => ORD[n] || ('número ' + n);
  SP.ordM = n => SP.ordF(n).replace(/a$/, 'o').replace('tercero', 'tercero');

  /* artículos */
  SP.indef = it => (it.g === 'm' ? 'un ' : 'una ') + it.es;
  SP.def = it => (it.g === 'm' ? 'el ' : 'la ') + it.es;
  SP.a_def = it => (it.g === 'm' ? 'al ' : 'a la ') + it.es;
  SP.joinY = arr => arr.length <= 1 ? (arr[0] || '') : arr.slice(0, -1).join(', ') + ' y ' + arr[arr.length - 1];

  /* progreso (localStorage, con try/catch) */
  SP.store = {
    get(k, d) { try { const v = localStorage.getItem('sp_' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('sp_' + k, JSON.stringify(v)); } catch (e) { } }
  };
})(typeof window !== 'undefined' ? window : globalThis);
