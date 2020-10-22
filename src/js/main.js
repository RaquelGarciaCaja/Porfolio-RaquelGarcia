"use strict";
const input = document.querySelector(".js-input");
const btn = document.querySelector(".js-button");
const listMovies = document.querySelector(".main__list");
const url = "http://api.tvmaze.com/search/shows?q=girls";

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
let printMovie;
function paintMovies() {
  for (let i = 0; i < movies.length; i++) {
    console.log(movies[i].show);
    listMovies.innerHTML += `<li class = "main__list-movie">`;
    listMovies.innerHTML += `<img class = "main__list--img src = "${movies[i].show.image.medium}"></img>`;
    listMovies.innerHTML += `<p class = "main__list--name ">Nombre: ${movies[i].show.name}</p>`;
    listMovies.innerHTML += `<p class = "main__list--genres " >Genero: ${movies[i].show.genres}</p>`;
    listMovies.innerHTML += "</li>";
  }
}

btn.addEventListener("click", paintMovies);
