// script.js – Entry point for the hero page
// Boots the page, initializes GSAP animations, custom cursor, magnetic hover, particles, and parallax.

import { initHeroAnimations } from "./animations.js";

// ----- Custom Cursor -----
function initCustomCursor() {
  const cursor = document.createElement("div");
  cursor.className = "cursor";
  const ring = document.createElement("div");
  ring.className = "cursor-ring";
  document.body.appendChild(cursor);
  document.body.appendChild(ring);

  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const mouse = { x: pos.x, y: pos.y };

  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function render() {
    // smooth interpolation
    pos.x += (mouse.x - pos.x) * 0.15;
    pos.y += (mouse.y - pos.y) * 0.15;
    cursor.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
    const scale = ring.dataset.hover === 'true' ? 1.5 : 1;
    ring.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) scale(${scale})`;
    requestAnimationFrame(render);
  }
  render();

  // Enlarge on hoverable elements using dataset flag
  const hoverables = document.querySelectorAll(".btn, .nav__link, .social-btn");
  hoverables.forEach((el) => {
    el.addEventListener("mouseenter", () => ring.dataset.hover = 'true');
    el.addEventListener("mouseleave", () => ring.dataset.hover = 'false');
  });

}

// ----- Magnetic Buttons -----
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => { btn.dataset.hover = 'true'; });
    btn.addEventListener('mouseleave', () => {
      btn.dataset.hover = 'false';
      gsap.to(btn, { x: 0, y: 0, duration: 0.3, ease: 'power3.out' });
    });
    btn.addEventListener('mousemove', e => {
      if (btn.dataset.hover !== 'true') return;
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      const strength = 0.2;
      gsap.to(btn, { x: relX * strength, y: relY * strength, duration: 0.2, ease: 'power3.out' });
    });
  });
}

// ----- Parallax -----
function initParallax() {
  const layers = [
    { el: document.querySelector('.hero__photo'), depth: 15 }, // hero photo
    { el: document.body, depth: 8, type: 'sun' },               // sun (background)
    { el: document.querySelector('.hero__left'), depth: 4 },   // mountains placeholder
    { el: document.querySelector('.hero__right'), depth: 2 }   // text minimal movement
  ];

  // Store target positions per layer
  const targets = layers.map(() => ({ x: 0, y: 0 }));
  // Current interpolated positions for smooth movement
  const current = layers.map(() => ({ x: 0, y: 0 }));

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    const percentX = (mouseX / window.innerWidth - 0.5) * 2; // -1 to 1
    const percentY = (mouseY / window.innerHeight - 0.5) * 2;
    layers.forEach((layer, i) => {
      targets[i].x = layer.depth * percentX;
      targets[i].y = layer.depth * percentY;
    });
  });

  function animate() {
    layers.forEach((layer, i) => {
      // lerp for smooth easing
      current[i].x += (targets[i].x - current[i].x) * 0.1;
      current[i].y += (targets[i].y - current[i].y) * 0.1;

      if (layer.type === 'sun') {
        const sunX = 50 + current[i].x;
        const sunY = 50 + current[i].y;
        document.documentElement.style.setProperty('--sun-x', `${sunX}%`);
        document.documentElement.style.setProperty('--sun-y', `${sunY}%`);
      } else if (layer.el) {
        layer.el.style.transform = `translate(${current[i].x}px, ${current[i].y}px)`;
      }
    });
    requestAnimationFrame(animate);
  }

  animate();
}



// ----- DOM Ready -----
document.addEventListener("DOMContentLoaded", () => {
  initHeroAnimations();
  initCustomCursor();
  initMagneticButtons();
  if (typeof createParticles === 'function') createParticles(); // particles from previous implementation
  initParallax();
});
