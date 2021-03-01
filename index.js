const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

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

http.listen(3000, () => {
  console.log("listening on *:3000");
});
