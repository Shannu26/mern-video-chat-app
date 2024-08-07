import React, { useContext, useEffect } from "react";
import { SocketContext } from "../SocketContext";
import Video from "./Video";
import Controls from "./Controls";

const MeetingRoom = () => {
  const { stream, myVideo, peers, getUserMedia } = useContext(SocketContext);

  useEffect(() => {
    getUserMedia();
  }, []);

  const styles = "";

  return (
    <div className="h-screen relative">
      <div className="overflow-auto h-[calc(100%-4rem)] bg-red-500 grid grid-cols-2 gap-4 items-center justify-center p-2">
        <video
          className="w-full aspect-video bg-black object-cover border-4 border-black rounded-lg shadow-lg"
          ref={myVideo}
          autoPlay
          playsInline
          muted
        />
        {peers.map((user, index) => {
          return (
            <Video key={index} peer={user.peer} peerName={user.peerName} />
          );
        })}
      </div>
      <Controls />
    </div>
  );
};

export default MeetingRoom;
