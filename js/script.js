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
    title: 'UM Collaboration Room Reservation',
    desc: 'A mock reservation system that allows students, faculty, and staff to book collaboration rooms efficiently. It features room search and booking, reservation management, role-based access, and administrative tools to reduce scheduling conflicts and improve the booking experience.',
    tech: ['PHP', 'CSS'],
    features: [
      'Role-based authentication for users and administrators', 
      'Room search and instant reservation booking', 
      'Modify or cancel existing reservations', 
      'Administrative room and schedule management', 
      'Reservation confirmations and usage reporting'
    ],
    github: '#',
    demo: '#',
  },
  {
    title: 'Integrated Salon Booking & Inventory System',
    desc: 'A digital solution built to streamline salon operations through appointment scheduling, inventory monitoring, and sales tracking. It helps minimize booking errors, manage stock levels, and improve overall business efficiency.',
    tech: ['PHP', 'HTML', 'CSS', 'JavaScript'],
    features: [
      'Appointment scheduling and booking management', 
      'Real-time availability to prevent double-bookings', 
      'Inventory tracking with stock alerts', 
      'Client records and service history management', 
      'Sales monitoring and secure user authentication' 
    ],
    github: '#',
    demo: '#',
  },
  {
    title: 'Network Intrusion Detection System',
    desc: 'A cybersecurity project that uses a hybrid Random Forest–TabNet model to detect malicious network traffic. By analyzing the CICIDS-2017 dataset, the system demonstrates improved intrusion detection performance using machine learning techniques.',
    tech: ['Jupyter Notebook', 'Python', 'Machine Learning'],
    features: [
      'User interviews and affinity mapping',
      'Low and high-fidelity wireframes',
      'Interactive Figma prototype',
      'Accessibility-focused design decisions',
      'Final usability testing report',
    ],
    github: null,
    demo: 'https://cs20-nids.streamlit.app/',
  },
  {
    title: 'Algorithm Visualizer',
    desc: 'An interactive web application that brings sorting algorithms and data structures to life through pixel-style step-by-step animations. Supports bubble sort, merge sort, quick sort, and binary search tree visualization.',
    tech: ['PHP', 'HTML5 Canvas', 'CSS Animations', 'Data Structures'],
    features: [
      'Detection of malicious and benign network traffic', 
      'Hybrid Random Forest–TabNet ensemble model', 
      'Training and evaluation using the CICIDS-2017 dataset', 
      'Data preprocessing and normalization pipeline', 
      'Performance analysis using accuracy, precision, recall, and F1-score' 
    ],
    github: '#',
    demo: '#',
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