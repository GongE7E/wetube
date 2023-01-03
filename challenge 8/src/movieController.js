import Movie from "./models/Movie";

export const home = async (req, res) => {
  const movies = await Movie.find({}).sort({ title: "asc" });
  res.render("home", { pageTitle: "home", movies });
};

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const { title, summary, year, rating, genres } = req.body;
  await Movie.create({
    title,
    summary,
    year,
    rating,
    genres: genres.split(",")
  });
  res.redirect("/");
};

export const info = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);
  res.render("info", { pageTitle: `${movie.title}`, movie });
};

export const getedit = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);
  res.render("edit", { pageTitle: `Edit ${Movie.title}`, movie });
};
export const postedit = async (req, res) => {
  const { id } = req.params;
  const { title, summary, year, genres } = req.body;
  const movie = await Movie.exists({ _id: id });
  if (!movie) {
    return res.render("404", { pageTitle: "Video not found" });
  }
  await Movie.findByIdAndUpdate(id, {
    title,
    summary,
    year,
    genres: genres.split(",")
  });
};

export const getdelete = async (req, res) => {
  const { id } = req.params;
  await Movie.findByIdAndDelete({ _id: id });
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let movies = [];
  if (keyword) {
    movies = await Movie.find({
      title: {
        $regex: new RegExp(keyword, "i")
      }
    });
  }
  res.render("search", { pageTitle: "search", movies });
};
