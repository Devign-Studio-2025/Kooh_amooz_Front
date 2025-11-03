function parsePrice(priceText) {
  return parseInt(priceText.replace(/[^\d]/g, "")) || 0;
}

function formatPrice(price) {
  return price.toLocaleString("fa-IR") + " تومان";
}

function updateCartSummary() {
  const courseCards = document.querySelectorAll(
    ".cart-section__course-card:not(.removing):not(.removed)"
  );
  let totalPrice = 0;
  let totalSavings = 0;
  let totalPayable = 0;

  courseCards.forEach((card) => {
    const priceBefore = parsePrice(
      card.querySelector(".course-card__price-before").textContent
    );
    const payable = parsePrice(
      card.querySelector(".course-card__payable").textContent
    );

    totalPrice += priceBefore;
    totalPayable += payable;
    totalSavings += priceBefore - payable;
  });

  // Update summary
  document.querySelector(".cart-section__total-price span").textContent =
    formatPrice(totalPrice);
  document.querySelector(".cart-section__savings span").textContent =
    formatPrice(totalSavings);
  document.querySelector(".cart-section__payable span").textContent =
    formatPrice(totalPayable);
}

function updateCartCount() {
  const countElement = document.querySelector("[data-cart-count]");
  const countElementNav = document.querySelector("[data-cart-count-nav]");
  const currentCount = document.querySelectorAll(
    ".cart-section__course-card:not(.removing):not(.removed)"
  ).length;
  countElement.textContent = `(${currentCount})`;
  countElementNav.textContent = `${currentCount}`;
}

function removeCourseCard(courseId) {
  const courseCard = document.querySelector(`[data-course-id="${courseId}"]`);
  if (courseCard && !courseCard.classList.contains("removing")) {
    courseCard.classList.add("removing");
    courseCard.style.transition =
      "opacity 0.3s ease-in-out, transform 0.25s ease-in-out";
    courseCard.style.opacity = "0";
    courseCard.style.transform = "translateX(20%)";
    setTimeout(() => {
      courseCard.classList.add("removed");
      courseCard.style.display = "none";
      updateCartCount();
      updateCartSummary();
    }, 300);
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
  updateCartSummary();
  document.querySelectorAll("[data-remove-button]").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const courseId = button.dataset.courseId;
      removeCourseCard(courseId);
      toastr.warning("این دوره از سبد خریدتان حذف شد.", "از سبد خرید حذف شد.");
    });
  });
});
