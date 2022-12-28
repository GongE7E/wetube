import {
  getMovieById,
  getMovies,
  getMovieByMinimumRating,
  getMovieByMinimumYear
} from "./db";

export const home = (req, res) => {
  const movies = getMovies();
  return res.render("home", { pageTitle: "Movies", movies });
};

export const movieDetail = (req, res) => {
  const { id } = req.params;
  const movie = getMovieById(id);
  return res.render("movieDetail", { pageTilte: `${movie.Title}`, movie });
};

export const filterMovie = (req, res) => {
  const { year, rating } = req.query;
  if (year) {
    const movies = getMovieByMinimumYear(year);
    return res.render("home", {
      pageTitle: `Searching by year:${year}`,
      searchingBy: "year",
      searchingTerm: year,
      movies
    });
  }
  if (rating) {
    const movies = getMovieByMinimumRating(rating);
    return res.render("home", {
      pageTitle: `Searching by rating: ${rating}`,
      movies
    });
  }
};
