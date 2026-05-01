// index.js
// JAAN BOT FINAL CLEAN VERSION

require("dotenv").config();

const fs = require("fs");
const { login } = require("ws3-fca");

// =======================
// APPSTATE CHECK
// =======================
if (!fs.existsSync("appstate.json")) {
console.log("❌ appstate.json file not found");
process.exit(0);
}

// =======================
// LOGIN
// =======================
login(
{
appState: JSON.parse(
fs.readFileSync(
"appstate.json",
"utf8"
))
},

(err, api) => {

if (err) {
console.log("❌ LOGIN ERROR:");
return console.log(err);
}

// =======================
// BOT OPTIONS
// =======================
api.setOptions({
listenEvents: true,
selfListen: false,
forceLogin: true,
updatePresence: false,
autoMarkDelivery: false,
autoMarkRead: false
});

console.log("🔥 JAAN BOT ONLINE");

// =======================
// MAIN LISTENER
// =======================
api.listenMqtt(
async (err, event) => {

if (err) {
console.log(
"LISTEN ERROR:",
err
);
return;
}

if (!event) return;

try {

// route all events
await require("./events/main")(
api,
event
);

} catch (e) {

console.log(
"MAIN ERROR:",
e.message
);

}

}
);

}
);
