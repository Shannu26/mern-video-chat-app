import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../SocketContext";
import Video from "./Video";
import Controls from "./Controls";
import Chat from "./Chat";

const MeetingRoom = () => {
  const { stream, screenStream, myVideo, peers, getUserMedia, name, messages } =
    useContext(SocketContext);

  const [showChat, setShowChat] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const toggleChat = () => {
    setShowChat((showChat) => !showChat);
  };

  const getGridClasses = (peersCount) => {
    if (peersCount === 0) return "grid-cols-1";
    return "grid-cols-4";
  };

  const classes = getGridClasses(peers.length);

  useEffect(() => {
    if (screenStream) myVideo.current.srcObject = screenStream;
    else myVideo.current.srcObject = stream;
  }, [screenStream]);

  useEffect(() => {
    if (stream) {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }
      const microphone = audioContext.createMediaStreamSource(stream);

      if (audioContext.audioWorklet) {
        audioContext.audioWorklet
          .addModule("/processor.js")
          .then(() => {
            console.log("Hi");
            const workletNode = new AudioWorkletNode(audioContext, "processor");
            microphone.connect(workletNode);
            workletNode.port.onmessage = (event) => {
              const { isSpeaking } = event.data;
              setIsSpeaking(isSpeaking);
            };
          })
          .catch((err) => {
            console.log(err);
          });
      }

      return () => {
        audioContext.close();
      };
    }
  }, [stream]);

  return (
    <div className="overflow-hidden h-screen max-h-screen flex flex-col">
      <Controls toggleChat={toggleChat} />
      <div className="w-full h-[91%] flex">
        <div
          className={`${
            showChat ? "w-3/4" : "w-full"
          } h-full bg-black grid ${classes} grid-rows-1 items-center justify-center p-2`}
        >
          <div className="col-span-3 h-full flex justify-center">
            <div className="relative flex justify-center">
              <video
                className={`w-full bg-black object-cover ${
                  isSpeaking
                    ? "border-[5px] border-blue-500"
                    : "border-4 border-white"
                } rounded-lg shadow-lg`}
                ref={myVideo}
                autoPlay
                playsInline
              />
              <h1 className="absolute left-10 bottom-3 font-bold">{name}</h1>
            </div>
          </div>
          {peers.length && (
            <div className="overflow-auto h-full border-4 border-white flex flex-col justify-center items-center rounded">
              {peers.map((user, index) => {
                return (
                  <Video
                    key={index}
                    peer={user.peer}
                    peerName={user.peerName}
                  />
                );
              })}
            </div>
          )}
        </div>
        {showChat && (
          <div className="w-1/4 h-full">
            <Chat />
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingRoom;
