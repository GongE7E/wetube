export const join = (req, res) =>
  res.render("user/join", { pageTitle: "Join" });
export const login = (req, res) =>
  res.render("user/login", { pageTitle: "Login" });
export const seeUsers = (req, res) =>
  res.render("user/seeUsers", { pageTitle: "seeUsers" });
export const seeUser = (req, res) =>
  res.render("user/seeUser", { pageTitle: "seeUser" });
export const editProfile = (req, res) =>
  res.render("user/edit-profile", { pageTitle: "Edit-Profile" });
