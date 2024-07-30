const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const socket = require("socket.io");

const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

const PORT = process.env.PORT || 5050;

app.get("/", (req, res) => {
  res.send("Server is running");
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("call-ended");
  });

  socket.on("call-user", (data) => {
    const { userToCall, signalData, from, name } = data;
    io.to(userToCall).emit("call-user", { signal: signalData, from, name });
  });

  socket.on("answer-call", (data) => {
    const { to, signal } = data;
    io.to(to).emit("call-accepted", signal);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
