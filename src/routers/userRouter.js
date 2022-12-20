import express from"express";
import {getEdit,postEdit,logout,see,startGithubLogin,finishGithubLogin,
startKakaoLogin,finishKakaoLogin} from"../controllers/userController";


const userRouter=express.Router();

userRouter.get("/logout",logout);
userRouter.route("/edit").get(getEdit).post(postEdit);
userRouter.get("/:id(\\d+)",see);
userRouter.get("/github/start",startGithubLogin);
userRouter.get("/github/finish",finishGithubLogin);
userRouter.get("/kakao/start",startKakaoLogin);
userRouter.get("/kakao/finish",finishKakaoLogin);

export default "userRouter";

module.exports = userRouter;  