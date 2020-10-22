"use strict";
const input = document.querySelector(".js-input");
const btn = document.querySelector(".js-button");
const listMovies = document.querySelector(".main__list");
const url = "http://api.tvmaze.com/search/shows?q=friends";
const imgPlaceholder = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
const favContainer = document.querySelector(".main__aside--fav");
//let clickFavMovies = document.querySelectorAll(".main__list-movie");

//api
let movies = "";
function getData() {
  fetch(url + input.value)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      movies = data;
      paintMovies();
    });
}
getData();

//paint

function paintMovies() {
  listMovies.innerHTML = "";
  for (let i = 0; i < movies.length; i++) {
    const showimage = movies[i].show.image;
    if (showimage == true) {
      console.log(showimage == true);
      listMovies.innerHTML += `<li class = "main__list-movie" id="${movies[i].show.id}>`;
      listMovies.innerHTML += `<img class = "main__list--img" src="${movies[i].show.image.medium}" alt="${movies[i].show.name}" />`;
      listMovies.innerHTML += `<div class = "main__list--items"><h3 class = "main__list--name">Nombre: ${movies[i].show.name}</h3><div>`;
      // listMovies.innerHTML += `<p class = "main__list--genres" > Genero: ${movies[i].show.genres}</p>;
      listMovies.innerHTML += "</li>";
    } else {
      listMovies.innerHTML += `<li class = "main__list-movie" id="${i}">`;
      listMovies.innerHTML += `<img class = "main__list--img" src="${imgPlaceholder}" alt="${movies[i].show.name}" />`;
      listMovies.innerHTML += `<div class = "main__list--items"><h3 class = "main__list--name">Nombre: ${movies[i].show.name}</h3><div>`;
      // listMovies.innerHTML += `<p class = "main__list--genres" > Genero: ${movies[i].show.genres}</p>;
      listMovies.innerHTML += "</li>";
    }
  }
}

//favs
function favMovies(ev) {
  let clickId = ev.target.id;
  console.log(clickId);

  // favContainer.innerHTML += `<li class="main__aside--fav">`;
  // favContainer.innerHTML += `<img src="" alt="" class="main__aside--fav-img" />`;
  // favContainer.innerHTML += `<h3 class="main__aside--fav-name"></h3>`;
  // favContainer.innerHTML += `</li>`;
}

//listeners
btn.addEventListener("click", paintMovies);

listMovies.addEventListener("click", favMovies);
