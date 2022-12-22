import express from "express";
import { story, edit, deleteStory } from "../controllers/storiesControllers";

const storiesRouter = express.Router();

storiesRouter.get("/:id", story);
storiesRouter.get("/:id/edit", edit);
storiesRouter.get("/:id/delete", deleteStory);

export default storiesRouter;
