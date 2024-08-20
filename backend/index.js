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

    socket.on("sending-message", ({ message, userName, id }) => {
      console.log(message, userName, id);
      socket
        .to(roomId)
        .emit("message-received", { message: message, userName, id });
    });

    socket.on(
      "sending-signal",
      ({ userToSignal, signal, myName: peerName }) => {
        console.log(`${socket.id} -> ${userToSignal}`);
        socket.to(userToSignal).emit("initiator-sending-signal", {
          from: socket.id,
          signal,
          peerName,
        });
      }
    );

    socket.on(
      "returning-signal",
      ({ userToSignal, signal, myName: peerName }) => {
        console.log(`${socket.id} -> ${userToSignal}`);
        socket.to(userToSignal).emit("receiver-sending-signal", {
          from: socket.id,
          signal,
          peerName,
        });
      }
    );

    socket.on("disconnect", () => {
      console.log(`${socket.id} has left`);
      socket.to(roomId).emit("user-disconnected", socket.id);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
