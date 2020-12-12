"use strict";

// hambuger
const btnNav = document.querySelector(".js-show");
const btnNotNav = document.querySelector(".js-notShow");
const nav = document.querySelector(".header__nav");
const headerMenu = document.querySelector(".header__menu");
const notHeaderMenu = document.querySelector(".header__x");

// scroll
// const page = document.querySelector(".page");
// const header = document.querySelector(".header");

// details
const details = document.querySelector(".projectDetails");
const close = document.querySelector(".projectDetails__close");

// const scrollPage = () => {
//   console.log("enra");
//   if (window.scrollY > 20) {
//     header.classList.add("header__sticky");
//   } else {
//     header.classList.remove("header__sticky");
//   }
// };

const clickMenu = () => {
  nav.classList.toggle("hidden");
  // headerMenu.classList.add("hidden");
  // notHeaderMenu.classList.remove("hidden");
  // btnNav.classList.remove("hidden");
};
const closeDetails = () => {
  details.classList.remove("active");
};

//listeners
btnNav.addEventListener("click", clickMenu);
// page.addEventListener("scroll", scrollPage);

const detailsImg = document.querySelectorAll(".project--project__img").forEach((project) => {
  project.addEventListener("click", () => {
    const route = project.getAttribute("src");
    const title = project.parentNode.dataset.title;
    const description = project.parentNode.dataset.description;
    const tolls = project.parentNode.dataset.tolls;

    details.classList.add("active");
    document.querySelector(".projectDetails__img").src = route;
    document.querySelector(".projectDetails__title").innerHTML = title;
    document.querySelector(".projectDetails__description").innerHTML = description;
    document.querySelector(".projectDetails__tolls").innerHTML = tolls;
  });
});

close.addEventListener("click", closeDetails);
