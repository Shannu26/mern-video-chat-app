import React, { useContext } from "react";
import { SocketContext } from "../SocketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeMute,
  faVolumeUp,
  faVideo,
  faVideoSlash,
  faSignOutAlt,
  faCommentAlt,
  faDesktop,
  faStopCircle,
} from "@fortawesome/free-solid-svg-icons";

const Controls = ({ toggleChat }) => {
  const {
    name,
    leaveRoom,
    toggleAudio,
    toggleVideo,
    videoOn,
    audioOn,
    screenShareOn,
    toggleScreenShare,
  } = useContext(SocketContext);
  return (
    <div className="bg-black opacity-90 w-full py-2">
      <div className="flex justify-center space-x-20 z-20">
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
          className={`w-20 h-10  text-white rounded-full focus:outline-none ${
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
          className={` w-20 h-10  text-white rounded-full focus:outline-none bg-blue-500 hover:bg-blue-600`}
          onClick={() => toggleChat()}
        >
          <FontAwesomeIcon icon={faCommentAlt} className="w-5 h-5" />
        </button>
        <button
          onClick={() => toggleScreenShare()}
          className={` w-20 h-10  text-white rounded-full focus:outline-none ${
            screenShareOn
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          <FontAwesomeIcon
            icon={screenShareOn ? faStopCircle : faDesktop}
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
