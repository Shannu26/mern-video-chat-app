import React, { useContext, useEffect } from "react";
import { SocketContext } from "../SocketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeMute,
  faVolumeUp,
  faVideo,
  faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";

const Media = () => {
  const {
    stream,
    getUserMedia,
    myVideo,
    toggleAudio,
    toggleVideo,
    audioOn,
    videoOn,
  } = useContext(SocketContext);
  useEffect(() => {
    getUserMedia();
  }, []);
  return (
    <div className="flex items-center h-screen mx-4">
      <div className="flex flex-col items-center justify-center w-2/3 h-4/5 p-2">
        <video
          className="w-full aspect-video bg-black object-cover border-4 border-black rounded-lg shadow-lg"
          ref={myVideo}
          autoPlay
          playsInline
          muted
        />
        <div className="relative bottom-28 flex justify-center items-center space-x-20 mt-4 z-20">
          <button
            onClick={toggleVideo}
            className={`p-4 w-20 h-16  text-white rounded-full focus:outline-none ${
              videoOn
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-red-500 hover:bg-red-600"
            } `}
          >
            <FontAwesomeIcon
              icon={videoOn ? faVideo : faVideoSlash}
              className="w-8 h-8"
            />
          </button>
          <button
            onClick={toggleAudio}
            className={`p-4 w-20 h-16  text-white rounded-full focus:outline-none ${
              audioOn
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-red-500 hover:bg-red-600"
            } `}
          >
            <FontAwesomeIcon
              icon={audioOn ? faVolumeUp : faVolumeMute}
              className="w-8 h-8"
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center w-1/3 max-w-md mx-auto py-6 px-2 h-1/2">
        <h1 className="text-center text-3xl">Ready to join ?</h1>
        <button className="m-6 mx-auto p-4 w-2/3 h-16 text-xl text-white rounded-full focus:outline-none bg-blue-500">
          Join Meeting
        </button>
      </div>
    </div>
  );
};

export default Media;
