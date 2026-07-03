// transition.js – Cinematic Hero → About scroll transition
// Uses GSAP ScrollTrigger with scrub for a seamless, film-like experience.
// All animations target transform + opacity only for 60fps GPU compositing.

export function initHeroTransition() {
  // Register the ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  const hero = document.querySelector(".hero");
  if (!hero) return;

  // ------------------------------------------------------------------
  // Spawn stat dissolution particles
  // ------------------------------------------------------------------
  function createStatParticles() {
    const stats = document.querySelectorAll(".stat");
    const particleContainer = document.createElement("div");
    particleContainer.className = "stat-particles";
    particleContainer.style.cssText =
      "position:absolute;inset:0;pointer-events:none;z-index:50;overflow:hidden;";
    hero.appendChild(particleContainer);

    stats.forEach((stat) => {
      const rect = stat.getBoundingClientRect();
      const heroRect = hero.getBoundingClientRect();
      const cx = rect.left - heroRect.left + rect.width / 2;
      const cy = rect.top - heroRect.top + rect.height / 2;

      for (let i = 0; i < 5; i++) {
        const dot = document.createElement("span");
        dot.className = "stat-particle";
        const size = Math.random() * 4 + 2;
        dot.style.cssText = `
          position:absolute;
          width:${size}px;height:${size}px;
          border-radius:50%;
          background:var(--accent-amber);
          left:${cx + (Math.random() - 0.5) * 40}px;
          top:${cy + (Math.random() - 0.5) * 20}px;
          opacity:0;
          will-change:transform,opacity;
        `;
        particleContainer.appendChild(dot);
      }
    });

    return particleContainer.querySelectorAll(".stat-particle");
  }

  const statParticles = createStatParticles();

  // ------------------------------------------------------------------
  // Master pinned timeline – 400vh scroll runway
  // ------------------------------------------------------------------
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "+=400%",
      pin: true,
      scrub: 1.2,
      anticipatePin: 1,
      pinSpacing: true,
    },
    defaults: { ease: "none", force3D: true },
  });

  // =================================================================
  // PHASE 1 (0 → 15%): Hero text fades out
  // =================================================================
  tl.to(
    ".badge",
    { opacity: 0, y: -20, duration: 0.08 },
    0
  );
  tl.to(
    ".hero__small-title",
    { opacity: 0, y: -25, duration: 0.10 },
    0.02
  );
  tl.to(
    ".hero__title",
    { opacity: 0, y: -30, duration: 0.12 },
    0.03
  );
  tl.to(
    ".hero__subtitle",
    { opacity: 0, y: -25, duration: 0.10 },
    0.04
  );
  tl.to(
    ".hero__desc",
    { opacity: 0, y: -20, duration: 0.10 },
    0.05
  );

  // =================================================================
  // PHASE 2 (10% → 25%): Buttons slide down & vanish
  // =================================================================
  tl.to(
    ".hero__buttons",
    { opacity: 0, y: 80, duration: 0.15 },
    0.10
  );
  tl.to(
    ".hero__social",
    { opacity: 0, y: 40, duration: 0.12 },
    0.12
  );

  // =================================================================
  // PHASE 3 (15% → 35%): Stats dissolve into particles
  // =================================================================
  tl.to(
    ".hero__stats .stat",
    {
      opacity: 0,
      scale: 0.3,
      stagger: 0.02,
      duration: 0.12,
    },
    0.15
  );
  tl.to(
    ".hero__stats .divider",
    { opacity: 0, scaleY: 0, duration: 0.08 },
    0.15
  );

  // Stat particles float upward
  if (statParticles.length > 0) {
    tl.to(
      statParticles,
      {
        opacity: 0.8,
        duration: 0.05,
      },
      0.18
    );
    tl.to(
      statParticles,
      {
        y: () => -(Math.random() * 200 + 100),
        x: () => (Math.random() - 0.5) * 120,
        opacity: 0,
        scale: 0,
        stagger: { each: 0.005, from: "random" },
        duration: 0.15,
      },
      0.20
    );
  }

  // =================================================================
  // PHASE 4 (20% → 45%): Silhouette darkens
  // =================================================================
  tl.to(
    ".hero__photo",
    {
      filter: "brightness(0) contrast(1.5)",
      duration: 0.25,
    },
    0.20
  );
  tl.to(
    ".hero__photo-glow",
    { opacity: 0, duration: 0.15 },
    0.20
  );

  // =================================================================
  // PHASE 5 (35% → 60%): Sunset grows — radial glow expands
  // =================================================================
  tl.fromTo(
    "#sunset-flood",
    { opacity: 0, scale: 0.5 },
    { opacity: 1, scale: 3, duration: 0.25 },
    0.35
  );

  // =================================================================
  // PHASE 6 (55% → 75%): Orange light floods viewport
  // =================================================================
  tl.to(
    "#orange-flood",
    { opacity: 1, duration: 0.20 },
    0.55
  );
  // Sunset fades as solid orange takes over
  tl.to(
    "#sunset-flood",
    { opacity: 0, duration: 0.15 },
    0.60
  );

  // =================================================================
  // PHASE 7 (70% → 90%): Orange fades into deep black
  // =================================================================
  tl.to(
    "#black-flood",
    { opacity: 1, duration: 0.20 },
    0.70
  );
  tl.to(
    "#orange-flood",
    { opacity: 0, duration: 0.15 },
    0.72
  );

  // =================================================================
  // PHASE 8 (85% → 100%): About section rises from darkness
  // =================================================================
  // We animate the about section externally (not inside the pin)
  // so we create a separate ScrollTrigger for it.

  // ------------------------------------------------------------------
  // About section entrance (separate trigger, after pin ends)
  // ------------------------------------------------------------------
  gsap.fromTo(
    ".about",
    { opacity: 0, y: 60 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      force3D: true,
      scrollTrigger: {
        trigger: ".about",
        start: "top 90%",
        end: "top 40%",
        scrub: 1,
      },
    }
  );

  // Stagger the about content elements
  gsap.fromTo(
    ".about__headline",
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      ease: "power2.out",
      force3D: true,
      scrollTrigger: {
        trigger: ".about__headline",
        start: "top 85%",
        end: "top 50%",
        scrub: 1,
      },
    }
  );

  gsap.fromTo(
    ".about__text-block",
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      ease: "power2.out",
      force3D: true,
      scrollTrigger: {
        trigger: ".about__text-block",
        start: "top 85%",
        end: "top 55%",
        scrub: 1,
      },
    }
  );

  gsap.fromTo(
    ".about__highlight-card",
    { opacity: 0, y: 50, scale: 0.95 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.1,
      ease: "power2.out",
      force3D: true,
      scrollTrigger: {
        trigger: ".about__highlights",
        start: "top 85%",
        end: "top 45%",
        scrub: 1,
      },
    }
  );
}
