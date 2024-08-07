import React, { useContext } from "react";
import { SocketContext } from "../SocketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeMute,
  faVolumeUp,
  faVideo,
  faVideoSlash,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const Controls = () => {
  const { joinRoom, leaveRoom, toggleAudio, toggleVideo, videoOn, audioOn } =
    useContext(SocketContext);
  return (
    <div className="fixed bottom-0 bg-black opacity-90 w-full">
      <div className="flex justify-center space-x-20 my-2 mb-4 z-20">
        <button
          className="text-white"
          onClick={() => joinRoom("room-1", "Shannu")}
        >
          Join Room
        </button>
        <button
          onClick={toggleVideo}
          className={`w-20 h-10 text-white rounded-full focus:outline-none ${
            videoOn
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-red-500 hover:bg-red-600"
          } `}
        >
          <FontAwesomeIcon
            icon={videoOn ? faVideo : faVideoSlash}
            className="w-6 h-6"
          />
        </button>
        <button
          onClick={toggleAudio}
          className={` w-20 h-10  text-white rounded-full focus:outline-none ${
            audioOn
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-red-500 hover:bg-red-600"
          } `}
        >
          <FontAwesomeIcon
            icon={audioOn ? faVolumeUp : faVolumeMute}
            className="w-6 h-6"
          />
        </button>
        <button
          onClick={() => leaveRoom()}
          className={` w-20 h-10  text-white rounded-full focus:outline-none bg-red-500 hover:bg-red-600`}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Controls;
