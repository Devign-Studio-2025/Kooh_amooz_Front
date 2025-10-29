import "../../../libs/select2/select2.min.js";
import "../../../libs/bootstrap/bootstrap.bundle.min.js";

// Read funtion (change DOM)
function readMessage(buttonEl) {
  const parent = buttonEl.parentElement;
  parent.innerHTML = `
    <div class="is-read">
        <svg class="icon icon--sm" viewBox="0 0 24 24">
        <use href="assets/icons/sprites.svg#Interface / Check_All_Big"></use>
        </svg>
        خوانده شد
    </div>
    `;

  notifBadgeUpdate();
}

// Update Notif Count
function notifBadgeUpdate() {
  const countElement = document.querySelector("[data-messages-notif-count]");
  const count = parseInt(countElement.dataset.messagesNotifCount);
  const notifBadges = document.querySelectorAll(".badge-admin-messages");
  notifBadges.forEach((badge) => {
    badge.textContent = count - 1;
  });

  countElement.dataset.messagesNotifCount = count - 1;
}

// Datatable
const table = new DataTable("#messages-table", {
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

// Message modal
const showButtons = document.querySelectorAll(".message-show-button");

showButtons.forEach((button) => {
  button.onclick = () => {
    // 1. Ajax
    // const id = button.dataset.dbId;
    // ---

    // 2. Place in DOM
    const messageModal = new bootstrap.Modal(
      document.getElementById("modal-message")
    );
    messageModal.show();
  };
});

// Read all messages
const readAllButton = document.querySelector("#read-all");
readAllButton.onclick = () => {
  // 1. Ajax read all
  // const id = readAllButton.dataset.dbId;
  //   ----

  // 2. Update ui
  const allButtons = document.querySelectorAll(".read-button");
  allButtons.forEach((button) => {
    readMessage(button);
  });

  //   3.5 Remove button
  readAllButton.remove();

  // 3. Toast notif
  toastr.success("تمام پیام‌ها خوانده شدند.", "پیام‌ها خوانده شد.");
};

// Read single message
const readButtons = document.querySelectorAll(".read-button");
readButtons.forEach((button) => {
  button.onclick = () => {
    // 1. Ajax read
    // const id = button.dataset.dbId;
    //   ----

    // 2. Update ui
    readMessage(button);

    // 3. Toast notif
    toastr.success("پیام مورد نظر خوانده شد.", "پیام‌ خوانده شد.");
  };
});
