const Router = require("express").Router();
const path = require("path");
const db = require("../models");

// routes
Router.get("/", async (req, res) => {
  const data = await db.List.findAll({});
  const lists = data.map(list => list.dataValues);
  console.log(lists);

  res.render("index", {
    lists: lists
  });
});

Router.get("/students", async (req, res) => res.render("student-view"));

Router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

Router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

module.exports = Router;
