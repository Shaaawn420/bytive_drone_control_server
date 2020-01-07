/**
 * Example websocket connection
 */
const ws = require("ws");

const connection = new ws("ws://localhost:8080");

connection.onopen = event => {
  connection.send("message");
};
