const Router = require("express").Router();
const path = require("path");
const db = require("../models");

// routes
Router.get("/", async (req, res) => {
  const data = await db.List.findAll({
    include: [db.Task]
  });

  const lists = data.map(list => {
    const tasks = list.dataValues.Tasks.map(task => {
      return { id: task.id, description: task.description, count: task.count };
    });

    return {
      id: list.dataValues.id,
      title: list.dataValues.title,
      tasks: tasks
    };
  });

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
