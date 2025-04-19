let wss = null;
const clients = new Map();

function setWSS(server) {
  wss = server;
}

function handleSocketConnection(ws) {
    ws.on("message", (msg) => {
      try {
        const message = typeof msg === "string" ? msg : msg.toString();
        const data = JSON.parse(message);
  
        if (data.type === "subscribe" && data.pollId) {
          clients.set(ws, data.pollId);
          //console.log("Subscribed to poll:", data.pollId);
        }
      } catch (err) {
        console.error("Invalid message", err);
      }
    });
  
    ws.on("close", () => {
      clients.delete(ws);
      //console.log("Client disconnected");
    });
  }
  

  function broadcastUpdate(pollId, options) {
    for (const [ws, id] of clients.entries()) {
      if (id === pollId && ws.readyState === 1) {
        //console.log("Broadcasting to client:", pollId);
        ws.send(JSON.stringify({ type: "update", pollId, options }));
      }
    }
  }  

module.exports = {
  setWSS,
  handleSocketConnection,
  broadcastUpdate,
};