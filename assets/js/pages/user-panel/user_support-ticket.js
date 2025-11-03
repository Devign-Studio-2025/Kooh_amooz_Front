import "../../../libs/select2/select2.min.js";
import "../../../libs/bootstrap/bootstrap.bundle.min.js";

import { initCharLimit } from "../../shared-utils.js";

initCharLimit('textarea', 1000, 1000);

// Datatable
const table = new DataTable("#tickets-table", {
  language: {
    url: "assets/libs/datatable/fa.json",
  },
  dom: "tpi",
  columnDefs: [
    {
      targets: -2,
      orderable: false,
    },
  ],
});

// Select dropdown
$("#form-select").select2({
  minimumResultsForSearch: Infinity,
  placeholder: "- انتخاب موضوع -",
});

// Select dropdown revalidate
$("#form-select").on("select2:select", function (e) {
  validator.revalidateField("#form-select").then((isValid) => {
    const wrapper = document.querySelector(".select2-selection");
    wrapper.classList.remove("border-error");
  });
});

// Row length select dropdown
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

// Search in table
$("#search").on("keyup", function () {
  table.search(this.value).draw();
});

// Form validation
const validateOptions = {
  errorFieldCssClass: "border-error",
  errorLabelStyle: {
    color: "var(--Color-Text-icon-on-subtle-error)",
    font: "var(--Font-Caption-bold-style)",
    marginTop: "var(--Spacing-sm)",
    display: "block",
  },
  submitFormAutomatically: true,
};

const validator = new JustValidate(".form-section", validateOptions);

validator
  .addField(
    "#message",
    [
      {
        rule: "required",
        errorMessage: "توضیحات الزامی است.",
      },
      {
        rule: "minLength",
        value: 10,
        errorMessage: "حداقل 10 کاراکتر وارد کنید.",
      },
      {
        rule: "maxLength",
        value: 1000,
        errorMessage: "حداکثر 1000 کاراکتر مجاز است",
      },
    ],
    {
      errorsContainer: document
        .querySelector("#message")
        .closest(".input__with-error-wrapper"),
    }
  )
  .addField(
    "#form-select",
    [
      {
        rule: "required",
        errorMessage: "انتخاب موضوع الزامی است.",
      },
    ],
    {
      errorsContainer: document
        .querySelector("#form-select")
        .closest(".input__with-error-wrapper"),
    }
  );

validator.onFail((fields) => {
  const wrapper = document.querySelector(".select2-selection");

  if (!fields["#form-select"].isValid) {
    wrapper.classList.add("border-error");
  }
});
