import { getMovieById, getMovies, addMovie } from "./db";

export const home = (req, res) =>
  res.render("movies", { movies: getMovies(), pageTitle: "Movies!", addMovie });

export const movieDetail = (req, res) => {
  const {
    params: { id }
  } = req;
  const movie = getMovieById(id);
  if (!movie) {
    res.render("404", { pageTitle: "Movie not found" });
  }
  return res.render("detail", { movie });
};

export const getaddMovie = (req, res) => {
  return res.render("addMovie", { pageTitle: "Add Movie" });
};

export const postaddMovie = (req, res) => {
  const {title,synopsis,genres} = req;
  addMovie({ title, synopsis, genres: genres.split(",") });
  return res.redirect("/");

};