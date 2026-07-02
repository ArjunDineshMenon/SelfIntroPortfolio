// animations.js – GSAP animation definitions for the hero section
// All page‑load and micro‑interactions are defined here.
// Import GSAP (already loaded via CDN in index.html).

export function initHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Navbar fade‑in from top
  tl.from(".navbar", { y: -50, opacity: 0, duration: 0.6 }, "0");

  // Badge fade‑in
  tl.from(".badge", { opacity: 0, y: 20, duration: 0.4 }, "+=0.2");

  // Small title slide‑up
  tl.from(".hero__small-title", { y: 30, opacity: 0, duration: 0.5 }, "+=0.1");

  // Main title scale‑in with glow
  tl.from(".hero__title", { scale: 0.8, opacity: 0, duration: 0.8 }, "-=0.3");

  // Subtitle fade‑in
  tl.from(".hero__subtitle", { opacity: 0, y: 10, duration: 0.4 }, "+=0.2");

  // Description fade‑in
  tl.from(".hero__desc", { opacity: 0, y: 10, duration: 0.4 }, "+=0.1");

  // Buttons appear staggered
  tl.from([".btn--primary", ".btn--outline"], { opacity: 0, y: 10, stagger: 0.15, duration: 0.4 }, "+=0.2");

  // Stats appear
  tl.from(".hero__stats .stat", { opacity: 0, y: 10, stagger: 0.1, duration: 0.3 }, "+=0.2");

  // Social icons appear
  tl.from(".hero__social .social-btn", { opacity: 0, scale: 0.8, stagger: 0.1, duration: 0.4 }, "+=0.2");

  // Illustration fade‑in last
  tl.from(".hero__right .illustration", { opacity: 0, scale: 0.9, duration: 0.8 }, "+=0.3");
}
