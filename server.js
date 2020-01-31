const WebSocket = require("ws");
const wss = new WebSocket.Server({
    port: 8080, verifyClient: (info, done) => {
        if (wss.clients.size === 1) {
          console.log(info);
          return done(false, 401, "already connected");
        }
        done(true);
    }
});

/**
 * Client connected event
 */
wss.on("connection", ws => {
    /**
     * Client message event
     */
    ws.on("message", message => {
        console.log(`${ws._socket.remoteAddress}: ${message}`);
    });

    /**
     * Client disconnect event
     */
    ws.on("close", event => {
        console.log(`${ws._socket.remoteAddress}: disconnected`);
    });
});
