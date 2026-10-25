(function () {
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
    });
  }

  // Il sito è statico: il modulo prepara una email già compilata nel programma di posta di chi scrive.
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = new FormData(form);
      var body = [
        'Nome e cognome: ' + f.get('nome'),
        'Email: ' + f.get('email'),
        'Telefono: ' + (f.get('telefono') || '-'),
        'Richiesta per: ' + (f.get('per') || '-'),
        'Sede preferita: ' + (f.get('sede') || '-'),
        '',
        f.get('messaggio')
      ].join('\n');
      window.location.href = 'mailto:bajelimarta@gmail.com?subject=' +
        encodeURIComponent('Richiesta di visita pediatrica') + '&body=' + encodeURIComponent(body);
    });
  }

  // Animazioni allo scorrimento: gli elementi compaiono con dissolvenza e leggero movimento verso l'alto.
  var header = document.querySelector('header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    var singles = 'main .kicker, main section h2, main .lead, main .sub, main .hero h1, main .hero-art, main .about-grid > div, main .actions, main .where, main .urgent, main .contact-list, main form, footer .foot, footer .legal';
    var groups = 'main .grid > *, main .steps > li, main .chips > li, main .tags > li, main .faq > details, main .contact-grid > *';
    var delays = { 'kicker': 0, 'H1': 0.08, 'H2': 0.08, 'lead': 0.16, 'sub': 0.16 };
    var items = [];
    document.querySelectorAll(singles).forEach(function (el, i) {
      var d = el.classList.contains('kicker') ? 0 : el.tagName === 'H1' || el.tagName === 'H2' ? 0.08 : (el.classList.contains('lead') || el.classList.contains('sub')) ? 0.16 : 0.1;
      el.style.setProperty('--d', d + 's');
      items.push(el);
    });
    document.querySelectorAll(groups).forEach(function (el) {
      var siblings = Array.prototype.slice.call(el.parentNode.children);
      el.style.setProperty('--d', Math.min(siblings.indexOf(el), 8) * 0.09 + 's');
      if (items.indexOf(el) === -1) items.push(el);
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        el.classList.add('in');
        io.unobserve(el);
        // a fine animazione si tolgono le classi, così hover e transizioni normali tornano a funzionare
        setTimeout(function () { el.classList.remove('reveal', 'in'); el.style.removeProperty('--d'); }, 1600);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
  }
})();
