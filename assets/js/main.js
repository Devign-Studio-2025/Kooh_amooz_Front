// Librarys
import "../libs/bootstrap/bootstrap.bundle.min.js";
import "../libs/jquery/jquery-3.7.1.min.js";
import "../libs/toastr/toastr.min.js";

import { initSkeleton } from "../js/components/skeleton.js";

// Tooltip for nav buttons
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

// Update cart count
const cartBadge = document.querySelector("#cart .button__badge");

function updateCartCount() {
  const checkedItems = document.querySelectorAll(
    ".course-card__head-button--cart input:checked"
  );
  cartBadge.textContent = checkedItems.length;
}

// Toast
toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: "toast-bottom-right",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "3000",
  extendedTimeOut: "1000",
  hideEasing: "linear",
  showMethod: "slideDown",
  hideMethod: "slideUp",
};

// Ajax for add to cart
function addToCart(id) {
  // 1. Ajax request
  // ----
  // 2. Toast show (based on response)
  toastr.success("این دوره به سبد خریدتان اضافه شد.", "به سبد خرید اضافه شد.");
  toastr.warning("این دوره از سبد خریدتان حذف شد.", "از سبد خرید حذف شد.");

  // 3. Update ui
  updateCartCount();
}

// Ajax for add to fav
function addToFav(id) {
  // 1. Ajax request
  // ----
  // 2. Toast show (based on response)
  toastr.info(
    "این دوره به علاقمندی‌هایتان اضافه شد.",
    "به علاقمندی‌ها اضافه شد."
  );
  toastr.warning(
    "این دوره از علاقمندی‌هایتان حذف شد.",
    "از علاقمندی‌ها حذف شد."
  );
}

// Add functions to cart buttons
const cartCheckBoxes = document.querySelectorAll(
  ".course-card__head-button--cart input"
);
const heartCheckBoxes = document.querySelectorAll(
  ".course-card__head-button--heart input"
);

cartCheckBoxes.forEach((chechBox) => {
  chechBox.onchange = () => {
    addToCart(chechBox.value);
  };
});

heartCheckBoxes.forEach((chechBox) => {
  chechBox.onchange = () => {
    addToFav(chechBox.value);
  };
});

initSkeleton();
