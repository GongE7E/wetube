import app from "./server";
import "./db";
import Video from "./models/Video";
import User from "./models/User";

const PORT =4000;

app.listen(4000,()=>
console.log(`✅ Server listenting on port http://localhost:${4000} 🚀`));

