import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import process from "process";
import { useNavigate } from "react-router-dom";

const SocketContext = createContext();

const ContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const socket = useRef();
  // My Audio-Video Stream
  const [stream, setStream] = useState(null);
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [myId, setMyId] = useState("");
  const [audioOn, setAudioOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);

  const myVideo = useRef();
  const peersRef = useRef([]);
  const [peers, setPeers] = useState([]);

  useEffect(() => {
    socket.current = io("http://localhost:5050");
    socket.current.on("connect", () => {
      setMyId(socket.current.id);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [myVideo]);

  const getUserMedia = () => {
    // Getting user permission for their audio and video streams
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (myVideo.current) myVideo.current.srcObject = stream;
      });
  };

  const setRoomAndName = (roomId, userName) => {
    setRoomId(roomId);
    setName(userName);
    navigate(`/room/${roomId}/media`);
  };

  const toggleAudio = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setAudioOn((audio) => !audio);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setVideoOn((video) => !video);
    }
  };

  const leaveRoom = () => {
    socket.current.disconnect();
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    myVideo.current.srcObject = null;
    window.location.href = "/";
  };

  const joinRoom = (roomId, userName) => {
    setName(userName);
    socket.current.on("user-connected", (userId) => {
      const peer = createPeer(userId, userName);
      peersRef.current.push({
        peerId: userId,
        peer,
        peerName: "",
      });
      setPeers((users) => [...users, { peer, peerId: userId, peerName: "" }]);
    });

    socket.current.on("user-disconnected", (userId) => {
      const peerRef = peersRef.current.find((peer) => peer.peerId === userId);
      if (peerRef) peerRef.peer.destroy();
      const peers = peersRef.current.filter((peer) => peer.peerId !== userId);
      peersRef.current = peers;
      setPeers(
        peers.map((peer) => {
          return { ...peer };
        })
      );
    });

    socket.current.on(
      "initiator-sending-signal",
      ({ from, signal, peerName }) => {
        const peer = addPeer(from, signal, userName);
        peersRef.current.push({
          peerId: from,
          peer,
          peerName,
        });
        setPeers((users) => [...users, { peer, peerId: from, peerName }]);
      }
    );

    socket.current.on(
      "receiver-sending-signal",
      ({ from: peerId, signal, peerName }) => {
        const peerRef = peersRef.current.find((peer) => peer.peerId === peerId);
        peerRef.peer.signal(signal);
        peersRef.current = peersRef.current.map((peerRef) => {
          if (peerRef.peerId !== peerId) return { ...peerRef };
          return { ...peerRef, peerName };
        });

        setPeers((users) => {
          return users.map((user) => {
            if (user.peerId !== peerId) return { ...user };
            return { ...user, peerName };
          });
        });
      }
    );

    socket.current.emit("join-room", { roomId: roomId, userName: userName });
    navigate(`/room/${roomId}`);
  };

  const createPeer = (userToSignal, userName) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.current.emit("sending-signal", {
        userToSignal,
        signal,
        myName: userName,
      });
    });

    return peer;
  };

  const addPeer = (peerId, peerSignal, userName) => {
    const peer = new Peer({
      initiator: false,
      trickle: true,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.current.emit("returning-signal", {
        userToSignal: peerId,
        signal,
        myName: userName,
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
        toggleAudio,
        toggleVideo,
        getUserMedia,
        audioOn,
        videoOn,
        leaveRoom,
        name,
        setRoomAndName,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, ContextProvider };
