export const home = (req, res) => res.render("layout", { pageTitle: "Home" });
export const trending = (req, res) =>
  res.render("story/trending", { pageTitle: "Trending" });
export const newStories = (req, res) =>
  res.render("story/newStories", { pageTitle: "NewStories" });
export const seeStory = (req, res) =>
  res.render("story/seeStory", { pageTitle: "seeStory" });
export const editStory = (req, res) =>
  res.render("story/editStory", { pageTitle: "editStory" });
export const deleteStory = (req, res) =>
  res.render("story/deleteStory", { pageTitle: "DeleteStory" });
