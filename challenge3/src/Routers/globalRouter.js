import express from "express";

import { join, login } from "../controllers/userControllers";

import { trending, newStory, home } from "../controllers/storiesControllers";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/trending", trending);
globalRouter.get("/new", newStory);
globalRouter.get("/join", join);
globalRouter.get("/login", login);

export default globalRouter;
