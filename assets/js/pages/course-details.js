import "../components/navigation-tab.js";

const swiper_courses = new Swiper(".swiper--courses", {
  direction: "horizontal",
  slidesPerView: "auto",
  spaceBetween: 16,
  navigation: {
    nextEl: ".custom-swiper-button-next",
    prevEl: ".custom-swiper-button-prev",
  },
});
