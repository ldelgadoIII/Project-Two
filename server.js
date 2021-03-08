require("dotenv").config();

const compression = require("compression");
const express = require("express");
const session = require("express-session");
const path = require("path");
const passport = require("./config/passport");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
const exphbs = require("express-handlebars");

const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(compression());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// Requiring our routes
app.use(require("./routes/html-routes"));
require("./routes/api-routes.js")(app);

// Use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

io.on("connection", socket => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", msg => {
    io.emit("chat message", msg);
  });

  socket.on("task id", async id => {
    // get task where id = id i received
    const task = await db.Task.findOne({
      where: {
        id: id
      }
    });
    const newCount = task.dataValues.count + 1;
    const taskObj = {
      id: id,
      count: newCount
    };

    db.Task.update(
      // increase count column value by one
      {
        count: newCount
      },
      {
        where: {
          id: id
        }
      }
    ).then(response => {
      console.log("Update Successful: ", response);

      // send an update to front end display of count
      io.emit("updated count", taskObj);
    });
  });
});

db.sequelize.sync({ force: false }).then(() => {
  http.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
