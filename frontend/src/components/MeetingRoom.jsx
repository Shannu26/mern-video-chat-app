import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../SocketContext";
import Video from "./Video";
import Controls from "./Controls";
import Chat from "./Chat";

const MeetingRoom = () => {
  const { stream, myVideo, peers, getUserMedia, name, messages } =
    useContext(SocketContext);

  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => {
    setShowChat((showChat) => !showChat);
  };

  const getGridClasses = (peersCount) => {
    if (peersCount === 0) return "grid-cols-1 grid-rows-1";
    if (peersCount === 1) return "grid-cols-2 grid-rows-1";
    if (peersCount <= 5) return "grid-cols-2 grid-rows-2";
    // if (peersCount <= 6) return "grid-cols-3 grid-rows-2";
    return "grid-cols-4 grid-rows-3";
  };

  const classes = getGridClasses(peers.length);

  useEffect(() => {
    myVideo.current.srcObject = stream;
  }, []);

  console.log(messages);

  return (
    <div className="overflow-hidden h-screen flex flex-col">
      <Controls className="flex-none" toggleChat={toggleChat} />
      <div className="w-full h-full flex">
        <div
          className={`${
            showChat ? "w-3/4" : "w-full"
          } h-full bg-black grid ${classes} items-center justify-items-center p-2`}
        >
          <div className="h-full flex justify-center">
            <div className="relative flex justify-center">
              <video
                className="w-full bg-black object-cover border-4 border-black rounded-lg shadow-lg"
                ref={myVideo}
                autoPlay
                playsInline
                muted
              />
              <h1 className="absolute left-10 bottom-3 font-bold">{name}</h1>
            </div>
          </div>
          {peers.map((user, index) => {
            console.log(user);
            console.log(messages);
            return (
              <Video key={index} peer={user.peer} peerName={user.peerName} />
            );
          })}
        </div>
        {showChat && (
          <div className="w-1/4">
            <Chat />
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingRoom;
