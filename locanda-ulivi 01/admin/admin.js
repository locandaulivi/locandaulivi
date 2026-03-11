// ============================================================
//  LOCANDA ULIVI – admin.js
// ============================================================

const DEFAULT_PWD = 'ulivi2025';
const PWD_KEY     = 'locanda_admin_pwd';
const AUTH_KEY    = 'locanda_admin_auth';

// ---- AUTH ----
function getStoredPwd() { return localStorage.getItem(PWD_KEY) || DEFAULT_PWD; }
function isAuth()       { return sessionStorage.getItem(AUTH_KEY) === 'ok'; }
function doLogin()      { sessionStorage.setItem(AUTH_KEY, 'ok'); }
function doLogout()     { sessionStorage.removeItem(AUTH_KEY); location.reload(); }

document.addEventListener('DOMContentLoaded', () => {
  if (isAuth()) { showPanel(); }
  else {
    const btn   = document.getElementById('btn-login');
    const input = document.getElementById('pwd-input');
    btn.addEventListener('click', tryLogin);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') tryLogin(); });
  }
});

function tryLogin() {
  const pwd = document.getElementById('pwd-input').value;
  if (pwd === getStoredPwd()) { doLogin(); showPanel(); }
  else { toast('Password errata', true); document.getElementById('pwd-input').value = ''; }
}

function showPanel() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('admin-panel').style.display  = 'grid';
  document.getElementById('btn-logout').addEventListener('click', doLogout);
  document.getElementById('btn-save-top').addEventListener('click', saveAll);
  initSidebar();
  loadSection('info');
}

// ---- SIDEBAR ----
function initSidebar() {
  document.querySelectorAll('.snav').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.snav').forEach(x => x.classList.remove('active'));
      a.classList.add('active');
      loadSection(a.dataset.section);
    });
  });
}

const SECTION_TITLES = {
  info: 'Info Generali', orari: 'Orari', pranzo: 'Pranzo di Lavoro',
  menu: 'Menu', vini: 'Vini', foto: 'Foto Galleria',
  stemma: 'Stemma Locanda', prenotazioni: 'Prenotazioni', sicurezza: 'Sicurezza'
};

function loadSection(key) {
  document.getElementById('section-title').textContent = SECTION_TITLES[key] || key;
  const c = document.getElementById('admin-content');
  const d = loadData();
  switch(key) {
    case 'info':          c.innerHTML = buildInfo(d); break;
    case 'orari':         c.innerHTML = buildOrari(d); break;
    case 'pranzo':        c.innerHTML = buildPranzo(d); break;
    case 'menu':          c.innerHTML = buildMenu(d); bindMenu(); break;
    case 'vini':          c.innerHTML = buildVini(d); bindVini(); break;
    case 'foto':          c.innerHTML = buildFoto(d); bindFoto(); break;
    case 'stemma':        c.innerHTML = buildStemma(d); bindStemma(); break;
    case 'prenotazioni':  c.innerHTML = buildPrenotazioni(); break;
    case 'sicurezza':     c.innerHTML = buildSicurezza(); bindSicurezza(); break;
  }
}

// ---- SAVE ALL ----
function saveAll() {
  const d = loadData();
  const section = document.querySelector('.snav.active')?.dataset.section || 'info';
  collectSection(section, d);
  saveData(d);
  toast('✅ Modifiche salvate!');
}

function collectSection(key, d) {
  const v = id => { const el = document.getElementById(id); return el ? el.value : undefined; };
  switch(key) {
    case 'info':
      d.ristorante.nome        = v('i-nome')     || d.ristorante.nome;
      d.ristorante.tagline     = v('i-tagline')  || d.ristorante.tagline;
      d.ristorante.sottotitolo = v('i-sottotit') || d.ristorante.sottotitolo;
      d.ristorante.descrizione = v('i-desc')     || d.ristorante.descrizione;
      d.ristorante.via         = v('i-via')      || d.ristorante.via;
      d.ristorante.cap         = v('i-cap')      || d.ristorante.cap;
      d.ristorante.indirizzo   = (v('i-via')||d.ristorante.via) + ', ' + (v('i-cap')||d.ristorante.cap);
      d.ristorante.telefono    = v('i-tel')      || d.ristorante.telefono;
      d.ristorante.email       = v('i-email')    || d.ristorante.email;
      d.ristorante.piva        = v('i-piva')     || d.ristorante.piva;
      d.ristorante.facebook    = v('i-fb')       || d.ristorante.facebook;
      d.ristorante.instagram   = v('i-ig')       || d.ristorante.instagram;
      break;
    case 'orari':
      d.orari.pranzo.giorni  = v('o-pg') || d.orari.pranzo.giorni;
      d.orari.pranzo.orario  = v('o-po') || d.orari.pranzo.orario;
      d.orari.cena.giorni    = v('o-cg') || d.orari.cena.giorni;
      d.orari.cena.orario    = v('o-co') || d.orari.cena.orario;
      d.orari.chiusura       = v('o-ch') || d.orari.chiusura;
      break;
    case 'pranzo':
      d.pranzo_lavoro.titolo      = v('pl-tit')  || d.pranzo_lavoro.titolo;
      d.pranzo_lavoro.prezzo      = v('pl-prz')  || d.pranzo_lavoro.prezzo;
      d.pranzo_lavoro.descrizione = v('pl-desc') || d.pranzo_lavoro.descrizione;
      d.pranzo_lavoro.note        = v('pl-note') || d.pranzo_lavoro.note;
      d.pranzo_lavoro.incluso = [...document.querySelectorAll('.inc-input')].map(i => i.value).filter(Boolean);
      break;
    case 'menu':
      ['antipasti','primi','secondi','contorni','dolci'].forEach(cat => {
        d.menu[cat] = [...document.querySelectorAll(`.menu-item-row[data-cat="${cat}"]`)].map(row => ({
          nome:        row.querySelector('.mi-nome')?.value || '',
          prezzo:      row.querySelector('.mi-prz')?.value  || '',
          descrizione: row.querySelector('.mi-desc')?.value || ''
        })).filter(p => p.nome);
      });
      break;
    case 'vini':
      d.vini = [...document.querySelectorAll('.vino-row')].map(row => ({
        nome:        row.querySelector('.vn-nome')?.value  || '',
        tipo:        row.querySelector('.vn-tipo')?.value  || 'rosso',
        produttore:  row.querySelector('.vn-prod')?.value  || '',
        anno:        row.querySelector('.vn-anno')?.value  || '',
        prezzo:      row.querySelector('.vn-prz')?.value   || '',
        descrizione: row.querySelector('.vn-desc')?.value  || ''
      })).filter(v => v.nome);
      break;
  }
}

// ---- INFO ----
function buildInfo(d) {
  const r = d.ristorante;
  return `
  <div class="admin-card">
    <h3>🏠 Dati principali <small style="font-weight:400;color:#888;font-family:'Jost',sans-serif"> (* = modificabile)</small></h3>
    <div class="field-row">
      <div><label class="field-label">Nome ristorante <span class="star">*</span></label>
        <input class="admin-input" id="i-nome" value="${esc(r.nome)}"/></div>
      <div><label class="field-label">Tagline <span class="star">*</span></label>
        <input class="admin-input" id="i-tagline" value="${esc(r.tagline)}"/></div>
    </div>
    <label class="field-label">Sottotitolo <span class="star">*</span></label>
    <input class="admin-input" id="i-sottotit" value="${esc(r.sottotitolo)}"/>
    <label class="field-label">Descrizione (Chi Siamo) <span class="star">*</span></label>
    <textarea class="admin-input" id="i-desc" rows="4">${esc(r.descrizione)}</textarea>
  </div>
  <div class="admin-card">
    <h3>📍 Indirizzo e Contatti <span class="star">*</span></h3>
    <div class="field-row">
      <div><label class="field-label">Via / Località <span class="star">*</span></label>
        <input class="admin-input" id="i-via" value="${esc(r.via)}"/></div>
      <div><label class="field-label">CAP e Città <span class="star">*</span></label>
        <input class="admin-input" id="i-cap" value="${esc(r.cap)}"/></div>
    </div>
    <div class="field-row">
      <div><label class="field-label">Telefono <span class="star">*</span></label>
        <input class="admin-input" id="i-tel" type="tel" value="${esc(r.telefono)}"/></div>
      <div><label class="field-label">Email <span class="star">*</span></label>
        <input class="admin-input" id="i-email" type="email" value="${esc(r.email)}"/></div>
    </div>
    <label class="field-label">P.IVA <span class="star">*</span></label>
    <input class="admin-input" id="i-piva" value="${esc(r.piva)}"/>
  </div>
  <div class="admin-card">
    <h3>📲 Social Media <span class="star">*</span></h3>
    <div class="field-row">
      <div><label class="field-label">Facebook URL <span class="star">*</span></label>
        <input class="admin-input" id="i-fb" value="${esc(r.facebook)}"/></div>
      <div><label class="field-label">Instagram URL <span class="star">*</span></label>
        <input class="admin-input" id="i-ig" value="${esc(r.instagram)}"/></div>
    </div>
  </div>
  <button class="btn-green" onclick="saveSection('info')">💾 Salva Info</button>`;
}

// ---- ORARI ----
function buildOrari(d) {
  const o = d.orari;
  return `
  <div class="admin-card">
    <h3>☀️ Pranzo <span class="star">*</span></h3>
    <div class="field-row">
      <div><label class="field-label">Giorni <span class="star">*</span></label>
        <input class="admin-input" id="o-pg" value="${esc(o.pranzo.giorni)}"/></div>
      <div><label class="field-label">Orario <span class="star">*</span></label>
        <input class="admin-input" id="o-po" value="${esc(o.pranzo.orario)}"/></div>
    </div>
  </div>
  <div class="admin-card">
    <h3>🌙 Cena <span class="star">*</span></h3>
    <div class="field-row">
      <div><label class="field-label">Giorni <span class="star">*</span></label>
        <input class="admin-input" id="o-cg" value="${esc(o.cena.giorni)}"/></div>
      <div><label class="field-label">Orario <span class="star">*</span></label>
        <input class="admin-input" id="o-co" value="${esc(o.cena.orario)}"/></div>
    </div>
  </div>
  <div class="admin-card">
    <h3>⛔ Chiusura <span class="star">*</span></h3>
    <label class="field-label">Giorni di chiusura <span class="star">*</span></label>
    <input class="admin-input" id="o-ch" value="${esc(o.chiusura)}"/>
  </div>
  <button class="btn-green" onclick="saveSection('orari')">💾 Salva Orari</button>`;
}

// ---- PRANZO LAVORO ----
function buildPranzo(d) {
  const pl = d.pranzo_lavoro;
  const inc = pl.incluso.map((it,i) => `
    <div class="incluso-row">
      <input class="admin-input small inc-input" value="${esc(it)}"/>
      <button class="btn-danger" onclick="this.parentElement.remove()">✕</button>
    </div>`).join('');
  return `
  <div class="admin-card">
    <h3>🍽️ Pranzo di Lavoro <span class="star">*</span></h3>
    <div class="field-row">
      <div><label class="field-label">Titolo <span class="star">*</span></label>
        <input class="admin-input" id="pl-tit" value="${esc(pl.titolo)}"/></div>
      <div><label class="field-label">Prezzo <span class="star">*</span></label>
        <input class="admin-input" id="pl-prz" value="${esc(pl.prezzo)}"/></div>
    </div>
    <label class="field-label">Descrizione <span class="star">*</span></label>
    <textarea class="admin-input" id="pl-desc" rows="3">${esc(pl.descrizione)}</textarea>
    <label class="field-label">Incluso nel menu <span class="star">*</span></label>
    <div class="incluso-list" id="inc-list">${inc}</div>
    <button class="btn-secondary" onclick="addIncluso()">+ Aggiungi voce</button>
    <br/><br/>
    <label class="field-label">Note <span class="star">*</span></label>
    <input class="admin-input" id="pl-note" value="${esc(pl.note)}"/>
  </div>
  <button class="btn-green" onclick="saveSection('pranzo')">💾 Salva Pranzo di Lavoro</button>`;
}
function addIncluso() {
  const list = document.getElementById('inc-list');
  const div = document.createElement('div');
  div.className = 'incluso-row';
  div.innerHTML = `<input class="admin-input small inc-input" placeholder="Nuova voce"/><button class="btn-danger" onclick="this.parentElement.remove()">✕</button>`;
  list.appendChild(div);
}

// ---- MENU ----
function buildMenu(d) {
  const cats = ['antipasti','primi','secondi','contorni','dolci'];
  const labels = { antipasti:'Antipasti', primi:'Primi', secondi:'Secondi', contorni:'Contorni', dolci:'Dolci' };
  return cats.map(cat => `
    <div class="admin-card">
      <h3>📋 ${labels[cat]} <span class="star">*</span></h3>
      <div class="item-list" id="list-${cat}">
        ${d.menu[cat].map((p,i) => menuItemRow(cat, p, i)).join('')}
      </div>
      <button class="add-btn" onclick="addMenuItem('${cat}')">+ Aggiungi piatto</button>
    </div>`).join('') +
    `<button class="btn-green" onclick="saveSection('menu')">💾 Salva Menu</button>`;
}
function menuItemRow(cat, p, i) {
  return `<div class="item-row menu-item-row" data-cat="${cat}">
    <input class="admin-input small mi-nome" placeholder="Nome piatto" value="${esc(p.nome)}"/>
    <input class="admin-input small mi-prz"  placeholder="€" value="${esc(p.prezzo)}"/>
    <input class="admin-input small mi-desc" placeholder="Descrizione" value="${esc(p.descrizione)}"/>
    <button class="btn-danger" onclick="this.parentElement.remove()">✕</button>
  </div>`;
}
function addMenuItem(cat) {
  const list = document.getElementById('list-'+cat);
  const div = document.createElement('div');
  div.className = 'item-row menu-item-row';
  div.dataset.cat = cat;
  div.innerHTML = `
    <input class="admin-input small mi-nome" placeholder="Nome piatto"/>
    <input class="admin-input small mi-prz"  placeholder="€"/>
    <input class="admin-input small mi-desc" placeholder="Descrizione"/>
    <button class="btn-danger" onclick="this.parentElement.remove()">✕</button>`;
  list.appendChild(div);
}
function bindMenu() {}

// ---- VINI ----
function buildVini(d) {
  return `
  <div class="admin-card">
    <h3>🍷 Carta dei Vini <span class="star">*</span></h3>
    <div class="item-list" id="vini-list">
      ${d.vini.map((v,i) => vinoRow(v,i)).join('')}
    </div>
    <button class="add-btn" onclick="addVino()">+ Aggiungi vino</button>
  </div>
  <button class="btn-green" onclick="saveSection('vini')">💾 Salva Vini</button>`;
}
function vinoRow(v, i) {
  const tipi = ['bianco','rosso','rosato','bollicine','dolce'].map(t =>
    `<option value="${t}" ${v.tipo===t?'selected':''}>${t.charAt(0).toUpperCase()+t.slice(1)}</option>`).join('');
  return `<div class="item-row vino-row" style="grid-template-columns:2fr 1fr 1.5fr 0.7fr 0.6fr 1.5fr auto">
    <input class="admin-input small vn-nome" placeholder="Nome vino" value="${esc(v.nome)}"/>
    <select class="admin-input small vn-tipo">${tipi}</select>
    <input class="admin-input small vn-prod" placeholder="Produttore" value="${esc(v.produttore)}"/>
    <input class="admin-input small vn-anno" placeholder="Anno" value="${esc(v.anno)}"/>
    <input class="admin-input small vn-prz"  placeholder="€" value="${esc(v.prezzo)}"/>
    <input class="admin-input small vn-desc" placeholder="Descrizione" value="${esc(v.descrizione)}"/>
    <button class="btn-danger" onclick="this.parentElement.remove()">✕</button>
  </div>`;
}
function addVino() {
  const list = document.getElementById('vini-list');
  const div = document.createElement('div');
  div.innerHTML = vinoRow({nome:'',tipo:'rosso',produttore:'',anno:'',prezzo:'',descrizione:''},0);
  list.appendChild(div.firstElementChild);
}
function bindVini() {}

// ---- FOTO ----
function buildFoto(d) {
  return `
  <div class="admin-card">
    <h3>🏠 Foto del Locale <span class="star">*</span></h3>
    <p style="font-size:.85rem;color:#6b7a66;margin-bottom:1rem">Trascina per riordinare. Clicca ✕ per eliminare.</p>
    <div class="drop-zone" id="dz-locale">
      <input type="file" accept="image/*" multiple id="fi-locale"/>
      <span class="dz-icon">📷</span>
      <p><strong>Trascina le foto qui</strong> oppure clicca per selezionarle</p>
      <p>Formati: JPG, PNG, WebP</p>
    </div>
    <div class="photo-grid" id="pg-locale"></div>
  </div>
  <div class="admin-card">
    <h3>🍽️ Foto dei Piatti <span class="star">*</span></h3>
    <p style="font-size:.85rem;color:#6b7a66;margin-bottom:1rem">Trascina per riordinare. Clicca ✕ per eliminare.</p>
    <div class="drop-zone" id="dz-piatti">
      <input type="file" accept="image/*" multiple id="fi-piatti"/>
      <span class="dz-icon">🍽️</span>
      <p><strong>Trascina le foto qui</strong> oppure clicca per selezionarle</p>
      <p>Formati: JPG, PNG, WebP</p>
    </div>
    <div class="photo-grid" id="pg-piatti"></div>
  </div>
  <button class="btn-green" onclick="saveFoto()">💾 Salva Foto</button>`;
}

function bindFoto() {
  const d = loadData();
  renderPhotoGrid('locale', d.galleria.locale || []);
  renderPhotoGrid('piatti', d.galleria.piatti || []);
  ['locale','piatti'].forEach(cat => {
    const dz = document.getElementById('dz-'+cat);
    const fi = document.getElementById('fi-'+cat);
    dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('dragover'); });
    dz.addEventListener('dragleave', () => dz.classList.remove('dragover'));
    dz.addEventListener('drop', e => {
      e.preventDefault(); dz.classList.remove('dragover');
      handleFiles(e.dataTransfer.files, cat);
    });
    fi.addEventListener('change', () => handleFiles(fi.files, cat));
  });
}

function handleFiles(files, cat) {
  [...files].forEach(file => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = e => {
      const d = loadData();
      if (!d.galleria[cat]) d.galleria[cat] = [];
      d.galleria[cat].push({ src: e.target.result, alt: file.name.replace(/\.[^.]+$/,'') });
      saveData(d);
      renderPhotoGrid(cat, d.galleria[cat]);
    };
    reader.readAsDataURL(file);
  });
}

function renderPhotoGrid(cat, photos) {
  const grid = document.getElementById('pg-'+cat);
  if (!grid) return;
  grid.innerHTML = photos.map((ph, i) => `
    <div class="photo-thumb" draggable="true" data-cat="${cat}" data-idx="${i}">
      <img src="${ph.src}" alt="${ph.alt||''}"/>
      <button class="ph-del" onclick="delPhoto('${cat}',${i})">✕</button>
      <span class="ph-drag">⠿ drag</span>
    </div>`).join('');
  bindPhotoDrag(cat);
}

function delPhoto(cat, idx) {
  const d = loadData();
  d.galleria[cat].splice(idx, 1);
  saveData(d);
  renderPhotoGrid(cat, d.galleria[cat]);
}

function saveFoto() { toast('✅ Foto salvate!'); }

// Drag & drop reorder
let dragSrc = null;
function bindPhotoDrag(cat) {
  document.querySelectorAll(`.photo-thumb[data-cat="${cat}"]`).forEach(th => {
    th.addEventListener('dragstart', e => { dragSrc = th; th.classList.add('dragging'); });
    th.addEventListener('dragend',   () => { dragSrc?.classList.remove('dragging'); dragSrc = null; document.querySelectorAll('.photo-thumb').forEach(t => t.classList.remove('drag-over')); });
    th.addEventListener('dragover',  e => { e.preventDefault(); if (th !== dragSrc) th.classList.add('drag-over'); });
    th.addEventListener('dragleave', () => th.classList.remove('drag-over'));
    th.addEventListener('drop', e => {
      e.preventDefault();
      if (!dragSrc || dragSrc === th) return;
      const fromIdx = parseInt(dragSrc.dataset.idx);
      const toIdx   = parseInt(th.dataset.idx);
      const d = loadData();
      const arr = d.galleria[cat];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      saveData(d);
      renderPhotoGrid(cat, arr);
    });
  });
}

// ---- STEMMA ----
function buildStemma(d) {
  const hasStemma = d.stemma && d.stemma.length > 50;
  return `
  <div class="admin-card">
    <h3>🎖️ Stemma / Logo <span class="star">*</span></h3>
    <p style="font-size:.9rem;color:#6b7a66;margin-bottom:1.2rem">
      Lo stemma appare nella navbar, nell'hero e nel footer del sito.<br/>
      <strong>Dimensione consigliata:</strong> almeno 200×200px, formato PNG con sfondo trasparente.
    </p>
    <div class="stemma-preview" id="stemma-preview">
      ${hasStemma
        ? `<img src="${d.stemma}" alt="Stemma attuale"/><span style="font-size:.85rem;color:#4a7c3f">✅ Stemma caricato</span>`
        : `<div class="stemma-ph">🎖️</div><span style="font-size:.85rem;color:#999">Nessuno stemma caricato</span>`}
    </div>
    <div class="drop-zone" id="dz-stemma" style="margin-top:1rem">
      <input type="file" accept="image/*" id="fi-stemma"/>
      <span class="dz-icon">🎖️</span>
      <p><strong>Carica lo stemma</strong> – PNG con sfondo trasparente consigliato</p>
    </div>
    ${hasStemma ? `<button class="btn-danger" style="margin-top:1rem" onclick="removeStemma()">🗑️ Rimuovi stemma</button>` : ''}
  </div>`;
}
function bindStemma() {
  const fi = document.getElementById('fi-stemma');
  const dz = document.getElementById('dz-stemma');
  dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('dragover'); });
  dz.addEventListener('dragleave', () => dz.classList.remove('dragover'));
  dz.addEventListener('drop', e => { e.preventDefault(); dz.classList.remove('dragover'); if (e.dataTransfer.files[0]) handleStemma(e.dataTransfer.files[0]); });
  fi.addEventListener('change', () => { if (fi.files[0]) handleStemma(fi.files[0]); });
}
function handleStemma(file) {
  const reader = new FileReader();
  reader.onload = e => {
    const d = loadData(); d.stemma = e.target.result; saveData(d);
    document.getElementById('stemma-preview').innerHTML =
      `<img src="${e.target.result}" alt="Stemma" style="height:100px"/><span style="font-size:.85rem;color:#4a7c3f">✅ Stemma caricato e salvato!</span>`;
    toast('✅ Stemma salvato!');
  };
  reader.readAsDataURL(file);
}
function removeStemma() {
  const d = loadData(); d.stemma = null; saveData(d);
  loadSection('stemma'); toast('Stemma rimosso');
}

// ---- PRENOTAZIONI ----
function buildPrenotazioni() {
  const list = JSON.parse(localStorage.getItem('locanda_prenotazioni') || '[]').reverse();
  if (!list.length) return `<div class="admin-card"><div class="prenota-empty">📅 Nessuna prenotazione ancora</div></div>`;
  const rows = list.map(p => `
    <tr>
      <td>${p.data_invio}</td>
      <td><strong>${esc(p.nome)}</strong></td>
      <td>${esc(p.telefono)}</td>
      <td>${esc(p.data)} ${esc(p.orario)}</td>
      <td>${esc(p.persone)} pers.</td>
      <td>${esc(p.tipo)}</td>
      <td>${p.note ? esc(p.note) : '—'}</td>
      <td>
        <select onchange="aggiornaSato(${p.id}, this.value)" class="admin-input small" style="margin:0;padding:.3rem .5rem">
          <option value="in attesa" ${p.stato==='in attesa'?'selected':''}>In attesa</option>
          <option value="confermata" ${p.stato==='confermata'?'selected':''}>Confermata</option>
          <option value="annullata" ${p.stato==='annullata'?'selected':''}>Annullata</option>
        </select>
      </td>
      <td><button class="btn-danger" onclick="delPrenot(${p.id})">🗑️</button></td>
    </tr>`).join('');
  return `
  <div class="admin-card" style="overflow-x:auto">
    <h3>📅 Prenotazioni ricevute (${list.length})</h3>
    <table class="prenota-table">
      <thead><tr><th>Data invio</th><th>Nome</th><th>Tel</th><th>Data/Ora</th><th>Pers.</th><th>Tipo</th><th>Note</th><th>Stato</th><th></th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </div>
  <button class="btn-danger" onclick="if(confirm('Svuotare tutte le prenotazioni?')){localStorage.removeItem('locanda_prenotazioni');loadSection('prenotazioni')}">🗑️ Svuota tutte</button>`;
}
function aggiornaSato(id, stato) {
  const list = JSON.parse(localStorage.getItem('locanda_prenotazioni') || '[]');
  const p = list.find(x => x.id === id);
  if (p) { p.stato = stato; localStorage.setItem('locanda_prenotazioni', JSON.stringify(list)); toast('Stato aggiornato'); }
}
function delPrenot(id) {
  let list = JSON.parse(localStorage.getItem('locanda_prenotazioni') || '[]');
  list = list.filter(x => x.id !== id);
  localStorage.setItem('locanda_prenotazioni', JSON.stringify(list));
  loadSection('prenotazioni');
}

// ---- SICUREZZA ----
function buildSicurezza() {
  return `
  <div class="admin-card">
    <h3>🔒 Cambia Password <span class="star">*</span></h3>
    <p style="font-size:.88rem;color:#6b7a66;margin-bottom:1rem">La password viene salvata nel browser. Password attuale: <code style="background:#eaf4e5;padding:.15rem .5rem;border-radius:4px">${getStoredPwd()}</code></p>
    <label class="field-label">Nuova password</label>
    <input class="admin-input" id="new-pwd" type="password" placeholder="Nuova password (min 6 caratteri)"/>
    <label class="field-label">Conferma password</label>
    <input class="admin-input" id="conf-pwd" type="password" placeholder="Ripeti la password"/>
    <button class="btn-green" id="btn-cambio-pwd">🔑 Aggiorna Password</button>
  </div>
  <div class="admin-card">
    <h3>⚠️ Reset dati</h3>
    <p style="font-size:.88rem;color:#6b7a66;margin-bottom:1rem">Ripristina tutti i dati ai valori predefiniti. <strong>Attenzione: non recuperabile!</strong></p>
    <button class="btn-danger" onclick="if(confirm('Sei sicuro? Tutti i dati verranno ripristinati ai valori predefiniti.')){localStorage.removeItem('locanda_ulivi_data');location.reload()}">🔄 Reset dati sito</button>
  </div>`;
}
function bindSicurezza() {
  document.getElementById('btn-cambio-pwd').addEventListener('click', () => {
    const np = document.getElementById('new-pwd').value;
    const cp = document.getElementById('conf-pwd').value;
    if (np.length < 6) return toast('Password troppo corta (min 6 caratteri)', true);
    if (np !== cp) return toast('Le password non coincidono', true);
    localStorage.setItem(PWD_KEY, np);
    toast('✅ Password aggiornata!');
    document.getElementById('new-pwd').value = '';
    document.getElementById('conf-pwd').value = '';
  });
}

// ---- SAVE SECTION HELPER ----
function saveSection(key) {
  const d = loadData();
  collectSection(key, d);
  saveData(d);
  toast('✅ Salvato!');
}

// ---- UTILS ----
function esc(str) {
  if (str === undefined || str === null) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function toast(msg, error=false) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast' + (error ? ' error' : '');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}
