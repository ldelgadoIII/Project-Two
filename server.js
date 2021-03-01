require("dotenv").config();

const express = require("express");
const path = require("path");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
const exphbs = require("express-handlebars");
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));

app.get("/chat", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/dash", (req, res) => {
  res.sendFile(__dirname + "/dashboard.html");
});

io.on("connection", socket => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", msg => {
    io.emit("chat message", msg);
  });

  socket.on("count", count => {
    io.emit("count", count);
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

// const session = require("express-session");
// const passport = require("./config/passport");
// // Requiring our routes
// app.use(require("./routes/html-routes"));
// require("./routes/api-routes.js")(app);

// // Use sessions to keep track of our user's login status
// app.use(
//   session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
// );
// app.use(passport.initialize());
// app.use(passport.session());
