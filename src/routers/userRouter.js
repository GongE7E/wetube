import express from"express";
import {editUser,logout,see,startGithubLogin,finishGithubLogin} from"../controllers/userController";


const userRouter=express.Router();

userRouter.get("/logout",logout);
userRouter.get("/edit",editUser);
userRouter.get("/:id(\\d+)",see);
userRouter.get("/github/start",startGithubLogin);
userRouter.get("/github/finish",finishGithubLogin);

export default "userRouter";

module.exports = userRouter;  