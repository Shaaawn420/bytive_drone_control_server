/**
 * Example websocket connection
 */
const ws = require("ws");

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
  let counttx = -100, county = -100, countup = true;
  
  const timerr = () => {
    if (countup) {
      ++counttx;
      ++county;
      if (counttx >= 100)
        countup = false;
    } else {
      --counttx;
      --county;
      if (counttx <= -100)
        countup = true;
    }
    console.log(counttx, county, counttx / 100, county / 100);
    connection.send(buildString("L", plusOrMinus(counttx), plusOrMinus(county), calculate(counttx, county)))
  }
  
    setInterval(timerr, 1000);
};