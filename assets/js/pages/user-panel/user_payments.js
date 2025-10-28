import "../../../libs/select2/select2.min.js";
import "../../../libs/bootstrap/bootstrap.bundle.min.js";

const table = new DataTable("#payments-table", {
  language: {
    url: "assets/libs/datatable/fa.json",
  },
  dom: "tpi",
  columnDefs: [
    {
      targets: -1,
      orderable: false,
    },
  ],
});

// Search in table
$(".content-section .input__field").on("keyup", function () {
  table.search(this.value).draw();
});

// Select dropdown
$("#row-length-select").select2({
  minimumResultsForSearch: Infinity,
  placeholder: "تعداد سطرها",
});

// Dropdown set row length
$("#row-length-select").on("select2:select", function (e) {
  var data = e.params.data.id;
  table.page.len(data).draw();
});

const tags = document.querySelectorAll("#row-length-menu input");
tags.forEach((tag) => {
  tag.onchange = () => {
    table.page.len(tag.value).draw();
    const placeholder = document.querySelector(
      '.button[data-bs-target="#row-length-menu"] .button__text'
    );
    placeholder.textContent = tag.nextElementSibling.textContent;
  };
});

// Transaction detais modal
const showButtons = document.querySelectorAll("#payments-table .button");

showButtons.forEach((button) => {
  button.onclick = () => {
    // 1. Ajax
    // ---

    // 2. Place in DOM
    // const container = document.querySelector(".transaction-info");
    // const coursesContainer = document.querySelector(
    //   ".transaction__courses-list"
    // );

    // const label = document.createElement("div");
    // label.className =
    //   "label label--success w-100 label--lg justify-content-center";

    // container.append(label);

    // [2] Courses ----------

    // const course = document.createElement("div");
    // course.className = "transaction__course";

    // coursesContainer.append(course);

    // const courseNumber = document.createElement("div");
    // courseNumber.className = "transaction__course-number";
    // course.append(courseNumber);

    // const courseTitle = document.createElement("div");
    // courseTitle.className = "transaction__course-title";
    // course.append(courseTitle);

    // const coursePrice = document.createElement("div");
    // coursePrice.className = "transaction__course-price";
    // course.append(coursePrice);

    // ----------

    // [2] Price Box ----------

    // const priceBoxContainer = document.querySelector(
    //   ".transaction__price-boxes"
    // );

    // [2] discount box ----------

    // const priceBoxDiscount = document.createElement("div");
    // priceBoxDiscount.className =
    //   "transaction__price-box transaction__price-box--discount";

    // priceBoxContainer.append(priceBoxDiscount);

    // const priceBoxDiscount_rowPrice = document.createElement("div");
    // priceBoxDiscount_rowPrice.className = "transaction__price-box-row";

    // priceBoxDiscount.append(priceBoxDiscount_rowPrice);

    // const priceBoxDiscount_rowPrice_title = document.createElement("div");
    // priceBoxDiscount_rowPrice_title.className = "transaction__price-box-title";
    // priceBoxDiscount_rowPrice.append(priceBoxDiscount_rowPrice_title);

    // const priceBoxDiscount_rowPrice_value = document.createElement("div");
    // priceBoxDiscount_rowPrice_value.className = "transaction__price-box-value";
    // priceBoxDiscount_rowPrice.append(priceBoxDiscount_rowPrice_value);

    // const priceBoxDiscount_rowDiscount = document.createElement("div");
    // priceBoxDiscount_rowDiscount.className = "transaction__price-box-row";

    // priceBoxDiscount.append(priceBoxDiscount_rowDiscount);

    // const priceBoxDiscount_rowDiscount_title = document.createElement("div");
    // priceBoxDiscount_rowDiscount_title.className =
    //   "transaction__price-box-title";
    // priceBoxDiscount_rowDiscount.append(priceBoxDiscount_rowDiscount_title);

    // const priceBoxDiscount_rowDiscount_value = document.createElement("div");
    // priceBoxDiscount_rowDiscount_value.className =
    //   "transaction__price-box-value";
    // priceBoxDiscount_rowDiscount.append(priceBoxDiscount_rowDiscount_value);

    // [2] total price box ----------

    // const priceBoxTotal = document.createElement("div");
    // priceBoxTotal.className = "transaction__price-box";

    // priceBoxContainer.append(priceBoxTotal);

    // const priceBoxTotal_rowTotal = document.createElement("div");
    // priceBoxTotal_rowTotal.className = "transaction__price-box-row";

    // priceBoxTotal.append(priceBoxTotal_rowTotal);

    // const priceBoxTotal_rowTotal_title = document.createElement("div");
    // priceBoxTotal_rowTotal_title.className = "transaction__price-box-title";
    // priceBoxTotal_rowTotal.append(priceBoxTotal_rowTotal_title);

    // const priceBoxTotal_rowTotal_value = document.createElement("div");
    // priceBoxTotal_rowTotal_value.className = "transaction__price-box-value";
    // priceBoxTotal_rowTotal.append(priceBoxTotal_rowTotal_value);

    // const priceBoxTotal_rowPaid = document.createElement("div");
    // priceBoxTotal_rowPaid.className = "transaction__price-box-row";

    // priceBoxTotal.append(priceBoxTotal_rowPaid);

    // const priceBoxTotal_rowPaid_title = document.createElement("div");
    // priceBoxTotal_rowPaid_title.className = "transaction__price-box-title";
    // priceBoxTotal_rowPaid.append(priceBoxTotal_rowPaid_title);

    // const priceBoxTotal_rowPaid_value = document.createElement("div");
    // priceBoxTotal_rowPaid_value.className = "transaction__price-box-value";
    // priceBoxTotal_rowPaid.append(priceBoxTotal_rowPaid_value);

    // ----------

    const transactionModal = new bootstrap.Modal(
      document.getElementById("modal-transactions")
    );
    transactionModal.show();
  };
});

// Print transaction
const printButton = document.querySelector("#print-button");

printButton.onclick = () => {
  window.print();
};
