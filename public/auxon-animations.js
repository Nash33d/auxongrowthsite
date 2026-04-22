// ── Logo Marquee Initialization ──
(function initLogos() {
  const logos = window.LOGO_DATA || [];
  const row1 = document.getElementById('logoRow1');
  const row2 = document.getElementById('logoRow2');
  
  if (!row1 || !logos.length) return;
  
  // Set src for all logo images in row1
  const imgs = row1.querySelectorAll('img[data-logo]');
  imgs.forEach(img => {
    const idx = parseInt(img.dataset.logo, 10);
    if (logos[idx % logos.length]) {
      img.src = logos[idx % logos.length];
    }
  });
  
  // Clone content for infinite scroll effect
  const clone = row1.innerHTML;
  row1.innerHTML = row1.innerHTML + clone;
  
  // Initialize row2 if exists (reversed direction)
  if (row2) {
    // Use a shuffled subset of logos for row2
    const shuffled = [...logos].sort(() => Math.random() - 0.5);
    shuffled.forEach((logo, i) => {
      const img = document.createElement('img');
      img.src = logo;
      img.style.cssText = 'height:28px;width:auto;filter:brightness(0) invert(1);opacity:0.5;flex-shrink:0;';
      img.alt = 'client logo';
      row2.appendChild(img);
    });
    // Clone for infinite scroll
    row2.innerHTML = row2.innerHTML + row2.innerHTML;
  }
})();

// ── Scroll reveal (class 'fi' → add 'on') ──
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('on'); });
}, {threshold: 0.1});
document.querySelectorAll('.fi').forEach(el => ro.observe(el));

// ── Counter animation ──
// Supports data-pre, data-suf (matching actual HTML)
function runCounter(el, duration) {
  if(!el || el._counting) return;
  el._counting = true;
  const val = parseFloat(el.dataset.val || '0');
  const pre = el.dataset.pre || '';
  const suf = el.dataset.suf || '';
  const isDecimal = String(val).includes('.');
  const startTime = performance.now();
  function frame(now) {
    const t = Math.min((now - startTime) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    const cur = val * ease;
    const disp = isDecimal ? cur.toFixed(1) : Math.round(cur).toLocaleString();
    el.textContent = pre + disp + suf;
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// ── Hero counters (class 'hc') — trigger on load ──
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.hc').forEach((el, i) => {
      setTimeout(() => runCounter(el, 1800), i * 280);
    });
  }, 600);
});

// ── Graph animation ──
function drawGraph(svg, duration) {
  duration = duration || 1300;
  if (!svg) return;
  const W = svg.clientWidth || 280;
  const H = svg.clientHeight || 80;
  const pts = [
    {x:0,      y:H*0.88},
    {x:W*0.15, y:H*0.82},
    {x:W*0.3,  y:H*0.70},
    {x:W*0.45, y:H*0.55},
    {x:W*0.6,  y:H*0.40},
    {x:W*0.75, y:H*0.28},
    {x:W*0.88, y:H*0.18},
    {x:W,      y:H*0.10}
  ];
  // Build smooth bezier path
  let d = 'M' + pts[0].x + ',' + pts[0].y;
  for (let i = 1; i < pts.length; i++) {
    const mx = (pts[i-1].x + pts[i].x) / 2;
    d += ' C' + mx + ',' + pts[i-1].y + ' ' + mx + ',' + pts[i].y + ' ' + pts[i].x + ',' + pts[i].y;
  }
  const uid = 'g' + Math.random().toString(36).slice(2,7);
  svg.innerHTML = '<defs><linearGradient id="' + uid + '" x1="0" y1="0" x2="0" y2="1">'
    + '<stop offset="0%" stop-color="#00E5A0" stop-opacity="0.3"/>'
    + '<stop offset="100%" stop-color="#00E5A0" stop-opacity="0"/>'
    + '</linearGradient></defs>';
  const area = document.createElementNS('http://www.w3.org/2000/svg','path');
  area.setAttribute('d', d + ' L' + W + ',' + H + ' L0,' + H + ' Z');
  area.setAttribute('fill','url(#' + uid + ')');
  area.style.opacity = '0';
  const line = document.createElementNS('http://www.w3.org/2000/svg','path');
  line.setAttribute('d', d);
  line.setAttribute('fill','none');
  line.setAttribute('stroke','#00E5A0');
  line.setAttribute('stroke-width','2');
  line.setAttribute('stroke-linecap','round');
  const len = line.getTotalLength ? line.getTotalLength() : W * 1.5;
  line.style.strokeDasharray = len;
  line.style.strokeDashoffset = len;
  const dot = document.createElementNS('http://www.w3.org/2000/svg','circle');
  dot.setAttribute('cx', pts[pts.length-1].x);
  dot.setAttribute('cy', pts[pts.length-1].y);
  dot.setAttribute('r','4');
  dot.setAttribute('fill','#00E5A0');
  dot.style.opacity = '0';
  svg.appendChild(area); svg.appendChild(line); svg.appendChild(dot);
  requestAnimationFrame(() => {
    setTimeout(() => {
      line.style.transition = 'stroke-dashoffset ' + duration + 'ms ease';
      line.style.strokeDashoffset = '0';
      area.style.transition = 'opacity ' + duration + 'ms ease';
      area.style.opacity = '1';
      setTimeout(() => { dot.style.transition = 'opacity 0.3s'; dot.style.opacity = '1'; }, duration - 150);
    }, 30);
  });
}

// ── Case cards: observe and animate ──
const cardObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const card = entry.target;
    const svg = card.querySelector('svg');
    const nums = card.querySelectorAll('.cn');
    setTimeout(() => { if(svg) drawGraph(svg); }, 80);
    nums.forEach((el, i) => setTimeout(() => runCounter(el, 1100), i * 150 + 200));
    cardObs.unobserve(card);
  });
}, {threshold: 0.25});
document.querySelectorAll('.case-card').forEach(c => cardObs.observe(c));

// ── Ecosystem animation ──
// 8 SVG groups: en0..en7, label el: eco-step-label
const ecoSteps = ['en0','en1','en2','en3','en4','en5','en6','en7'];
const ecoLabels = [
  'Profile 1: Employee Manager',
  'Profile 2: Main BM Host',
  'Profile 3: Silent Admin',
  'Profile 4: Pixel & Page Mule',
  'Main Business Manager',
  'Pixel BM Connected',
  'Page BM Connected',
  'Agency AA → Bulletproof ✓'
];

function runEcoAnim() {
  // Reset all
  ecoSteps.forEach(id => {
    const el = document.getElementById(id);
    if(el) el.style.opacity = '0';
  });
  const lbl = document.getElementById('eco-step-label');
  ecoSteps.forEach((id, i) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if(el) { el.style.transition = 'opacity 0.5s ease'; el.style.opacity = '1'; }
      if(lbl && ecoLabels[i]) lbl.textContent = ecoLabels[i];
    }, i * 550);
  });
  // Final label
  setTimeout(() => { if(lbl) lbl.textContent = 'Multi-Layer Ecosystem Active ✓'; }, ecoSteps.length * 550 + 300);
}

const ecoObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) { setTimeout(runEcoAnim, 400); ecoObs.unobserve(e.target); }
  });
}, {threshold: 0.2});
const ecoSection = document.getElementById('ecosystem');
if(ecoSection) ecoObs.observe(ecoSection);

// ── Infrastructure step cards highlight on scroll ──
const infraCards = ['exp0', 'exp1', 'exp2', 'exp3'];
const infraObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    const card = e.target;
    const badge = card.querySelector('span');
    if (e.isIntersecting && e.intersectionRatio > 0.5) {
      // Highlight this card
      card.style.opacity = '1';
      card.style.borderColor = 'rgba(0,229,160,0.4)';
      card.style.boxShadow = '0 0 20px -5px rgba(0,229,160,0.15)';
      if (badge) {
        badge.style.background = 'var(--accent)';
        badge.style.color = '#000';
      }
    } else {
      // Dim other cards
      card.style.opacity = '0.45';
      card.style.borderColor = 'var(--border)';
      card.style.boxShadow = 'none';
      if (badge && card.id !== 'exp0') {
        badge.style.background = 'rgba(0,229,160,0.15)';
        badge.style.color = 'var(--accent)';
      }
    }
  });
}, { threshold: [0.5], rootMargin: '-20% 0px -20% 0px' });

infraCards.forEach(id => {
  const el = document.getElementById(id);
  if (el) infraObs.observe(el);
});

// ── Cloaking animation ──
// Real element IDs: cv0/cv1 (views), cb0/cb1 (buttons)
// WITHOUT: cn-ad, cn-arr1, cn-fb, cn-arr2, cn-rej
// WITH:    cw-ad, cw-a1, cw-cl, cw-a2, cw-real, cw-a3, cw-safe

function fi(id, delay) {
  setTimeout(() => {
    const el = document.getElementById(id);
    if(!el) return;
    el.style.transition = 'none';
    void el.offsetWidth; // force reflow
    el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    el.style.opacity = '1';
    el.style.transform = 'translateY(0px)';
  }, delay);
}
function gh(id, delay, h) {
  setTimeout(() => {
    const el = document.getElementById(id);
    if(!el) return;
    el.style.transition = 'height 0.45s ease';
    el.style.height = h + 'px';
  }, delay);
}
function rst(id) {
  const el = document.getElementById(id);
  if(!el) return;
  el.style.transition = 'none';
  el.style.opacity = '0';
  el.style.transform = 'translateY(10px)';
  el.style.height = '0px';
}

function animOff() {
  ['cn-ad','cn-fb','cn-rej'].forEach(id => rst(id));
  ['cn-arr1','cn-arr2'].forEach(id => {
    const el = document.getElementById(id);
    if(el) { el.style.transition = 'none'; el.style.height = '0px'; }
  });
  fi('cn-ad', 100);
  gh('cn-arr1', 450, 36);
  fi('cn-fb', 750);
  gh('cn-arr2', 1150, 36);
  fi('cn-rej', 1450);
}

function animOn() {
  ['cw-ad','cw-cl','cw-real','cw-safe'].forEach(id => rst(id));
  ['cw-a1','cw-a2','cw-a3'].forEach(id => {
    const el = document.getElementById(id);
    if(el) { el.style.transition = 'none'; el.style.height = '0px'; }
  });
  fi('cw-ad', 100);
  gh('cw-a1', 450, 36);
  fi('cw-cl', 750);
  gh('cw-a2', 1150, 36);
  gh('cw-a3', 1150, 36);
  fi('cw-real', 1500);
  fi('cw-safe', 1550);
}

function setCloak(v) {
  const c0 = document.getElementById('cv0');
  const c1 = document.getElementById('cv1');
  const b0 = document.getElementById('cb0');
  const b1 = document.getElementById('cb1');
  if(c0) c0.style.display = v === 0 ? 'flex' : 'none';
  if(c1) c1.style.display = v === 1 ? 'block' : 'none';
  if(b0) b0.style.cssText = v === 0
    ? 'padding:12px 28px;font-size:13px;font-weight:700;cursor:pointer;border:none;background:rgba(239,68,68,0.15);color:#f87171;border-right:1px solid rgba(255,255,255,0.1);'
    : 'padding:12px 28px;font-size:13px;font-weight:700;cursor:pointer;border:none;background:transparent;color:#52525b;border-right:1px solid rgba(255,255,255,0.1);';
  if(b1) b1.style.cssText = v === 1
    ? 'padding:12px 28px;font-size:13px;font-weight:700;cursor:pointer;border:none;background:rgba(0,229,160,0.1);color:#00E5A0;'
    : 'padding:12px 28px;font-size:13px;font-weight:700;cursor:pointer;border:none;background:transparent;color:#52525b;';
  setTimeout(() => { v === 0 ? animOff() : animOn(); }, 50);
}

// Auto-trigger cloaking animation on scroll
const clkObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) { setTimeout(animOff, 300); clkObs.unobserve(e.target); }
  });
}, {threshold: 0.3});
const clkSection = document.getElementById('cloaking');
if(clkSection) clkObs.observe(clkSection);
