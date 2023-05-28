const messages = document.querySelector(".messages");
const form = document.querySelector("form");
let roomUsers = document.querySelector(".roomUsers");
let roomName = document.querySelector(".roomName");
const username = window.location.href.split("?")[1].split("&")[0].split("=")[1];
const roomname = window.location.href.split("?")[1].split("&")[1].split("=")[1];

const socket = io();
socket.on("message", (message) => {
  showMessageOnDOM(message);
  messages.scrollTop = messages.scrollHeight;
});

socket.emit("joinRoom", { username, roomname });

// Get room and users
socket.on("roomUsers", ({ roomname, users }) => {
  outputRoomInfo(roomname, users);
  // outputUsers(users);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form.message.value) {
  } else {
    socket.emit("chatMessage", form.message.value);
    form.message.value = "";
    form.message.focus();
  }
});

const messageBox = document.querySelector(".messages");

function showMessageOnDOM(message) {
  const div = document.createElement("div");
  div.innerHTML = `
        <div class="single-message">
        <span class="info">
            <strong>@${message.username}</strong>
            <small>${message.time}</small>
        </span>
            <p>${message.text}</p>
        </div>
      `;
  messageBox.appendChild(div);
}

let rooms = document.querySelectorAll("li");

for (let i = 0; i < rooms.length; i++) {
  if (rooms[i].textContent === roomname) {
    rooms[i].style.backgroundColor = "rgba(0,0,0,0.1)";
  }
}

function outputRoomInfo(roomname, users) {
  roomName.textContent = `${roomname} Users`;
  roomUsers.innerHTML = "";
  console.log(roomName);
  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerText = user.username;
    roomUsers.appendChild(li);
  });
}
