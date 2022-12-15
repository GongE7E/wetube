import express  from "express";
import morgan from "morgan";
import routeRouter from "./routers/routeRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
const PORT =4000;

const app = express();

app.set("view engine","pug");
app.set("views",process.cwd() +"/src/views");
app.use(morgan("dev"));


app.use("/",routeRouter);
app.use("/users",userRouter);
app.use("/videos",videoRouter);


app.listen(4000,()=>
console.log(`✅ Server listenting on port http://localhost:${4000} 🚀`));

