const swiper = new Swiper(".swiper--faq-questions", {
  allowTouchMove: false,
  direction: "horizontal",
  autoHeight: true,
});

const swiperWrapper = document.querySelector(".swiper-wrapper");

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
