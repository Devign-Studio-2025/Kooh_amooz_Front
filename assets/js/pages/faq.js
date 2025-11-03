import "../../libs/validate.min.js/just-validate.production.min.js";
import { initCharLimit } from "../../js/shared-utils.js";

// FAQ Sliders
const swiper = new Swiper(".swiper--faq-questions", {
  allowTouchMove: false,
  direction: "horizontal",
  autoHeight: true,
});

const categories = document.querySelectorAll("[data-slide-to]");
categories.forEach((cat) => {
  cat.onclick = () => {
    const index = cat.dataset.slideTo;
    const activeSlide = swiper.slides[index];
    activeSlide.classList.add("visible");
    swiper.slideTo(index);
  };
});

const backButtons = document.querySelectorAll(".back-button");
backButtons.forEach((btn) => {
  btn.onclick = () => {
    const activeSlideEl = swiper.slides[swiper.activeIndex];
    swiper.slideTo(0);
    activeSlideEl.classList.remove("visible");
  };
});

const accordions = document.querySelectorAll(".accordion-button");
accordions.forEach((acc) => {
  acc.addEventListener("click", () => {
    setTimeout(() => {
      swiper.updateAutoHeight();
    }, 50);
  });
});

// Contact us validation
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

const validator = new JustValidate("#form-contact-us", validateOptions);

validator
  .addField(
    "#full-name",
    [
      {
        rule: "required",
        errorMessage: "نام الزامی است.",
      },
      {
        rule: "minLength",
        value: 4,
        errorMessage: "حداقل 4 کاراکتر وارد کنید.",
      },
      {
        rule: "maxLength",
        value: 50,
        errorMessage: "حداکثر 50 کاراکتر مجاز است",
      },
      {
        rule: "customRegexp",
        value: /^[\u0600-\u06FFa-zA-Z\s]+$/,
        errorMessage: "لطفاً فقط حروف فارسی یا انگلیسی وارد کنید.",
      },
    ],
    {
      errorsContainer: document
        .querySelector("#full-name")
        .closest(".input__with-error-wrapper"),
    }
  )
  .addField(
    "#phone-number",
    [
      {
        rule: "required",
        errorMessage: "شماره همراه الزامی است",
      },
      {
        rule: "number",
        errorMessage: "فقط عدد مجاز است",
      },
      {
        rule: "minLength",
        value: 11,
        errorMessage: "شماره باید ۱۱ رقمی باشد",
      },
      {
        rule: "maxLength",
        value: 11,
        errorMessage: "شماره باید ۱۱ رقمی باشد",
      },
      {
        rule: "customRegexp",
        value: /^09[0-9]{9}$/,
        errorMessage: "شماره موبایل معتبر وارد کنید ",
      },
    ],
    {
      errorsContainer: document
        .querySelector("#phone-number")
        .closest(".input__with-error-wrapper"),
    }
  )
  .addField(
    "#email",
    [
      {
        rule: "email",
        errorMessage: "ایمیل معتبر وارید کنید.",
      },
    ],
    {
      errorsContainer: document
        .querySelector("#email")
        .closest(".input__with-error-wrapper"),
    }
  )
  .addField(
    "#topic",
    [
      {
        rule: "required",
        errorMessage: "عنوان پیام الزامی است.",
      },
    ],
    {
      errorsContainer: document
        .querySelector("#topic")
        .closest(".input__with-error-wrapper"),
    }
  )
  .addField(
    "#message",
    [
      {
        rule: "required",
        errorMessage: "متن پیام الزامی است.",
      },
      {
        rule: "minLength",
        value: 6,
        errorMessage: "حداقل 6 کاراکتر الزامی است.",
      },
      {
        rule: "maxLength",
        value: 1000,
        errorMessage: "حداکثر 1000 کاراکتر الزامی است.",
      },
    ],
    {
      errorsContainer: document
        .querySelector("#message")
        .closest(".input__with-error-wrapper"),
    }
  );

initCharLimit("#message", 1000, 1000);
