import React, { useContext } from "react";
import { SocketContext } from "../SocketContext";
import Video from "./Video";

const VideoPlayer = () => {
  const { stream, myVideo, peers, joinRoom, toggleAudio, toggleVideo } =
    useContext(SocketContext);
  return (
    <div>
      <video ref={myVideo} autoPlay playsInline muted />
      {peers.map((peer, index) => {
        return <Video key={index} peer={peer} />;
      })}
      <button onClick={() => joinRoom("room-1", "Shannu")}>Join Room</button>
      <button onClick={toggleVideo}>Toggle Video</button>
      <button onClick={toggleAudio}>Toggle Audio</button>
    </div>
  );
};

export default VideoPlayer;
