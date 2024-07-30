import React, { useContext } from "react";
import { SocketContext } from "../SocketContext";

const VideoPlayer = () => {
  const { stream, callAccepted, callEnded, myVideo, userVideo } =
    useContext(SocketContext);
  return (
    <div>
      {stream && (
        <video ref={myVideo} playsInline muted autoPlay className="border-2" />
      )}
      {callAccepted && !callEnded && (
        <video ref={userVideo} playsInline autoPlay className="border-2" />
      )}
    </div>
  );
};

export default VideoPlayer;
