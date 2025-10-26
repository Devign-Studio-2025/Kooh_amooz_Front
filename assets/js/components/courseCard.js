// Create card
export function createCard(params = {}) {
  const {
    id,
    image,
    alt,
    category,
    title,
    rating,
    duration,
    likes,
    mentorName,
    mentorImage,
    originalPrice,
    discountedPrice,
    discountPercent,
    isPurchased = false,
    isLiked = false,
    isInCart = false,
  } = params;

  const card = document.createElement("a");
  card.href = "#";
  card.className = "course-card";
  card.dataset.id = id;

  card.innerHTML = `
        <div class="course-card__head">
            <img class="skeleton" loading="lazy" src="${image}" alt="${alt}" />
            <div class="course-card__head-buttons">
                <label class="course-card__head-button button button--sm course-card__head-button--heart" for="heart-${id}">
                    <input type="checkbox" id="heart-${id}" ${
    isLiked ? "checked" : ""
  } />
                    <svg class="icon icon--md icon-linear" viewBox="0 0 24 24">
                        <use href="assets/icons/sprites.svg#vuesax/linear/heart"></use>
                    </svg>
                    <svg class="icon icon--md icon-filled" viewBox="0 0 24 24">
                        <use href="assets/icons/sprites.svg#vuesax/bold/heart"></use>
                    </svg>
                </label>
                <label class="course-card__head-button button button--sm course-card__head-button--cart" for="cart-${id}">
                    <input type="checkbox" id="cart-${id}" ${
    isInCart ? "checked" : ""
  } />
                    <svg class="icon icon--md icon-linear" viewBox="0 0 24 24">
                        <use href="assets/icons/sprites.svg#fluent:cart-20-regular"></use>
                    </svg>
                    <svg class="icon icon--md icon-filled" viewBox="0 0 24 24">
                        <use href="assets/icons/sprites.svg#fluent:cart-24-filled"></use>
                    </svg>
                </label>
            </div>
        </div>
        <div class="course-card__body">
            <div class="course-card__body-category">
                <span class="course-card__body-category-icon">
                    <svg class="icon icon--md" viewBox="0 0 24 24">
                        <use href="assets/icons/sprites.svg#vuesax/linear/layer"></use>
                    </svg>
                </span>
                <h4 class="course-card__body-category-title">${category}</h4>
                <div class="label label--warning label--sm">
                    <span class="label__icon">
                        <svg class="icon icon--xs" viewBox="0 0 24 24">
                            <use href="assets/icons/sprites.svg#iconoir:star-solid"></use>
                        </svg>
                    </span>
                    <span class="label__text">${rating}</span>
                </div>
            </div>
            <h3 class="course-card__body-title">${title}</h3>
            <div class="course-card__body-infos">
                <div class="course-card__body-info">
                    <span class="course-card__body-info-icon">
                        <svg class="icon icon--md" viewBox="0 0 24 24">
                            <use href="assets/icons/sprites.svg#vuesax/linear/timer-start"></use>
                        </svg>
                    </span>
                    <p class="course-card__body-info-text">زمان دوره:</p>
                    <p class="course-card__body-info-value">${duration} ساعت</p>
                </div>
                <div class="course-card__body-info">
                    <span class="course-card__body-info-icon">
                        <svg class="icon icon--md" viewBox="0 0 24 24">
                            <use href="assets/icons/sprites.svg#vuesax/linear/heart"></use>
                        </svg>
                    </span>
                    <p class="course-card__body-info-text">علاقمندان:</p>
                    <p class="course-card__body-info-value">
                        ${likes}
                        <span class="course-card__body-info-value-unit">نفر</span>
                    </p>
                </div>
                <div class="course-card__body-info">
                    <span class="course-card__body-info-icon">
                        <img class="skeleton" loading="lazy" src="${mentorImage}" alt="${mentorName}" />
                    </span>
                    <p class="course-card__body-info-text">مدرس:</p>
                    <p class="course-card__body-info-value">${mentorName}</p>
                </div>
            </div>
        </div>
        <div class="course-card__foot">
            ${
              isPurchased
                ? `
                <div class="label label--primary label--md justify-content-center w-100">
                    <span class="label__icon">
                        <svg class="icon icon--md" viewBox="0 0 24 24">
                            <use href="assets/icons/sprites.svg#Warning / Circle_Check"></use>
                        </svg>
                    </span>
                    <span class="label__text">خریداری شده</span>
                </div>
            `
                : `
                <div class="course-card__foot-prices">
                    ${
                      originalPrice
                        ? `
                        <div class="course-card__foot-price-before">
                            ${originalPrice.toLocaleString()} تومان
                        </div>
                    `
                        : ""
                    }
                    <div class="course-card__foot-price-after">
                        <span class="course-card__foot-price-after-value">${discountedPrice.toLocaleString()}</span>
                        <span class="course-card__foot-price-unit">تومان</span>
                    </div>
                </div>
                ${
                  discountPercent
                    ? `
                    <div class="course-card__foot-info-discount">
                        <div class="label label--sm label--success">
                            <span class="label__text">${discountPercent}% تخفیف</span>
                        </div>
                    </div>
                `
                    : ""
                }
            `
            }
        </div>
    `;

  const heartButton = card.querySelector(`#heart-${id}`);
  const cartButton = card.querySelector(`#cart-${id}`);

  heartButton.addEventListener("change", function () {
    addToFav();
  });

  cartButton.addEventListener("change", function () {
    addToCart();
  });

  return card;
}

// Update cart count
const cartBadge = document.querySelector("#cart .notif__badge");

function plusCartCount() {
  const checkedItems = document.querySelectorAll(
    ".course-card__head-button--cart input:checked"
  );
  cartBadge.textContent = parseInt(cartBadge.textContent) + 1;
}

function minusCartCount() {
  const checkedItems = document.querySelectorAll(
    ".course-card__head-button--cart input:checked"
  );
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
  toastr.info(
    "این دوره به علاقمندی‌هایتان اضافه شد.",
    "به علاقمندی‌ها اضافه شد."
  );
  toastr.warning(
    "این دوره از علاقمندی‌هایتان حذف شد.",
    "از علاقمندی‌ها حذف شد."
  );
}

// Init functions to cart buttons
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
