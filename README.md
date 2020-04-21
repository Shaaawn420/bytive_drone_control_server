# bytive drone control server

## Context
Within the context of our Apprenticeship we have to create a school project of our own choice.
We chose to create a simple drone kit this includes a small communication server and a cross-platform mobile app.
You can use this code as you like, but keep in mind we're not responsible in any kind.

### Related Repositories
* [Mobile App](https://github.com/julianheckmann/bytive_drone_control_mobile_app)
* [Server](https://github.com/julianheckmann/bytive_drone_control_server)
* [Drone Software](https://github.com/julianheckmann/bytive_drone_control_drone_arduino)

## Instructions
Clone repository:
```bash
git clone https://github.com/julianheckmann/bytive_drone_control_server.git
```

Fetch dependencies:
```bash
cd bytive_drone_control_server && npm install
```

Start server with sudo rights:
```bash
sudo npm run start
```

## Helpful links
- [Node Serialport](https://github.com/serialport/node-serialport)
- [chmod](https://github.com/popomore/chmod)
- [ws](https://github.com/websockets/ws)
- [Jest](https://jestjs.io/)
