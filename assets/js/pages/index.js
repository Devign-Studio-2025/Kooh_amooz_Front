const swiper = new Swiper(".swiper--header", {
  direction: "horizontal",
  loop: true,
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const swiper_courses = new Swiper(".swiper--courses", {
  direction: "horizontal",
  slidesPerView: "auto",
  spaceBetween: 16,
  navigation: {
    nextEl: ".custom-swiper-button-next",
    prevEl: ".custom-swiper-button-prev",
  },
});
