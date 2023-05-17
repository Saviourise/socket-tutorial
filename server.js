const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  socket.emit("message", "Welcome to chat-me");
  socket.broadcast.emit("message", "A user just joined the chat");
  socket.on("disconnect", () => {
    io.emit("message", "A user just left the chat");
  });
  socket.on("chatMessage", (chatMessage) => {
    io.emit("message", chatMessage);
  });
});

server.listen(3000, () => {
  console.log("server started on port 3000");
});
