// faq accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o => {
      o.classList.remove('open');
      o.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      o.querySelector('.faq-plus').textContent = '+';
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      item.querySelector('.faq-plus').textContent = '—';
    }
  });
});

// mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// live metric simulation
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion) {
  const mPh = document.getElementById('mPh');
  const mTurb = document.getElementById('mTurb');
  const mChlor = document.getElementById('mChlor');
  const mFlow = document.getElementById('mFlow');
  const statusLine = document.getElementById('statusLine');
  const statusText = document.getElementById('statusText');
  const tracePoly = document.getElementById('tracePoly');

  let tick = 0;
  setInterval(() => {
    tick++;
    const ph = (7.15 + Math.sin(tick / 4) * 0.08 + (Math.random() - 0.5) * 0.02).toFixed(2);
    const turb = (0.30 + Math.sin(tick / 3) * 0.06 + (Math.random() - 0.5) * 0.02).toFixed(2);
    const chlorBase = 1.15 + Math.sin(tick / 6) * 0.25;
    const chlor = chlorBase.toFixed(2);
    const flow = Math.round(842 + Math.sin(tick / 5) * 30 + (Math.random() - 0.5) * 8);

    mPh.textContent = ph;
    mTurb.innerHTML = turb + '<span class="unit">NTU</span>';
    mChlor.innerHTML = chlor + '<span class="unit">mg/L</span>';
    mFlow.innerHTML = flow + '<span class="unit">m³/h</span>';

    if (chlorBase < 0.95) {
      statusLine.classList.add('warn');
      statusText.textContent = 'Chlorine trending low — dose increase suggested';
    } else {
      statusLine.classList.remove('warn');
      statusText.textContent = 'All parameters within range';
    }

    // shift trace
    const pts = tracePoly.getAttribute('points').split(' ').map(p => p.split(',').map(Number));
    pts.shift();
    const lastX = pts[pts.length - 1][0];
    const newY = 26 + Math.sin(tick / 3) * 8 + (Math.random() - 0.5) * 4;
    pts.push([lastX + 20, Math.max(6, Math.min(50, newY))]);
    const shifted = pts.map((p, i) => [i * 20, p[1]]);
    tracePoly.setAttribute('points', shifted.map(p => p.join(',')).join(' '));
  }, 2200);
}
