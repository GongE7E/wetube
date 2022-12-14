import express  from "express";
import morgan from "morgan";

const PORT =4000;

const app = express();


const handleHome=(req,res)=>{
return res.send("Hi");
};
const handleLogin=(req,res)=>{
    return res.send({message:"Login"});
}
app.use(morgan("dev"));
app.get("/",handleHome);
app.get("/login",handleLogin);

app.listen(4000,()=>
console.log(`✅ Server listenting on port http://localhost:${4000} 🚀`));
