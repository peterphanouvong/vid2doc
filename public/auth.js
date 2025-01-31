// 6. Animate into position from below
function animateFromBelow(
  element,
  duration = 800,
  offset = 50,
  easing = "easeOutQuart"
) {
  // Store original position to prevent layout shifts
  const originalTransform = element.style.transform;

  // Start from below by the offset amount
  element.style.transform = `translateY(${offset}px)`;

  // Force browser to acknowledge the starting position
  // element.offsetHeight;

  // Function for the actual animation
  const startTime = performance.now();

  // Collection of easing functions
  const easings = {
    easeOutQuart: (x) => 1 - Math.pow(1 - x, 4),
    easeInOutCubic: (x) =>
      x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2,
    easeOutBack: (x) => {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    },
    linear: (x) => x,
  };

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Apply selected easing function
    const easingFn = easings[easing] || easings.easeOutQuart;
    const currentY = offset * (1 - easingFn(progress));

    // Use transform for better performance, preserving any original transform
    element.style.transform = `translateY(${currentY}px) ${originalTransform || ""}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);

  // Return a promise that resolves when animation completes
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

document.addEventListener("DOMContentLoaded", (event) => {
  // gsap code here!
  console.log("auth.js loaded");
  const widget = document.querySelector(".kinde-layout-widget-content");
  animateFromBelow(widget, 500, 100, "easeOutBack");
});
