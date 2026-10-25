// Estima — clickable prototype of an RFP estimation tool for SAP projects.
// One page, hash routes (#/home, #/new …). Everything runs in the browser; nothing is sent anywhere.
(() => {
  // ---------- icons ----------
  const I = {
    down: '<svg width="16" height="16" viewBox="0 0 16 16" class="chev"><path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>',
    up: '<svg width="16" height="16" viewBox="0 0 16 16"><path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
    left: '<svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 2L4 7l5 5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
    x: '<svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.6"/></svg>',
    search: '<svg width="18" height="18" viewBox="0 0 18 18"><circle cx="7.5" cy="7.5" r="6.5" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M12.5 12.5L17 17" stroke="currentColor" stroke-width="1.3"/></svg>',
    user: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.3"><circle cx="10" cy="10" r="9"/><circle cx="10" cy="8" r="3"/><path d="M4.5 16c1.3-2.2 3.2-3.2 5.5-3.2s4.2 1 5.5 3.2"/></svg>',
    kebab: '<svg width="4" height="16" viewBox="0 0 4 16"><circle cx="2" cy="2" r="1.6"/><circle cx="2" cy="8" r="1.6"/><circle cx="2" cy="14" r="1.6"/></svg>',
    share: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor"><circle cx="11" cy="3" r="1.6"/><circle cx="3" cy="7" r="1.6"/><circle cx="11" cy="11" r="1.6"/><path d="M4.5 6.2l5-2.4M4.5 7.8l5 2.4"/></svg>',
    send: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor"><circle cx="7" cy="7" r="6"/><path d="M4.3 7.2l1.9 1.9 3.6-3.8"/></svg>',
    edit: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor"><path d="M9.5 2l2.5 2.5L5 11.5H2.5V9z"/></svg>',
    xls: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor"><rect x="2" y="1.5" width="10" height="11" rx="1"/><path d="M5 5l4 4M9 5l-4 4"/></svg>',
    pdf: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor"><path d="M3 1.5h5.5L11 4v8.5H3z"/><path d="M5 8h4M5 10h3"/></svg>',
    out: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor"><path d="M8 2H2.5v10H8M6 7h6.5M10 4.5L12.5 7 10 9.5"/></svg>',
    plus: '<svg width="8" height="8" viewBox="0 0 8 8"><path d="M4 0v8M0 4h8" stroke="currentColor" stroke-width="1.2"/></svg>',
    swap: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#8c8c8c"><path d="M1 4h9l-2-2M11 8H2l2 2"/></svg>',
    arrow: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#8c8c8c"><path d="M1 6h9l-2-2M10 6l-2 2"/></svg>',
    eye: '<svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="#ccc" stroke-width="1.2"><path d="M1 6s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z"/><circle cx="8" cy="6" r="2.2"/></svg>',
    person: '<svg width="13" height="13" viewBox="0 0 13 13" fill="#ed2831"><circle cx="6.5" cy="3.5" r="3"/><path d="M0.5 12.5c.6-3 3-4.5 6-4.5s5.4 1.5 6 4.5z"/></svg>',
    key: '<svg width="16" height="9" viewBox="0 0 16 9" fill="#ed2831"><path d="M8.5 3A4.4 4.4 0 0 0 0 4.5 4.4 4.4 0 0 0 8.5 6H11v2.5h2.5V6H16V3zM4.4 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>',
    cloud: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#e7661e" stroke-width="1.3"><path d="M5 12H4a3 3 0 0 1-.4-6A4.5 4.5 0 0 1 12.4 5.5 3.3 3.3 0 0 1 12 12h-1"/><path d="M8 14V8M5.8 10.2L8 8l2.2 2.2"/></svg>',
    cal: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#e7661e"><rect x="1.5" y="2.5" width="11" height="10" rx="1.5"/><path d="M1.5 5.5h11M4.5 1v3M9.5 1v3"/></svg>',
  };
  const wave = '<span aria-hidden="true">👋</span>';

  // ---------- reference data (from the Figma screens) ----------
  const LEVELS = ['Low', 'Medium', 'High', 'Very High'];
  const SHORT = { Low: 'L', Medium: 'M', High: 'H', 'Very High': 'VH' };
  const KEYS = [
    ['tech', 'Technology', ['SAP', 'Salesforce', 'Microsoft Dynamics', 'Oracle']],
    ['industry', 'Industry', ['Government & Public Services', 'Life Sciences & Healthcare', 'Consumer', 'Healthcare']],
    ['type', 'Type of Project', ['Greenfield Implementation', 'Maintenance & Support', 'Migration']],
    ['sector', 'Sector', ['Construction', 'Transport']],
    ['scope', 'Scope', ['All', 'Build', 'Test', 'Deploy', 'Project Management']],
    ['geo', 'Geography', ['India', 'UK']],
    ['pm', 'PM Method', ['Waterfall', 'Agile (Evolving)', 'Activate']],
    ['approach', 'Estimation Approach', ['Top Down', 'Bottom Up']],
  ];
  const KEY_ORDER = ['tech', 'industry', 'type', 'sector', 'scope', 'geo', 'pm', 'approach']; // left/right columns as in Figma
  const MODULES_START = ['Project System', 'Production Planning', 'Plant & Maintenance', 'Material Management', 'Finance & Controlling'];
  const MODULES_MORE = ['Human Capital Management', 'Sales & Distribution', 'Investment Management', 'Customer Relationship Management', 'Supply Chain Management', 'Customer Service', 'Enterprise Performance Management', 'Human Resources'];
  const OBJECTS_START = ['Analytics', 'Configuration Application', 'Data Conversion', 'Master Data Solution', 'Data Governance', 'Automation', 'Interface', 'Custom Mobile Application'];
  const OBJECTS_MORE = ['Package Form', 'Change Management', 'Package Enhancement', 'Package Workflow', 'User Experience', 'Ariba', 'Performance Management (EPM / BPC)', 'Data Quality Solution'];
  const SHORTNAME = { 'Human Capital Management': 'HCM' };
  // module effort in person days at Medium complexity; other levels scale by LEVEL_F
  const MOD_BASE = { 'Project System': 160.8, 'Production Planning': 70.48, 'Plant & Maintenance': 92.54, 'Material Management': 89.86, 'Finance & Controlling': 109.86, 'Human Capital Management': 75.07 };
  const MOD_START_CX = { 'Project System': 'Medium', 'Production Planning': 'Medium', 'Plant & Maintenance': 'High', 'Material Management': 'High', 'Finance & Controlling': 'Low', 'Human Capital Management': 'Very High' };
  const LEVEL_F = { Low: .7, Medium: 1, High: 1.3, 'Very High': 1.6 };
  const RICEFW_TYPES = ['Reports', 'Interfaces', 'Conversion', 'Enhancements', 'Forms', 'Workflows'];
  const RICEFW_ONE = { Reports: 'Report', Interfaces: 'Interfaces', Conversion: 'Conversion', Enhancements: 'Enhancements', Forms: 'Forms', Workflows: 'Workflows' };
  const RICEFW_PD = { Low: 16.8, Medium: 55.5, High: 70, 'Very High': 80 };
  const RICEFW_ROWS = [
    ['SC001', 'Source List', 'Reports', 'Low'], ['SC002', 'Source List', 'Forms', 'Low'], ['ML001', 'Material Ledger', 'Reports', 'Medium'],
    ['ML002', 'Material Ledger', 'Forms', 'Medium'], ['RF001', 'RFQ Object', 'Reports', 'Very High'], ['RF002', 'RFQ Object', 'Forms', 'High'],
    ['RF003', 'RFQ Object', 'Reports', 'High'], ['RF004', 'RFQ Object', 'Conversion', 'Low'], ['TA001', 'Taxes Object', 'Workflows', 'Low'],
    ['TA002', 'Taxes Object', 'Reports', 'Medium'], ['TA003', 'Taxes Object', 'Enhancements', 'Low'], ['PO001', 'Purchasing Object', 'Interfaces', 'Very High'],
    ['PO002', 'Purchasing Object', 'Forms', 'Low'], ['PO003', 'Purchasing Object', 'Reports', 'Medium'], ['IC001', 'Inventory Controlling', 'Workflows', 'High'],
  ];
  const INTEG_TYPES = ['API', 'FTP', 'RFC', 'File Upload'];
  const INTEG_START = [['LDAP', 'API', 'Low', 'swap'], ['Data Lakes', 'FTP', 'Medium', 'swap'], ['Middleware', 'RFC', 'Low', 'arrow'], ['Payment Gateways', 'File Upload', 'Very High', 'arrow'], ['Third Party Warehouses', 'API', 'High', 'swap']];
  const INTEG_PD = { Low: .52, Medium: .82, High: 1.12, 'Very High': 1.38 };
  const TESTS = { Unit: 'Low', System: 'Low', 'System Integration': 'High', Security: 'Low', Regression: 'Medium', Performance: 'Very High' };
  const MORE_TABLES = {
    'Procurement Complexity': ['Vendor Onboarding', 'Contract Management', 'Purchase Requisition'],
    'Data Migration Complexity': ['Master Data', 'Transactional Data', 'Historical Data'],
    'Environment Complexity': ['Development', 'Quality', 'Production'],
  };
  const OTHERS = ['NFR', 'Skill Onboarding Complexity', 'Project Documentation', 'Change Management', 'Training', 'Risks & Mitigation', 'Dependencies', 'Assumptions', 'Assets', 'Contingency'];
  const PHASES = [['Requirements Gathering', 'Low', 10.93], ['High Level Design', 'Medium', 10.93], ['Low Level Design', 'Medium', 21.86], ['Development', 'Very High', 87.44], ['Testing', 'High', 65.52], ['Deployment', 'Medium', 10.93]];
  const QUESTIONS = [
    'Will you use Dataloader or script based configuration migration for faster configuration migration?',
    'Will you be implementing the product in more than one language?',
    'Will you use OATS based pre-built test cases and test factory to perform SIT and Regression Testing for accelerated testing activities?',
  ];
  const TIMES = ['8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM'];

  // ---------- state ----------
  const clone = o => JSON.parse(JSON.stringify(o));
  const newEstimate = (o = {}) => {
    const mods = o.modules || [...MODULES_START];
    return Object.assign({
      id: '19085001', status: 'In progress', config: 'default',
      details: { name: 'ABC SAP', client: 'ABC Construction Ltd', desc: 'Creating a Sales ERP', leader: 'John Doe', purpose: 'Estimation' },
      keys: Object.fromEntries(KEYS.map(k => [k[0], ''])),
      setup: { from: '2023-11-26', to: '2024-11-26', start: '9:00 AM', end: '6:00 PM', figs: {} },
      modules: mods, objects: [...OBJECTS_START],
      modCx: Object.fromEntries(mods.map(m => [m, MOD_START_CX[m] || 'Medium'])),
      ricefw: RICEFW_ROWS.map(r => ({ id: r[0], obj: r[1], type: r[2], cx: r[3] })),
      integ: INTEG_START.map(r => ({ name: r[0], type: r[1], cx: r[2], icon: r[3] })),
      more: Object.fromEntries(Object.entries(MORE_TABLES).map(([k, rows]) => [k, Object.fromEntries(rows.map(r => [r, 'Medium']))])),
      tests: { ...TESTS }, others: Object.fromEntries(OTHERS.map(o => [o, 'Medium'])),
      answers: [true, false, false], askedAriba: false, access: ['John Doe (Owner)'],
    }, o);
  };
  const FILLED_KEYS = { tech: 'SAP', industry: 'Government & Public Services', type: 'Greenfield Implementation', sector: 'Construction', scope: 'All', geo: 'India', pm: 'Waterfall', approach: 'Top Down' };
  const seed = () => ['Healthcare', 'Healthcare', 'Consumer', 'Consumer', 'Consumer', 'Consumer', 'Consumer'].map((ind, i) => newEstimate({
    id: String(19085101 + i), modules: [...MODULES_START, 'Human Capital Management'], config: i % 2 ? 'default' : 'custom', listName: 'Sales Estimation', listClient: 'Deloitte', listIndustry: ind,
    keys: { ...FILLED_KEYS }, details: { name: 'ABC SAP', client: 'ABC Construction Ltd', desc: 'Creating a Sales ERP', leader: 'John Doe', purpose: 'Estimation' },
  }));

  let S;
  try { S = JSON.parse(sessionStorage.getItem('estima')); } catch (e) { S = null; }
  if (!S || !S.estimates) S = { user: null, estimates: seed(), draft: null, q: '' };
  const save = () => { try { sessionStorage.setItem('estima', JSON.stringify(S)); } catch (e) { /* private mode: state lives for this visit only */ } };

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = n => (Math.round(n * 100) / 100).toString();
  const app = document.getElementById('app');
  const go = h => { if (location.hash === h) render(); else location.hash = h; };

  let toastTimer;
  const toast = msg => {
    const t = document.getElementById('toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  };

  // ---------- effort model ----------
  const modeOf = list => {
    const n = {}; list.forEach(l => n[l] = (n[l] || 0) + 1);
    return LEVELS.reduce((best, l) => (n[l] || 0) >= (n[best] || 0) && n[l] ? l : best, list[0] || 'Medium'); // ties go to the higher level
  };
  const levelOfScore = s => LEVELS[Math.max(0, Math.min(3, Math.round(s)))];
  const calc = e => {
    const mods = e.modules.map(m => ({ name: m, cx: e.modCx[m] || 'Medium', pd: (MOD_BASE[m] || 90) * LEVEL_F[e.modCx[m] || 'Medium'] }));
    const cols = RICEFW_TYPES.map(t => { const rows = e.ricefw.filter(r => r.type === t).map(r => r.cx); return { type: t, cx: rows.length ? modeOf(rows) : 'Low' }; });
    const ricefwTotal = e.modules.length * cols.reduce((s, c) => s + RICEFW_PD[c.cx], 0);
    const modTotal = mods.reduce((s, m) => s + m.pd, 0);
    const custom = e.config === 'custom';
    const total = custom ? ricefwTotal : modTotal;
    const scale = total / (custom ? 1535.4 : 665.41);
    const [loader, multiLang, oats] = e.answers;
    const phases = PHASES.map(([n, cx, pd]) => {
      let f = scale;
      if (n === 'Deployment' && !loader) f *= 1.25;
      if (multiLang && (n === 'Development' || n === 'Testing')) f *= n === 'Development' ? 1.15 : 1.1;
      if (oats && n === 'Testing') f *= .8;
      return { name: n, cx, pd: pd * f };
    });
    const integPd = e.integ.reduce((s, r) => s + INTEG_PD[r.cx], 0);
    const integScore = e.integ.reduce((s, r) => s + LEVELS.indexOf(r.cx), 0) / Math.max(1, e.integ.length);
    const nfr = { Low: 1.09, Medium: 2.18, High: 3.27, 'Very High': 4.36 }[e.others.NFR];
    const nonFn = [
      { name: 'Integration', cx: levelOfScore(integScore + .6), pd: integPd },
      { name: 'Environment Factors', cx: modeOf(Object.values(e.more['Environment Complexity'])), pd: 4.36 * LEVEL_F[modeOf(Object.values(e.more['Environment Complexity']))] },
      { name: 'NFR', cx: e.others.NFR, pd: nfr },
    ];
    const lv = custom ? cols.map(c => c.cx) : mods.map(m => m.cx);
    const overall = levelOfScore(lv.reduce((s, l) => s + LEVELS.indexOf(l), 0) / Math.max(1, lv.length) - .01);
    return { mods, cols, total, custom, phases, nonFn, overall };
  };

  // ---------- small builders ----------
  const DD = {}; let ddN = 0;
  const dropdown = ({ label, options, value, onPick, cls = '', err, placeholder = 'Select', multi }) => {
    const k = 'dd' + (ddN++); DD[k] = { onPick, multi };
    const shown = multi ? placeholder : (value || placeholder);
    return `<div class="dd ${cls}" data-dd="${k}">
      <div class="fld${err ? ' err' : ''}" tabindex="0" role="button" aria-haspopup="listbox">${label ? `<span class="lg">${esc(label)}</span>` : ''}
        <span class="val${value && !multi ? ' set' : ''}">${esc(shown)}</span>${I.down}${err ? `<span class="msg">${esc(err)}</span>` : ''}</div>
      <div class="list" role="listbox">${options.map(o => {
        const on = multi ? (value || []).includes(o) : o === value;
        return `<button class="opt${on ? ' on' : ''}" data-opt="${esc(o)}" role="option" aria-selected="${on}">${esc(o)}${on ? '<span class="tick on"></span>' : ''}</button>`;
      }).join('')}</div></div>`;
  };
  const field = (label, path, value, { ta, type = 'text', icon = '', err } = {}) => `<div class="fld${ta ? ' ta' : ''}${err ? ' err' : ''}"><span class="lg">${esc(label)}</span>
      ${ta ? `<textarea data-bind="${path}" rows="3">${esc(value)}</textarea>` : `<input type="${type}" data-bind="${path}" value="${esc(value)}">`}${icon}${err ? `<span class="msg">${esc(err)}</span>` : ''}</div>`;
  const sec = (h, p, extra = '') => `<div class="sec"><div class="grow"><h2>${h}</h2>${p ? `<p>${p}</p>` : ''}</div>${extra}</div>`;
  const ticks = (path, cur, ro) => LEVELS.map(l => `<td><button class="tick${cur === l ? ' on' : ''}" ${ro ? 'tabindex="-1"' : `data-act="tick" data-path="${esc(path)}" data-v="${l}"`} aria-label="${l}" aria-pressed="${cur === l}"></button></td>`).join('');
  const acc = (title, inner, open, key) => `<div class="acc${open ? ' open' : ''}" data-acc="${esc(key || title)}"><button class="accHead" data-act="acc">${esc(title)}${I.up}</button><div class="accBody">${inner}</div></div>`;
  const openAcc = new Set(['Module Productivity Figures', 'RICEFW Objects Productivity Figures', 'Testing Productivity Figures', 'Integrations Complexity', 'Testing Complexity', 'Total Effort', 'Phase', 'NonFn', 'Others']);
  const btns = (prev, next, { saveBtn = true, nextLabel = 'Next' } = {}) => `<div class="foot">
      ${prev ? `<button class="btn back" data-act="nav" data-to="${prev}">Prev</button>` : ''}
      ${saveBtn ? '<button class="btn" data-act="save">Save</button>' : ''}
      ${next ? `<button class="btn go" data-act="${next}">${nextLabel}</button>` : ''}</div>`;

  const topbar = () => `<header class="top"><div class="wrap">
      <button class="logo" data-act="nav" data-to="#/home" aria-label="Home (company logo blurred)"></button>
      <nav class="links"><a href="#" data-act="soon">Terms of Use</a> | <a href="#" data-act="soon">Privacy</a> | <a href="#" data-act="soon">Copyright</a></nav>
      <button class="ic" data-act="search" aria-label="Search estimates">${I.search}</button>
      <div style="position:relative"><button class="ic" data-act="usermenu" aria-label="Account">${I.user}</button>
        ${UI.userMenu ? `<div class="menu"><div class="who">Signed in as ${esc(S.user)}</div><button data-act="signout">${I.out}Sign out</button></div>` : ''}</div>
    </div></header>`;
  const STEP_CRUMBS = [['Create New Estimate', '#/new'], ['SAP Modules', '#/modules'], ['SAP Objects', '#/objects'], ['Object Complexity', '#/complexity'], ['Other Estimation Factors', '#/factors'], ['Estimate', '#/result']];
  const sub = (trail, title) => `<div class="sub"><div class="wrap">
      <div class="crumbs"><button data-act="nav" data-to="#/home">Home</button>${trail.map(([t, h], i) => `<i>/</i>${i === trail.length - 1 ? `<span class="cur">${esc(t)}</span>` : `<button data-act="nav" data-to="${h}">${esc(t)}</button>`}`).join('')}</div>
      <div class="title"><button data-act="back" aria-label="Back">${I.left}</button>${esc(title)}</div></div></div>`;
  const stepTrail = upto => STEP_CRUMBS.slice(0, STEP_CRUMBS.findIndex(c => c[0] === upto) + 1);

  // ---------- screens ----------
  const UI = { userMenu: false, kebab: false, modal: null, errors: {}, addMods: false, addObjs: false, newObj: '' };

  const login = () => `<div class="login"><div class="logo" role="img" aria-label="Company logo (blurred)"></div>
    <form data-form="login" novalidate>
      <h1>Estima</h1><p class="tag">Intelligent Estimation System.</p>
      <h2>Sign in to your account</h2><p class="wel">Welcome. Please sign in to access your account.</p>
      <div class="fld"><span class="lg">Username</span>${I.person}<input name="u" value="John Doe" autocomplete="off" aria-label="Username"></div>
      <div class="fld"><span class="lg">Password</span>${I.key}<input name="p" type="password" value="estima-demo" autocomplete="off" aria-label="Password"><button type="button" data-act="peek" aria-label="Show password">${I.eye}</button></div>
      ${UI.errors.login ? `<p class="err">${esc(UI.errors.login)}</p>` : ''}
      <div class="row"><a href="#" data-act="forgot">Forgot password?</a><label><input type="checkbox" checked> Remember me</label></div>
      <button class="signin" type="submit">Sign in</button>
    </form></div>`;

  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
  const estRows = list => list.map(e => `<tr class="link" data-act="open" data-id="${e.id}" tabindex="0">
      <td class="id">${e.id}</td><td>${esc(e.listName || e.details.name)}</td><td>${esc(e.listClient || e.details.client)}</td><td>${esc(e.keys.tech || 'SAP')}</td><td>${esc(e.listIndustry || e.keys.industry || '—')}</td><td>${esc(e.details.leader)}</td></tr>`).join('');
  const estTable = list => `<div class="tblwrap scroll"><table class="tbl"><thead><tr><th>Estimate ID</th><th>Estimate Name</th><th>Client</th><th>Technology</th><th>Industry</th><th>Opportunity Leader</th></tr></thead>
      <tbody>${list.length ? estRows(list) : '<tr><td colspan="6" class="muted">No estimates match your search.</td></tr>'}</tbody></table></div>`;
  const ACTS = [
    ['create.jpg', 'Create New Estimate', 'Start a new estimate with ease and generate estimates effortlessly.', 'create'],
    ['directory.jpg', 'Estimate Directory', 'Track or use the existing directory to view, copy or import estimates.', 'directory'],
    ['analytics.jpg', 'Estimation Data Models & Analytics', 'Dynamically analyze your estimates using data modeling and generative AI.', 'soon'],
    ['track.jpg', 'Track My Estimates', 'Keep track of your estimates on your tools for seamless integrated experiences.', 'soon'],
    ['collaborate.jpg', 'Collaborate On Estimates', 'Collaborate with multiple teams for large transformation projects.', 'soon'],
  ];
  const home = () => `${topbar()}<div class="sub"><div class="wrap hello"><b>${greet}, ${esc(S.user)}! ${wave}</b><p>What would you like to do today?</p></div></div>
    <main class="wrap"><section class="card">${sec('My Activities')}
      <div class="acts">${ACTS.map(([img, h, p, act]) => `<button class="act" data-act="${act}"><img src="img/${img}" alt=""><h3>${h}</h3><p>${p}</p><span class="btn go">Get started</span></button>`).join('')}</div>
      ${sec('My Work In-Progress Estimates')}${estTable(S.estimates.filter(e => e.status !== 'Approved').slice(0, 6))}</section></main>`;

  const directory = () => {
    const q = S.q.trim().toLowerCase();
    const list = S.estimates.filter(e => !q || [e.id, e.listName, e.details.name, e.listClient, e.details.client, e.keys.industry, e.listIndustry, e.details.leader].join(' ').toLowerCase().includes(q));
    return `${topbar()}${sub([['Estimate Directory', '#/directory']], 'Estimate Directory')}
    <main class="wrap"><section class="card">${sec('Estimates', 'Choose an estimate to view the estimate details.',
      `<div class="fld" style="width:240px"><span class="lg">Search</span><input data-act-input="q" value="${esc(S.q)}" placeholder="ID, name, client…"></div>`)}
      <div style="height:18px"></div>${estTable(list)}${btns('#/home', null, { saveBtn: false })}</section></main>`;
  };

  // Create New Estimate (details + key elements)
  const details = () => {
    const d = S.draft, er = UI.errors;
    const key = k => { const [id, label, opts] = KEYS.find(x => x[0] === k); return dropdown({ label, options: opts, value: d.keys[id], err: er[id], onPick: v => { d.keys[id] = v; delete er[id]; } }); };
    return `${topbar()}${sub(stepTrail('Create New Estimate'), 'Create New Estimate')}
    <main class="wrap"><section class="card">${sec('New Estimate Details', 'Enter the required estimate details here. All fields are mandatory.')}
      <div class="body"><div class="grid2">
        ${field('Estimate ID', 'id', d.id)}${field('Client Name', 'details|client', d.details.client, { err: er.client })}
        ${field('Estimate Name', 'details|name', d.details.name, { err: er.name })}${field('Opportunity Leader', 'details|leader', d.details.leader, { err: er.leader })}
        ${field('Description', 'details|desc', d.details.desc, { ta: true })}
        <div>${field('Purpose', 'details|purpose', d.details.purpose)}<div style="text-align:right;margin-top:32px"><button class="btn go wide" data-act="nav" data-to="#/setup">Estimate Setup</button></div></div>
      </div></div>
      ${sec('Key Estimation Elements', 'Enter the required model details here. All fields are mandatory.')}
      <div class="body"><div class="grid2">${KEY_ORDER.map(key).join('')}</div></div>
      ${btns('#/home', 'toModules')}</section></main>`;
  };

  // Estimate setup (configuration + productivity figures)
  const figTable = (title, head, rows) => acc(title, `<div class="scroll"><table class="tbl"><thead><tr><th>${head}</th>${LEVELS.map(l => `<th>${l}</th>`).join('')}</tr></thead><tbody>
      ${rows.map(r => `<tr><td class="muted">${esc(r)}</td>${LEVELS.map(l => { const p = `${title}|${r}|${l}`; return `<td><input class="slot" inputmode="decimal" aria-label="${esc(r)} ${l}" data-fig="${esc(p)}" value="${esc(S.draft.setup.figs[p] || '')}"></td>`; }).join('')}</tr>`).join('')}</tbody></table></div>`, openAcc.has(title));
  const setup = () => {
    const st = S.draft.setup;
    return `${topbar()}${sub([['Create New Estimate', '#/new'], ['Estimate Setup', '#/setup']], 'Create New Estimate')}
    <main class="wrap"><section class="card">${sec('Estimate Configuration', 'Enter the required estimate configuration details here. All fields are mandatory.')}
      <div class="body cfg">
        <span class="muted" style="color:var(--grey)">From</span>${field('Calendar', 'setup|from', st.from, { type: 'date' })}
        <span style="color:var(--grey)">To</span>${field('Calendar', 'setup|to', st.to, { type: 'date' })}
        <span style="color:var(--grey)">From</span>${dropdown({ label: 'Start Time', options: TIMES.slice(0, 5), value: st.start, onPick: v => st.start = v })}
        <span style="color:var(--grey)">To</span>${dropdown({ label: 'End Time', options: TIMES.slice(5), value: st.end, onPick: v => st.end = v })}
      </div>
      ${sec('Functional Productivity Figures', 'Enter the required functional productivity figures here. All fields are mandatory.')}
      ${figTable('Module Productivity Figures', 'Module', S.draft.modules.map(m => SHORTNAME[m] || m))}
      ${figTable('RICEFW Objects Productivity Figures', 'RICEFW Objects', RICEFW_TYPES)}
      ${figTable('Agile Story Points Productivity Figures', 'Story Size', ['Small', 'Medium', 'Large'])}
      ${figTable('Integration Productivity Figures', 'Integrations', INTEG_START.map(r => r[0]))}
      ${figTable('Procurement Productivity Figures', 'Procurement', MORE_TABLES['Procurement Complexity'])}
      ${figTable('Data Migration Productivity Figures', 'Data Migration', MORE_TABLES['Data Migration Complexity'])}
      ${figTable('Testing Productivity Figures', 'Testing', Object.keys(TESTS))}
      ${figTable('Environment Productivity Figures', 'Environment', MORE_TABLES['Environment Complexity'])}
      ${acc('Other Productivity Figures', OTHERS.filter(o => o !== 'Training').map(o => figTable(o, o, ['Productivity (PD)'])).join(''))}
      ${btns('#/new', 'toModules')}</section></main>`;
  };

  // chips (modules / objects)
  const chips = (list, kind, ro) => `<div class="chipbox">${list.length ? list.map((c, i) => `<span class="chip${UI['sel' + kind] === c || (!UI['sel' + kind] && i === 0) ? ' on' : ''}" data-act="${ro ? '' : 'chip'}" data-kind="${kind}" data-v="${esc(c)}">${esc(c)}${ro ? '' : `<button data-act="rm" data-kind="${kind}" data-v="${esc(c)}" aria-label="Remove ${esc(c)}">${I.x}</button>`}</span>`).join('') : `<span class="empty">Nothing selected yet. Use “Add more” to pick from the list.</span>`}</div>`;
  const modules = () => {
    const d = S.draft;
    return `${topbar()}${sub(stepTrail('SAP Modules'), 'Create New Estimate')}
    <main class="wrap"><section class="card">${sec('SAP Modules', 'Enter the required SAP modules. Use the cancel option to remove modules from selection.')}
      ${chips(d.modules, 'mod')}${UI.errors.mods ? `<p style="color:var(--red);font-size:12px;margin:8px 24px 0">${UI.errors.mods}</p>` : ''}
      <div style="padding:18px 24px"><button class="btn sm" data-act="addMods">${I.plus} Add more</button></div>
      ${UI.addMods ? `${sec('Add SAP Modules', 'Enter the required SAP modules. Use the cancel option to remove modules from selection.')}
        <div class="body"><div class="addrow">${dropdown({ label: 'SAP Modules', options: [...MODULES_START, ...MODULES_MORE], value: d.modules, multi: true, placeholder: 'Select one or more', onPick: v => toggle(d.modules, v, 'mod') })}</div></div>` : ''}
      ${btns('#/new', 'toObjects')}</section></main>`;
  };
  const objects = () => {
    const d = S.draft;
    return `${topbar()}${sub(stepTrail('SAP Objects'), 'Create New Estimate')}
    <main class="wrap"><section class="card">${sec('SAP Objects', 'Enter the required SAP Objects. Use the cancel option to remove objects from selection.')}
      ${chips(d.objects, 'obj')}
      <div style="padding:18px 24px"><button class="btn sm" data-act="addObjs">${I.plus} Add more</button></div>
      ${UI.addObjs ? `${sec('Add SAP Objects', 'Enter the required SAP Objects. Use the cancel option to remove objects from selection.')}
        <div class="body"><div class="addrow">${dropdown({ label: 'SAP Objects', options: [...OBJECTS_START, ...OBJECTS_MORE], value: d.objects, multi: true, placeholder: 'Select', onPick: v => { toggle(d.objects, v, 'obj'); if (d.objects.includes(v) && !d.askedAriba && !d.objects.includes('Ariba')) { d.askedAriba = true; UI.modal = 'ariba'; } } })}
          <div class="fld"><span class="lg">SAP New Objects</span><input data-act-input="newObj" value="${esc(UI.newObj)}" placeholder="Type"></div>
          <button class="btn sm" data-act="addObj">${I.plus} Add</button></div></div>` : ''}
      ${btns('#/modules', 'toComplexity')}</section></main>`;
  };
  const toggle = (list, v, kind) => { const i = list.indexOf(v); if (i >= 0) list.splice(i, 1); else { list.push(v); UI['sel' + kind] = v; } if (kind === 'mod') syncModCx(); };
  const syncModCx = () => { const d = S.draft; d.modules.forEach(m => { if (!d.modCx[m]) d.modCx[m] = MOD_START_CX[m] || 'Medium'; }); };

  const modTable = (e, ro) => `<div class="scroll${ro ? ' ro' : ''}"><table class="tbl c"><thead><tr><th>ID</th><th>Module</th><th>Description</th>${LEVELS.map(l => `<th>${l}</th>`).join('')}</tr></thead><tbody>
      ${e.modules.map((m, i) => `<tr><td class="id">M${String(i + 1).padStart(3, '0')}</td><td>${esc(SHORTNAME[m] || m)}</td><td>Desc ${i + 1}</td>${ticks('modCx|' + m, e.modCx[m], ro)}</tr>`).join('')}</tbody></table></div>`;
  const complexity = () => `${topbar()}${sub(stepTrail('Object Complexity'), 'Create New Estimate')}
    <main class="wrap"><section class="card">${sec('Module Level Complexity', 'Enter the required module complexity. Choose a complexity.')}
      ${modTable(S.draft)}${btns('#/objects', 'askConfig')}</section></main>`;

  const ricefwTable = (e, ro) => `<div class="scroll${ro ? ' ro' : ''}"><table class="tbl c"><thead><tr><th>ID</th><th>RICEFW Object</th><th>Description</th><th>RICEFW</th>${LEVELS.map(l => `<th>${l}</th>`).join('')}</tr></thead><tbody>
      ${e.ricefw.map((r, i) => `<tr><td class="id">${r.id}</td><td>${esc(r.obj)}</td><td>Desc 1</td><td>${ro ? `<span class="lvl">${RICEFW_ONE[r.type]}</span>` : dropdown({ options: RICEFW_TYPES.map(t => RICEFW_ONE[t]), value: RICEFW_ONE[r.type], cls: 'mini', onPick: v => { r.type = RICEFW_TYPES.find(t => RICEFW_ONE[t] === v); } })}</td>${ticks('ricefw|' + i + '|cx', r.cx, ro)}</tr>`).join('')}</tbody></table></div>`;
  const ricefw = () => `${topbar()}${sub(stepTrail('Object Complexity'), 'Create New Estimate')}
    <main class="wrap"><section class="card">${sec('RICEFW', 'Enter the required RICEFW. Choose a complexity.')}
      ${ricefwTable(S.draft)}${btns('#/complexity', 'toFactors')}</section></main>`;

  // Other estimation factors
  const integTable = (e, ro) => `<div class="scroll${ro ? ' ro' : ''}"><table class="tbl c"><thead><tr><th>Integrations</th><th>Integration Type</th>${LEVELS.map(l => `<th>${l}</th>`).join('')}</tr></thead><tbody>
      ${e.integ.map((r, i) => `<tr><td class="muted"><span style="display:inline-flex;gap:8px;align-items:center">${I[r.icon || 'swap']}${r.custom && !ro ? `<input class="rowname" data-bind="integ|${i}|name" value="${esc(r.name)}" placeholder="Integration name">` : esc(r.name)}</span></td>
        <td>${ro ? esc(r.type) : dropdown({ options: INTEG_TYPES, value: r.type, cls: 'plain', onPick: v => r.type = v })}</td>${ticks('integ|' + i + '|cx', r.cx, ro)}</tr>`).join('')}</tbody></table></div>
      ${ro ? '' : `<div style="padding:16px 22px 22px"><button class="btn sm" data-act="addInteg">${I.plus} Add rows</button></div>`}`;
  const simpleTable = (head, obj, path, ro) => `<div class="scroll${ro ? ' ro' : ''}"><table class="tbl c"><thead><tr><th>${head}</th>${LEVELS.map(l => `<th>${l}</th>`).join('')}</tr></thead><tbody>
      ${Object.keys(obj).map(k => `<tr><td class="muted">${esc(k)}</td>${ticks(path + '|' + k, obj[k], ro)}</tr>`).join('')}</tbody></table></div>`;
  const factorBlocks = (e, ro) => `${acc('Integrations Complexity', integTable(e, ro), openAcc.has('Integrations Complexity'))}
      ${acc('Procurement Complexity', simpleTable('Procurement', e.more['Procurement Complexity'], 'more|Procurement Complexity', ro), openAcc.has('Procurement Complexity'))}
      ${acc('Data Migration Complexity', simpleTable('Data Migration', e.more['Data Migration Complexity'], 'more|Data Migration Complexity', ro), openAcc.has('Data Migration Complexity'))}
      ${acc('Testing Complexity', simpleTable('Testing', e.tests, 'tests', ro), openAcc.has('Testing Complexity'))}
      ${acc('Environment Complexity', simpleTable('Environment', e.more['Environment Complexity'], 'more|Environment Complexity', ro), openAcc.has('Environment Complexity'))}
      ${acc('Other Complexities', OTHERS.map(o => acc(o, simpleTable(o, { [o]: e.others[o] }, 'others', ro), openAcc.has(o))).join(''), openAcc.has('Other Complexities'))}`;
  const factors = () => `${topbar()}${sub(stepTrail('Other Estimation Factors'), 'Create New Estimate')}
    <main class="wrap"><section class="card">${sec('Other Estimation Complexities', 'Enter the required functional productivity complexities here. All fields are mandatory.')}
      ${factorBlocks(S.draft)}${btns(S.draft.config === 'custom' ? '#/ricefw' : '#/complexity', 'askQuestions', { saveBtn: false })}</section></main>`;

  // Estimate result / estimate view
  const effortBlocks = e => {
    const r = calc(e);
    const head = `<span>Total Effort<span style="margin-left:36px"><span class="lvl">${r.overall}</span> Complexity</span><span style="margin-left:24px"><span class="lvl">${fmt(r.total)}</span> Person days</span></span>`;
    const totalTbl = r.custom
      ? `<div class="scroll"><table class="tbl c"><thead><tr><th>RICEFW Objects /<br>Modules</th>${r.cols.map(c => `<th>${c.type}</th>`).join('')}</tr></thead><tbody>
          ${e.modules.map(m => `<tr><td class="muted">${esc(SHORTNAME[m] || m)}</td>${r.cols.map(c => `<td><span class="lvl">${SHORT[c.cx]}</span>&nbsp; <span class="big">${fmt(RICEFW_PD[c.cx])}</span> <span class="pd">PD</span></td>`).join('')}</tr>`).join('')}</tbody></table></div>
          <div class="totalRow"><span>Total</span><span class="pill">${fmt(r.total)} PD</span></div>
          <div class="legend"><b>L</b> - Low Complexity &nbsp;<b>M</b> - Medium Complexity &nbsp;<b>H</b> - High Complexity &nbsp;<b>VH</b> - Very High Complexity &nbsp;<b>PD</b> - Person Days</div>`
      : `<div class="scroll"><table class="tbl c"><thead><tr><th>Modules</th><th>Complexity</th><th>Efforts</th></tr></thead><tbody>
          ${r.mods.map(m => `<tr><td class="muted">${esc(SHORTNAME[m.name] || m.name)}</td><td class="lvl">${m.cx}</td><td>${fmt(m.pd)} PD</td></tr>`).join('')}</tbody></table></div>
          <div class="totalRow"><span>Total</span><span class="pill">${fmt(r.total)} PD</span></div>`;
    const rows3 = list => `<tbody>${list.map(p => `<tr><td class="muted">${esc(p.name)}</td><td class="lvl">${p.cx || ''}</td><td>${p.pd != null ? fmt(p.pd) + ' PD' : ''}</td></tr>`).join('')}</tbody>`;
    return `<div class="acc${openAcc.has('Total Effort') ? ' open' : ''}" data-acc="Total Effort"><button class="accHead" data-act="acc" style="font-size:15px">${head}${I.up}</button><div class="accBody">${totalTbl}</div></div>
      ${acc('Phase - wise Estimation Effort', `<div class="scroll"><table class="tbl c"><thead><tr><th>Phases</th><th>Complexity</th><th>Efforts</th></tr></thead>${rows3(r.phases)}</table></div>`, openAcc.has('Phase'), 'Phase')}
      ${acc('Non - Functional Estimation Effort', `<div class="scroll"><table class="tbl c"><thead><tr><th>Non - Functional</th><th>Complexity</th><th>Efforts</th></tr></thead>${rows3(r.nonFn)}</table></div>`, openAcc.has('NonFn'), 'NonFn')}
      ${acc('Other Estimation Effort', `<div class="scroll"><table class="tbl c"><thead><tr><th>Others</th><th>Complexity</th><th>Efforts</th></tr></thead>${rows3(['Contingencies', 'Risks', 'Dependencies', 'Assumptions'].map(n => ({ name: n, cx: e.others[n === 'Contingencies' ? 'Contingency' : n] || '' })))}</table></div>`, openAcc.has('Others'), 'Others')}`;
  };
  const kebab = items => `<div class="kebab"><button data-act="kebab" aria-label="More actions">${I.kebab}</button>
      ${UI.kebab ? `<div class="menu">${items.map(([ic, label, act]) => `<button data-act="${act}">${I[ic]}${label}</button>`).join('')}</div>` : ''}</div>`;
  const status = e => e.status === 'In progress' ? '' : `<span class="status${e.status === 'Approved' ? ' ok' : ''}">${esc(e.status)}</span>`;
  const keySummary = e => `<div class="sumbox">${[['type', 'Project Type', v => v.replace(' Implementation', '')], ['tech', 'Technology'], ['scope', 'Scope'], ['pm', 'PM Method'], [null, 'Estimation level', () => 'Detailed Estimation'], ['approach', 'Estimation Approach'], ['geo', 'Geography'], ['industry', 'Industry'], ['sector', 'Sector']]
      .map(([k, label, f]) => `<div><b>${esc(f ? f(k ? e.keys[k] : '') : e.keys[k] || '—')}</b><span>${label}</span></div>`).join('')}</div>`;
  const result = () => {
    const e = S.draft;
    return `${topbar()}${sub(stepTrail('Estimate'), 'Create New Estimate')}
    <main class="wrap"><section class="card">${sec(`New Estimate Details${status(e)}`, 'Required estimate details have been mentioned here.', kebab([['share', 'Manage Access', 'access'], ['send', 'Send for Approval', 'approve']]))}
      <div class="sumbox">${[[e.id, 'Estimate ID'], [e.details.name, 'Estimate Name'], [e.details.client, 'Client Name'], [e.details.leader, 'Opportunity Leader'], [e.details.purpose, 'Purpose'], [e.details.desc, 'Description']].map(([v, l]) => `<div><b>${esc(v)}</b><span>${l}</span></div>`).join('')}</div>
      ${sec('Key Estimation Elements', 'Required model details have been mentioned here.')}${keySummary(e)}
      ${effortBlocks(e)}
      <div class="foot"><button class="btn back" data-act="nav" data-to="#/factors">Prev</button><button class="btn" data-act="finish">Save &amp; close</button></div></section></main>`;
  };
  const view = id => {
    const e = S.estimates.find(x => x.id === id);
    if (!e) return directory();
    S.viewing = id;
    const ro = true;
    return `${topbar()}${sub([['Work In-Progress Estimates', '#/directory'], [e.id, '#/estimate/' + e.id]], 'Estimates')}
    <main class="wrap"><section class="card">${sec(`Estimate Details${status(e)}`, 'Enter the required estimate details here. All fields are mandatory.',
      kebab([['edit', 'Edit', 'edit'], ['share', 'Manage Access', 'access'], ['send', 'Send for Approval', 'approve'], ['xls', 'Export to Excel', 'excel'], ['pdf', 'Export to PDF', 'pdf']]))}
      <div class="body ro"><div class="grid2" style="pointer-events:none">
        ${field('Estimate ID', '', e.id)}${field('Client Name', '', e.details.client)}${field('Estimate Name', '', e.details.name)}${field('Opportunity Leader', '', e.details.leader)}
        ${field('Description', '', e.details.desc, { ta: true })}${field('Purpose', '', e.details.purpose)}</div></div>
      ${sec('Selected SAP Modules', 'Enter the required SAP modules. Use the cancel option to remove modules from selection.')}${chips(e.modules, 'vmod', ro)}<div style="height:22px"></div>
      ${e.config === 'custom' ? `${sec('Selected SAP Objects', 'Enter the required SAP Objects. Use the cancel option to remove objects from selection.')}${chips(e.objects, 'vobj', ro)}<div style="height:22px"></div>` : ''}
      ${sec('Module Level Complexity', 'Enter the required module complexity. Choose a complexity.')}${modTable(e, ro)}
      ${e.config === 'custom' ? `${sec('RICEFW', 'Enter the required RICEFW. Choose a complexity.')}${ricefwTable(e, ro)}` : ''}
      ${factorBlocks(e, ro)}${effortBlocks(e)}
      <div class="foot"><button class="btn back" data-act="nav" data-to="#/directory">Prev</button></div></section></main>`;
  };

  // ---------- dialogs ----------
  const modal = () => {
    const d = S.draft;
    if (UI.modal === 'ariba') return `<div class="scrim" data-act="closeModal"><div class="dlg" role="dialog" aria-modal="true" aria-labelledby="mt"><div class="badge">${I.cloud}</div>
      <h3 id="mt">Use an Existing Estimate</h3><p>Similar existing estimate uses Ariba. Do you want to add Ariba to the SAP Object list?</p>
      <div class="acts2"><button class="btn" data-act="closeModal">No</button><button class="btn go" data-act="addAriba">Yes, add!</button></div></div></div>`;
    if (UI.modal === 'config') return `<div class="scrim" data-act="closeModal"><div class="dlg" role="dialog" aria-modal="true" aria-labelledby="mt"><button class="x" data-act="closeModal" aria-label="Close">${I.x}</button>
      <h3 id="mt">Choose Estimate Configuration</h3><p>Select a single Estimation Configuration to move forward.</p>
      ${[['default', 'Default Object Configuration'], ['custom', 'Customized Object Configuration']].map(([v, l]) => `<button class="opt2${d.config === v ? ' on' : ''}" data-act="pickConfig" data-v="${v}">${l}<span class="tick${d.config === v ? ' on' : ''}"></span></button>`).join('')}
      <div class="end"><button class="btn go" data-act="confirmConfig">Confirm</button></div></div></div>`;
    if (UI.modal === 'questions') return `<div class="scrim" data-act="closeModal"><div class="dlg" role="dialog" aria-modal="true" aria-labelledby="mt"><button class="x" data-act="closeModal" aria-label="Close">${I.x}</button>
      <h3 id="mt">Create an accurate Estimation!</h3><p>Answer these questions to generate a near perfect estimate.</p>
      ${QUESTIONS.map((q, i) => `<div class="q">${q}<div class="yn">${[true, false].map(v => `<button data-act="answer" data-i="${i}" data-v="${v}"><span class="tick${d.answers[i] === v ? ' on' : ''}"></span>${v ? 'Yes' : 'No'}</button>`).join('')}</div></div>`).join('')}
      <div class="end"><button class="btn go" data-act="estimate">Estimate</button></div></div></div>`;
    if (UI.modal === 'access') { const e = current(); return `<div class="scrim" data-act="closeModal"><div class="dlg" role="dialog" aria-modal="true" aria-labelledby="mt"><button class="x" data-act="closeModal" aria-label="Close">${I.x}</button>
      <h3 id="mt">Manage Access</h3><p>People who can view and edit this estimate.</p>
      <div style="margin-top:14px">${e.access.map(a => `<div class="opt2" style="cursor:default">${esc(a)}<span style="color:var(--grey);font-size:12px">${a.includes('Owner') ? 'Owner' : 'Editor'}</span></div>`).join('')}</div>
      <div style="display:flex;gap:10px;margin-top:18px;align-items:center"><div class="fld" style="flex:1"><span class="lg">Add a teammate</span><input data-act-input="person" placeholder="Name"></div><button class="btn sm" data-act="addPerson">${I.plus} Add</button></div></div></div>`; }
    if (UI.modal === 'approve') return `<div class="scrim" data-act="closeModal"><div class="dlg" role="dialog" aria-modal="true" aria-labelledby="mt"><div class="badge">${I.send.replace('currentColor', '#e7661e')}</div>
      <h3 id="mt">Send for Approval?</h3><p>The estimate will be locked and sent to the delivery head for review.</p>
      <div class="acts2"><button class="btn" data-act="closeModal">Cancel</button><button class="btn go" data-act="sendApproval">Send</button></div></div></div>`;
    return '';
  };
  const current = () => (location.hash.startsWith('#/estimate/') ? S.estimates.find(x => x.id === S.viewing) : S.draft);

  // ---------- router ----------
  const WIZARD = { '#/new': details, '#/setup': setup, '#/modules': modules, '#/objects': objects, '#/complexity': complexity, '#/ricefw': ricefw, '#/factors': factors, '#/result': result };
  let lastRoute = '';
  function render() {
    const h = location.hash || '#/login';
    if (!S.user && h !== '#/login') { location.replace('#/login'); return; }
    if (h !== lastRoute) { UI.kebab = false; UI.userMenu = false; if (!UI.keepErrors) UI.errors = {}; UI.keepErrors = false; UI.addMods = false; UI.addObjs = false; }
    for (const k in DD) delete DD[k]; ddN = 0;
    let html;
    if (h === '#/login') html = login();
    else if (h === '#/home') html = home();
    else if (h === '#/directory') html = directory();
    else if (h.startsWith('#/estimate/')) html = view(h.split('/')[2]);
    else if (WIZARD[h]) { if (!S.draft) S.draft = newEstimate({ id: nextId() }); html = WIZARD[h](); }
    else { location.replace(S.user ? '#/home' : '#/login'); return; }
    app.innerHTML = html + modal();
    if (h !== lastRoute) window.scrollTo(0, 0);
    lastRoute = h;
    document.title = 'Estima — ' + (h === '#/login' ? 'Sign in' : h === '#/home' ? 'Home' : h === '#/directory' ? 'Estimate Directory' : h.startsWith('#/estimate') ? 'Estimate ' + h.split('/')[2] : 'Create New Estimate');
    save();
  }
  const nextId = () => { let n = 19085001; while (S.estimates.some(e => e.id === String(n))) n++; return String(n); };
  window.addEventListener('hashchange', render);

  const setPath = (path, v) => {
    const parts = path.split('|'); let o = current();
    for (let i = 0; i < parts.length - 1; i++) o = o[parts[i]];
    o[parts[parts.length - 1]] = v;
  };
  const validateDetails = () => {
    const d = S.draft, er = {};
    ['name', 'client', 'leader'].forEach(k => { if (!String(d.details[k]).trim()) er[k] = 'This field is required'; });
    KEYS.forEach(([k]) => { if (!d.keys[k]) er[k] = 'Please select an option'; });
    UI.errors = er; return !Object.keys(er).length;
  };

  // ---------- events ----------
  const ACT = {
    nav: el => go(el.dataset.to),
    back: () => { if (history.length > 1) history.back(); else go('#/home'); },
    soon: () => toast('This part isn’t included in the prototype.'),
    forgot: () => toast('Prototype: any password signs you in.'),
    peek: el => { const i = el.parentNode.querySelector('input'); i.type = i.type === 'password' ? 'text' : 'password'; },
    usermenu: () => { UI.userMenu = !UI.userMenu; render(); },
    signout: () => { S.user = null; UI.userMenu = false; go('#/login'); },
    search: () => { go('#/directory'); setTimeout(() => { const i = document.querySelector('[data-act-input="q"]'); i && i.focus(); }, 0); },
    create: () => { S.draft = newEstimate({ id: nextId() }); go('#/new'); },
    directory: () => { S.q = ''; go('#/directory'); },
    open: el => go('#/estimate/' + el.dataset.id),
    save: () => { upsert(); toast('Draft saved. You can find it under My Work In-Progress Estimates.'); },
    acc: el => { const a = el.closest('.acc'); a.classList.toggle('open'); const k = a.dataset.acc; a.classList.contains('open') ? openAcc.add(k) : openAcc.delete(k); },
    tick: el => { setPath(el.dataset.path, el.dataset.v); el.closest('tr').querySelectorAll('.tick').forEach(t => { const on = t === el; t.classList.toggle('on', on); t.setAttribute('aria-pressed', on); }); save(); },
    chip: el => { UI['sel' + el.dataset.kind] = el.dataset.v; render(); },
    rm: el => { const list = el.dataset.kind === 'mod' ? S.draft.modules : S.draft.objects; list.splice(list.indexOf(el.dataset.v), 1); render(); },
    addMods: () => { UI.addMods = !UI.addMods; render(); },
    addObjs: () => { UI.addObjs = !UI.addObjs; render(); },
    addObj: () => { const v = UI.newObj.trim(); if (!v) return toast('Type a name for the new SAP object first.'); if (!S.draft.objects.includes(v)) S.draft.objects.push(v); UI.selobj = v; UI.newObj = ''; render(); },
    addAriba: () => { if (!S.draft.objects.includes('Ariba')) S.draft.objects.push('Ariba'); UI.selobj = 'Ariba'; UI.modal = null; render(); toast('Ariba added from a similar estimate.'); },
    closeModal: (el, ev) => { if (el.classList.contains('scrim') && ev.target !== el) return; UI.modal = null; render(); },
    toModules: () => { if (!validateDetails()) { if (location.hash === '#/setup') { UI.keepErrors = true; toast('Please fill in all the mandatory fields.'); return go('#/new'); } render(); toast('Please fill in all the mandatory fields.'); const f = document.querySelector('.fld.err'); f && f.scrollIntoView({ block: 'center', behavior: 'smooth' }); return; } go('#/modules'); },
    toObjects: () => { if (!S.draft.modules.length) { UI.errors.mods = 'Select at least one SAP module.'; return render(); } go('#/objects'); },
    toComplexity: () => go('#/complexity'),
    askConfig: () => { UI.modal = 'config'; render(); },
    pickConfig: el => { S.draft.config = el.dataset.v; render(); },
    confirmConfig: () => { UI.modal = null; go(S.draft.config === 'custom' ? '#/ricefw' : '#/factors'); },
    toFactors: () => go('#/factors'),
    addInteg: () => { S.draft.integ.push({ name: '', type: 'API', cx: 'Medium', icon: 'swap', custom: true }); render(); const ins = document.querySelectorAll('.rowname'); ins.length && ins[ins.length - 1].focus(); },
    askQuestions: () => { UI.modal = 'questions'; render(); },
    answer: el => { S.draft.answers[+el.dataset.i] = el.dataset.v === 'true'; render(); },
    estimate: () => { UI.modal = null; upsert(); go('#/result'); },
    finish: () => { upsert(); toast(`Estimate ${S.draft.id} saved.`); S.draft = null; go('#/home'); },
    kebab: () => { UI.kebab = !UI.kebab; render(); },
    access: () => { UI.kebab = false; UI.modal = 'access'; render(); },
    addPerson: () => { const i = document.querySelector('[data-act-input="person"]'); const v = i && i.value.trim(); if (!v) return; current().access.push(v); upsertCurrent(); render(); toast(`${v} can now edit this estimate.`); },
    approve: () => { UI.kebab = false; UI.modal = 'approve'; render(); },
    sendApproval: () => { current().status = 'Sent for approval'; upsertCurrent(); UI.modal = null; render(); toast('Sent for approval.'); },
    edit: () => { const e = current(); S.draft = clone(e); go('#/new'); },
    excel: () => { UI.kebab = false; exportCsv(current()); render(); },
    pdf: () => { UI.kebab = false; render(); setTimeout(() => window.print(), 50); },
  };
  const upsert = () => { const d = clone(S.draft); const i = S.estimates.findIndex(e => e.id === d.id); if (i >= 0) S.estimates[i] = Object.assign(S.estimates[i], d); else S.estimates.unshift(d); save(); };
  const upsertCurrent = () => { if (current() === S.draft) upsert(); else save(); };
  const exportCsv = e => {
    const r = calc(e), rows = [['Estimate ID', e.id], ['Estimate Name', e.details.name], ['Client', e.details.client], ['Opportunity Leader', e.details.leader], [], ['Module', 'Complexity', 'Effort (PD)'], ...r.mods.map(m => [m.name, m.cx, fmt(m.pd)]), [], ['Phase', 'Complexity', 'Effort (PD)'], ...r.phases.map(p => [p.name, p.cx, fmt(p.pd)]), [], ['Total effort (PD)', fmt(r.total)]];
    const csv = rows.map(row => row.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = `estimate-${e.id}.csv`; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000); toast('Exported to a spreadsheet file.');
  };

  document.addEventListener('click', ev => {
    // dropdowns
    const ddEl = ev.target.closest('.dd');
    document.querySelectorAll('.dd.open').forEach(o => { if (o !== ddEl) o.classList.remove('open'); });
    if (ddEl) {
      const opt = ev.target.closest('.opt');
      if (opt) { const k = ddEl.dataset.dd, multi = DD[k].multi; DD[k].onPick(opt.dataset.opt); render(); if (multi && !UI.modal) { const again = document.querySelector(`[data-dd="${k}"]`); again && again.classList.add('open'); } return; }
      if (ev.target.closest('.fld')) { ddEl.classList.toggle('open'); return; }
    }
    if (UI.kebab && !ev.target.closest('.kebab')) { UI.kebab = false; render(); }
    if (UI.userMenu && !ev.target.closest('.top')) { UI.userMenu = false; render(); }
    const el = ev.target.closest('[data-act]');
    if (!el || !ACT[el.dataset.act]) return;
    if (el.tagName === 'A') ev.preventDefault();
    ACT[el.dataset.act](el, ev);
  });
  document.addEventListener('keydown', ev => {
    if (ev.key === 'Escape') { if (UI.modal) { UI.modal = null; render(); } document.querySelectorAll('.dd.open').forEach(o => o.classList.remove('open')); }
    if ((ev.key === 'Enter' || ev.key === ' ') && ev.target.matches('.dd > .fld, tr.link')) { ev.preventDefault(); ev.target.click(); }
    if (ev.key === 'Enter' && ev.target.matches('[data-act-input="newObj"]')) ACT.addObj();
    if (ev.key === 'Enter' && ev.target.matches('[data-act-input="person"]')) ACT.addPerson();
  });
  document.addEventListener('input', ev => {
    const t = ev.target;
    if (t.dataset.bind) { setPath(t.dataset.bind, t.value); const f = t.closest('.fld'); if (f && f.classList.contains('err') && t.value.trim()) { f.classList.remove('err'); const m = f.querySelector('.msg'); m && m.remove(); } save(); }
    if (t.dataset.fig) { S.draft.setup.figs[t.dataset.fig] = t.value; save(); }
    if (t.dataset.actInput === 'newObj') UI.newObj = t.value;
    if (t.dataset.actInput === 'q') { S.q = t.value; const pos = t.selectionStart; render(); const i = document.querySelector('[data-act-input="q"]'); i.focus(); i.setSelectionRange(pos, pos); }
  });
  document.addEventListener('submit', ev => {
    if (ev.target.dataset.form !== 'login') return;
    ev.preventDefault();
    const u = ev.target.u.value.trim(), p = ev.target.p.value;
    if (!u || !p) { UI.errors.login = 'Enter a username and password to continue.'; render(); return; }
    S.user = u; UI.errors = {}; go('#/home');
  });

  render();
})();
