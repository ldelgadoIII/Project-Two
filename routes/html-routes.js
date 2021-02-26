const Router = require("express").Router();

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

module.exports = Router;
