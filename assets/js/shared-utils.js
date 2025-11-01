/* ****** Char limit Start ****** */

export function initCharLimit(input, max_length, warning_threshold) {
  const textarea = input;
  const counter = document.querySelector(".char-limit__count");
  const maxLength = max_length;
  const warningThreshold = warning_threshold;
  counter.textContent = `${maxLength} / 0`;

  textarea.addEventListener("input", () => {
    let length = textarea.value.length;

    if (length > maxLength) {
      textarea.value = textarea.value.substring(0, maxLength);
      length = maxLength;
    }

    counter.textContent = `${maxLength} / ${length}`;

    if (length >= warningThreshold) {
      counter.classList.add("text-danger");
    } else {
      counter.classList.remove("text-danger");
    }
  });
}

/* ****** Char limit End ****** */
