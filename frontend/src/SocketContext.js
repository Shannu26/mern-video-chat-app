import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import process from "process";

const SocketContext = createContext();

const ContextProvider = ({ children }) => {
  // My Audio-Video Stream
  const socket = useRef();
  const [stream, setStream] = useState(null);
  const [myId, setMyId] = useState("");

  const connectionRef = useRef();

  const myVideo = useRef();
  const peersRef = useRef([]);
  const [peers, setPeers] = useState([]);

  useEffect(() => {
    socket.current = io("http://localhost:5050");
    socket.current.on("connect", () => {
      setMyId(socket.current.id);
    });

    // Getting user permission for their audio and video streams
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        console.log(stream);
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    return () => {
      socket.current.disconnect();
    };
  }, [myVideo]);

  const joinRoom = () => {
    socket.current.on("user-connected", (userId) => {
      const peer = createPeer(userId);
      peersRef.current.push({
        peerId: userId,
        peer,
      });
      setPeers((users) => [...users, peer]);
    });

    socket.current.on("user-disconnected", (userId) => {
      const peerRef = peersRef.current.find((peer) => peer.peerId === userId);
      if (peerRef) peerRef.peer.destroy();
      const peers = peersRef.current.filter((peer) => peer.peerId !== userId);
      peersRef.current = peers;
      setPeers(peers.map((peer) => peer.peer));
    });

    socket.current.on("initiator-sending-signal", ({ from, signal }) => {
      const peer = addPeer(from, signal);
      peersRef.current.push({
        peerId: from,
        peer,
      });
      setPeers((users) => [...users, peer]);
    });

    socket.current.on("receiver-sending-signal", ({ from: peerId, signal }) => {
      const peerRef = peersRef.current.find((peer) => peer.peerId === peerId);
      console.log(peerRef);
      peerRef.peer.signal(signal);
    });

    socket.current.emit("join-room", "room-1");
  };

  const createPeer = (userToSignal) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.current.emit("sending-signal", {
        userToSignal,
        signal,
      });
    });

    return peer;
  };

  const addPeer = (peerId, peerSignal) => {
    const peer = new Peer({
      initiator: false,
      trickle: true,
      stream,
    });

    peer.on("signal", (signal) => {
      console.log(stream);
      socket.current.emit("returning-signal", {
        userToSignal: peerId,
        signal,
      });
    });

    peer.signal(peerSignal);

    return peer;
  };

  return (
    <SocketContext.Provider
      value={{
        myId,
        myVideo,
        peers,
        stream,
        joinRoom,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, ContextProvider };
