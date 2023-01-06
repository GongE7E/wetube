/*
You DONT have to import the User with your username.
Because it's a default export we can nickname it whatever we want.
So import User from "./models"; will work!
You can do User.find() or whatever you need like normal!
*/
import User from "./models/User";
import bcrypt from "bcrypt";

export const home = (req, res) => {
  res.render("home", { pageTitle: "Home" });
};
export const getjoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
export const postjoin = async (req, res) => {
  const { username, name, password, password2 } = req.body;
  const pageTitle = "join";
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "no"
    });
  }
  const exists = await User.exists({ name });
  if (exists) {
    return res.render("/join", {
      pageTitle,
      errorMessage: "This is name already "
    });
  }
  try {
    await User.create({
      username,
      name,
      password
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "error"
    });
  }
};
export const getlogin = (req, res) => {
  res.render("login", { pageTitle: "login" });
};

export const postlogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "login";
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account with this username does not exists."
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong password"
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};
