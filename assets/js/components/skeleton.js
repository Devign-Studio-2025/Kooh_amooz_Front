// Initialize skeleton loading
export function initSkeleton() {
  const skeletons = document.querySelectorAll(".skeleton-before");
  const mainElements = document.querySelectorAll(".skeleton-after");

  skeletons.forEach((el) => {
    el.remove();
  });

  mainElements.forEach((el) => {
    el.classList.remove("skeleton-after");
  });
}
