
const menu = document.querySelector('.menu');
const nav = document.querySelector('.navlinks');
if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {threshold: 0.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function collectMessage(form) {
  const lang = form.dataset.lang || 'de';
  const value = name => (form.elements[name]?.value || '').trim();
  const rows = lang === 'en'
    ? [
        'New event enquiry via weiss-events.com',
        '',
        'Name: ' + value('name'),
        'Email: ' + value('email'),
        'Phone: ' + value('phone'),
        'Event type: ' + value('event'),
        'Location / destination: ' + value('location'),
        'Preferred date: ' + value('date'),
        '',
        'Message:',
        value('message')
      ]
    : [
        'Neue Eventanfrage über weiss-events.com',
        '',
        'Name: ' + value('name'),
        'E-Mail: ' + value('email'),
        'Telefon: ' + value('phone'),
        'Eventart: ' + value('event'),
        'Ort / Destination: ' + value('location'),
        'Wunschtermin: ' + value('date'),
        '',
        'Nachricht:',
        value('message')
      ];
  return rows.join('\n');
}

document.querySelectorAll('.contact-form').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const subject = form.dataset.lang === 'en' ? 'New event enquiry' : 'Neue Eventanfrage';
    window.location.href = 'mailto:info@weiss-events.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(collectMessage(form));
  });
});
