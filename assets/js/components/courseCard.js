// Update cart count
const cartBadge = document.querySelector("#cart .button__badge");

function plusCartCount() {
  const checkedItems = document.querySelectorAll(".course-card__head-button--cart input:checked");
  cartBadge.textContent = parseInt(cartBadge.textContent) + 1;
}

function minusCartCount() {
  const checkedItems = document.querySelectorAll(".course-card__head-button--cart input:checked");
  cartBadge.textContent = parseInt(cartBadge.textContent) - 1;
}

// Ajax for add to cart
export function addToCart(id) {
  // 1. Ajax request
  // ----
  // 2. Toast show (based on response)
  toastr.success("این دوره به سبد خریدتان اضافه شد.", "به سبد خرید اضافه شد.");
  toastr.warning("این دوره از سبد خریدتان حذف شد.", "از سبد خرید حذف شد.");

  // 3. Update ui
  plusCartCount();
  // minusCartCount();
}

// Ajax for add to fav
export function addToFav(id) {
  // 1. Ajax request
  // ----
  // 2. Toast show (based on response)
  toastr.info("این دوره به علاقمندی‌هایتان اضافه شد.", "به علاقمندی‌ها اضافه شد.");
  toastr.warning("این دوره از علاقمندی‌هایتان حذف شد.", "از علاقمندی‌ها حذف شد.");
}

// Init functions to cart buttons
const cartCheckBoxes = document.querySelectorAll(".course-card__head-button--cart input");
const heartCheckBoxes = document.querySelectorAll(".course-card__head-button--heart input");

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
