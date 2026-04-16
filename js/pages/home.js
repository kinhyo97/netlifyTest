export function initHomePage() {
  const faqItems = document.querySelectorAll(".faq-item");
  const newsGrid = document.querySelector("[data-news-grid]");
  const prevButton = document.querySelector("[data-news-prev]");
  const nextButton = document.querySelector("[data-news-next]");

  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-item__button");

    if (!button) {
      return;
    }

    button.addEventListener("click", () => {
      const isOpen = item.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });

  if (!newsGrid || !prevButton || !nextButton) {
    return;
  }

  const getScrollAmount = () => {
    const firstCard = newsGrid.querySelector(".news-card");

    if (!firstCard) {
      return 0;
    }

    const styles = window.getComputedStyle(newsGrid);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0");

    return firstCard.getBoundingClientRect().width + gap;
  };

  const updateNewsControls = () => {
    const maxScrollLeft = newsGrid.scrollWidth - newsGrid.clientWidth;

    prevButton.disabled = newsGrid.scrollLeft <= 4;
    nextButton.disabled = newsGrid.scrollLeft >= maxScrollLeft - 4;
  };

  prevButton.addEventListener("click", () => {
    newsGrid.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
  });

  nextButton.addEventListener("click", () => {
    newsGrid.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
  });

  newsGrid.addEventListener("scroll", updateNewsControls, { passive: true });
  window.addEventListener("resize", updateNewsControls);
  updateNewsControls();
}
