/* Datos del examen oral: vocabulario, ciudad, metro, monumentos, etc. */
(function (g) {
  const SP = g.SP;

  /* ================= UNIDAD 5: la casa ================= */
  SP.OBJ = {
    sofa: { es: 'sofá', g: 'm', ko: '소파', pl: 'sofás', ic: '🛋️' },
    mesa: { es: 'mesa', g: 'f', ko: '탁자·식탁', ic: 'svg:mesa' },
    silla: { es: 'silla', g: 'f', ko: '의자', ic: '🪑' },
    television: { es: 'televisión', g: 'f', ko: '텔레비전', pl: 'televisiones', ic: '📺' },
    lampara: { es: 'lámpara', g: 'f', ko: '램프·조명', ic: '💡' },
    alfombra: { es: 'alfombra', g: 'f', ko: '카펫', ic: 'svg:alfombra' },
    estanteria: { es: 'estantería', g: 'f', ko: '책장·선반', ic: 'svg:estanteria' },
    planta: { es: 'planta', g: 'f', ko: '화분·식물', ic: '🪴' },
    ventana: { es: 'ventana', g: 'f', ko: '창문', ic: '🪟' },
    puerta: { es: 'puerta', g: 'f', ko: '문', ic: '🚪' },
    nevera: { es: 'nevera', g: 'f', ko: '냉장고', ic: 'svg:nevera' },
    cocina_gas: { es: 'cocina de gas', g: 'f', ko: '가스레인지', pl: 'cocinas de gas', ic: 'svg:cocina_gas' },
    microondas: { es: 'microondas', g: 'm', ko: '전자레인지', pl: 'microondas', ic: 'svg:microondas' },
    fregadero: { es: 'fregadero', g: 'm', ko: '싱크대', ic: '🚰' },
    lavadora: { es: 'lavadora', g: 'f', ko: '세탁기', ic: 'svg:lavadora' },
    cama: { es: 'cama', g: 'f', ko: '침대', ic: '🛏️' },
    armario: { es: 'armario', g: 'm', ko: '옷장', ic: 'svg:armario' },
    escritorio: { es: 'escritorio', g: 'm', ko: '책상', ic: 'svg:escritorio' },
    espejo: { es: 'espejo', g: 'm', ko: '거울', ic: '🪞' },
    ordenador: { es: 'ordenador', g: 'm', ko: '컴퓨터', ic: '💻' },
    ducha: { es: 'ducha', g: 'f', ko: '샤워기·샤워실', ic: '🚿' },
    banera: { es: 'bañera', g: 'f', ko: '욕조', ic: '🛁' },
    lavabo: { es: 'lavabo', g: 'm', ko: '세면대', ic: 'svg:lavabo' },
    inodoro: { es: 'inodoro', g: 'm', ko: '변기', ic: '🚽' },
    coche: { es: 'coche', g: 'm', ko: '자동차', ic: '🚗' },
    bicicleta: { es: 'bicicleta', g: 'f', ko: '자전거', ic: '🚲' },
    arbol: { es: 'árbol', g: 'm', ko: '나무', pl: 'árboles', ic: '🌳' },
    flores: { es: 'flor', g: 'f', ko: '꽃', pl: 'flores', ic: '🌷' }
  };
  Object.keys(SP.OBJ).forEach(k => {
    const o = SP.OBJ[k]; o.id = k;
    if (!o.pl) o.pl = /[aeiou]$/.test(o.es) ? o.es + 's' : o.es + 'es';
  });
  SP.obj = id => SP.OBJ[id];

  SP.ROOMS = [
    { id: 'salon', es: 'salón', g: 'm', ko: '거실', theme: 'in', wall: '#f1e6d6', floor: '#d6ae84', items: ['sofa', 'mesa', 'silla', 'television', 'lampara', 'alfombra', 'estanteria', 'planta'] },
    { id: 'cocina', es: 'cocina', g: 'f', ko: '부엌', theme: 'in', wall: '#e3efe7', floor: '#cdd6da', items: ['nevera', 'cocina_gas', 'microondas', 'mesa', 'silla', 'fregadero', 'lavadora'] },
    { id: 'dormitorio', es: 'dormitorio', g: 'm', ko: '침실', theme: 'in', wall: '#e6e2f2', floor: '#d6ae84', items: ['cama', 'armario', 'escritorio', 'silla', 'lampara', 'espejo', 'ordenador'] },
    { id: 'bano', es: 'cuarto de baño', g: 'm', ko: '욕실·화장실', theme: 'in', wall: '#dcf0f5', floor: '#c5dde5', items: ['ducha', 'banera', 'lavabo', 'inodoro', 'espejo', 'lavadora'] },
    { id: 'comedor', es: 'comedor', g: 'm', ko: '식당(다이닝룸)', theme: 'in', wall: '#f5e9e1', floor: '#d6ae84', items: ['mesa', 'silla', 'lampara', 'estanteria', 'planta', 'alfombra'] },
    { id: 'jardin', es: 'jardín', g: 'm', ko: '정원', theme: 'out', wall: '#cfe8f7', floor: '#9fd08a', items: ['arbol', 'flores', 'bicicleta', 'mesa', 'silla'] },
    { id: 'garaje', es: 'garaje', g: 'm', ko: '차고', theme: 'garage', wall: '#d9dde2', floor: '#aeb4bb', items: ['coche', 'bicicleta'] }
  ];
  SP.room = id => SP.ROOMS.find(r => r.id === id);

  /* objetos para la pregunta 2 (¿Qué es esto?) */
  SP.THINGS = ['lavadora', 'cocina_gas', 'ordenador', 'nevera', 'microondas', 'television', 'sofa', 'cama', 'armario', 'escritorio', 'mesa', 'silla', 'espejo', 'lampara', 'ducha', 'banera', 'lavabo', 'inodoro', 'estanteria', 'alfombra', 'fregadero', 'bicicleta', 'coche'];

  /* adjetivos (m / f) */
  SP.ADJ = {
    pequeno: { m: 'pequeño', f: 'pequeña', ko: '작은', opp: 'grande' },
    grande: { m: 'grande', f: 'grande', ko: '큰', opp: 'pequeno' },
    moderno: { m: 'moderno', f: 'moderna', ko: '현대적인', opp: 'antiguo' },
    antiguo: { m: 'antiguo', f: 'antigua', ko: '오래된·고풍스러운', opp: 'moderno' },
    luminoso: { m: 'luminoso', f: 'luminosa', ko: '밝은(채광이 좋은)', opp: 'oscuro' },
    oscuro: { m: 'oscuro', f: 'oscura', ko: '어두운', opp: 'luminoso' },
    comodo: { m: 'cómodo', f: 'cómoda', ko: '편안한', opp: 'incomodo' },
    incomodo: { m: 'incómodo', f: 'incómoda', ko: '불편한', opp: 'comodo' },
    bonito: { m: 'bonito', f: 'bonita', ko: '예쁜', opp: 'feo' },
    feo: { m: 'feo', f: 'fea', ko: '못생긴', opp: 'bonito' },
    tranquilo: { m: 'tranquilo', f: 'tranquila', ko: '조용한·평온한', opp: 'ruidoso' },
    ruidoso: { m: 'ruidoso', f: 'ruidosa', ko: '시끄러운', opp: 'tranquilo' },
    acogedor: { m: 'acogedor', f: 'acogedora', ko: '아늑한', opp: null },
    limpio: { m: 'limpio', f: 'limpia', ko: '깨끗한', opp: 'sucio' },
    sucio: { m: 'sucio', f: 'sucia', ko: '더러운', opp: 'limpio' },
    animado: { m: 'animado', f: 'animada', ko: '활기찬', opp: 'tranquilo' },
    turistico: { m: 'turístico', f: 'turística', ko: '관광지의', opp: null },
    famoso: { m: 'famoso', f: 'famosa', ko: '유명한', opp: null },
    historico: { m: 'histórico', f: 'histórica', ko: '역사적인', opp: null },
    enorme: { m: 'enorme', f: 'enorme', ko: '거대한', opp: null }
  };
  SP.DWELL = [
    { es: 'piso', g: 'm', ko: '아파트(스페인식 piso)' },
    { es: 'casa', g: 'f', ko: '집(주택)' },
    { es: 'apartamento', g: 'm', ko: '소형 아파트' },
    { es: 'chalé', g: 'm', ko: '단독주택(빌라)' }
  ];

  /* ================= UNIDAD 7: la ciudad ================= */
  SP.PLACES = [
    { id: 'panaderia', es: 'panadería', g: 'f', ko: '빵집', ic: '🥖' },
    { id: 'supermercado', es: 'supermercado', g: 'm', ko: '슈퍼마켓', ic: '🛒' },
    { id: 'cafeteria', es: 'cafetería', g: 'f', ko: '카페', ic: '☕' },
    { id: 'farmacia', es: 'farmacia', g: 'f', ko: '약국', ic: '💊' },
    { id: 'banco', es: 'banco', g: 'm', ko: '은행', ic: '🏦' },
    { id: 'quiosco', es: 'quiosco', g: 'm', ko: '가판대(신문·간식)', ic: '📰' },
    { id: 'restaurante', es: 'restaurante', g: 'm', ko: '식당', ic: '🍽️' },
    { id: 'bar', es: 'bar', g: 'm', ko: '바(스페인식 술집·카페)', ic: '🍺' },
    { id: 'pizzeria', es: 'pizzería', g: 'f', ko: '피자집', ic: '🍕' },
    { id: 'tienda_ropa', es: 'tienda de ropa', g: 'f', ko: '옷가게', ic: '👕' },
    { id: 'peluqueria', es: 'peluquería', g: 'f', ko: '미용실', ic: '💈' },
    { id: 'floristeria', es: 'floristería', g: 'f', ko: '꽃집', ic: '💐' },
    { id: 'escuela', es: 'escuela', g: 'f', ko: '학교', ic: '🏫' },
    { id: 'biblioteca', es: 'biblioteca', g: 'f', ko: '도서관', ic: '📚' },
    { id: 'libreria', es: 'librería', g: 'f', ko: '서점', ic: '📖' },
    { id: 'hotel', es: 'hotel', g: 'm', ko: '호텔', ic: '🏨' },
    { id: 'cine', es: 'cine', g: 'm', ko: '영화관', ic: '🎬' },
    { id: 'teatro', es: 'teatro', g: 'm', ko: '극장', ic: '🎭' },
    { id: 'museo', es: 'museo', g: 'm', ko: '박물관·미술관', ic: '🖼️' },
    { id: 'iglesia', es: 'iglesia', g: 'f', ko: '교회·성당', ic: '⛪' },
    { id: 'ayuntamiento', es: 'ayuntamiento', g: 'm', ko: '시청', ic: '🏛️' },
    { id: 'hospital', es: 'hospital', g: 'm', ko: '병원', ic: '🏥' },
    { id: 'comisaria', es: 'comisaría', g: 'f', ko: '경찰서', ic: '🚓' },
    { id: 'bomberos', es: 'estación de bomberos', g: 'f', ko: '소방서', ic: '🚒' },
    { id: 'universidad', es: 'universidad', g: 'f', ko: '대학교', ic: '🎓' },
    { id: 'conciertos', es: 'sala de conciertos', g: 'f', ko: '콘서트홀', ic: '🎵' },
    { id: 'jugueteria', es: 'juguetería', g: 'f', ko: '장난감 가게', ic: '🧸' },
    { id: 'comercial', es: 'centro comercial', g: 'm', ko: '쇼핑센터', ic: '🛍️' },
    { id: 'lavanderia', es: 'lavandería', g: 'f', ko: '세탁소', ic: '🧺' },
    { id: 'veterinario', es: 'veterinario', g: 'm', ko: '동물병원', ic: '🐾' },
    { id: 'tren', es: 'estación de tren', g: 'f', ko: '기차역', ic: '🚉' },
    { id: 'autobus', es: 'parada de autobús', g: 'f', ko: '버스 정류장', ic: '🚌' },
    { id: 'gasolinera', es: 'gasolinera', g: 'f', ko: '주유소', ic: '⛽' },
    { id: 'parque', es: 'parque', g: 'm', ko: '공원', ic: '🌳' },
    { id: 'aparcamiento', es: 'aparcamiento', g: 'm', ko: '주차장', ic: '🅿️' },
    { id: 'papeleria', es: 'papelería', g: 'f', ko: '문구점', ic: '✏️' }
  ];
  SP.place = id => SP.PLACES.find(p => p.id === id);
  /* distribución en el mapa: 3 filas × 4 manzanas × 3 locales */
  SP.LAYOUT = {
    1: [['panaderia', 'supermercado', 'cafeteria'], ['farmacia', 'banco', 'quiosco'], ['restaurante', 'bar', 'pizzeria'], ['tienda_ropa', 'peluqueria', 'floristeria']],
    2: [['escuela', 'biblioteca', 'libreria'], ['hotel', 'cine', 'teatro'], ['museo', 'iglesia', 'ayuntamiento'], ['hospital', 'comisaria', 'bomberos']],
    3: [['universidad', 'conciertos', 'jugueteria'], ['comercial', 'lavanderia', 'veterinario'], ['tren', 'autobus', 'gasolinera'], ['parque', 'aparcamiento', 'papeleria']]
  };
  /* vocabulario extra de la imagen (solo estudio) */
  SP.PLACES_EXTRA = [
    { es: 'frutería', g: 'f', ko: '과일가게', ic: '🍎' }, { es: 'carnicería', g: 'f', ko: '정육점', ic: '🥩' },
    { es: 'pescadería', g: 'f', ko: '생선가게', ic: '🐟' }, { es: 'herboristería', g: 'f', ko: '약초·건강식품점', ic: '🌿' },
    { es: 'embajada', g: 'f', ko: '대사관', ic: '🏳️' }, { es: 'circo', g: 'm', ko: '서커스', ic: '🎪' },
    { es: 'monumento', g: 'm', ko: '기념물·기념비', ic: '🗿' }, { es: 'estación de metro', g: 'f', ko: '지하철역', ic: '🚇' },
    { es: 'ambulatorio', g: 'm', ko: '보건소·의원', ic: '⚕️' }, { es: 'academia de idiomas', g: 'f', ko: '어학원', ic: '🗣️' },
    { es: 'tienda de instrumentos', g: 'f', ko: '악기점', ic: '🎸' }, { es: 'correos', g: 'm', ko: '우체국 (Correos)', ic: '✉️' }
  ];

  /* ciudades para ¿Cómo es...? */
  SP.CITY_DESC = [
    { n: 'Dongtan', adj: ['pequeno', 'moderno', 'tranquilo'], tur: false },
    { n: 'Busan', adj: ['grande', 'moderno', 'bonito'], tur: true },
    { n: 'Seúl', adj: ['enorme', 'moderno', 'animado'], tur: true },
    { n: 'Nueva York', adj: ['grande', 'ruidoso', 'moderno'], tur: true },
    { n: 'Barcelona', adj: ['grande', 'bonito', 'animado'], tur: true },
    { n: 'Gyeongju', adj: ['pequeno', 'antiguo', 'tranquilo'], tur: true },
    { n: 'Andong', adj: ['pequeno', 'tranquilo', 'antiguo'], tur: false },
    { n: 'Londres', adj: ['grande', 'antiguo', 'ruidoso'], tur: true },
    { n: 'Tokio', adj: ['enorme', 'moderno', 'limpio'], tur: true },
    { n: 'Venecia', adj: ['pequeno', 'antiguo', 'bonito'], tur: true },
    { n: 'Ciudad de México', adj: ['enorme', 'animado', 'ruidoso'], tur: true },
    { n: 'Jeju', adj: ['pequeno', 'bonito', 'tranquilo'], tur: true }
  ];

  /* monumentos famosos por ciudad */
  SP.MONU = {
    'Nueva York': [
      { kind: 'monumento', g: 'm', name: 'Estatua de la Libertad', ic: '🗽' }, { kind: 'parque', g: 'm', name: 'Central Park', ic: '🌳' },
      { kind: 'museo', g: 'm', name: 'Museo Metropolitano de Arte', ic: '🖼️' }, { kind: 'río', g: 'm', name: 'Río Hudson', ic: '🌊' },
      { kind: 'puente', g: 'm', name: 'Puente de Brooklyn', ic: '🌉' }, { kind: 'edificio', g: 'm', name: 'Empire State Building', ic: '🏙️' }
    ],
    'Barcelona': [
      { kind: 'monumento', g: 'm', name: 'Sagrada Familia', ic: '⛪' }, { kind: 'parque', g: 'm', name: 'Parque Güell', ic: '🌳' },
      { kind: 'museo', g: 'm', name: 'Museo Picasso', ic: '🖼️' }, { kind: 'calle', g: 'f', name: 'La Rambla', ic: '🚶' },
      { kind: 'estadio', g: 'm', name: 'Camp Nou', ic: '⚽' }
    ],
    'Londres': [
      { kind: 'monumento', g: 'm', name: 'Big Ben', ic: '🕰️' }, { kind: 'museo', g: 'm', name: 'Museo Británico', ic: '🏛️' },
      { kind: 'parque', g: 'm', name: 'Hyde Park', ic: '🌳' }, { kind: 'río', g: 'm', name: 'Río Támesis', ic: '🌊' },
      { kind: 'puente', g: 'm', name: 'Tower Bridge', ic: '🌉' }, { kind: 'palacio', g: 'm', name: 'Palacio de Buckingham', ic: '🏰' }
    ],
    'París': [
      { kind: 'monumento', g: 'm', name: 'Torre Eiffel', ic: '🗼' }, { kind: 'museo', g: 'm', name: 'Museo del Louvre', ic: '🖼️' },
      { kind: 'río', g: 'm', name: 'Río Sena', ic: '🌊' }, { kind: 'iglesia', g: 'f', name: 'Catedral de Notre-Dame', ic: '⛪' },
      { kind: 'parque', g: 'm', name: 'Jardines de Luxemburgo', ic: '🌳' }
    ],
    'Roma': [
      { kind: 'monumento', g: 'm', name: 'Coliseo', ic: '🏟️' }, { kind: 'museo', g: 'm', name: 'Museos Vaticanos', ic: '🖼️' },
      { kind: 'río', g: 'm', name: 'Río Tíber', ic: '🌊' }, { kind: 'fuente', g: 'f', name: 'Fontana de Trevi', ic: '⛲' }
    ],
    'Madrid': [
      { kind: 'museo', g: 'm', name: 'Museo del Prado', ic: '🖼️' }, { kind: 'parque', g: 'm', name: 'Parque del Retiro', ic: '🌳' },
      { kind: 'monumento', g: 'm', name: 'Puerta de Alcalá', ic: '🏛️' }, { kind: 'palacio', g: 'm', name: 'Palacio Real', ic: '🏰' },
      { kind: 'plaza', g: 'f', name: 'Plaza Mayor', ic: '🏛️' }, { kind: 'río', g: 'm', name: 'Río Manzanares', ic: '🌊' }
    ],
    'Seúl': [
      { kind: 'palacio', g: 'm', name: 'Palacio Gyeongbokgung', ic: '🏯' }, { kind: 'río', g: 'm', name: 'Río Han', ic: '🌊' },
      { kind: 'torre', g: 'f', name: 'Torre N de Seúl', ic: '🗼' }, { kind: 'museo', g: 'm', name: 'Museo Nacional de Corea', ic: '🏛️' }
    ],
    'Tokio': [
      { kind: 'torre', g: 'f', name: 'Tokyo Skytree', ic: '🗼' }, { kind: 'templo', g: 'm', name: 'Templo Senso-ji', ic: '⛩️' },
      { kind: 'río', g: 'm', name: 'Río Sumida', ic: '🌊' }, { kind: 'parque', g: 'm', name: 'Parque Ueno', ic: '🌳' }
    ],
    'Ciudad de México': [
      { kind: 'monumento', g: 'm', name: 'Ángel de la Independencia', ic: '🗿' }, { kind: 'museo', g: 'm', name: 'Museo Nacional de Antropología', ic: '🏛️' },
      { kind: 'parque', g: 'm', name: 'Bosque de Chapultepec', ic: '🌳' }, { kind: 'plaza', g: 'f', name: 'Zócalo', ic: '🏛️' }
    ]
  };

  /* poblaciones aproximadas (práctica) */
  SP.POP = [
    ['La Paz', 877363], ['Asunción', 525294], ['Montevideo', 1319108], ['Quito', 2011388], ['Madrid', 3305408],
    ['Barcelona', 1636193], ['Busan', 3300000], ['Seúl', 9386000], ['Lima', 9751717], ['Bogotá', 7412566],
    ['Santiago de Chile', 5614000], ['Buenos Aires', 3121707], ['Sucre', 300000], ['Dongtan', 400000]
  ];

  /* ================= METRO de la Ciudad de México ================= */
  SP.METRO = {
    '1': { color: '#e4457f', st: ['Observatorio', 'Tacubaya', 'Juanacatlán', 'Chapultepec', 'Sevilla', 'Insurgentes', 'Cuauhtémoc', 'Balderas', 'Salto del Agua', 'Isabel la Católica', 'Pino Suárez', 'Merced', 'Candelaria', 'San Lázaro', 'Moctezuma', 'Balbuena', 'Boulevard Puerto Aéreo', 'Gómez Farías', 'Zaragoza', 'Pantitlán'] },
    '2': { color: '#1f6fd0', st: ['Cuatro Caminos', 'Panteones', 'Cuitláhuac', 'Popotla', 'Colegio Militar', 'Normal', 'San Cosme', 'Revolución', 'Hidalgo', 'Bellas Artes', 'Allende', 'Zócalo', 'Pino Suárez', 'San Antonio Abad', 'Chabacano', 'Viaducto', 'Xola', 'Villa de Cortés', 'Nativitas', 'Portales', 'Ermita', 'General Anaya', 'Tasqueña'] },
    '3': { color: '#8f8f1c', st: ['Indios Verdes', 'Deportivo 18 de Marzo', 'Potrero', 'La Raza', 'Tlatelolco', 'Guerrero', 'Hidalgo', 'Juárez', 'Balderas', 'Niños Héroes', 'Hospital General', 'Centro Médico', 'Etiopía', 'Eugenia', 'División del Norte', 'Zapata', 'Coyoacán', 'Viveros', 'Miguel Ángel de Quevedo', 'Copilco', 'Universidad'] },
    '4': { color: '#58b3a2', st: ['Martín Carrera', 'Talismán', 'Bondojito', 'Consulado', 'Canal del Norte', 'Morelos', 'Candelaria', 'Fray Servando', 'Jamaica', 'Santa Anita'] },
    '5': { color: '#e6b800', st: ['Politécnico', 'Instituto del Petróleo', 'Autobuses del Norte', 'La Raza', 'Misterios', 'Valle Gómez', 'Consulado', 'Eduardo Molina', 'Aragón', 'Oceanía', 'Terminal Aérea', 'Hangares', 'Pantitlán'] },
    '6': { color: '#c8302b', st: ['El Rosario', 'Tezozómoc', 'Azcapotzalco', 'Ferrería', 'Norte 45', 'Vallejo', 'Instituto del Petróleo', 'Lindavista', 'Deportivo 18 de Marzo', 'La Villa-Basílica', 'Martín Carrera'] },
    '7': { color: '#e8801b', st: ['El Rosario', 'Aquiles Serdán', 'Camarones', 'Refinería', 'Tacuba', 'San Joaquín', 'Polanco', 'Auditorio', 'Constituyentes', 'Tacubaya', 'San Pedro de los Pinos', 'San Antonio', 'Mixcoac', 'Barranca del Muerto'] },
    '8': { color: '#2a9a47', st: ['Garibaldi', 'Bellas Artes', 'San Juan de Letrán', 'Salto del Agua', 'Doctores', 'Obrera', 'Chabacano', 'La Viga', 'Santa Anita', 'Coyuya', 'Iztacalco', 'Apatlaco', 'Aculco', 'Escuadrón 201', 'Atlalilco', 'Iztapalapa', 'Cerro de la Estrella', 'UAM-I', 'Constitución de 1917'] },
    '9': { color: '#7b4b38', st: ['Tacubaya', 'Patriotismo', 'Chilpancingo', 'Centro Médico', 'Lázaro Cárdenas', 'Chabacano', 'Jamaica', 'Mixiuhca', 'Velódromo', 'Ciudad Deportiva', 'Puebla', 'Pantitlán'] },
    'B': { color: '#8a8f98', st: ['Buenavista', 'Guerrero', 'Garibaldi', 'Lagunilla', 'Tepito', 'Morelos', 'San Lázaro', 'Ricardo Flores Magón', 'Romero Rubio', 'Oceanía', 'Deportivo Oceanía', 'Bosque de Aragón', 'Villa de Aragón', 'Nezahualcóyotl', 'Impulsora', 'Río de los Remedios', 'Muzquiz', 'Ecatepec', 'Olímpica', 'Plaza Aragón', 'Ciudad Azteca'] },
    '12': { color: '#b5a14f', st: ['Mixcoac', 'Insurgentes Sur', 'Hospital 20 de Noviembre', 'Zapata', 'Parque de los Venados', 'Eje Central', 'Ermita', 'Mexicaltzingo', 'Atlalilco'] }
  };
})(typeof window !== 'undefined' ? window : globalThis);
