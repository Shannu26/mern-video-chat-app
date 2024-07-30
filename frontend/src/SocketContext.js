import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

const ContextProvider = ({ children }) => {
  // My Audio-Video Stream
  const socket = useRef();
  const [stream, setStream] = useState(null);
  const [name, setName] = useState("");
  // My Socket Id
  const [myId, setMyId] = useState("");
  // State for calling functionality
  const [call, setCall] = useState({});
  // State to track if user accepted the call
  const [callAccepted, setCallAccepted] = useState(false);
  // State to track if the call has ended
  const [callEnded, setCallEnded] = useState(false);

  // My Video tag Reference
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:5050");
  }, []);

  useEffect(() => {
    // Getting user permission for their audio and video streams
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current) myVideo.current.srcObject = currentStream;
      });
    // Once we make socket connection with server, server sends ID through
    // this event
    socket.current.on("me", (id) => {
      setMyId(id);
    });
    // Server sends this event when another user is calling us
    socket.current.on("call-user", (data) => {
      // signal is their video and audio stream
      const { from, name: callerName, signal } = data;
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });
  }, [myVideo]);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.current.emit("answer-call", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      if (userVideo.current) userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.current.emit("call-user", {
        userToCall: id,
        signalData: data,
        from: myId,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      if (userVideo.current) userVideo.current.srcObject = currentStream;
    });

    socket.current.on("call-accepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    // connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        myId,
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        leaveCall,
        answerCall,
        callUser,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, ContextProvider };
