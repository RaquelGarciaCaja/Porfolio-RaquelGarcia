"use strict";
const nav = document.querySelector(".header__nav");
const details = document.querySelector(".projectDetails");
const close = document.querySelector(".projectDetails__close");
const iconMenu = document.querySelector(".js-iconMenu");
const menu = document.querySelector(".js-menu");
const iconClose = document.querySelector(".js-iconClose");

const closeDetails = () => {
  details.classList.remove("active");
};

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

function openMenu() {
  menu.classList.toggle("hidden");
  iconClose.classList.toggle("hidden");
  iconMenu.classList.toggle("hidden");
}

function closeMenu() {
  menu.classList.toggle("hidden");
  iconClose.classList.toggle("hidden");
  iconMenu.classList.toggle("hidden");
}

function closeMenuClickListaLink() {
  menu.classList.toggle("hidden");
  iconMenu.classList.toggle("hidden");
  iconClose.classList.toggle("hidden");
}

function listClick() {
  const listLink = document.querySelectorAll(".js-liMovil");
  for (const eachListLink of listLink) {
    eachListLink.addEventListener("click", closeMenuClickListaLink);
  }
}
listClick();
close.addEventListener("click", closeDetails);
iconMenu.addEventListener("click", openMenu);
iconClose.addEventListener("click", closeMenu);
