// ============================================================
//  LOCANDA ULIVI – app.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  populateSite();
  initNavbar();
  initMenu();
  initVini();
  initGalleria();
  initPrenotaForm();
  initDirections();
  initLightbox();
  initScrollReveal();
});

// ---- POPULATE STATIC TEXT ----
function populateSite() {
  const r = SDATA.ristorante;
  const o = SDATA.orari;
  const pl = SDATA.pranzo_lavoro;

  setText('h-tagline', r.tagline);
  setText('h-sottotitolo', r.sottotitolo);
  setText('h-indirizzo', r.indirizzo);
  setText('h-descrizione', r.descrizione);

  setText('or-pranzo-giorni', o.pranzo.giorni);
  setText('or-pranzo-orario', o.pranzo.orario);
  setText('or-cena-giorni', o.cena.giorni);
  setText('or-cena-orario', o.cena.orario);
  setText('or-chiusura', o.chiusura);

  setText('pl-titolo', pl.titolo);
  setText('pl-prezzo', pl.prezzo);
  setText('pl-descrizione', pl.descrizione);
  setText('pl-note', pl.note);
  const plList = document.getElementById('pl-incluso');
  if (plList) {
    plList.innerHTML = pl.incluso.map(i => `<li>✓ ${i}</li>`).join('');
  }

  setText('d-via', r.via);
  setText('d-cap', r.cap);
  setLink('d-tel', `tel:${r.telefono.replace(/\s/g,'')}`, r.telefono);
  setLink('d-email', `mailto:${r.email}`, r.email);

  setLink('p-tel', `tel:${r.telefono.replace(/\s/g,'')}`, r.telefono);
  setLink('p-email', `mailto:${r.email}`, r.email);
  setText('p-ind', r.via + ', ' + r.cap);

  setText('f-sub', r.sottotitolo);
  setText('f-addr', r.via + '<br/>' + r.cap);
  setLink('f-tel', `tel:${r.telefono.replace(/\s/g,'')}`, r.telefono);
  setLink('f-email', `mailto:${r.email}`, r.email);
  setText('f-pranzo', o.pranzo.giorni.replace('Lunedì – Venerdì','Lun–Ven') + ' ' + o.pranzo.orario);
  setText('f-cena',   o.cena.giorni.replace('Martedì – Sabato','Mar–Sab') + ' ' + o.cena.orario);
  setText('f-piva',   'P.IVA ' + r.piva);

  setAttr('f-fb', 'href', r.facebook);
  setAttr('f-ig', 'href', r.instagram);

  // Stemma
  if (SDATA.stemma) {
    ['nav-stemma-img','hero-stemma-img','.footer-stemma'].forEach(sel => {
      const el = sel.startsWith('.') ? document.querySelector(sel) : document.getElementById(sel);
      if (el) { el.src = SDATA.stemma; el.style.display = ''; }
    });
    const fb = document.getElementById('nav-fallback');
    if (fb) fb.style.display = 'none';
  }
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el && val !== undefined) el.innerHTML = val;
}
function setLink(id, href, text) {
  const el = document.getElementById(id);
  if (el) { el.href = href; el.textContent = text; }
}
function setAttr(id, attr, val) {
  const el = document.getElementById(id);
  if (el && val) el.setAttribute(attr, val);
}

// ---- NAVBAR ----
function initNavbar() {
  const nb = document.getElementById('navbar');
  const hb = document.getElementById('hamburger');
  const nl = document.getElementById('nav-links');
  window.addEventListener('scroll', () => {
    nb.classList.toggle('scrolled', window.scrollY > 50);
  });
  hb.addEventListener('click', () => {
    hb.classList.toggle('active');
    nl.classList.toggle('open');
  });
  nl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    hb.classList.remove('active');
    nl.classList.remove('open');
  }));
}

// ---- MENU ----
let currentCat = 'antipasti';
function initMenu() {
  renderMenu(currentCat);
  document.getElementById('menu-tabs').addEventListener('click', e => {
    if (e.target.classList.contains('tab')) {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      currentCat = e.target.dataset.cat;
      renderMenu(currentCat);
    }
  });
}
function renderMenu(cat) {
  const items = SDATA.menu[cat] || [];
  const grid = document.getElementById('menu-grid');
  grid.innerHTML = items.map(p => `
    <div class="menu-card reveal">
      <div class="mc-header">
        <span class="mc-nome">${p.nome}</span>
        <span class="mc-prezzo">€ ${p.prezzo}</span>
      </div>
      ${p.descrizione ? `<p class="mc-desc">${p.descrizione}</p>` : ''}
    </div>
  `).join('');
  // re-trigger reveal
  setTimeout(() => {
    grid.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }, 50);
}

// ---- VINI ----
function initVini() {
  const grid = document.getElementById('vini-grid');
  grid.innerHTML = SDATA.vini.map(v => `
    <div class="vino-card reveal">
      <div class="vc-head">
        <span class="vc-nome">${v.nome}</span>
        <span class="vc-prezzo">€ ${v.prezzo}</span>
      </div>
      <div class="vc-badges">
        <span class="vc-badge ${v.tipo}">${v.tipo.charAt(0).toUpperCase()+v.tipo.slice(1)}</span>
      </div>
      <div class="vc-prod">${v.produttore}</div>
      <div class="vc-anno">Annata ${v.anno}</div>
      <div class="vc-desc">${v.descrizione}</div>
    </div>
  `).join('');
}

// ---- GALLERIA ----
let currentGCat = 'locale';
function initGalleria() {
  renderGalleria(currentGCat);
  document.querySelectorAll('.gtab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gtab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentGCat = btn.dataset.g;
      renderGalleria(currentGCat);
    });
  });
}
function renderGalleria(cat) {
  const photos = SDATA.galleria[cat] || [];
  const grid = document.getElementById('g-grid');
  if (photos.length === 0) {
    grid.innerHTML = `
      <div class="g-slot"><div class="g-ph">📷<span>Nessuna foto ancora</span></div></div>
      <div class="g-slot"><div class="g-ph">📷<span>Aggiungi dal pannello Admin</span></div></div>
      <div class="g-slot"><div class="g-ph">📷<span>Aggiungi dal pannello Admin</span></div></div>
    `;
    return;
  }
  grid.innerHTML = photos.map((ph, i) => `
    <div class="g-slot" data-src="${ph.src}" data-alt="${ph.alt||''}">
      <img src="${ph.src}" alt="${ph.alt||'Foto '+cat}" loading="lazy"/>
    </div>
  `).join('');
  grid.querySelectorAll('.g-slot[data-src]').forEach(slot => {
    slot.addEventListener('click', () => openLightbox(slot.dataset.src, slot.dataset.alt));
  });
}

// ---- DIRECTIONS ----
function initDirections() {
  const btn = document.getElementById('btn-indicazioni');
  const input = document.getElementById('partenza-input');
  if (!btn || !input) return;

  const destination = 'Località+Alpi+3,+37010+Cavaion+Veronese+VR,+Italia';

  btn.addEventListener('click', () => openDirections());
  input.addEventListener('keydown', e => { if (e.key === 'Enter') openDirections(); });

  function openDirections() {
    const from = input.value.trim();
    let url;
    if (from) {
      const enc = encodeURIComponent(from);
      url = `https://www.google.com/maps/dir/?api=1&origin=${enc}&destination=${destination}&travelmode=driving`;
    } else {
      url = 'https://maps.app.goo.gl/huveCtTqLNtj6pEF9';
    }
    window.open(url, '_blank', 'noopener');
  }
}

// ---- PRENOTA FORM ----
function initPrenotaForm() {
  const form = document.getElementById('prenota-form');
  const ok   = document.getElementById('prenota-ok');
  if (!form) return;

  // Set min date to today
  const dateInput = form.querySelector('input[type="date"]');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(form);
    const prenotazione = {
      id: Date.now(),
      data_invio: new Date().toLocaleString('it-IT'),
      nome:     fd.get('nome'),
      telefono: fd.get('telefono'),
      email:    fd.get('email'),
      persone:  fd.get('persone'),
      data:     fd.get('data'),
      orario:   fd.get('orario'),
      tipo:     fd.get('tipo'),
      note:     fd.get('note'),
      stato:    'in attesa'
    };
    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('locanda_prenotazioni') || '[]');
    existing.push(prenotazione);
    localStorage.setItem('locanda_prenotazioni', JSON.stringify(existing));

    form.style.display = 'none';
    ok.style.display = 'flex';
    setTimeout(() => {
      form.reset();
      form.style.display = 'block';
      ok.style.display = 'none';
    }, 5000);
  });
}

// ---- LIGHTBOX ----
function initLightbox() {
  const lb   = document.getElementById('lightbox');
  const img  = document.getElementById('lb-img');
  const cls  = document.getElementById('lb-close');
  const bg   = document.getElementById('lb-bg');
  if (!lb) return;
  cls.addEventListener('click', closeLightbox);
  bg.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
}
function openLightbox(src, alt) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lb-img');
  img.src = src; img.alt = alt || '';
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

// ---- SCROLL REVEAL ----
function initScrollReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  // Also observe newly added
  new MutationObserver(muts => {
    muts.forEach(m => m.addedNodes.forEach(n => {
      if (n.nodeType === 1) {
        n.querySelectorAll('.reveal').forEach(el => obs.observe(el));
        if (n.classList && n.classList.contains('reveal')) obs.observe(n);
      }
    }));
  }).observe(document.body, { childList: true, subtree: true });
}
