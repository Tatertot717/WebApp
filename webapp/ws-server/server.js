const WebSocket = require("ws");
const { createClient } = require("redis");
const { handleSocketConnection, setWSS, broadcastUpdate } = require("./socket");

// Setup WebSocket server
const wss = new WebSocket.Server({ port: 3001, path: "/ws" });
setWSS(wss);
wss.on("connection", handleSocketConnection);
console.log("WebSocket server running on ws://localhost:3001");

// Setup Redis subscriber
const subscriber = createClient({
    url: process.env.REDIS_URL || "redis://redis:6379"
  });
subscriber.connect().then(() => {
  //console.log("Redis subscriber connected");
  subscriber.subscribe("poll-updates", (message) => {
    try {
      const { pollId, options } = JSON.parse(message);
      //console.log("Redis message received:", pollId);
      broadcastUpdate(pollId, options);
    } catch (err) {
      console.error("Error parsing Redis message", err);
    }
  });
});
