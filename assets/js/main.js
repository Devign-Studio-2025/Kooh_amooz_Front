// Librarys
import "../libs/bootstrap/bootstrap.bundle.min.js";
import "../libs/jquery/jquery-3.7.1.min.js";
import "../libs/toastr/toastr.min.js";
import "../libs/cleave-zen/cleave-zen.umd.js";

import "../js/components/skeleton.js";

// Tooltip for nav buttons
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
[...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

// Toast
toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: "toast-bottom-right",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "3000",
  extendedTimeOut: "1000",
  hideEasing: "linear",
  showMethod: "slideDown",
  hideMethod: "slideUp",
};

const cleaveZen = window.cleaveZen;
const { formatNumeral, formatCreditCard, getCreditCardType, registerCursorTracker, DefaultCreditCardDelimiter, unformatCreditCard } = cleaveZen;

const inputNums = document.querySelectorAll(".format-num");

inputNums.forEach((input) => {
  input.oninput = (e) => {
    input.value = formatNumeral(e.target.value, {
      numeralThousandsGroupStyle: "thousand",
    });
  };
});
