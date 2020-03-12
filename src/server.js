const chmod = require("chmod");

const WebSocket = require("ws");
const SerialPort = require("serialport");
const Converter = require("./components/Converter");

const SERIAL_PORT = process.env.SERIAL_PORT || "/dev/ttyUSB0";
const SERIAL_BAUDRATE = parseInt(process.env.SERIAL_BAUDRATE) || 57600;
const WS_PORT = parseInt(process.env.WS_PORT) || 65535;

/**
 * Make the serial port accessible
 */
chmod(SERIAL_PORT, 777);

/**
 * SerialPort instance
 */
const port = new SerialPort(SERIAL_PORT, { baudRate: SERIAL_BAUDRATE });

/**
 * Converter instance
 */
const converter = new Converter();

/**
 * Websocket Server instance
 */
const wss = new WebSocket.Server({
  port: WS_PORT,
  verifyClient: (info, done) => {
    if (wss.clients.size === 1) return done(false, 401, "already connected");
    done(true);
  }
});

/**
 * Websocket client connected event
 */
wss.on("connection", ws => {
  /**
   * Client message event
   */
  ws.on("message", payload => {
    console.log(`${ws._socket.remoteAddress}: ${payload}`);
    payload = JSON.parse(payload);
    port.write(
      converter.buildResponse(
        payload.type,
        payload.x ? payload.x / 100 : null,
        payload.y ? payload.y / 100 : null
      ) + "\n"
    );
  });

  /**
   * Client disconnect event
   */
  ws.on("close", () => {
    console.log(`${ws._socket.remoteAddress}: disconnected`);
    let payload = converter.buildResponse("stop");
    port.write(payload);
  });
});
