import express from "express";

const PORT = 5000;
const app = express();

const handlehome = (req, res) => {
  res.send("<h1>home<h1>");
};
const handleabout = (req, res) => {
  return res.send("<h4>hi<h4>");
};

const handlelogin = (req, res) => {
  return res.send("<h3>Hello<h3>");
};
const handlecontact = (req, res) => {
  return res.send("<h2>contact<h2>");
};

app.get("/", handlehome);
app.get("/about", handleabout);
app.get("/login", handlelogin);
app.get("/contact", handlecontact);

app.listen(PORT, () => console.log(`hello https://localhost:${PORT} 👋`));
