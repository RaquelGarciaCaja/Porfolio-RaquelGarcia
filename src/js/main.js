"use strict";
const input = document.querySelector(".js-input");
const btn = document.querySelector(".js-button");
const listMovies = document.querySelector(".js-main__list");
const url = "//api.tvmaze.com/search/shows?q=";
const imgPlaceholder = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
const resetAllFavorites = document.querySelector(".js-reset");
const logBtn = document.querySelector(".js-log");

let movies = [];
let arrFavoriteList = [];

//API
function getData() {
  fetch(url + input.value)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      movies = data;

      paintMovies();
      listenFavMovies();
      paintFavorite();
      listenTrashItem();
    });
}

//PAINT API
function paintMovies() {
  let html = "";
  for (let i = 0; i < movies.length; i++) {
    let colorFavorite;
    const classIndex = arrFavoriteList.findIndex((favMovie) => {
      if (favMovie.show.id === movies[i].show.id) {
        return true;
      } else {
        return false;
      }
    });

    if (classIndex !== -1) {
      colorFavorite = "color-favorite";
    } else {
      colorFavorite = "";
    }

    const showimage = movies[i].show.image;
    html += `<li class = "main__container  ${colorFavorite}" id="${movies[i].show.id}">`;

    if (showimage !== null) {
      html += `<img class = "main__img" src="${movies[i].show.image.medium}" alt="${movies[i].show.name}" />`;
    } else {
      html += `<img class = "main__img" src="${imgPlaceholder}" alt="${movies[i].show.name}" />`;
    }

    html += `<h3 class = "main__name">${movies[i].show.name}</h3>`;
    html += `<h3 class = "main__name">${movies[i].show.status}</h3>`;

    html += "</li>";
  }

  listMovies.innerHTML = html;
  listenFavMovies();
}

// HANDLER PAINT
function handleFilter() {
  getData();
}

//PUSH AND SPLICES FAVORITES INTO ARRFAVORITELIST
function favMovies(ev) {
  const movieCLick = ev.currentTarget;
  const clickId = parseInt(movieCLick.id);
  const indexFav = arrFavoriteList.findIndex((click) => {
    if (parseInt(click.show.id) === clickId) return click;
  });
  if (indexFav === -1) {
    const foundIsFavorite = movies.find((click) => {
      if (parseInt(click.show.id) === clickId) {
        return click;
      }
    });
    arrFavoriteList.push(foundIsFavorite);
    movieCLick.classList.add("color-favorite");
  } else {
    arrFavoriteList.splice(indexFav, 1);
  }

  paintMovies();
  listenFavMovies();
  paintFavorite();
  listenTrashItem();
  setLocalStorage();
}

// PAINT FAVORITES
function paintFavorite() {
  const listMoviesFav = document.querySelector(".js-main__aside--fav");
  let htmlFav = "";
  for (let i = 0; i < arrFavoriteList.length; i++) {
    htmlFav += `<li class = "main__container--fav" id="${arrFavoriteList[i].show.id}">`;

    if (arrFavoriteList[i].show.image !== null) {
      htmlFav += `<img class = "main__img--fav" src="${arrFavoriteList[i].show.image.medium}" alt="${arrFavoriteList[i].show.name}" />`;
    } else {
      htmlFav += `<img class = "main__img--fav" src="${imgPlaceholder}" alt="${arrFavoriteList[i].show.name}" />`;
    }

    htmlFav += `<h3 class = "main__name--fav">${arrFavoriteList[i].show.name}</h3>`;
    htmlFav += `<i class="fas fa-trash js-reset-items" id="${i}"></i>`;

    htmlFav += "</li>";
  }
  listMoviesFav.innerHTML = htmlFav;
  listenFavMovies();
}
//////////////////////////////////////////////////////////////
//GUARDAR EN EL LOCAL STORAGE
function setLocalStorage() {
  localStorage.setItem("LocalStorageList", JSON.stringify(arrFavoriteList));
}
//OBTENER EL LOCAL STORAGE
function getLocalStorage() {
  arrFavoriteList = JSON.parse(localStorage.getItem("LocalStorageList"));
  if (arrFavoriteList === null) {
    arrFavoriteList = [];
  }
  paintMovies();
  listenFavMovies();
  paintFavorite();
  listenTrashItem();
}
getLocalStorage();
//////////////////////////////////////////////////////////////////
//RESET ALL
function resetFavorites() {
  arrFavoriteList.splice(1, arrFavoriteList.length);
  arrFavoriteList = [];
  localStorage.clear();
  paintFavorite();
}

// RESET EACH FAVORITE
function resetItemFavorites(ev) {
  const removeIdFav = ev.currentTarget.id;
  arrFavoriteList.splice(removeIdFav, 1);

  paintFavorite();
  listenFavMovies();
  listenTrashItem();
  setLocalStorage();
}

//////////////////////////////////////////////////////////////
//LISTENERS
btn.addEventListener("click", handleFilter);

function listenFavMovies() {
  const clickFavMovies = document.querySelectorAll(".main__container");
  for (const clickFavMovie of clickFavMovies) {
    clickFavMovie.addEventListener("click", favMovies);
  }
}

resetAllFavorites.addEventListener("click", resetFavorites);

function listenTrashItem() {
  const resetItems = document.querySelectorAll(".js-reset-items");
  for (const resetItem of resetItems) {
    resetItem.addEventListener("click", resetItemFavorites);
  }
}

logBtn.addEventListener("click", logConsole);

function logConsole() {
  for (let i = 0; i < arrFavoriteList.length; i++) {
    console.log(arrFavoriteList[i].show.name);
  }
}
