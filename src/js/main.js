"use strict";

// menu
const btnNav = document.querySelector(".js-navShow");
const nav = document.querySelector(".header__nav");

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

// menu
const clickMenu = () => {
  nav.classList.toggle("hidden");
  btnNav.classList.add("header__navShow");
  btnNav.classList.remove("header__nav");
  // headerMenu.classList.add("hidden");
  // notHeaderMenu.classList.remove("hidden");
  // btnNav.classList.remove("hidden");
};

// details
const closeDetails = () => {
  details.classList.remove("active");
};

//listeners
// menu
btnNav.addEventListener("click", clickMenu);

// page
// page.addEventListener("scroll", scrollPage);

// details
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
