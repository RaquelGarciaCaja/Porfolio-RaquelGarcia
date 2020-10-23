"use strict";
const input = document.querySelector(".js-input");
const btn = document.querySelector(".js-button");
const listMovies = document.querySelector(".main__list");
const url = "http://api.tvmaze.com/search/shows?q=tronos";
const imgPlaceholder = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
const aside = document.querySelector(".main__aside");

//ev.preventDefault()
// cadenas
// meter desde el data
let movies = [];
// meter las fav
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
    });
}

//paint
function paintMovies() {
  let html = "";
  for (let i = 0; i < movies.length; i++) {
    // img por defecto
    //la clase de fav va aqui
    const showimage = movies[i].show.image;
    html += `<li class = "main__list-movie " id="${movies[i].show.id}">`;

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

function showObjects(id) {
  // const foundMovie = movies.find(function (movie) {
  //   //console.log(clickId, movie.show.id);
  //   if (clickId === movie.show.id) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  return movies.find((movie) => parseInt(id) === movie.show.id);
}

function favMovies(ev) {
  const selectMoviesId = ev.currentTarget.id;
  const showObject = showObjects(selectMoviesId);
  const favoriteIndex = arrFavoriteList.findIndex(
    (movieFav) => movieFav.id === parseInt(selectMoviesId)
  );
  if (favoriteIndex === -1) {
    arrFavoriteList.push(showObject.show);
    //selectMoviesId.classList.add("style__fav");
    //selectMoviesId.classList.remove("");
  } else {
    arrFavoriteList.splice(favoriteIndex, 1);
    //selectMoviesId.classList.add("style__fav");
    //selectMoviesId.classList.remove("");
  }
  paintMovies();
  listenFavMovies();
  paintFavorite();
}

function paintFavorite() {
  const listFavorites = document.querySelector(".main__aside-fav");

  for (let i = 0; i < movies.length; i++) {
    // img por defecto

    if (arrFavoriteList.image !== null) {
      aside.classList.remove("main__aside");
      listFavorites.innerHTML += `<li class = "main__list-movie " id="${movies[i].show.id}">`;
      listFavorites.innerHTML += `<img class = "main__list--img" src="${movies[i].show.image.medium}" alt="${movies[i].show.name}" />`;
      listFavorites.innerHTML += `<h3 class = "main__list--name">Nombre: ${movies[i].show.name}</h3>`;
      listFavorites.innerHTML += `<p class = "main__list--genres" > Genero: ${movies[i].show.genres}</p>`;
      listFavorites.innerHTML += "</li>";
    } else {
      aside.classList.remove("main__aside");
      listFavorites.innerHTML += `<li class = "main__list-movie " id="${movies[i].show.id}">`;
      listFavorites.innerHTML += `<img class = "main__list--img" src="${imgPlaceholder}" alt="${movies[i].show.name}" />`;
      listFavorites.innerHTML += `<h3 class = "main__list--name">Nombre: ${movies[i].show.name}</h3>`;
      listFavorites.innerHTML += `<p class = "main__list--genres" > Genero: ${movies[i].show.genres}</p>`;
      listFavorites.innerHTML += "</li>";
    }
  }
}

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
