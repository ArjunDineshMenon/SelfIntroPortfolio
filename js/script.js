// script.js – Entry point for the hero page
// This file boots the page, initialises GSAP animations
// and wires interactive elements (buttons, social icons).

import { initHeroAnimations } from "./animations.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize page load animation sequence
  initHeroAnimations();

  // Example of a micro‑interaction: button hover lift already handled via CSS.
  // Additional interactions (e.g., navigation underline) can be added here.
});
