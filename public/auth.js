/**
 * Animates an element from below into its original position
 * @param {HTMLElement} element - The DOM element to animate
 * @param {number} offset - The starting offset in pixels (how far below)
 * @param {number} duration - Animation duration in milliseconds
 * @param {number} delay - Delay before animation starts in milliseconds
 * @returns {Promise} Resolves when animation completes
 */
function animateFromBelow(element, offset = 100, duration = 500, delay = 0) {
  // Store original transition and transform
  const originalTransition = element.style.transition;
  const originalTransform = element.style.transform;

  // Set initial position
  element.style.transform = `translateY(${offset}px)`;
  element.style.opacity = "0";

  element.offsetHeight; // Trigger reflow to make sure the initial styles are applied

  // Set up the transition
  element.style.transition = `transform ${duration}ms ease-out ${delay}ms, opacity ${duration}ms ease-out ${delay}ms`;

  return new Promise((resolve) => {
    const handleTransitionEnd = (event) => {
      if (event.propertyName === "transform") {
        // Clean up
        element.removeEventListener("transitionend", handleTransitionEnd);
        element.style.transition = originalTransition;
        resolve();
      }
    };

    element.addEventListener("transitionend", handleTransitionEnd);

    // Start animation
    requestAnimationFrame(() => {
      element.style.transform = originalTransform || "none";
      element.style.opacity = "1";
    });
  });
}
document.addEventListener("DOMContentLoaded", (event) => {
  // gsap code here!
  const image = document.querySelector("img");
  const h2 = document.querySelector("h2");
  const button1 = document.querySelector(
    "button[value='ccd3cd1fd708417dbdc91ca6e1b39c61']"
  );
  const button2 = document.querySelector(
    "button[value='4a7acc1cedaf498ab8de783d41b3ce98']"
  );
  const separator = document.querySelector(".kinde-choice-separator");

  const emailInput = document.querySelector(
    ".kinde-form-field.kinde-form-field-variant-select-text"
  );
  const button = document.querySelector(
    ".kinde-button.kinde-button-variant-primary"
  );
  const text = document.querySelector(".kinde-fallback-action");
  Promise.all([
    animateFromBelow(image, 50, 300, 0),
    animateFromBelow(h2, 50, 300, 100),
    animateFromBelow(button1, 50, 300, 200),
    animateFromBelow(button2, 50, 300, 300),
    animateFromBelow(separator, 50, 300, 400),
    animateFromBelow(emailInput, 50, 300, 500),
    animateFromBelow(button, 50, 300, 600),
    animateFromBelow(text, 50, 300, 700),
  ]).then(() => {
    console.log("All animations completed!");
  });
});
