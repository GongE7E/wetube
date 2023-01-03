import express from "express";
import { getedit, info, postedit, getdelete } from "../src/movieController";
const movieRouter = express.Router();

movieRouter.get("/:id([0-9a-f]{24})", info);
movieRouter.route("/:id([0-9a-f]{24})/edit").get(getedit).post(postedit);
movieRouter.get("/:id([0-9a-f]{24})/delete", getdelete);
export default movieRouter;
