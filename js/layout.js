// ============================================================
//  LOCANDA ULIVI – Layout condiviso (sidebar + navbar + footer)
// ============================================================

function buildLayout(activePage) {
  const r = SDATA.ristorante;
  const pages = [
    { id: 'home',       label: 'Home',          href: '../index.html' },
    { id: 'chi-siamo',  label: 'Chi Siamo',     href: 'chi-siamo.html' },
    { id: 'orari',      label: 'Orari & Menu',  href: 'orari.html' },
    { id: 'menu',       label: 'Menu',          href: 'menu.html' },
    { id: 'vini',       label: 'Vini',          href: 'vini.html' },
    { id: 'galleria',   label: 'Galleria',      href: 'galleria.html' },
    { id: 'dove-siamo', label: 'Dove Siamo',    href: 'dove-siamo.html' },
    { id: 'prenota',    label: 'Prenota',       href: 'prenota.html', cta: true }
  ];

  // Fix hrefs if we're on root level
  const isRoot = activePage === 'home';
  const prefix = isRoot ? 'pages/' : '';

  // Sidebar
  const sidebar = document.getElementById('left-sidebar');
  if (sidebar) {
    sidebar.innerHTML = `
      <div class="sidebar-inner">
        <img src="${isRoot ? '' : '../'}images/stemma.jpg" alt="Stemma" class="sidebar-stemma"
             onerror="this.style.display='none'"/>
        <div class="sidebar-nome">${r.nome}</div>
        <div class="sidebar-sub">${r.sottotitolo}</div>
        <div class="sidebar-tagline">${r.tagline}</div>
        <div class="sidebar-divider"></div>
        <div class="sidebar-info">
          <div class="sb-row">
            <span class="sb-icon">📍</span>
            <span>${r.indirizzo}<br/>${r.cap}</span>
          </div>
          <div class="sb-row">
            <span class="sb-icon">📞</span>
            <a href="tel:${r.telefono.replace(/\s/g,'')}">${r.telefono}</a>
          </div>
          <div class="sb-row">
            <span class="sb-icon">✉️</span>
            <a href="mailto:${r.email}">${r.email}</a>
          </div>
        </div>
        <div class="sidebar-divider"></div>
        <a href="${isRoot ? 'pages/' : ''}prenota.html" class="sidebar-cta">Prenota un Tavolo</a>
        <div class="sidebar-social">
          <a href="${r.facebook}" aria-label="Facebook" target="_blank">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
          </a>
          <a href="${r.instagram}" aria-label="Instagram" target="_blank">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
          </a>
        </div>
      </div>
    `;
  }

  // Navbar
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const links = pages.map(p => {
      const href = isRoot
        ? (p.id === 'home' ? '#' : 'pages/' + p.href.replace('../',''))
        : (p.id === 'home' ? '../index.html' : p.href);
      const cls = (p.id === activePage ? ' active' : '') + (p.cta ? ' nav-cta' : '');
      return `<li><a href="${href}" class="${cls.trim()}">${p.label}</a></li>`;
    }).join('');

    navbar.innerHTML = `
      <div class="nav-inner">
        <button class="hamburger" id="hamburger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
        <ul class="nav-links" id="nav-links">${links}</ul>
      </div>
    `;

    // Hamburger toggle
    const hb = document.getElementById('hamburger');
    const nl = document.getElementById('nav-links');
    if (hb && nl) {
      hb.addEventListener('click', () => {
        hb.classList.toggle('active');
        nl.classList.toggle('open');
      });
      nl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        hb.classList.remove('active');
        nl.classList.remove('open');
      }));
    }
  }

  // Footer
  const footer = document.getElementById('footer');
  if (footer) {
    footer.innerHTML = `
      <div class="container">
        <div class="footer-inner">
          <div>© ${new Date().getFullYear()} ${r.nome} – ${r.indirizzo}, ${r.cap}</div>
          <div class="footer-piva">P.IVA ${r.piva}</div>
          <div>
            <a href="mailto:${r.email}">${r.email}</a> &nbsp;·&nbsp;
            <a href="tel:${r.telefono.replace(/\s/g,'')}">${r.telefono}</a>
          </div>
        </div>
      </div>
    `;
  }

  // Scroll reveal
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}
