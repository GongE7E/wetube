import express from "express";
import {join,login} from "../controllers/userController";
import {home,search} from "../controllers/videoController";


const routeRouter=express.Router();


routeRouter.get("/",home);
routeRouter.get("/join",join);
routeRouter.get("/login",login);
routeRouter.get("/search",search);

export default routeRouter;