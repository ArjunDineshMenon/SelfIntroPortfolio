// animations.js – GSAP animation definitions for the hero section
// Handles page‑load sequence, stats counting, background fade, illustration scaling, and floating particles.

export function initHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // 1. Navbar fades down
  tl.from(".navbar", { y: -50, opacity: 0, duration: 0.6 }, "0");

  // 2. Badge fade‑in
  tl.from(".badge", { opacity: 0, y: 20, duration: 0.4 }, "+=0.2");

  // 3. Hero text slides upward (small title, main title, subtitle, description)
  tl.from([".hero__small-title", ".hero__title", ".hero__subtitle", ".hero__desc"], {
    y: 30,
    opacity: 0,
    stagger: 0.12,
    duration: 0.6,
  }, "+=0.1");

  // 4. Buttons stagger in
  tl.from([".btn--primary", ".btn--outline"], { opacity: 0, y: 20, stagger: 0.15, duration: 0.4 }, "+=0.2");

  // 5. Stats appear and start counting
  tl.from(".hero__stats .stat", { opacity: 0, y: 10, stagger: 0.1, duration: 0.3 }, "+=0.2");
  tl.add(() => {
    document.querySelectorAll('.stat__value').forEach(el => {
      const raw = el.textContent.trim();
      if (raw.includes('∞')) return; // skip infinite symbol
      const target = parseFloat(raw.replace('+', ''));
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.5,
        ease: "power1.out",
        onUpdate: () => {
          el.textContent = Math.round(obj.val) + (raw.includes('+') ? '+' : '');
        },
      });
    });
  }, "+=0.1");

  // 6. Social icons appear
  tl.from(".hero__social .social-btn", { opacity: 0, scale: 0.8, stagger: 0.1, duration: 0.4 }, "+=0.2");

  // 7. Background slowly fades (increase opacity)
  tl.to("body::before", { opacity: 0.12, duration: 3 }, "<");

  // 8. Character (illustration) scales from 0.96 to 1
  tl.fromTo(".illustration", { scale: 0.96 }, { scale: 1, duration: 1.5 }, "<");

  // 9. Floating particles gentle vertical movement – handled after timeline
  tl.add(() => {
    const particles = document.querySelectorAll('.particle');
    gsap.to(particles, {
      y: "+=20",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      duration: gsap.utils.random(4, 8),
      stagger: { each: 0.2, repeat: -1 },
    });
  }, "<");
}
