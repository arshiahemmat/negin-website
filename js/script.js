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

  /*
   * Animated counters for the facts & figures section. When the stats section
   * comes into view, each element with the class `counter` counts up from 0 to
   * its target value. A suffix (e.g. “+”) defined on the `data-suffix`
   * attribute is appended to the final number. The animation runs only once
   * when the section first enters the viewport.
   */
  const statsSection = document.querySelector('.stats');
  const counters = document.querySelectorAll('.counter');

  if (statsSection && counters.length) {
    const animateCounters = () => {
      counters.forEach((counter) => {
        const targetAttr = counter.getAttribute('data-target');
        const target = parseFloat(targetAttr);
        const suffix = counter.getAttribute('data-suffix') || '';
        let current = 0;
        const duration = 2000; // total time for animation in ms
        const stepTime = 1000 / 60; // approx 60fps
        const increment = target / (duration / stepTime);
        const hasDecimal = !(Number.isInteger(target));
        const update = () => {
          current += increment;
          if (current < target) {
            // If target has decimals, show one decimal place
            counter.textContent = hasDecimal
              ? current.toFixed(1) + suffix
              : Math.floor(current) + suffix;
            requestAnimationFrame(update);
          } else {
            counter.textContent = hasDecimal
              ? target.toFixed(1) + suffix
              : target + suffix;
          }
        };
        update();
      });
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    statsObserver.observe(statsSection);
  }

  /*
   * Mobile navigation toggle. On small screens, a hamburger icon is displayed. When the
   * icon is clicked, it toggles the `.open` class on the navbar, showing or hiding
   * the navigation links.
   */
  const menuToggle = document.querySelector('.menu-toggle');
  const navbar = document.querySelector('.navbar');
  if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
      navbar.classList.toggle('open');
    });
  }
});