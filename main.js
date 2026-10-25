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
})();
