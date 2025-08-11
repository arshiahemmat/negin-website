/*
 * Custom JavaScript for Negin Khodami's landing page.
 *
 * - Initializes AOS (Animate On Scroll) to trigger animations on scroll.
 * - Implements a typing effect using Typed.js for the hero subtitle.
 */

document.addEventListener('DOMContentLoaded', () => {
  // IntersectionObserver to reveal elements on scroll. Each element with
  // the class 'reveal' will gain the 'show' class when it enters the
  // viewport. This produces a subtle fade/slide animation defined in CSS.
  const revealElements = document.querySelectorAll('.reveal');
  const observerOptions = {
    threshold: 0.1,
  };
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  // Note: The hero subtitle text is static; typed effect removed to ensure
  // compatibility in offline environments. If you wish to add a typing
  // animation, you can implement it here without external dependencies.
});