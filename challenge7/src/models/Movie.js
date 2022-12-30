import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  genres: [{ type: String, require: true }],
  meta: {
    year: { type: Date, default: Date.now, required: true },
    rating: { type: Number, required: true }
  }
});
//console.log(MovieSchema);

const Movie = mongoose.model("Movie", MovieSchema);

export default Movie;
