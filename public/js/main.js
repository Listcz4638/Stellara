// ---- Hero constellation: Pleiades (M45), approximate real relative positions ----
(function () {
  const canvas = document.getElementById('constellationCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const stars = [
    { name: 'Alcyone', x: 0.52, y: 0.42, r: 3.4 },
    { name: 'Atlas',   x: 0.63, y: 0.48, r: 2.3 },
    { name: 'Electra', x: 0.40, y: 0.34, r: 2.6 },
    { name: 'Maia',    x: 0.47, y: 0.30, r: 2.4 },
    { name: 'Merope',  x: 0.36, y: 0.50, r: 2.2 },
    { name: 'Taygeta', x: 0.44, y: 0.24, r: 2.0 },
    { name: 'Pleione', x: 0.60, y: 0.40, r: 2.0 },
    { name: 'Celaeno', x: 0.38, y: 0.42, r: 1.8 },
  ];

  const links = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 6], [2, 3], [2, 5], [2, 7], [4, 7],
  ];

  // scattered background stars, fixed random seed-ish via index
  const bg = Array.from({ length: 46 }, (_, i) => ({
    x: (i * 53.7) % 100 / 100,
    y: (i * 91.3) % 100 / 100,
    r: 0.5 + ((i * 17) % 10) / 10,
    tw: (i % 5) / 5,
  }));

  let w, h, dpr;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  let progress = 0; // 0 -> 1 draw-in progress
  let start = null;

  function draw(ts) {
    if (start === null) start = ts;
    if (!prefersReducedMotion) {
      progress = Math.min(1, (ts - start) / 1800);
    } else {
      progress = 1;
    }

    ctx.clearRect(0, 0, w, h);

    // background stars with gentle twinkle
    bg.forEach((s) => {
      const alpha = prefersReducedMotion
        ? 0.5
        : 0.25 + 0.35 * (0.5 + 0.5 * Math.sin(ts / 900 + s.tw * 10));
      ctx.beginPath();
      ctx.fillStyle = `rgba(244,242,235,${alpha})`;
      ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // constellation lines, drawn progressively
    const visibleLinks = Math.ceil(links.length * progress);
    ctx.strokeStyle = 'rgba(139,127,214,0.55)';
    ctx.lineWidth = 1;
    for (let i = 0; i < visibleLinks; i++) {
      const [a, b] = links[i];
      const sa = stars[a], sb = stars[b];
      ctx.beginPath();
      ctx.moveTo(sa.x * w, sa.y * h);
      ctx.lineTo(sb.x * w, sb.y * h);
      ctx.stroke();
    }

    // stars themselves, with glow
    stars.forEach((s, i) => {
      const appear = Math.min(1, Math.max(0, progress * stars.length - i));
      if (appear <= 0) return;
      const px = s.x * w, py = s.y * h;

      const glow = ctx.createRadialGradient(px, py, 0, px, py, s.r * 6);
      glow.addColorStop(0, 'rgba(230,195,131,0.35)');
      glow.addColorStop(1, 'rgba(230,195,131,0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(px, py, s.r * 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(244,242,235,${appear})`;
      ctx.beginPath();
      ctx.arc(px, py, s.r, 0, Math.PI * 2);
      ctx.fill();
    });

    if (progress < 1 || !prefersReducedMotion) {
      requestAnimationFrame(draw);
    }
  }

  function start_() {
    resize();
    start = null;
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); });
  start_();
})();

// ---- Booking form (front-end only placeholder — viz README pro napojení e-mailu) ----
(function () {
  const form = document.getElementById('bookingForm');
  const note = document.getElementById('formNote');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const jmeno = form.jmeno.value.trim();
    if (!jmeno) return;
    note.textContent = `Díky, ${jmeno}! Objednávku jsme zaznamenali a ozveme se do dvou pracovních dnů.`;
    form.reset();
  });
})();
