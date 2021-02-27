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

Router.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/card_container.html"));
});

module.exports = Router;
