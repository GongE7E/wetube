import express from "express";
import { getUpload, home, postUpload, search } from "../src/movieController";
const routeRouter = express.Router();

routeRouter.get("/", home);
routeRouter.route("/upload").get(getUpload).post(postUpload);
routeRouter.get("/search", search);
export default routeRouter;
