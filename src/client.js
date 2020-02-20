/**
 * Example websocket connection
 */
const ws = require("ws");

const MAX_SERVER = 2000;
const MIN_SERVER = 1150;

const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

const connection = new ws("ws://localhost:65535");

function Sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const calculate = (x, y) => {
  0 > x && (x *= -1);
  0 > y && (y *= -1);
  
  return ((Number(x).toFixed(3) * 1000) * 1024) + (Number(y).toFixed(3) * 1000);
};

const buildString = (type, symbolX, symbolY, value) => {
  return `${type}|${symbolX}|${symbolY}|${value}`;
};

const plusOrMinus = axis => {
  return Number(axis) > 0 ? "+" : "-";
};

connection.onopen = event => {
  let x = 100, y = 100, countUp = false;
  
  const timerr = () => {
    let xC = map(x / 100, -1, 1, 1150, 2000).toFixed(0);
    let yC = map(y / 100, -1, 1, 1150, 2000).toFixed(0);
    
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
    console.log(xC, yC, x, y);
    // console.log(x, y, x / 100, y / 100);
    
    // let calc = calculate(x, y);
    //
    // let xC = Number((Math.floor(calc / 1024) / 1000).toFixed(3));
    // let yC = Number((Math.floor(calc % 1024) / 1000).toFixed(3));
    
    
    //console.log(xC, x, yC , y);
    connection.send(`L|${xC}|${yC}`);
    //connection.send(buildString("L",  plusOrMinus(x), plusOrMinus(y), calculate(xC, yC)));
    //connection.send(buildString("R", plusOrMinus(x), plusOrMinus(y), calculate(x, y)));
  }
  
    setInterval(timerr, 50);
};