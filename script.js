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
  btnsOpenModal[i].addEventListener("cli ck", openModal);

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
const header = document.querySelector(".header");
header.append(message);

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
