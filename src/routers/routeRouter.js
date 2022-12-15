import express from "express";
import {join,login} from "../controllers/userController";
import {trending,search} from "../controllers/videoController";


const routeRouter=express.Router();


routeRouter.get("/",trending);
routeRouter.get("/join",join);
routeRouter.get("/login",login);
routeRouter.get("/search",search);

export default routeRouter;