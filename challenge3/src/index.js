import express from "express";
import globalRouter from "./Routers/globalRouter";
import storiesRouter from "./Routers/storiesRouter";
import usersRouter from "./Routers/usersRouter";

const app = express();

app.use("/", globalRouter);
app.use("/users", usersRouter);
app.use("/stories", storiesRouter);
// Codesanbox does not need PORT :)
app.listen(() => console.log(`Listening!`));
