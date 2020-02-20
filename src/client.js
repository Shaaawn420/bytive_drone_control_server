/**
 * Example websocket connection
 */
const ws = require('ws');
const connection = new ws('ws://localhost:4444');

connection.onopen = event => {
  let x = 100, y = 100, countUp = false;

  const timerr = () => {
    if (countUp) {
      ++x;
      ++y;
      if (x >= 100)
        countUp = false;
    } else {
      --x;
      --y;
      if (x <= -100)
        countUp = true;
    }
    connection.send(JSON.stringify({type: 'left', x: x, y: y}));
  };

  setInterval(timerr, 1);
};