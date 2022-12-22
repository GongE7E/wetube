import express from "express";
import { see, editProfile } from "../controllers/userControllers";

const usersRouter = express.Router();

usersRouter.get("/editProfile", editProfile);
usersRouter.get("/:id", see);

export default usersRouter;
