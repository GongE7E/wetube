
import express  from "express";
import morgan from "morgan";
import routeRouter from "./routers/routeRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";


const app = express();

app.set("view engine","pug");
app.set("views",process.cwd() +"/src/views");
app.use(morgan("dev"));
app.use(express.urlencoded({extended:true}));
app.use("/",routeRouter);
app.use("/users",userRouter);
app.use("/videos",videoRouter);

export default app;