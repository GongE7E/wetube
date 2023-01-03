import "./db";
import "./models/Movie";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import routeRouter from "./routeRouter";
import movieRouter from "./movieRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(localsMiddleware);
app.use("/", routeRouter);
app.use("/movies", movieRouter);

// Codesanbox does not need PORT :)
app.listen(() => console.log(`✅  Server Ready!`));
