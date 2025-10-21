// Initialize skeleton loading
function initSkeleton() {
  const skeletons = document.querySelectorAll(".skeleton-before");
  const mainElements = document.querySelectorAll(".skeleton-after");

  skeletons.forEach((el) => {
    el.classList.add("skeleton-before--hide");
  });

  mainElements.forEach((el) => {
    el.classList.add("skeleton-after--show");
  });
}

export function startSkeleton() {
  const skeletons = document.querySelectorAll(".skeleton-before");
  const mainElements = document.querySelectorAll(".skeleton-after");

  skeletons.forEach((el) => {
    el.classList.remove("skeleton-before--hide");
  });

  mainElements.forEach((el) => {
    el.classList.remove("skeleton-after--show");
  });
}

export function endSkeleton() {
  const skeletons = document.querySelectorAll(".skeleton-before");
  const mainElements = document.querySelectorAll(".skeleton-after");

  skeletons.forEach((el) => {
    el.classList.add("skeleton-before--hide");
  });

  mainElements.forEach((el) => {
    el.classList.add("skeleton-after--show");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initSkeleton();
});
