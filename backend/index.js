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
  socket.on("join-room", ({ roomId, userName }) => {
    socket.join(roomId);
    console.log(`${socket.id} has joined`);

    socket.to(roomId).emit("user-connected", socket.id);

    socket.on("sending-signal", ({ userToSignal, signal }) => {
      console.log(`${socket.id} -> ${userToSignal}`);
      socket
        .to(userToSignal)
        .emit("initiator-sending-signal", { from: socket.id, signal });
    });

    socket.on("returning-signal", ({ userToSignal, signal }) => {
      console.log(`${socket.id} -> ${userToSignal}`);
      socket
        .to(userToSignal)
        .emit("receiver-sending-signal", { from: socket.id, signal });
    });

    socket.on("disconnect", () => {
      console.log(`${socket.id} has left`);
      socket.to(roomId).emit("user-disconnected", socket.id);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
