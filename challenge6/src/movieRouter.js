import express from "express";
import {
  home,
  movieDetail,
  getaddMovie,
  postaddMovie
} from "./movieController";

const movieRouter = express.Router();

movieRouter.get("/", home);
movieRouter.route("/add").get(getaddMovie).post(postaddMovie);
movieRouter.get("/:id", movieDetail);

export default movieRouter;
