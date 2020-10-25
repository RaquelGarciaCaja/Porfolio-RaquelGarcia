"use strict";
const input = document.querySelector(".js-input");
const btn = document.querySelector(".js-button");
const listMovies = document.querySelector(".js-main__list");
const url = "http://api.tvmaze.com/search/shows?q=";
const imgPlaceholder = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
const reset = document.querySelector(".js-reset");

//ev.preventDefault()
// arrays datos y favoritos
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
    let classFav;
    const classIndex = movies.find((click) => {
      for (let i = 0; i < click.length; i++) {
        console.log(click[i]);
        if (parseInt(click[i].show.id) === movies[i].show.id) return click;
        console.log(click[i]);
      }
    });

    if (classIndex === false) {
      classFav = "style__fav";
    } else {
      classFav = "";
    }

    const showimage = movies[i].show.image;
    html += `<li class = "main__container ${classFav}" id="${movies[i].show.id}">`;

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
    movieCLick.classList.add("style__fav");
    //movieCLick.classList.remove("style__fav");
  } else {
    arrFavoriteList.splice(indexFav, 1);
    // movieCLick.classList.remove("style__fav");
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
    htmlFav += `<i class="fas fa-trash js-reset-items"></i>`;
    // htmlFav += `<input type="button" id = "${[i]}" class="js-reset-items" value = "X"/>`;
    //htmlFav += `<button class="btn__remove--single" type="button">x</button>`;

    htmlFav += "</li>";
  }
  listMoviesFav.innerHTML = htmlFav;
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
  paintFavorite();
}
getLocalStorage();
//////////////////////////////////////////////////////////////////
//RESET ALL (PAINT FAVORITES AND LOCALSTORAGE)
function resetFavorites() {
  arrFavoriteList.splice(1, arrFavoriteList.length);
  arrFavoriteList = [];
  localStorage.clear();
  paintFavorite();
}
// RESET EACH FAVORITE
function resetItemFavorites(ev) {
  //ev.currentTarget es undefined
  // const clickIdFav = parseInt(ev.currentTarget.parentElementid);
  // const indexItemFav = arrFavoriteList.findIndex((click) => {
  //   if (parseInt(click.show.id) === clickIdFav) return click;
  // });
  // arrFavoriteList.splice(indexItemFav, 1);
  ///////////////////
  //delete arrFavoriteList[ev.currentTarget];
  paintFavorite();
  setLocalStorage();
}
resetItemFavorites();

//////////////////////////////////////////////////////////////
//LISTENERS
btn.addEventListener("click", handleFilter);

function listenFavMovies() {
  const clickFavMovies = document.querySelectorAll(".main__container");
  for (const clickFavMovie of clickFavMovies) {
    clickFavMovie.addEventListener("click", favMovies);
  }
}

reset.addEventListener("click", resetFavorites);

function listenTrashItem() {
  const resetItems = document.querySelectorAll(".js-reset-items");
  // console.log(resetItems);
  for (const resetItem of resetItems) {
    console.log(resetItem);
    resetItem.addEventListener("click", resetItemFavorites);
  }
}
