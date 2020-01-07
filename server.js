const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

/**
 * Client connected event
 */
wss.on("connection", ws =>  {
  /**
   * Client message event
   */
  ws.on("message", message => {
    console.log("received: %s", message);
  });

  /**
   * Client disconnect event
   */
  ws.on("close", event => {
    console.log("client disconnected");
  });
});
