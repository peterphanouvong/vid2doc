// 1. Using requestAnimationFrame for smooth animations
function smoothMove(element, duration, startX, endX) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth motion
    const easeInOutCubic = (progress) =>
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    const currentX = startX + (endX - startX) * easeInOutCubic(progress);
    element.style.transform = `translateX(${currentX}px)`;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// 2. CSS Transition helper
function addTransition(
  element,
  properties = ["all"],
  duration = 300,
  timingFunction = "ease"
) {
  const transitions = properties
    .map((prop) => `${prop} ${duration}ms ${timingFunction}`)
    .join(", ");

  element.style.transition = transitions;
}

// 3. CSS Animation helper
function createKeyframeAnimation(name, keyframes) {
  const styleSheet = document.createElement("style");
  const keyframeRule = `
      @keyframes ${name} {
          ${Object.entries(keyframes)
            .map(([key, value]) => `${key} { ${value} }`)
            .join("\n")}
      }
  `;

  styleSheet.textContent = keyframeRule;
  document.head.appendChild(styleSheet);

  return styleSheet;
}

// 4. Scroll animation
function smoothScrollTo(element, duration = 500) {
  const start = window.pageYOffset;
  const end = element.getBoundingClientRect().top + start;
  const startTime = performance.now();

  function scroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function
    const easeOutQuart = (x) => 1 - Math.pow(1 - x, 4);
    const currentPosition = start + (end - start) * easeOutQuart(progress);

    window.scrollTo(0, currentPosition);

    if (progress < 1) {
      requestAnimationFrame(scroll);
    }
  }

  requestAnimationFrame(scroll);
}

// 5. Fade animation
function fade(element, type = "in", duration = 500) {
  element.style.transition = `opacity ${duration}ms ease`;
  element.style.opacity = type === "in" ? 0 : 1;

  // Force reflow
  element.offsetHeight;

  element.style.opacity = type === "in" ? 1 : 0;

  return new Promise((resolve) => {
    setTimeout(() => {
      if (type === "out") {
        element.style.display = "none";
      }
      resolve();
    }, duration);
  });
}

document.addEventListener("DOMContentLoaded", (event) => {
  // gsap code here!
  console.log("auth.js loaded");
  const widget = document.querySelector(".kinde-layout-widget-content");
  smoothMove(widget, 1000, 0, 300);
});
