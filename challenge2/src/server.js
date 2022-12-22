import express from "express";

const app = express();

const urlLogger = (req, res, next) => {
  console.log("Path:", req.path);
  next();
};
const timeLogger = (req, res, next) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  console.log("Time :", year + "." + month + "." + day);
  next();
};
const securityLogger = (req, res, next) => {
  const protocol = req.protocol;
  if (protocol === "https") {
    console.log("secure");
  } else {
    console.log("insecure");
  }
  next();
};
const protectorMiddleware = (req, res, next) => {
  if (req.path === "/protected") {
    return res.send("<h1>hidden,login please</h1>");
  } else {
    next();
  }
};
app.use(urlLogger, timeLogger, securityLogger, protectorMiddleware);
app.get("/", (req, res) => res.send("<h1>Home</h1>"));
app.get("/protected", (req, res) => res.send("<h1>Protected</h1>"));

// Codesandbox gives us a PORT :)
app.listen(process.env.PORT, () => `Listening!✅`);
