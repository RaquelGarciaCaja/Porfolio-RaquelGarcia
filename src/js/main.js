"use strict";

// menu
const btnNav = document.querySelector(".js-navShow");
const nav = document.querySelector(".header__nav");

// details
const details = document.querySelector(".projectDetails");
const close = document.querySelector(".projectDetails__close");

// menu
const clickMenu = () => {
  nav.classList.toggle("hidden");
};

// details
const closeDetails = () => {
  details.classList.remove("active");
};

//listeners
// menu
btnNav.addEventListener("click", clickMenu);

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
