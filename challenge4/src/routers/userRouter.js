import express from "express";

import { seeUsers, seeUser, editProfile } from "../controllers/usersController";

const userRouter = express.Router();

userRouter.get("/", seeUsers);
userRouter.get("/edit-profile", editProfile);
userRouter.get("/:id", seeUser);

export default userRouter;
