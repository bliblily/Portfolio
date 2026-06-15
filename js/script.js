/* ══════════════════════════════════════════
   PIXEL PORTFOLIO — script.js
══════════════════════════════════════════ */

/* ── DARK MODE ── */
const html      = document.documentElement;
const toggleBtn = document.getElementById('theme-toggle');

function applyTheme(dark) {
  html.classList.toggle('dark', dark);
  toggleBtn.textContent = dark ? '☾' : '☀';
}

applyTheme(localStorage.getItem('theme') === 'dark');

toggleBtn.addEventListener('click', () => {
  const isDark = !html.classList.contains('dark');
  applyTheme(isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});


/* ── FLOATING PIXEL BLOCKS (hero decoration) ── */
(function spawnPixelBlocks() {
  const container = document.getElementById('hero-pixels');
  if (!container) return;
  for (let i = 0; i < 18; i++) {
    const block = document.createElement('div');
    block.className = 'px-block';
    const size = [4, 6, 8, 10, 16][Math.floor(Math.random() * 5)];
    block.style.cssText = `
      width:${size}px;
      height:${size}px;
      left:${Math.random() * 100}%;
      animation-duration:${12 + Math.random() * 20}s;
      animation-delay:${-Math.random() * 20}s;
      opacity:${0.03 + Math.random() * 0.06};
    `;
    container.appendChild(block);
  }
})();


/* ── SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ── PROJECT DATA ──
   To add or edit projects, update this array.
   Each entry maps to a folder card via data-project="index" in index.html.
── */
const projects = [
  {
    title: 'Personal Portfolio Website',
    desc: 'A minimalist pixel-art themed portfolio site designed and developed from scratch to showcase university projects, certifications, and skills. Features smooth scroll reveals, interactive folder-based project browsing, and a retro gaming aesthetic.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Google Fonts', 'CSS Animations'],
    features: [
      'Pixel-art visual design with DotGothic16 typography',
      'Interactive folder-style project cards',
      'Smooth scroll-based reveal animations',
      'Fully responsive across desktop, tablet, and mobile',
      'Certifications showcase with achievement cards',
    ],
    github: '#',
    demo: '#',
  },
  {
    title: 'Pixel Photobooth App',
    desc: 'A retro pixel-art web application that simulates a classic arcade photobooth. Users can enter through an animated curtain-opening sequence, choose from 6 themed frames, capture 4 photos via webcam with countdown timers, and download the final photo strip as a PNG.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Canvas API', 'WebRTC', 'getUserMedia'],
    features: [
      'Animated curtain-opening entrance screen',
      '6 distinct photo strip frame themes',
      'Live webcam capture with 3-second pixel countdown',
      'Flash animation on photo capture',
      'Auto-generated downloadable PNG photo strip',
    ],
    github: '#',
    demo: '#',
  },
  {
    title: 'Mobile App UX Case Study',
    desc: 'An end-to-end UX design project for a campus student services mobile application. Covered user research, competitive analysis, information architecture, wireframing, and high-fidelity prototyping in Figma.',
    tech: ['Figma', 'FigJam', 'User Research', 'Wireframing', 'Usability Testing'],
    features: [
      'User interviews and affinity mapping',
      'Low and high-fidelity wireframes',
      'Interactive Figma prototype',
      'Accessibility-focused design decisions',
      'Final usability testing report',
    ],
    github: null,
    demo: '#',
  },
  {
    title: 'Algorithm Visualizer',
    desc: 'An interactive web application that brings sorting algorithms and data structures to life through pixel-style step-by-step animations. Supports bubble sort, merge sort, quick sort, and binary search tree visualization.',
    tech: ['Vanilla JavaScript', 'HTML5 Canvas', 'CSS Animations', 'Data Structures'],
    features: [
      'Real-time visualization of sorting algorithms',
      'Adjustable speed and array size controls',
      'Step-by-step mode for learning',
      'Comparison counter and swap tracker',
      'Binary search tree insert/delete animation',
    ],
    github: '#',
    demo: '#',
  },
  {
    title: 'Student Records System',
    desc: 'A full-stack web application for managing student academic records. Built for a database management systems course, featuring CRUD operations, search/filter functionality, and role-based access for admin and faculty.',
    tech: ['PHP', 'MySQL', 'Bootstrap 5', 'AJAX', 'PDO'],
    features: [
      'Secure login with role-based access control',
      'Full CRUD for student profiles and grades',
      'Dynamic search and filter across records',
      'Grade computation and transcript generation',
      'Responsive data tables with pagination',
    ],
    github: '#',
    demo: null,
  },
  {
    title: 'Capstone Research Project',
    desc: 'An ongoing capstone project investigating the relationship between design systems and web accessibility. Research includes a comparative analysis of WCAG compliance in common component libraries, with proposed guidelines for accessible design tokens.',
    tech: ['Research', 'Design Systems', 'WCAG 2.1', 'Figma', 'Academic Writing'],
    features: [
      'Systematic literature review on accessibility',
      'Audit of 5 popular component libraries',
      'Proposed accessible design token framework',
      'Prototype accessible component library',
      'Final thesis paper (in progress)',
    ],
    github: null,
    demo: null,
  },
];


/* ── FOLDER MODAL ── */
const overlay    = document.getElementById('folder-modal-overlay');
const modalBody  = document.getElementById('modal-body');
const modalTitle = document.getElementById('modal-titlebar-name');

function buildModalContent(p) {
  return `
    <div class="modal-proj-title">${p.title}</div>
    <p class="modal-desc">${p.desc}</p>

    <div class="modal-preview">
      <span class="modal-preview-placeholder">[ PREVIEW SCREENSHOT ]</span>
    </div>

    <div class="modal-section-label">Technologies</div>
    <div class="modal-tech-row">
      ${p.tech.map(t => `<span class="modal-tech">${t}</span>`).join('')}
    </div>

    <div class="modal-section-label">Key Features</div>
    <ul class="modal-features">
      ${p.features.map(f => `<li>${f}</li>`).join('')}
    </ul>

    <div class="modal-section-label">Links</div>
    <div class="modal-links">
      ${p.github ? `<a href="${p.github}" class="px-btn outline" target="_blank">⌥ GitHub</a>` : ''}
      ${p.demo   ? `<a href="${p.demo}"   class="px-btn"         target="_blank">▸ Live Demo</a>` : ''}
      ${!p.github && !p.demo
        ? `<span style="font-size:10px;color:var(--ink3);letter-spacing:2px;">No links available yet.</span>`
        : ''}
    </div>
  `;
}

document.getElementById('folders-grid').addEventListener('click', e => {
  const card = e.target.closest('.folder-card');
  if (!card) return;
  const p = projects[parseInt(card.dataset.project, 10)];
  modalTitle.textContent = p.title.toUpperCase().replace(/ /g, '_') + '.TXT';
  modalBody.innerHTML = buildModalContent(p);
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
});

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('modal-close').addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });


/* ── ACTIVE NAV HIGHLIGHT ON SCROLL ── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 80) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--ink)' : '';
  });
}, { passive: true });