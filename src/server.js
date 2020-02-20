require('dotenv').config();
const WebSocket = require("ws");
const SerialPort = require('serialport');

/**
 * SerialPort instance
 */
const port = new SerialPort(process.env.SERIAL_PORT, { baudRate: parseInt(process.env.SERIAL_BAUDRATE)});

/**
 * Websocket Server instance
 */
const wss = new WebSocket.Server({
    port: parseInt(process.env.WS_PORT), verifyClient: (info, done) => {
        if (wss.clients.size === 1) {
          console.log(info);
          return done(false, 401, "already connected");
        }
        done(true);
    }
});

/**
 * SerialPort open event
 */
port.on('open', () => {
    port.write("S" + "\n");
});

/**
 * Websocket client connected event
 */
wss.on("connection", ws => {
    
    /**
     * Client message event
     */
    ws.on("message", message => {
        console.log(`${ws._socket.remoteAddress}: ${message}`);
        port.write(message + "\n");
        // port.write("a" + "\n");
        // port.write("sweep" + "\n");
    });

    /**
     * Client disconnect event
     */
    ws.on("close", event => {
        console.log(`${ws._socket.remoteAddress}: disconnected`);
        port.write("L,-,-,1025000" + "\n");
        port.write("R,-,-,1025000" + "\n");
    });
});
