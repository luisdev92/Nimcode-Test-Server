// Required Modules 
// --------------------
const app = require("express")(); 
const fs = require("fs"); 
const https = require('https');

const { SLEEP_TIMER } = require("./config"); 

const path = __dirname; 
const PORT = process.env.PORT || 3000; 



const alarmClock = (callback) => {
	setInterval(callback, SLEEP_TIMER); 
};

const checkStatus = () => {
	try {
		https.get('https://luissantanderdev.com/status', (res) => {
			let state, code, data;  
			// Init 
			// -----------
			code = res.statusCode; 
			state = ""; 
			data = ""; 

			if (code === 200)
				state = "Working Great";
		
			res.on("data", (buffer) => {
				data += buffer; 
			}); 
		
			// The whole response has been received. Print out the result.
			res.on('end', () => {
				const { handshake } = JSON.parse(data);
				const instanceRunningStatus = `${new Date().toLocaleString()} | State: ${state} Response Code: ${code} Handshake: ${handshake}\n`;
				fs.appendFileSync(`${path}/Logs/log1.txt`, instanceRunningStatus);
			});
		
		}).on("error", (err) => {
			  // Error Detection 
			  console.log("Error: " + err.message);
		});

	} catch (error) {
		// Error Detection to do At another time TODO;
		console.log(error); 
	}
};

const nimcodeCheckStatusRobot = () => {
	// Fix code and place try catch here TODO: 
	alarmClock(checkStatus); 
	
};

// GET ROUTES
// -------------
app.get("/", (req, res, next) => {
		res.send("<h5>Nothing to See Here Carry On</h5>");
});

const init = () => {
	app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`)); 
	nimcodeCheckStatusRobot(); 
};

init(); 