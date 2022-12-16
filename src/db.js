import mongoose from "mongoose";

mongoose.set("strictQuery", true);

mongoose.connect("mongodb://127.0.0.1:27017/wetube");


const db=mongoose.connection;
const handleError=()=>console.log("DB Error✅");
const handleOpen=()=> console.log("Connected to DB✅");




db.on("error",handleError);
db.once("open",handleOpen);