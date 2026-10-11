/* Dibujos SVG: iconos, habitaciones, casa, plano, mapa de la ciudad, metro, mapas geográficos */
(function (g) {
  const SP = g.SP;

  /* ---------- iconos SVG propios (64×64) ---------- */
  const S = '#4b5a6a';
  SP.SVGICON = {
    mesa: `<rect x="5" y="20" width="54" height="9" rx="2" fill="#c8935f" stroke="#7a5230" stroke-width="2"/><rect x="10" y="29" width="5" height="26" fill="#a9754a" stroke="#7a5230" stroke-width="1.5"/><rect x="49" y="29" width="5" height="26" fill="#a9754a" stroke="#7a5230" stroke-width="1.5"/>`,
    lavadora: `<rect x="10" y="5" width="44" height="54" rx="5" fill="#eef2f6" stroke="${S}" stroke-width="2"/><rect x="14" y="9" width="16" height="6" rx="2" fill="#c3ced9"/><circle cx="43" cy="12" r="2.6" fill="#c8452d"/><circle cx="32" cy="38" r="15" fill="#aac9e6" stroke="${S}" stroke-width="2"/><circle cx="32" cy="38" r="9" fill="#dbeafe" stroke="${S}" stroke-width="1.5"/>`,
    cocina_gas: `<rect x="8" y="6" width="48" height="52" rx="4" fill="#eef1f4" stroke="${S}" stroke-width="2"/><rect x="8" y="6" width="48" height="22" rx="4" fill="#dfe5ea" stroke="${S}" stroke-width="2"/><circle cx="21" cy="14" r="5.5" fill="#444"/><circle cx="43" cy="14" r="5.5" fill="#444"/><circle cx="21" cy="14" r="2" fill="#f39c12"/><circle cx="43" cy="14" r="2" fill="#f39c12"/><rect x="14" y="34" width="36" height="18" rx="2" fill="#7f8c99" stroke="${S}" stroke-width="1.5"/><rect x="20" y="31" width="24" height="3" rx="1.5" fill="${S}"/><circle cx="20" cy="24" r="1.6" fill="${S}"/><circle cx="32" cy="24" r="1.6" fill="${S}"/><circle cx="44" cy="24" r="1.6" fill="${S}"/>`,
    nevera: `<rect x="14" y="3" width="36" height="58" rx="5" fill="#eaf1f7" stroke="${S}" stroke-width="2"/><line x1="14" y1="24" x2="50" y2="24" stroke="${S}" stroke-width="2"/><rect x="42" y="9" width="3" height="10" rx="1.5" fill="${S}"/><rect x="42" y="30" width="3" height="16" rx="1.5" fill="${S}"/>`,
    microondas: `<rect x="4" y="16" width="56" height="34" rx="4" fill="#e9edf1" stroke="${S}" stroke-width="2"/><rect x="9" y="21" width="32" height="24" rx="3" fill="#2f3b47"/><rect x="12" y="24" width="26" height="18" rx="2" fill="#6f8aa0" opacity=".6"/><circle cx="51" cy="26" r="3" fill="#c3ced9" stroke="${S}"/><circle cx="51" cy="37" r="3" fill="#c3ced9" stroke="${S}"/>`,
    armario: `<rect x="8" y="4" width="48" height="56" rx="3" fill="#c79a6b" stroke="#7a5230" stroke-width="2"/><line x1="32" y1="4" x2="32" y2="60" stroke="#7a5230" stroke-width="2"/><rect x="12" y="9" width="16" height="42" rx="1.5" fill="#d8b085" stroke="#7a5230" stroke-width="1"/><rect x="36" y="9" width="16" height="42" rx="1.5" fill="#d8b085" stroke="#7a5230" stroke-width="1"/><circle cx="28" cy="32" r="1.8" fill="#5a3a1c"/><circle cx="36" cy="32" r="1.8" fill="#5a3a1c"/><rect x="10" y="60" width="6" height="3" fill="#7a5230"/><rect x="48" y="60" width="6" height="3" fill="#7a5230"/>`,
    escritorio: `<rect x="4" y="18" width="56" height="8" rx="2" fill="#c8935f" stroke="#7a5230" stroke-width="2"/><rect x="8" y="26" width="4" height="30" fill="#a9754a" stroke="#7a5230" stroke-width="1.5"/><rect x="38" y="26" width="18" height="26" rx="1.5" fill="#d8b085" stroke="#7a5230" stroke-width="1.5"/><line x1="38" y1="39" x2="56" y2="39" stroke="#7a5230" stroke-width="1.5"/><circle cx="47" cy="32" r="1.5" fill="#5a3a1c"/><circle cx="47" cy="45" r="1.5" fill="#5a3a1c"/><rect x="14" y="8" width="16" height="10" rx="1" fill="#fff" stroke="${S}"/>`,
    alfombra: `<rect x="6" y="22" width="52" height="24" rx="3" fill="#c8452d" stroke="#8c2c1a" stroke-width="2"/><rect x="11" y="27" width="42" height="14" rx="2" fill="none" stroke="#f3d9a4" stroke-width="2"/><circle cx="32" cy="34" r="4" fill="#f3d9a4"/>`,
    estanteria: `<rect x="8" y="4" width="48" height="56" rx="2" fill="#c79a6b" stroke="#7a5230" stroke-width="2"/><line x1="8" y1="22" x2="56" y2="22" stroke="#7a5230" stroke-width="2"/><line x1="8" y1="41" x2="56" y2="41" stroke="#7a5230" stroke-width="2"/><rect x="12" y="9" width="5" height="13" fill="#c8452d"/><rect x="18" y="11" width="5" height="11" fill="#2f6f9f"/><rect x="24" y="8" width="5" height="14" fill="#e0a526"/><rect x="40" y="10" width="6" height="12" fill="#3f8f5a"/><rect x="13" y="30" width="7" height="11" fill="#7b4b9a"/><rect x="36" y="28" width="12" height="13" fill="#e6a6a6"/><rect x="14" y="48" width="14" height="12" fill="#2f6f9f"/>`,
    lavabo: `<rect x="10" y="26" width="44" height="12" rx="3" fill="#eef2f6" stroke="${S}" stroke-width="2"/><path d="M14 38 Q32 56 50 38" fill="#dfe8f0" stroke="${S}" stroke-width="2"/><rect x="29" y="12" width="6" height="14" rx="2" fill="#aab6c2" stroke="${S}" stroke-width="1.5"/><path d="M29 14 H40" stroke="${S}" stroke-width="3" stroke-linecap="round"/><path d="M26 54 V60 M38 54 V60" stroke="${S}" stroke-width="3"/>`
  };

  SP.ico = function (ic, size) {
    size = size || 48;
    if (ic && ic.indexOf('svg:') === 0) return `<svg class="ico" viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">${SP.SVGICON[ic.slice(4)]}</svg>`;
    return `<span class="ico emo" style="font-size:${Math.round(size * .78)}px;width:${size}px;height:${size}px" aria-hidden="true">${ic}</span>`;
  };
  SP.icoSvg = function (ic, x, y, size) {
    if (ic.indexOf('svg:') === 0) return `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 64 64">${SP.SVGICON[ic.slice(4)]}</svg>`;
    return `<text x="${x + size / 2}" y="${y + size * .82}" font-size="${size * .8}" text-anchor="middle" class="emo">${ic}</text>`;
  };

  /* ---------- escena de una habitación ---------- */
  SP.roomScene = function (room, entries, opt) {
    opt = opt || {};
    const W = 520, H = 300;
    const slots = [];
    entries.forEach(e => { for (let i = 0; i < e.n; i++) slots.push(e.id); });
    const total = slots.length;
    const cols = total <= 4 ? total : Math.ceil(total / 2);
    const rows = total <= 4 ? 1 : 2;
    const size = rows === 1 ? (total <= 2 ? 100 : 84) : (cols > 4 ? 62 : 70);
    let s = `<svg class="scene" viewBox="0 0 ${W} ${H}" role="img" aria-label="${SP.esc(room.es)}">`;
    const wallH = 176;
    if (room.theme === 'out') {
      s += `<rect width="${W}" height="${H}" fill="#cfe8f7"/><circle cx="450" cy="50" r="28" fill="#ffd54a"/><ellipse cx="120" cy="50" rx="50" ry="16" fill="#fff" opacity=".9"/><ellipse cx="160" cy="42" rx="34" ry="14" fill="#fff" opacity=".9"/><rect y="${wallH - 20}" width="${W}" height="${H - wallH + 20}" fill="${room.floor}"/>`;
      for (let i = 0; i < 14; i++) s += `<rect x="${i * 40 + 6}" y="${wallH - 46}" width="8" height="40" fill="#fff" stroke="#c9c9c9"/>`;
      s += `<rect y="${wallH - 36}" width="${W}" height="6" fill="#fff" stroke="#c9c9c9"/>`;
    } else if (room.theme === 'garage') {
      s += `<rect width="${W}" height="${wallH}" fill="${room.wall}"/><rect x="120" y="18" width="280" height="150" rx="4" fill="#eceff2" stroke="#9aa3ad" stroke-width="3"/>`;
      for (let i = 1; i < 6; i++) s += `<line x1="120" y1="${18 + i * 25}" x2="400" y2="${18 + i * 25}" stroke="#9aa3ad" stroke-width="2"/>`;
      s += `<rect y="${wallH}" width="${W}" height="${H - wallH}" fill="${room.floor}"/>`;
    } else {
      s += `<rect width="${W}" height="${wallH}" fill="${room.wall}"/><rect y="${wallH}" width="${W}" height="${H - wallH}" fill="${room.floor}"/><rect y="${wallH - 6}" width="${W}" height="8" fill="rgba(0,0,0,.12)"/>`;
      for (let i = 1; i < 9; i++) s += `<line x1="${i * 58}" y1="${wallH}" x2="${i * 58 + (i - 4.5) * 20}" y2="${H}" stroke="rgba(0,0,0,.07)" stroke-width="2"/>`;
      s += `<rect x="26" y="26" width="104" height="86" rx="3" fill="#bfe3ff" stroke="#fff" stroke-width="6"/><line x1="78" y1="26" x2="78" y2="112" stroke="#fff" stroke-width="4"/><line x1="26" y1="69" x2="130" y2="69" stroke="#fff" stroke-width="4"/>`;
      s += `<rect x="420" y="30" width="62" height="46" rx="2" fill="#f7f1e8" stroke="#8b6b4a" stroke-width="4"/><path d="M426 70 L444 50 L458 62 L468 54 L478 70Z" fill="#8fbf8a"/><circle cx="466" cy="42" r="4" fill="#f3c34f"/>`;
    }
    const gapX = (W - 60) / Math.max(cols, 1);
    const order = SP.shuffle(slots.map((id, i) => i));
    slots.forEach((id, i) => {
      const r = Math.floor(i / cols), c = i % cols;
      const itemsInRow = r === rows - 1 ? total - r * cols : cols;
      const gx = (W - 60) / itemsInRow;
      const cx = 30 + gx * (c + .5);
      const base = rows === 1 ? 246 : (r === 0 ? 212 : 278);
      s += `<ellipse cx="${cx}" cy="${base - 2}" rx="${size * .42}" ry="${size * .09}" fill="rgba(0,0,0,.16)"/>`;
      s += SP.icoSvg(SP.OBJ[id].ic, cx - size / 2, base - size, size);
      if (opt.labels) s += `<text x="${cx}" y="${base + 13}" text-anchor="middle" class="lbl">${SP.esc(SP.OBJ[id].es)}</text>`;
    });
    return s + '</svg>';
  };

  /* escena aleatoria para una habitación: devuelve {svg, entries} */
  SP.randomRoomScene = function (room, nItems, opt) {
    const ids = SP.sample(room.items, Math.min(nItems, room.items.length));
    const entries = ids.map(id => ({ id, n: (id === 'silla' ? SP.between(1, 4) : 1) }));
    return { entries, svg: SP.roomScene(room, entries, opt) };
  };

  /* ---------- plano de la casa (¿cuántas habitaciones?) ---------- */
  SP.floorPlan = function (n) {
    const icons = ['🛏️', '🛋️', '🍳', '🚿', '🛏️', '🍽️', '💻', '🛏️'];
    const tints = ['#f6e7d4', '#e4eef7', '#e8f2e4', '#f3e3ee', '#f7efc9', '#e3e9f7', '#f4e1da', '#e0f0ef'];
    const cols = n <= 3 ? n : (n === 4 ? 2 : 3), rows = Math.ceil(n / cols);
    const cw = 140, ch = 100, W = cols * cw + 40, H = rows * ch + 56;
    let s = `<svg class="scene" viewBox="0 0 ${W} ${H}" role="img" aria-label="plano">`;
    s += `<polygon points="10,40 ${W / 2},6 ${W - 10},40" fill="#c8452d"/><rect x="14" y="40" width="${W - 28}" height="${H - 48}" fill="#fff" stroke="#34404d" stroke-width="4"/>`;
    for (let i = 0; i < n; i++) {
      const r = Math.floor(i / cols), c = i % cols;
      const x = 20 + c * cw, y = 48 + r * ch;
      s += `<rect x="${x}" y="${y}" width="${cw}" height="${ch - 4}" fill="${tints[i % 8]}" stroke="#34404d" stroke-width="2.5"/><text x="${x + cw / 2}" y="${y + ch / 2 + 14}" font-size="40" text-anchor="middle" class="emo">${icons[i % 8]}</text>`;
    }
    return s + '</svg>';
  };

  /* ---------- casa (¿Cómo es tu casa?) ---------- */
  SP.houseSvg = function (o) {
    const k = o.big ? 1 : .62, W = 520, H = 280, bright = o.bright;
    const bw = 250 * k, bh = 120 * k, x0 = (W - bw) / 2, y0 = 235 - bh;
    let s = `<svg class="scene" viewBox="0 0 ${W} ${H}" role="img" aria-label="casa">`;
    s += `<rect width="${W}" height="${H}" fill="${bright ? '#bfe3ff' : '#25304a'}"/>`;
    if (bright) s += `<circle cx="450" cy="46" r="${26}" fill="#ffd54a"/>` + [...Array(8)].map((_, i) => { const a = i * Math.PI / 4; return `<line x1="${450 + Math.cos(a) * 34}" y1="${46 + Math.sin(a) * 34}" x2="${450 + Math.cos(a) * 46}" y2="${46 + Math.sin(a) * 46}" stroke="#ffd54a" stroke-width="4" stroke-linecap="round"/>`; }).join('');
    else s += `<circle cx="450" cy="50" r="22" fill="#f4f1c9"/><circle cx="460" cy="44" r="20" fill="#25304a"/>` + [[60, 40], [140, 70], [260, 30], [340, 60], [90, 110]].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="2" fill="#fff"/>`).join('');
    s += `<rect y="235" width="${W}" height="${H - 235}" fill="${bright ? '#8fcf7a' : '#2f5a3b'}"/>`;
    const wall = o.modern ? (bright ? '#f4f6f8' : '#9aa5b3') : (bright ? '#e6c49a' : '#a58763');
    s += `<rect x="${x0}" y="${y0}" width="${bw}" height="${bh}" fill="${wall}" stroke="#34404d" stroke-width="3"/>`;
    if (o.modern) s += `<rect x="${x0 - 8}" y="${y0 - 14 * k}" width="${bw + 16}" height="${14 * k}" fill="#3b4652"/>`;
    else s += `<polygon points="${x0 - 14},${y0} ${x0 + bw / 2},${y0 - 62 * k} ${x0 + bw + 14},${y0}" fill="${bright ? '#b5533c' : '#6d3a2e'}" stroke="#34404d" stroke-width="3"/>`;
    const win = bright ? '#fff3b0' : '#1a2234';
    const wf = o.modern ? { w: 70 * k, h: 70 * k } : { w: 36 * k, h: 44 * k };
    const wy = y0 + 18 * k;
    [x0 + 22 * k, x0 + bw - 22 * k - wf.w].forEach(wx => {
      s += `<rect x="${wx}" y="${wy}" width="${wf.w}" height="${wf.h}" fill="${win}" stroke="#34404d" stroke-width="3"/>`;
      if (!o.modern) s += `<line x1="${wx + wf.w / 2}" y1="${wy}" x2="${wx + wf.w / 2}" y2="${wy + wf.h}" stroke="#34404d" stroke-width="2"/><rect x="${wx - 8 * k}" y="${wy}" width="${8 * k}" height="${wf.h}" fill="#4f7a5a"/><rect x="${wx + wf.w}" y="${wy}" width="${8 * k}" height="${wf.h}" fill="#4f7a5a"/>`;
      else s += `<line x1="${wx}" y1="${wy + wf.h * .5}" x2="${wx + wf.w}" y2="${wy + wf.h * .5}" stroke="#34404d" stroke-width="2"/>`;
    });
    s += `<rect x="${W / 2 - 14 * k}" y="${235 - 50 * k}" width="${28 * k}" height="${50 * k}" fill="${o.modern ? '#34404d' : '#7a5230'}" stroke="#34404d" stroke-width="2"/>`;
    return s + '</svg>';
  };

  /* ---------- distancia (pregunta 7) ---------- */
  SP.distanceSvg = function (placeIc, meters) {
    const W = 520, H = 170, x1 = 70, x2 = 440;
    const frac = Math.min(1, Math.max(.06, Math.log10(meters + 1) / Math.log10(1201)));
    const px = x1 + (x2 - x1) * frac;
    let s = `<svg class="scene" viewBox="0 0 ${W} ${H}" role="img" aria-label="distancia"><rect width="${W}" height="${H}" fill="#eef4f8"/><rect y="92" width="${W}" height="34" fill="#9aa5b0"/><line x1="0" y1="109" x2="${W}" y2="109" stroke="#fff" stroke-width="3" stroke-dasharray="18 12"/>`;
    s += `<text x="${x1}" y="86" font-size="40" text-anchor="middle" class="emo">🧍</text><text x="${x1}" y="146" font-size="12" text-anchor="middle" class="lbl">Tú estás aquí</text>`;
    s += `<text x="${px}" y="86" font-size="46" text-anchor="middle" class="emo">${placeIc}</text>`;
    s += `<line x1="${x1}" y1="30" x2="${px}" y2="30" stroke="#c8452d" stroke-width="3"/><line x1="${x1}" y1="22" x2="${x1}" y2="38" stroke="#c8452d" stroke-width="3"/><line x1="${px}" y1="22" x2="${px}" y2="38" stroke="#c8452d" stroke-width="3"/>`;
    s += `<text x="${(x1 + px) / 2}" y="20" font-size="15" font-weight="700" text-anchor="middle" fill="#c8452d">${SP.fmt(meters)} m</text>`;
    s += `<text x="${(x1 + px) / 2}" y="52" font-size="12" text-anchor="middle" fill="#34404d">≈ ${Math.max(1, Math.round(meters / 80))} min a pie 🚶</text>`;
    return s + '</svg>';
  };

  /* ---------- mapa de la ciudad (cuadrícula) ---------- */
  const CG = { vw: 36, bw: 206, bh: 100, top: 8, left: 8 };
  const xs = i => CG.left + i * (CG.bw + CG.vw);              // borde izq. de la calle vertical i
  const xc = i => xs(i) + CG.vw / 2;
  const ys = k => CG.top + (4 - k) * (CG.bh + CG.vw);          // borde sup. de la calle horizontal k (1..4)
  const yc = k => ys(k) + CG.vw / 2;
  SP.cityGeom = { xs, xc, ys, yc, CG, W: CG.left * 2 + 4 * (CG.bw + CG.vw) + CG.vw, H: 560 };

  SP.cityFind = function (id) {
    for (const r of [1, 2, 3]) for (let c = 0; c < 4; c++) { const i = SP.LAYOUT[r][c].indexOf(id); if (i >= 0) return { r, c, i }; }
    return null;
  };

  SP.cityMapSvg = function (o) {
    o = o || {};
    const G = SP.cityGeom, W = G.W, H = G.H;
    let s = `<svg class="citymap" viewBox="0 0 ${W} ${H}" role="img" aria-label="mapa de la ciudad"><defs><marker id="arr" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#c8452d"/></marker></defs>`;
    s += `<rect width="${W}" height="${H}" fill="#eef1f4"/>`;
    // calles
    for (let i = 0; i < 5; i++) s += `<rect x="${xs(i)}" y="${CG.top}" width="${CG.vw}" height="${H - CG.top}" fill="#fff"/>`;
    for (let k = 1; k <= 4; k++) s += `<rect x="${CG.left}" y="${ys(k)}" width="${W - 2 * CG.left}" height="${CG.vw}" fill="#fff"/>`;
    for (let i = 0; i < 5; i++) s += `<line x1="${xc(i)}" y1="${CG.top}" x2="${xc(i)}" y2="${H}" stroke="#d6dbe1" stroke-width="2" stroke-dasharray="10 8"/>`;
    for (let k = 1; k <= 4; k++) s += `<line x1="${CG.left}" y1="${yc(k)}" x2="${W - CG.left}" y2="${yc(k)}" stroke="#d6dbe1" stroke-width="2" stroke-dasharray="10 8"/>`;
    // manzanas
    for (const r of [1, 2, 3]) for (let c = 0; c < 4; c++) {
      const bx = xs(c) + CG.vw, by = ys(r + 1) + CG.vw;
      s += `<rect x="${bx}" y="${by}" width="${CG.bw}" height="${CG.bh}" rx="10" fill="${(r + c) % 2 ? '#dfe7d6' : '#e6e3ee'}"/>`;
      SP.LAYOUT[r][c].forEach((id, i) => {
        const p = SP.place(id), tx = bx + 6 + i * 66, ty = by + CG.bh - 76;
        const hi = o.hi === id;
        s += `<g class="tile${o.click ? ' clickable' : ''}${hi ? ' hi' : ''}" data-id="${id}" transform="translate(${tx},${ty})"><rect width="64" height="70" rx="8" fill="${hi ? '#fff3c4' : '#fff'}" stroke="${hi ? '#c8452d' : '#cfd6dd'}" stroke-width="${hi ? 3 : 1.2}"/>`;
        s += `<text x="32" y="36" font-size="27" text-anchor="middle" class="emo">${p.ic}</text>`;
        if (!o.hideLabels) {
          const words = p.es.split(' ');
          const lines = words.length > 2 ? [words[0], words.slice(1).join(' ')] : (p.es.length > 12 && words.length > 1 ? words : [p.es]);
          lines.forEach((ln, j) => { s += `<text x="32" y="${51 + j * 9.5}" font-size="${ln.length > 10 ? 7.6 : 8.8}" text-anchor="middle" class="lbl">${SP.esc(ln)}</text>`; });
        }
        s += '</g>';
      });
    }
    for (let c = 0; c < 4; c++) s += `<rect x="${xs(c) + CG.vw}" y="${ys(1) + CG.vw}" width="${CG.bw}" height="${H - ys(1) - CG.vw - 4}" rx="10" fill="#dbe8cf"/><text x="${xs(c) + CG.vw + CG.bw / 2}" y="${ys(1) + CG.vw + 40}" font-size="26" text-anchor="middle" class="emo" opacity=".8">🌳 🌳 🌳</text>`;
    // inicio
    const st = o.start || 2;
    s += `<g transform="translate(${xc(st)},${H - 26})"><circle r="15" fill="#c8452d"/><text y="6" font-size="17" text-anchor="middle" class="emo">🧍</text></g><text x="${xc(st)}" y="${H - 4}" font-size="11" font-weight="700" text-anchor="middle" fill="#c8452d">Estás aquí</text>`;
    if (o.route) s += `<polyline points="${o.route.pts.map(p => p.join(',')).join(' ')}" fill="none" stroke="#c8452d" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2 9" marker-end="url(#arr)"/>`;
    if (o.showNums) for (let k = 1; k <= 3; k++) s += `<text x="${xc(0) + 2}" y="${yc(k) + 5}" font-size="14" font-weight="700" fill="#8a97a6" text-anchor="middle">${k}ª</text>`;
    return s + '</svg>';
  };

  /* ruta en la cuadrícula */
  SP.cityRoute = function (placeId, s, formal) {
    const f = SP.cityFind(placeId); if (!f) return null;
    const G = SP.cityGeom, p = SP.place(placeId);
    const west = f.c < s;
    const dir1 = west ? 'izquierda' : 'derecha';
    const side = west ? 'derecha' : 'izquierda';
    const passes = west ? s - 1 - f.c : f.c - s;
    const k = f.r;
    const V = formal ? { go: 'siga', take: 'tome', pass: 'pase', turn: 'gire' } : { go: 'sigue', take: 'toma', pass: 'pasa', turn: 'gira' };
    const t1 = `${SP.cap(V.go)} todo recto y ${V.take} la ${SP.ordF(k)} calle a la ${dir1}.`;
    const pass = passes === 1 ? 'la primera calle' : SP.numWords(passes) + ' calles';
    const t2 = passes === 0 ? `${SP.cap(SP.def(p))} está a la ${side}.` : `${SP.cap(V.go)} recto, ${V.pass} ${pass} y ${SP.def(p)} está a la ${side}.`;
    // puntos
    const targetBlockCenter = G.xs(f.c) + G.CG.vw + G.CG.bw / 2;
    const stopX = west ? Math.max(targetBlockCenter, 0) : targetBlockCenter;
    const pts = [[G.xc(s), G.CG.top + 560 - 50], [G.xc(s), G.yc(k)], [targetBlockCenter + (west ? 20 : -20), G.yc(k)]];
    return { k, dir1, side, passes, text: t1 + ' ' + t2, t1, t2, pts, place: p, s, f };
  };

  /* dónde está (descripción relativa) */
  SP.cityWhere = function (placeId) {
    const f = SP.cityFind(placeId), row = SP.LAYOUT[f.r][f.c];
    const nb = id => SP.def(SP.place(id));
    const nbS = id => SP.place(id).es;
    let text, need;
    if (f.i === 1) { text = `Está en la ${SP.ordF(f.r)} calle, entre ${nb(row[0])} y ${nb(row[2])}.`.replace(' entre el ', ' entre el ').replace(' y el ', ' y el '); need = [[nbS(row[0])], [nbS(row[2])]]; }
    else { const o = f.i === 0 ? row[1] : row[1]; text = `Está en la ${SP.ordF(f.r)} calle, al lado ${/^el /.test(nb(o)) ? 'del ' + nbS(o) : 'de ' + nb(o)}.`; need = [[nbS(o)]]; }
    return { text, need, ...f };
  };

  /* ---------- metro ---------- */
  const lineName = l => l;
  SP.metroLines = Object.keys(SP.METRO);
  const st2lines = {};
  SP.metroLines.forEach(l => SP.METRO[l].st.forEach(s => { (st2lines[s] = st2lines[s] || []).push(l); }));
  SP.metroTransfers = Object.keys(st2lines).filter(s => st2lines[s].length > 1);
  SP.metroStLines = st2lines;

  SP.metroRoute = function () {
    for (let t = 0; t < 400; t++) {
      const T = SP.pick(SP.metroTransfers);
      const ls = SP.shuffle(st2lines[T]);
      const L1 = ls[0], L2 = ls[1];
      const s1 = SP.METRO[L1].st, s2 = SP.METRO[L2].st;
      const i1 = s1.indexOf(T), i2 = s2.indexOf(T);
      const cand1 = s1.map((x, i) => i).filter(i => Math.abs(i - i1) >= 2 && Math.abs(i - i1) <= 9 && !st2lines[s1[i]].includes(L2));
      const cand2 = s2.map((x, i) => i).filter(i => Math.abs(i - i2) >= 2 && Math.abs(i - i2) <= 10 && !st2lines[s2[i]].includes(L1));
      if (!cand1.length || !cand2.length) continue;
      const iA = SP.pick(cand1), iB = SP.pick(cand2);
      const A = s1[iA], B = s2[iB], n = Math.abs(iB - i2);
      const term1 = iA < i1 ? s1[s1.length - 1] : s1[0], term2 = iB > i2 ? s2[s2.length - 1] : s2[0];
      const text = `Toma la línea ${L1} en la estación ${A}, en dirección ${term1}, y baja en ${T}. Allí cambia a la línea ${L2} en dirección ${term2} y baja en la ${n === 1 ? 'primera' : SP.ordF(n)} parada.`;
      return { L1, L2, A, B, T, n, term1, term2, iA, iB, i1, i2, text };
    }
  };

  const WORDNUM = { '1': ['uno', 'una'], '2': ['dos'], '3': ['tres'], '4': ['cuatro'], '5': ['cinco'], '6': ['seis'], '7': ['siete'], '8': ['ocho'], '9': ['nueve'], '12': ['doce'], 'B': ['be', 'b'] };
  SP.hasLine = (text, L) => {
    const alts = [L].concat(WORDNUM[L] || []);
    return alts.some(a => SP.has(text, 'linea ' + a));
  };
  SP.metroCheck = function (text, r) {
    const miss = [], got = [];
    const chk = (cond, label) => (cond ? got : miss).push(label);
    chk(SP.hasLine(text, r.L1), `línea ${r.L1}`);
    chk(SP.has(text, r.A), r.A);
    chk(SP.has(text, r.T), r.T);
    chk(SP.hasLine(text, r.L2), `línea ${r.L2}`);
    const fin = SP.has(text, r.B) || SP.has(text, SP.ordF(r.n) + ' parada') || (r.n === 1 && SP.has(text, 'primera parada')) || SP.has(text, r.n + ' paradas');
    chk(fin, `parada final (${SP.ordF(r.n)} parada / ${r.B})`);
    const ordered = SP.norm(text).indexOf(SP.norm(r.A)) <= SP.norm(text).indexOf(SP.norm(r.T));
    return { ok: miss.length === 0 && ordered, got, miss, ordered };
  };

  SP.metroStripSvg = function (line, from, to, opt) {
    opt = opt || {};
    const st = SP.METRO[line].st, col = SP.METRO[line].color;
    const step = 62, W = st.length * step + 30, H = 150;
    const a = Math.min(from, to), b = Math.max(from, to);
    let s = `<svg class="strip" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img"><rect width="${W}" height="${H}" fill="transparent"/>`;
    s += `<rect x="12" y="38" width="${W - 24}" height="10" rx="5" fill="${col}" opacity=".28"/>`;
    s += `<rect x="${24 + a * step}" y="38" width="${(b - a) * step}" height="10" rx="5" fill="${col}"/>`;
    s += `<g transform="translate(6,16)"><rect width="30" height="22" rx="5" fill="${col}"/><text x="15" y="16" font-size="13" font-weight="800" fill="#fff" text-anchor="middle">${line}</text></g>`;
    st.forEach((n, i) => {
      const x = 24 + i * step, inR = i >= a && i <= b;
      const isEnd = i === from || i === to;
      const xfer = st2lines[n].length > 1;
      s += `<circle cx="${x}" cy="43" r="${isEnd ? 8 : (xfer ? 6.5 : 5)}" fill="${xfer ? '#fff' : (inR ? col : '#fff')}" stroke="${col}" stroke-width="${xfer ? 3.5 : 2.5}"/>`;
      if (opt.marks && opt.marks[i]) s += `<text x="${x}" y="25" font-size="15" text-anchor="middle" class="emo">${opt.marks[i]}</text>`;
      const hidden = opt.hideNames && !(i === from) && !(opt.showNames && opt.showNames.includes(i));
      s += `<text transform="translate(${x + 3},60) rotate(48)" font-size="11" class="lbl" ${isEnd ? 'font-weight="800"' : ''} fill="${inR ? '#1b2430' : '#7c8794'}">${hidden ? '·' : SP.esc(n)}</text>`;
    });
    return s + '</svg>';
  };

  /* ---------- mapas geográficos ---------- */
  const PAL = ['#e9a9a4', '#9ccbee', '#f3df78', '#c8aee3', '#b7dd92'];
  const LOVR = {
    sa: { 'Guyana': [-6, -4, 'middle', 8.5], 'Surinam': [4, 16, 'middle', 8], 'Guayana Francesa': [28, 10, 'start', 8], 'Chile': [-30, 30, 'end', 12], 'Ecuador': [-2, 0, 'middle', 9.5], 'Uruguay': [0, 2, 'middle', 10], 'Venezuela': [0, -4, 'middle', 12], 'Brasil': [0, 0, 'middle', 17], 'Argentina': [-4, 0, 'middle', 14], 'Colombia': [0, 0, 'middle', 12], 'Perú': [-6, 0, 'middle', 13], 'Bolivia': [0, 0, 'middle', 12], 'Paraguay': [0, 0, 'middle', 10] },
    as: { 'Rusia': [0, 0, 'middle', 18, 'fix', 470, 38], 'Corea del Norte': [26, -22, 'start', 9.5, 'lead'], 'Corea del Sur': [26, 14, 'start', 9.5, 'lead'], 'Japón': [18, 20, 'start', 11, 'lead'], 'Filipinas': [8, 0, 'start', 11], 'Malasia': [-4, 6, 'middle', 9.5, 'lead'], 'Camboya': [-10, 20, 'middle', 9, 'lead'], 'Laos': [8, -14, 'start', 9.5], 'Vietnam': [20, 6, 'start', 10], 'Tailandia': [-20, 6, 'middle', 10], 'Bangladés': [4, 24, 'middle', 9, 'lead'], 'Nepal': [0, -12, 'middle', 9.5], 'Omán': [14, 6, 'middle', 11], 'Kirguistán': [18, 22, 'middle', 9, 'lead'], 'Uzbekistán': [-6, 10, 'middle', 9.5], 'Turkmenistán': [-6, 6, 'middle', 9.5], 'Mongolia': [0, 0, 'middle', 14], 'China': [20, 40, 'middle', 20], 'Kazajistán': [0, 0, 'middle', 14], 'India': [0, 6, 'middle', 15], 'Indonesia': [-30, 8, 'middle', 12], 'Myanmar': [-4, 0, 'middle', 9.5], 'Pakistán': [-4, 6, 'middle', 10.5], 'Afganistán': [0, 0, 'middle', 10.5], 'Irán': [0, 8, 'middle', 13], 'Irak': [-2, 0, 'middle', 10.5], 'Arabia Saudí': [0, 4, 'middle', 12], 'Turquía': [0, 0, 'middle', 12], 'Yemen': [0, 4, 'middle', 11] },
    kr: { 'Corea del Sur': [0, 0, 'middle', 14], 'Corea del Norte': [0, 0, 'middle', 14, 'fix', 190, 60] }
  };

  SP.geoCountries = key => GEO[key].countries.filter(c => c.q);

  SP.geoMapSvg = function (key, o) {
    o = o || {};
    const m = GEO[key];
    let s = `<svg class="geomap" viewBox="0 0 ${m.W} ${m.H}" role="img" aria-label="mapa"><clipPath id="cp_${key}"><rect width="${m.W}" height="${m.H}"/></clipPath><rect width="${m.W}" height="${m.H}" fill="#e8f2f8"/><g clip-path="url(#cp_${key})">`;
    m.countries.forEach(c => {
      const q = c.q, hi = o.hi && c.es === o.hi, dim = o.hi && !hi;
      const fill = q ? PAL[c.c % 5] : '#dcdfe3';
      s += `<path class="ctry${q && o.click ? ' clickable' : ''}${hi ? ' hi' : ''}" data-es="${q ? SP.esc(c.es) : ''}" d="${c.d}" fill="${fill}" fill-opacity="${dim ? .38 : 1}" stroke="${hi ? '#c8452d' : '#fff'}" stroke-width="${hi ? 2.6 : .9}"/>`;
    });
    s += '</g>';
    if (o.labels !== 'none') {
      m.countries.filter(c => c.q).forEach(c => {
        if (o.labels === 'hi' && c.es !== o.hi) return;
        if (o.hideHi && c.es === o.hi) return;
        const ov = (LOVR[key] || {})[c.es] || [0, 0, 'middle', 11];
        let x = c.x + ov[0], y = c.y + ov[1];
        if (ov[4] === 'fix') { x = ov[5]; y = ov[6]; }
        if (ov[4] === 'lead') s += `<line x1="${c.x}" y1="${c.y}" x2="${x - (ov[2] === 'start' ? 2 : 0)}" y2="${y - 3}" stroke="#667" stroke-width=".8"/><circle cx="${c.x}" cy="${c.y}" r="2" fill="#445"/>`;
        s += `<text class="clabel" x="${x}" y="${y}" font-size="${ov[3]}" text-anchor="${ov[2]}">${SP.esc(c.es)}</text>`;
      });
    }
    if (o.compass) s += `<g transform="translate(${m.W - 44},44)"><circle r="22" fill="#fff" fill-opacity=".85" stroke="#c9d3dc"/><path d="M0,-17 L5,0 L0,-4 L-5,0Z" fill="#c8452d"/><text y="-22" font-size="10" font-weight="800" text-anchor="middle">N</text></g>`;
    return s + '</svg>';
  };

  SP.krMapSvg = function (o) {
    o = o || {};
    const m = GEO.kr;
    let s = `<svg class="geomap" viewBox="0 0 ${m.W} ${m.H}" role="img" aria-label="mapa de Corea"><rect width="${m.W}" height="${m.H}" fill="#e8f2f8"/>`;
    m.countries.forEach(c => { s += `<path d="${c.d}" fill="${c.q ? (c.es === 'Corea del Sur' ? '#f3e6c4' : '#e3e7ea') : '#e3e7ea'}" stroke="#fff" stroke-width="1"/>`; });
    s += `<text class="clabel" x="190" y="66" font-size="13" text-anchor="middle">Corea del Norte</text>`;
    m.cities.forEach(c => {
      const hi = o.hi === c.id, home = c.id === 'Dongtan';
      s += `<g class="cdot${o.click ? ' clickable' : ''}${hi ? ' hi' : ''}" data-id="${c.id}"><circle cx="${c.x}" cy="${c.y}" r="${hi ? 10 : 12}" fill="transparent"/><circle cx="${c.x}" cy="${c.y}" r="${hi ? 7 : (home ? 6 : 4.5)}" fill="${hi ? '#c8452d' : (home ? '#0f766e' : '#34404d')}" stroke="#fff" stroke-width="1.5"/>`;
      if (o.labels !== 'none' && !(o.hideHi && hi)) {
        const left = ['Mokpo', 'Gwangju', 'Incheon', 'Jeonju', 'Seúl', 'Suwon', 'Jeju'].includes(c.id);
        s += `<text class="clabel" x="${c.x + (left ? -9 : 9)}" y="${c.y + 4}" font-size="${home || hi ? 12 : 10.5}" text-anchor="${left ? 'end' : 'start'}" ${home ? 'fill="#0f766e"' : ''}>${c.es}</text>`;
      }
      s += '</g>';
    });
    return s + '</svg>';
  };

  /* geografía: región y brújula */
  const CONT = { sa: 'Sudamérica', as: 'Asia' };
  SP.contName = k => CONT[k];
  function stats(key) {
    const cs = SP.geoCountries(key).filter(c => c.es !== 'Rusia' && c.es !== 'Corea del Norte' || key === 'sa');
    const lons = cs.map(c => c.lon), lats = cs.map(c => c.lat);
    return { lo0: Math.min(...lons), lo1: Math.max(...lons), la0: Math.min(...lats), la1: Math.max(...lats) };
  }
  const ASIA_SUB = {
    'Turquía': 'oeste', 'Irak': 'oeste', 'Irán': 'oeste', 'Arabia Saudí': 'oeste', 'Omán': 'oeste', 'Yemen': 'oeste',
    'Kazajistán': 'centro', 'Uzbekistán': 'centro', 'Turkmenistán': 'centro', 'Kirguistán': 'centro', 'Afganistán': 'centro',
    'India': 'sur', 'Pakistán': 'sur', 'Nepal': 'sur', 'Bangladés': 'sur',
    'China': 'este', 'Mongolia': 'este', 'Japón': 'este', 'Corea del Norte': 'este', 'Corea del Sur': 'este',
    'Myanmar': 'sureste', 'Laos': 'sureste', 'Tailandia': 'sureste', 'Vietnam': 'sureste', 'Camboya': 'sureste', 'Malasia': 'sureste', 'Filipinas': 'sureste', 'Indonesia': 'sureste'
  };
  const mix = (ns, ew) => ns && ew ? (ns === 'norte' ? 'nor' : 'sur') + ew : (ns || ew || 'centro');
  SP.geoRegion = function (key, es) {
    const st = stats(key), c = SP.geoCountries(key).find(x => x.es === es);
    const nx = (c.lon - (st.lo0 + st.lo1) / 2) / ((st.lo1 - st.lo0) / 2), ny = (c.lat - (st.la0 + st.la1) / 2) / ((st.la1 - st.la0) / 2);
    const ns = ny > .38 ? 'norte' : ny < -.38 ? 'sur' : '';
    const ew = nx > .5 ? 'este' : nx < -.5 ? 'oeste' : '';
    let label = mix(ns, ew);
    const alts = [label];
    if (ns && ew) alts.push(ns, ew);
    if (key === 'as' && ASIA_SUB[es]) { label = ASIA_SUB[es]; alts.unshift(label); }
    return { label, alts: Array.from(new Set(alts)) };
  };
  SP.compass = function (a, b) { /* dirección de b respecto a a (b está al X de a) */
    const dx = b.lon - a.lon, dy = b.lat - a.lat, ang = Math.atan2(dy, dx) * 180 / Math.PI;
    const names = ['este', 'noreste', 'norte', 'noroeste', 'oeste', 'suroeste', 'sur', 'sureste'];
    return names[((Math.round(ang / 45) % 8) + 8) % 8];
  };
  SP.geoWhere = function (key, es) {
    const cs = SP.geoCountries(key), c = cs.find(x => x.es === es);
    const reg = SP.geoRegion(key, es);
    const nbs = (c.adj || []).filter(n => cs.some(x => x.es === n) && n !== 'Rusia').map(n => ({ n, d: SP.compass(cs.find(x => x.es === n), c) }));
    return { reg, nbs, cont: CONT[key] };
  };
  SP.krRegion = function (c) {
    const ns = c.lat > 37.3 ? 'norte' : c.lat < 35.1 ? 'sur' : '';
    const ew = c.lon > 128.7 ? 'este' : c.lon < 126.9 ? 'oeste' : '';
    return mix(ns, ew);
  };
})(typeof window !== 'undefined' ? window : globalThis);
