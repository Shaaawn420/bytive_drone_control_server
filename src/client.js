/**
 * Example websocket connection
 */
const ws = require('ws');
const connection = new ws('ws://localhost:65535');

connection.onopen = event => {
  let x = 100, y = 100, countUp = false, cd = 100;
  const timerr = () => {
    connection.send(JSON.stringify({type: 'right', x: x, y: y}));
    console.log(JSON.stringify({type: 'right', x: x, y: y}));
    
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
    
    cd += 10;
  };

  setInterval(timerr, 100);
};