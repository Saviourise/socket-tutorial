let users = [];

function userJoin(id, username, roomname) {
  const user = { id, username, roomname };
  users.push(user);
  return user;
}

function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

function getCurrentUser(id) {
  let user = users.find((user) => user.id === id);
  return user;
}

function getAllUsers(roomname) {
  let roomUsers = users.filter((user) => user.roomname === roomname);
  return roomUsers;
}

module.exports = {
  userJoin,
  userLeave,
  getCurrentUser,
  getAllUsers,
};
