import React, { useContext } from "react";
import { SocketContext } from "../SocketContext";
import Video from "./Video";

const VideoPlayer = () => {
  const { stream, myVideo, peers, joinRoom } = useContext(SocketContext);
  console.log(peers);
  return (
    <div>
      <video ref={myVideo} muted autoPlay playsInline />
      {peers.map((peer, index) => {
        return <Video key={index} peer={peer} stream={stream.clone()} />;
      })}
      <button onClick={joinRoom}>Join Room</button>
    </div>
  );
};

export default VideoPlayer;
