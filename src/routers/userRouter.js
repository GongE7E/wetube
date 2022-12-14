import express from"express";
import {getEdit,postEdit,logout,see,startGithubLogin,finishGithubLogin,
startKakaoLogin,finishKakaoLogin,getChangePassword,postChangePassword} from"../controllers/userController";
import { protectorMiddleware,publicOnlyMiddleware, uploadFiles } from "../middlewares";


const userRouter=express.Router();

userRouter.get("/logout",protectorMiddleware,logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(uploadFiles.single("avatar"),postEdit);
userRouter.get("/:id(\\d+)",see);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/github/start",publicOnlyMiddleware,startGithubLogin);
userRouter.get("/github/finish",publicOnlyMiddleware,finishGithubLogin);
userRouter.get("/kakao/start",publicOnlyMiddleware,startKakaoLogin);
userRouter.get("/kakao/finish",publicOnlyMiddleware,finishKakaoLogin);

export default "userRouter";

module.exports = userRouter;  