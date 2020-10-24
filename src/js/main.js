"use strict";
const input = document.querySelector(".js-input");
const btn = document.querySelector(".js-button");
const listMovies = document.querySelector(".main__list");
const url = "http://api.tvmaze.com/search/shows?q=";
const imgPlaceholder = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
const reset = document.querySelector(".js-reset");

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
    // let classFav;
    // const classIndex = arrFavoriteList.finIndex((click) => {
    //   if (parseInt(click.show.id) === clickId) return click;

    //   //console.log(arrFavoriteList);
    //   if (classIndex === false) {
    //     classFav = "style__fav";
    //   } else {
    //     classFav = "";
    //   }
    // });
    let classFav;
    const classIndex = movies.find((click) => {
      if (parseInt(click.show.id) === movies[i].show.id) return click;
    });
    if (classIndex === false) {
      classFav = "style__fav";
    } else {
      classFav = "";
    }
    const showimage = movies[i].show.image;
    html += `<li class = "main__container  ${classFav} " id="${movies[i].show.id}">`;

    if (showimage !== null) {
      html += `<img class = "main__img" src="${movies[i].show.image.medium}" alt="${movies[i].show.name}" />`;
    } else {
      html += `<img class = "main__img" src="${imgPlaceholder}" alt="${movies[i].show.name}" />`;
    }

    html += `<h3 class = "main__name">${movies[i].show.name}</h3>`;
    // html += `<p class = "main__genres" > Genero: ${movies[i].show.genres}</p>`;
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
  } else {
    arrFavoriteList.splice(indexFav, 1);
  }
  paintMovies();
  listenFavMovies();
  paintFavorite();
  setLocalStorage();
}

function paintFavorite() {
  const listMoviesFav = document.querySelector(".main__aside--fav");
  let htmlFav = "";
  for (let i = 0; i < arrFavoriteList.length; i++) {
    // console.log(movies[i]);

    // console.log(arrFavoriteList);

    htmlFav += `<li class = "main__container--fav" id="${arrFavoriteList[i].show.id}">`;

    if (arrFavoriteList[i].show.image !== null) {
      htmlFav += `<img class = "main__img--fav" src="${arrFavoriteList[i].show.image.medium}" alt="${arrFavoriteList[i].show.name}" />`;
    } else {
      htmlFav += `<img class = "main__img--fav" src="${imgPlaceholder}" alt="${arrFavoriteList[i].show.name}" />`;
    }

    htmlFav += `<h3 class = "main__name--fav">${arrFavoriteList[i].show.name}</h3>`;
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

//reset all

// function resetData() {
//   arrFavoriteList.length = 0;
//   console.log((arrFavoriteList.length = []));
// }

// console.log(resetData);
// reset.addEventListener("click", resetData);

//listeners
// llamando a buscar
btn.addEventListener("click", handleFilter);

// llamando a los li para poner en fav

function listenFavMovies() {
  const clickFavMovies = document.querySelectorAll(".main__container");
  for (const clickFavMovie of clickFavMovies) {
    clickFavMovie.addEventListener("click", favMovies);
  }
}
