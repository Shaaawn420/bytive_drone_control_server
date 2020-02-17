/**
 * Example websocket connection
 */
const ws = require("ws");

const connection = new ws("ws://localhost:65535");

connection.onopen = event => {
  const data = ["L,+,-,1025000", "R,+,+,423432", "S,-,-,12345"];

  data.forEach(element => {
    connection.send(element);
  });
};