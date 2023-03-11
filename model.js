"strict mode";
import { apiKey } from "./config.js";
// API test
const getJSON = async function (url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const state = {
  movie: {},
  searchQuery: {
    query: "",
    results: [],
  },
  bookmarks: [],
};

const movieObject = function (data) {
  const movie = data;
  return {
    id: movie.id,
    releaseDate: movie.release_date,
    genres: movie.genres,
    title: movie.original_title,
    plot: movie.overview,
    voteAverage: movie.vote_average,
    voteCount: movie.vote_count,
    backdrop: movie.backdrop_path,
    poster: movie.poster_path,
  };
};

export const loadMovie = async function (id) {
  const data = await getJSON(
    `http://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
  );
  state.movie = movieObject(data);
};

export const getSearchResults = async function (query) {
  let arrResults = [];
  for (let i = 1; i < 11; i++) {
    const data = await getJSON(`
    https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=${i}&include_adult=true`);
    arrResults = arrResults.concat(data.results);
  }
  state.searchQuery.query = query;
  const arrClean = arrResults.map((el) => movieObject(el));
  state.searchQuery.results = arrClean;
};

export const getDiscoveryResults = async function (query) {};

export const changeMovie = async function (index) {
  const { id } = state.searchQuery.results[index];
  await loadMovie(id);
};

export const resultsNumberShift = function (value) {
  let partialArr = state.searchQuery.results.slice(0, value - 1);
  return partialArr;
};

// const data = await getJSON(
//   "https://api.themoviedb.org/3/discover/movie?api_key=31d2d0bec216e6dec20d7555d48b5074&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_watch_monetization_types=flatrate"
// );

// const getGenreResults = async function (id) {
//   try {
//     const genre = id;
//     const data = await getJSON(
//       `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&with_genres=${genre}&with_watch_monetization_types=flatrate`
//     );
//     return console.log(data);
//   } catch (err) {
//     alert(err);
//   }
// };

// const genreIds = async function () {
//   try {
//     const data = await getJSON(
//       `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
//     );
//     const arr = data;
//     let genreObj = {};
//     arr["genres"].forEach((el) => {
//       genreObj[el.id] = el.name;
//     });
//     return genreObj;
//   } catch (err) {
//     alert(err);
//   }
// };
