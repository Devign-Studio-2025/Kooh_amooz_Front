const table = new DataTable("#payments-table", {
  language: {
    url: "assets/libs/datatable/fa.json",
  },
  dom: "tpi",
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
  };
});
