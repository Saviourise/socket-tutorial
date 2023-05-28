Mconst express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");
const { formatMessage } = require("./utils/rooms.js");
const {
  userJoin,
  userLeave,
  getAllUsers,
  getCurrentUser,
} = require("./utils/users.js");

app.use(express.static(path.join(__dirname, "public")));

const botName = "LetChat Bot";

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, roomname }) => {
    const user = userJoin(socket.id, username, roomname);
    socket.join(user.roomname);
    socket.emit(
      "message",
      formatMessage(botName, `${user.username}, Welcome to ${user.roomname}`)
    );
    socket.broadcast
      .to(user.roomname)
      .emit(
        "message",
        formatMessage(botName, `${user.username} just joined the chat`)
      );
    io.to(user.roomname).emit("roomUsers", {
      roomname: user.roomname,
      users: getAllUsers(user.roomname),
    });
    socket.on("chatMessage", (chatMessage) => {
      const user = getCurrentUser(socket.id);
      io.to(user.roomname).emit(
        "message",
        formatMessage(user.username, chatMessage)
      );
    });
  });
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      socket.broadcast
        .to(user.roomname)
        .emit(
          "message",
          formatMessage(botName, `${user.username} just left the chat`)
        );
      io.to(user.roomname).emit("roomUsers", {
        roomname: user.roomname,
        users: getAllUsers(user.roomname),
      });
    }
  });
});

server.listen(3000, () => {
  console.log("server started on port 3000");
});