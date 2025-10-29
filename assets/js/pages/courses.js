import { startSkeleton, endSkeleton } from "../components/skeleton.js";
import { createCard } from "../components/courseCard.js";

// Remove filters
function removeFilters() {
  const sideMenuChecks = document.querySelectorAll(
    '.sidebar-section input[type="checkbox"]'
  );
  const offcanvasChecks = document.querySelectorAll(
    '#filter-menu input[type="checkbox"]'
  );

  sideMenuChecks.forEach((check) => {
    check.checked = false;
  });
  offcanvasChecks.forEach((check) => {
    check.checked = false;
  });
}

const removeBtns = document.querySelectorAll(
  ".sidebar-section__head-remove-filter"
);
removeBtns.forEach((btn) => {
  btn.onclick = () => {
    const sideMenuChecks = document.querySelectorAll(
      '.sidebar-section input[type="checkbox"]:checked'
    );
    const offcanvasChecks = document.querySelectorAll(
      '#filter-menu input[type="checkbox"]:checked'
    );

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
  const sideMenuCount = document.querySelector(
    ".sidebar-section .filter-count"
  );
  const offcanvasCount = document.querySelector("#filter-menu .filter-count");
  const headCount = document.querySelector(
    ".content-section__head .filter-count"
  );

  const sideMenuChecks = document.querySelectorAll(
    '.sidebar-section input[type="checkbox"]:checked'
  );
  const offcanvasChecks = document.querySelectorAll(
    '#filter-menu input[type="checkbox"]:checked'
  );

  sideMenuCount.textContent = `(${sideMenuChecks.length})`;
  offcanvasCount.textContent = `(${offcanvasChecks.length})`;
  headCount.textContent = `(${offcanvasChecks.length})`;
}

// Update result Count
function updateResults(count) {
  const result = document.querySelector(".content-section__head-result");
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
const filterChecks = document.querySelectorAll(
  ':where(.sidebar-section, #filter-menu) input[type="checkbox"]'
);
const sortChecks = document.querySelectorAll(
  ":where(.content-section__head, #sort-menu) input"
);
const cardsContainer = document.querySelector(".content-section__body");

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
    const sortText = document.querySelector(
      '.button[data-bs-target="#sort-menu"] .button__text'
    );
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
