const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");
const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./scratch");

const app = express();
app.use(express.json());
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
app.use(cors());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

let hostConnection;

const generateOTP = () => {
	const otp = Math.floor(100000 + Math.random() * 900000);
	return String(otp).padStart(6, "0");
};

wss.on("connection", ws => {
	hostConnection = ws;
	console.log("Client connected");

	ws.on("message", message => {
		console.log(`Received: ${message}`);
	});

	ws.on("close", () => {
		hostConnection = null;
		console.log("Client disconnected");
	});
});

app.post("/otp", (req, res) => {
	try {
		const { mobile } = req.body;
		const otp = generateOTP();
		const data = {
			mobile,
			otp,
		};
		console.log(data);
		if (!hostConnection) {
			res.status(500).send("Host not connected");
			return;
		}
		hostConnection.send(JSON.stringify(data));
		const itemWithExpiry = {
			value: otp,
			expiry: Date.now() + 60000,
		};
		localStorage.setItem(mobile, JSON.stringify(itemWithExpiry));
		res.status(200).json(data);
	} catch (err) {
		console.log(err);
		res.status(500).send("Internal Server Error");
	}
});

app.post("/verify", (req, res) => {
	try {
		const { mobile, otp } = req.body;
		const storedOtp = localStorage.getItem(mobile);
		if (!storedOtp) {
			res.status(400).send("OTP not present");
			return;
		}
		const parsedOtp = JSON.parse(storedOtp);
		if (parsedOtp.expiry < Date.now()) {
			localStorage.removeItem(mobile);
			res.status(400).send("OTP expired");
			return;
		}
		if (parsedOtp.value === otp) {
			localStorage.removeItem(mobile);
			res.status(200).send("OTP verified");
		} else {
			res.status(400).send("OTP not verified");
		}
	} catch (err) {
		console.log(err);
		res.status(500).send("Internal Server Error");
	}
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
