"use strict";
const input = document.querySelector(".js-input");
const btn = document.querySelector(".js-button");
const listMovies = document.querySelector(".main__list");
const url = "http://api.tvmaze.com/search/shows?q=tronos";
const imgPlaceholder = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";

const aside = document.querySelector(".main__aside");

//ev.preventDefault()
// arrays datos y favoritos
let movies = [];
let arrFavoriteList = [];

//api
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
    });
}

//paint
function paintMovies() {
  let html = "";
  for (let i = 0; i < movies.length; i++) {
    let classFav;
    const favoriteIndex = arrFavoriteList.indexOf(i);
    //console.log(arrFavoriteList);
    const favorite = favoriteIndex == -1;
    if (favorite === true) {
      classFav = "style__fav";
    } else {
      classFav = "";
    }
    const showimage = movies[i].show.image;
    html += `<li class = "main__list-movie ${classFav}" id="${movies[i].show.id}">`;

    if (showimage !== null) {
      html += `<img class = "main__list--img" src="${movies[i].show.image.medium}" alt="${movies[i].show.name}" />`;
    } else {
      html += `<img class = "main__list--img" src="${imgPlaceholder}" alt="${movies[i].show.name}" />`;
    }

    html += `<h3 class = "main__list--name">Nombre: ${movies[i].show.name}</h3>`;
    html += `<p class = "main__list--genres" > Genero: ${movies[i].show.genres}</p>`;
    html += "</li>";
  }

  listMovies.innerHTML = html;
}

// funcion manejadora de paint
function handleFilter() {
  getData();
}

function favMovies(ev) {
  const clickId = parseInt(ev.currentTarget.id);
  //  console.log(clickId);
  // const isFavorite = arrFavoriteList.find( click =>{ click;})
  const indexFav = arrFavoriteList.indexOf(clickId);
  //console.log(indexFav);
  const isFavorite = indexFav !== -1;
  if (isFavorite === false) {
    arrFavoriteList.push(clickId);
    //console.log("entra");
  } else {
    arrFavoriteList.splice(isFavorite, 1);
    //console.log("sale");
  }
  paintMovies();
  listenFavMovies();
  paintFavorite();
  setLocalStorage();
}

function paintFavorite() {
  const listMoviesFav = document.querySelector(".main__aside-fav");
  let htmlFav = "";
  for (let i = 0; i < arrFavoriteList.length; i++) {
    console.log(movies[i]);

    console.log(arrFavoriteList);

    htmlFav += `<li class = "main__list-movie" id="${movies[i].show.id}">`;

    if (movies[i].show.image !== null) {
      htmlFav += `<img class = "main__list--img" src="${movies[i].show.image.medium}" alt="${movies[i].show.name}" />`;
    } else {
      htmlFav += `<img class = "main__list--img" src="${imgPlaceholder}" alt="${movies[i].show.name}" />`;
    }

    htmlFav += `<h3 class = "main__list--name">Nombre: ${movies[i].show.name}</h3>`;
    htmlFav += `<p class = "main__list--genres" > Genero: ${movies[i].show.genres}</p>`;
    htmlFav += "</li>";
  }
  listMoviesFav.innerHTML = htmlFav;
}

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
}
getLocalStorage();

//listeners
// llamando a buscar
btn.addEventListener("click", handleFilter);

// llamando a los li para poner en fav

function listenFavMovies() {
  const clickFavMovies = document.querySelectorAll(".main__list-movie");
  for (const clickFavMovie of clickFavMovies) {
    clickFavMovie.addEventListener("click", favMovies);
  }
}
