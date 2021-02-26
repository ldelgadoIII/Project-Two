// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // Get route for retrieving all lists
  app.get("/api/lists", (req, res) => {
    // Add sequelize code to find all lists, and return them to the user with res.json
    db.List.findAll({
      include: [{ model: db.Task }]
    }).then(dbList => res.json(dbList));
  });

  // Get route for retrieving a single list
  app.get("/api/lists/:id", (req, res) => {
    // Add sequelize code to find a single list where the id is equal to req.params.id,
    // return the result to the user with res.json
    db.dbList
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(result => res.json(result));
  });

  // POST route for saving a new list
  app.post("/api/lists", (req, res) => {
    // Add sequelize code for creating a post using req.body,
    // then return the result using res.json
    db.List.create(req.body).then(dbList => res.json(dbList));
  });

  // Update route to update an existing list
  app.put("/api/lists", (req, res) => {
    // Add code here to update a list using the values in req.body, where the id is equal to
    // req.body.id and return the result to the user using res.json
    db.List.update(
      {
        title: req.body.title
      },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(dbList => res.json(dbList));
  });

  app.delete("/api/lists/:id", (req, res) => {
    db.List.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbList => res.json(dbList));
  });

  app.get("/api/tasks", (req, res) => {
    const query = {};
    if (req.query.list_id) {
      query.ListId = req.query.ListId;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Task.findAll({
      where: query,
      include: [db.List]
    }).then(dbTask => res.json(dbTask));
  });
};
