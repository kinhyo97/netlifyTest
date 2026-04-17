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

  const newsCards = Array.from(newsGrid.querySelectorAll(".news-card"));

  if (newsCards.length <= 1) {
    return;
  }

  const createNewsClone = (card) => {
    const clone = card.cloneNode(true);

    clone.setAttribute("aria-hidden", "true");
    clone.querySelectorAll("a, button, input, textarea, select, [tabindex]").forEach((focusable) => {
      focusable.setAttribute("tabindex", "-1");
    });

    return clone;
  };

  const getScrollAmount = () => {
    const firstCard = newsTrack.querySelector(".news-card");

    if (!firstCard) {
      return 0;
    }

    const styles = window.getComputedStyle(newsTrack);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0");

    return firstCard.getBoundingClientRect().width + gap;
  };

  const newsTrack = document.createElement("div");
  newsTrack.className = "news-grid__track";

  const prependFragment = document.createDocumentFragment();
  const mainFragment = document.createDocumentFragment();
  const appendFragment = document.createDocumentFragment();

  newsCards.forEach((card) => {
    prependFragment.append(createNewsClone(card));
    mainFragment.append(card);
    appendFragment.append(createNewsClone(card));
  });

  newsTrack.append(prependFragment, mainFragment, appendFragment);
  newsGrid.replaceChildren(newsTrack);

  const getTrackWidth = () => getScrollAmount() * newsCards.length;

  let offset = 0;

  const applyTrackTransform = () => {
    const trackWidth = getTrackWidth();

    if (trackWidth <= 0) {
      return;
    }

    let normalizedOffset = offset;

    while (normalizedOffset >= trackWidth) {
      normalizedOffset -= trackWidth;
    }

    while (normalizedOffset < 0) {
      normalizedOffset += trackWidth;
    }

    offset = normalizedOffset;
    newsTrack.style.transform = `translate3d(${-trackWidth - normalizedOffset}px, 0, 0)`;
  };

  const resetNewsPosition = () => {
    offset = 0;
    applyTrackTransform();
  };

  let animationFrameId = 0;
  let animationStartTime = 0;
  let animationFrom = 0;
  let animationTo = 0;

  const stopAnimation = () => {
    if (animationFrameId) {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = 0;
    }
  };

  const easeInOutCubic = (progress) => {
    if (progress < 0.5) {
      return 4 * progress * progress * progress;
    }

    return 1 - Math.pow(-2 * progress + 2, 3) / 2;
  };

  const animateToOffset = (timestamp) => {
    if (!animationStartTime) {
      animationStartTime = timestamp;
    }

    const duration = 420;
    const elapsed = timestamp - animationStartTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    offset = animationFrom + ((animationTo - animationFrom) * eased);
    applyTrackTransform();

    if (progress < 1) {
      animationFrameId = window.requestAnimationFrame(animateToOffset);
      return;
    }

    offset = animationTo;
    applyTrackTransform();
    animationFrameId = 0;
    animationStartTime = 0;
  };

  const moveNewsByStep = (direction) => {
    const step = getScrollAmount();

    if (step <= 0) {
      return;
    }

    stopAnimation();
    animationStartTime = 0;
    animationFrom = offset;
    animationTo = offset + (step * direction);
    animationFrameId = window.requestAnimationFrame(animateToOffset);
  };

  prevButton.addEventListener("click", () => {
    moveNewsByStep(-1);
  });

  nextButton.addEventListener("click", () => {
    moveNewsByStep(1);
  });

  window.addEventListener("resize", () => {
    stopAnimation();
    resetNewsPosition();
  });
  resetNewsPosition();
}
