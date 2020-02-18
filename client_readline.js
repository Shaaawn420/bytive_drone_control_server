const ws = require("ws");
const query = require("cli-interact").getYesNo;
const connection = new ws("ws://localhost:65535");

const ask = async () => {await query('send again ?')}

connection.onopen = ee => {
	let run = true;
	
	while (run) {
		connection.send("L,+,-,1025000");
		run = ask();
	}
};
