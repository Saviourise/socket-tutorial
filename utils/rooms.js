function formatMessage(username, text) {
  return {
    username,
    text,
    time: new Date().toDateString(),
  };
}

module.exports = { formatMessage };
