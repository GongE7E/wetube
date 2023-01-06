import express from "express";
import {
  home,
  getjoin,
  postjoin,
  getlogin,
  postlogin
} from "../src/userController";
const userRouter = express.Router();

userRouter.get("/", home);
userRouter.route("/join").get(getjoin).post(postjoin);
userRouter.route("/login").get(getlogin).post(postlogin);

export default userRouter;
