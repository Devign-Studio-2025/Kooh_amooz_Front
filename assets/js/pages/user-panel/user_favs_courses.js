import { startSkeleton, endSkeleton } from "../../components/skeleton.js";
import "../../../libs/select2/select2.min.js";

// Update result Count
function updateResults(count) {
  const result = document.querySelector(".courses-section__head .result-count");
  result.textContent = `(${count})`;
}

// Select dropdown
$("#category-select").select2({
  minimumResultsForSearch: Infinity,
  placeholder: "دسته‌بندی",
});

$("#sort-select").select2({
  minimumResultsForSearch: Infinity,
  placeholder: "مرتب‌سازی",
  width: "style",
});

// Event trigger for ajax call
$("#category-select").on("select2:select", function (e) {
  // 0. Get data
  // var data = e.params.data;
  // console.log(data);

  // 1. Fetch cards with Ajax
  // ---

  // 2. Remove cards
  // cardsContainer.innerHTML = "";

  // 3. Start Skeletons
  startSkeleton();

  // 3/5. Update results
  updateResults(20);

  // 4. Create card
  // cardsContainer.append(createCard(params))

  // 5. End Skeletons
  setTimeout(() => {
    endSkeleton();
  }, 300);
});

$("#sort-select").on("select2:select", function (e) {
  // 0. Get data
  // var data = e.params.data;
  // console.log(data);

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

// Ajax from mobile radios
const sortChecks = document.querySelectorAll("#sort-menu input[type='radio']");
const categoryChecks = document.querySelectorAll(
  "#category-menu input[type='radio']"
);
const cardsContainer = document.querySelector(".courses-section__body");

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

categoryChecks.forEach((check) => {
  check.addEventListener("change", () => {
    const sortText = document.querySelector(
      '.button[data-bs-target="#category-menu"] .button__text'
    );
    sortText.textContent = check.nextElementSibling.textContent;

    // 1. Fetch cards with Ajax
    // ---

    // 2. Remove cards
    // cardsContainer.innerHTML = "";

    // 3. Start Skeletons
    startSkeleton();

    // 3/5. Update results
    updateResults(20);

    // 4. Create card
    // cardsContainer.append(createCard(params))

    // 5. End Skeletons
    setTimeout(() => {
      endSkeleton();
    }, 300);
  });
});
