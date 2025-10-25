const API_KEY = '9fe0d15728c39b2819edaf4a90be5c77';
const BASE_URL = 'https://api.themoviedb.org/3';
const APKLINK = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const SEARCHAPI = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=`;

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(APKLINK);

function returnMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      main.innerHTML = '';
      data.results.forEach((movie) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const image = document.createElement('img');
        image.classList.add('thumbnail');
        image.src = movie.poster_path
          ? IMG_PATH + movie.poster_path
          : 'https://via.placeholder.com/200x300?text=No+Image';

        const title = document.createElement('h3');
        title.innerText = movie.title;

        card.appendChild(image);
        card.appendChild(title);
        main.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
      main.innerHTML = '<p style="color:white;">Something went wrong. Please try again later.</p>';
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchItem = search.value.trim();
  if (searchItem) {
    returnMovies(SEARCHAPI + encodeURIComponent(searchItem));
    search.value = "";
  }
});
