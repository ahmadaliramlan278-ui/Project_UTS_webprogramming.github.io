/* =============================================
   FLOATING PARTICLES
   ============================================= */
const container = document.getElementById('particles');

for (let i = 0; i < 30; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.cssText = `
    left: ${Math.random() * 100}%;
    animation-duration: ${8 + Math.random() * 14}s;
    animation-delay: ${Math.random() * 10}s;
    width: ${Math.random() > 0.7 ? 3 : 2}px;
    height: ${Math.random() > 0.7 ? 3 : 2}px;
  `;
  container.appendChild(p);
}

/* =============================================
   CUSTOM CURSOR
   ============================================= */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  ring.style.left   = e.clientX + 'px';
  ring.style.top    = e.clientY + 'px';
});

document.querySelectorAll('a, button, .tool-chip').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('expand'));
  el.addEventListener('mouseleave', () => ring.classList.remove('expand'));
});

/* =============================================
   NAVBAR — SCROLL EFFECT
   ============================================= */
const navbar   = document.getElementById('navbar');
const scrollUp = document.getElementById('scrollUp');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  scrollUp.classList.toggle('active', window.scrollY > 500);
});

/* =============================================
   REVEAL ON SCROLL
   ============================================= */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* =============================================
   SLOT MACHINE ANIMATION — HERO BADGE
   ============================================= */
const badgeTexts = [
  "✦ Web Developer",
  "✦ Graphic Designer",
  "✦ UI/UX Enthusiast",
  "✦ Frontend Engineer",
];

const badgeEl = document.getElementById('badgeText');

// Buat elemen slot track
const slotWrap = document.createElement('div');
slotWrap.style.cssText = `
  height: 16px;
  overflow: hidden;
  position: relative;
  display: inline-block;
`;

const slotTrack = document.createElement('div');
slotTrack.style.cssText = `
  display: flex;
  flex-direction: column;
  transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
`;

// Isi semua teks
badgeTexts.forEach(t => {
  const item = document.createElement('div');
  item.textContent = t;
  item.style.cssText = `
    height: 16px;
    line-height: 16px;
    white-space: nowrap;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    letter-spacing: 2px;
    color: var(--accent);
  `;
  slotTrack.appendChild(item);
});

// Clone item pertama agar loop mulus
const clone = slotTrack.children[0].cloneNode(true);
slotTrack.appendChild(clone);

slotWrap.appendChild(slotTrack);

// Ganti konten badgeEl dengan slot
badgeEl.textContent = '';
badgeEl.appendChild(slotWrap);

// Jalankan animasi
let cur = 0;

setInterval(() => {
  cur++;
  slotTrack.style.transition = 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)';
  slotTrack.style.transform = `translateY(-${cur * 16}px)`;

  // Reset tanpa animasi saat sudah di clone (index terakhir)
  if (cur >= badgeTexts.length) {
    setTimeout(() => {
      slotTrack.style.transition = 'none';
      slotTrack.style.transform = 'translateY(0)';
      cur = 0;
    }, 460);
  }
}, 2200);