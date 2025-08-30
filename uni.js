// server.js
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Parent connected to WebSocket");

  ws.send(JSON.stringify({ type: "INFO", message: "Connected to SafeChild Guard" }));
});

// API endpoint to send alert
app.get("/send-alert", (req, res) => {
  const alertMessage = JSON.stringify({ type: "ALERT" });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(alertMessage);
    }
  });
  res.send({ success: true, message: "Alert sent to parents" });
});

server.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
