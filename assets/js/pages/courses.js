import { startSkeleton, endSkeleton } from "../components/skeleton.js";
import { addToCart, addToFav } from "../components/courseCard.js";

// Create card
function createCard(params = {}) {
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
                    <input type="checkbox" id="heart-${id}" ${isLiked ? "checked" : ""} />
                    <svg class="icon icon--md icon-linear" viewBox="0 0 24 24">
                        <use href="assets/icons/sprites.svg#vuesax/linear/heart"></use>
                    </svg>
                    <svg class="icon icon--md icon-filled" viewBox="0 0 24 24">
                        <use href="assets/icons/sprites.svg#vuesax/bold/heart"></use>
                    </svg>
                </label>
                <label class="course-card__head-button button button--sm course-card__head-button--cart" for="cart-${id}">
                    <input type="checkbox" id="cart-${id}" ${isInCart ? "checked" : ""} />
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

// Remove filters
function removeFilters() {
  const sideMenuChecks = document.querySelectorAll('.sidebar-section input[type="checkbox"]');
  const offcanvasChecks = document.querySelectorAll('#filter-menu input[type="checkbox"]');

  sideMenuChecks.forEach((check) => {
    check.checked = false;
  });
  offcanvasChecks.forEach((check) => {
    check.checked = false;
  });
}

const removeBtns = document.querySelectorAll(".sidebar-section__head-remove-filter");
removeBtns.forEach((btn) => {
  btn.onclick = () => {
    const sideMenuChecks = document.querySelectorAll('.sidebar-section input[type="checkbox"]:checked');
    const offcanvasChecks = document.querySelectorAll('#filter-menu input[type="checkbox"]:checked');

    removeFilters();
    updateFiltersCount();

    if (sideMenuChecks.length == 0 && offcanvasChecks.length == 0) {
      return;
    }

    // 1. Fetch cards with Ajax
    // ---

    // 2. Remove cards
    // cardsContainer.innerHTML = "";

    // 3. Start Skeletons
    startSkeleton();

    // 4. Update results
    updateResults(30);
    updateFiltersCount();

    // 4. Create card
    // cardsContainer.append(createCard(params))

    // 5. End Skeletons
    setTimeout(() => {
      endSkeleton();
    }, 300);
  };
});

// Update filters Count
function updateFiltersCount() {
  const sideMenuCount = document.querySelector(".sidebar-section .filter-count");
  const offcanvasCount = document.querySelector("#filter-menu .filter-count");
  const headCount = document.querySelector(".courses-section__head .filter-count");

  const sideMenuChecks = document.querySelectorAll('.sidebar-section input[type="checkbox"]:checked');
  const offcanvasChecks = document.querySelectorAll('#filter-menu input[type="checkbox"]:checked');

  sideMenuCount.textContent = `(${sideMenuChecks.length})`;
  offcanvasCount.textContent = `(${offcanvasChecks.length})`;
  headCount.textContent = `(${offcanvasChecks.length})`;
}

// Update result Count
function updateResults(count) {
  const result = document.querySelector(".courses-section__head-result");
  result.textContent = `${count} نتیجه`;
}

// Price remove filter
const priceBtnRemoves = document.querySelectorAll(".price-remove");
const priceInputs = document.querySelectorAll(".price-filters input");

priceBtnRemoves.forEach((btn) => {
  btn.onclick = () => {
    priceInputs.forEach((input) => {
      input.value = "";
    });
  };
});

// Ajax from all checks & radios
const filterChecks = document.querySelectorAll(':where(.sidebar-section, #filter-menu) input[type="checkbox"]');
const sortChecks = document.querySelectorAll(":where(.courses-section__head, #sort-menu) input");
const cardsContainer = document.querySelector(".courses-section__body");

filterChecks.forEach((check) => {
  check.addEventListener("change", () => {
    // 1. Fetch cards with Ajax
    // ---

    // 2. Remove cards
    // cardsContainer.innerHTML = "";

    // 3. Start Skeletons
    startSkeleton();

    // 4. Update results
    updateResults(30);
    updateFiltersCount();

    // 4. Create card
    // cardsContainer.append(createCard(params))

    // 5. End Skeletons
    setTimeout(() => {
      endSkeleton();
    }, 300);
  });
});

sortChecks.forEach((check) => {
  check.addEventListener("change", () => {
    const sortText = document.querySelector('.button[data-bs-target="#sort-menu"] .button__text');
    sortText.textContent = check.nextElementSibling.textContent;

    // 1. Fetch cards with Ajax
    // ---

    // 2. Remove cards
    // cardsContainer.innerHTML = "";

    // 3. Start Skeletons
    startSkeleton();

    // 4. Create card
    // cardsContainer.append(createCard(params))

    // 5. End Skeletons
    setTimeout(() => {
      endSkeleton();
    }, 300);
  });
});
