
import express  from "express";
import morgan from "morgan";
import session from "express-session";
import routeRouter from "./routers/routeRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";


const app = express();

app.set("view engine","pug");
app.set("views",process.cwd() +"/src/views");
app.use(morgan("dev"));
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:"Hello",
    resave:true,
    saveUninitialized:true,
})
);
app.use(localsMiddleware);
app.use("/",routeRouter);
app.use("/users",userRouter);
app.use("/videos",videoRouter);

export default app;