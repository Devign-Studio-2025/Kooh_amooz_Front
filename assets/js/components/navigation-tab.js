document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navTab = document.querySelector("#navigation-page");
  const navTabTop = document.querySelector("#navigation-top");
  const tabs = document.querySelectorAll(".navigation-tab-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target.id == "navigation-page" && !entry.isIntersecting) {
          navTabTop.classList.remove("d-none");
        } else if (entry.target.id == "navigation-page" && entry.isIntersecting) {
          navTabTop.classList.add("d-none");
        }
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("data-linked-to");
          const radio = document.getElementById(id);
          if (radio) radio.checked = true;
        }
      });
    },
    {
      rootMargin: "-50%",
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
  observer.observe(navTab);

  tabs.forEach((label) => {
    label.addEventListener("click", () => {
      const targetId = label.getAttribute("data-bookmark");
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});
