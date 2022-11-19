"use strict";

// ELEMENTS SELECTIONS
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const message = document.createElement("div");

const btnScrollto = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

document.querySelectorAll(".nav__link");

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

const nav = document.querySelector(".nav");

///////////////////////////////////////
// Modal window

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// COOKIE MESSAGE
message.classList.add("cookie-message");

message.textContent = "We use cookied for improved functionality and analytics";
message.innerHTML =
  'we use cookied for improved functionality and analytics. <button class = "btn btn--close--cookie"> Got it!</button>';

message.style.background = "#37383d";
message.style.width = "110%";
message.style.height = "8rem";
const headern = document.querySelector(".header");
headern.append(message);

const closeCookie = document.querySelector(".btn--close--cookie");
closeCookie.addEventListener("click", () => {
  message.remove();
});

// SCROLLING BUTTON
btnScrollto.addEventListener("click", () => {
  section1.scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// TABBED COMPONENT FUNCTIONALITY

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  if (!clicked) return;

  tabs.forEach(function (item) {
    item.classList.remove("operations__tab--active");
  });
  clicked.classList.add("operations__tab--active");

  tabsContent.forEach(function (item) {
    item.classList.remove("operations__content--active");
  });

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// MENU FADE ANIMATION
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

// STICKY NAV
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);
`${navHeight}`;

// REVEAL SECTIONS
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    entry.target.classList.remove("section--hidden");
  }
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// LAZY LOADING IMAGES
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  // Replace src with dara-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => {
  imgObserver.observe(img);
});

// SLIDES ANIMATIONS
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const slider = document.querySelector(".slider");

let currSlide = 0;
const maxSlide = slides.length - 1;

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
goToSlide(0);

const nextSlide = function () {
  if (currSlide === maxSlide) {
    currSlide = 0;
  } else {
    currSlide++;
  }

  goToSlide(currSlide);
  activeDot(currSlide);
};

const prevSlide = function () {
  if (currSlide === 0) {
    currSlide = maxSlide;
  } else {
    currSlide--;
  }

  goToSlide(currSlide);
  activeDot(currSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

// MOVING USING KEYS
document.addEventListener("keydown", function (e, i) {
  if (e.key === "ArrowLeft") {
    prevSlide();
  }
  if (e.key === "ArrowRight") {
    nextSlide();
  }
});

// Creating Dots
const dotContainer = document.querySelector(".dots");
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button> `
    );
  });
};
createDots();

// Activeting the dots
function activeDot(slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
}

activeDot(0);
dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activeDot(slide);
  }
});
