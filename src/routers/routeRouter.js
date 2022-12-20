import express from "express";
import {getJoin,postJoin,getLogin,postLogin} from "../controllers/userController";
import {home,search} from "../controllers/videoController";
import {publicOnlyMiddleware} from "../middlewares";

const routeRouter=express.Router();


routeRouter.get("/",home);
routeRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
routeRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);
routeRouter.get("/search",search);

export default routeRouter;