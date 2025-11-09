import "../../../libs/sweetalert/sweetalert2.all.min.js";

// Get current DateTime
function currentDate(date = true, time = true) {
  let result = "";
  const currentDate = new Date();

  if (date) {
    const shamsiDate = new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(currentDate);
    result += shamsiDate;
  }
  if (time) {
    const shamsiTime = new Intl.DateTimeFormat("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(currentDate);
    result += " " + shamsiTime;
  }
  return result;
}

// Place message in DOM function
const container = document.querySelector(".chat-section__body");

function sendMessage(input) {
  const messageWrapper = document.createElement("div");

  const message = document.createElement("div");
  message.className = "message";

  const date = document.createElement("div");
  date.className = "date";

  messageWrapper.className = "message-wrapper message-wrapper--user";
  message.textContent = input.trim();
  messageWrapper.appendChild(message);

  date.textContent = currentDate();
  messageWrapper.appendChild(date);

  container.append(messageWrapper);

  return messageWrapper;
}

// Send message
const sendButton = document.querySelector("#send-message");
const form = document.querySelector(".chat-section__footer");
const input = document.querySelector("#input-message");

form.onsubmit = (e) => {
  e.preventDefault();

  // Ajax
  // ----
  sendMessage(input.value).scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
  input.value = "";
  input.style.height = "auto";
  input.focus();
  sendButton.disabled = true;
};

// Control send button accessibility
input.oninput = () => {
  input.style.height = "auto";
  input.style.height = Math.min(input.scrollHeight, 250) + "px";

  if (input.value.trim() !== "") {
    sendButton.disabled = false;
    return;
  }
  sendButton.disabled = true;
};

// Close ticket
const Swal = window.Sweetalert2;
const closeButton = document.querySelector("#close-ticket");

closeButton.onclick = () => {
  Swal.fire({
    title: "مطمئن هستید؟",
    text: "دیگر قادر به ارسال پیام در این تیکت نخواهید بود!",
    icon: "warning",
    showCancelButton: true,
    customClass: {
      confirmButton: "button button--md button--error",
      cancelButton: "button button--md button--primary",
    },
    confirmButtonText: "بستن تیکت",
    cancelButtonText: "انصراف",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "تیکت بسته شد.",
        text: "اما قادر به مشاهده پیام‌ها هستید.",
        icon: "success",
        confirmButtonText: "باشه",
        customClass: {
          confirmButton: "button button--md button--primary",
        },
      });

      //   Close messsage
      closeButton.remove();
      form.innerHTML = `
        <div class="closed-message">این تیکت بسته شده است. دیگر قادر به ارسال پیام نیستید.</div>
      `;

      //   Close Date
      const sectionHead = document.querySelector(".chat-section__header");
      const closedDate = document.createElement("div");
      closedDate.className = "label label--lg label--success";

      closedDate.textContent = `در تاریخ ${currentDate()} بسته شد.`;

      sectionHead.append(closedDate);
    }
  });
};
