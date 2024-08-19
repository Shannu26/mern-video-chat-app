import React, { useEffect, useRef } from "react";

const Video = ({ peer, peerName }) => {
  const ref = useRef();

  useEffect(() => {
    peer.on("stream", (peerStream) => {
      ref.current.srcObject = peerStream;
    });
  }, []);
  return (
    <div className="h-full flex justify-center">
      <div className="relative flex justify-center">
        <video
          ref={ref}
          autoPlay
          playsInline
          className="w-full bg-black object-cover border-4 border-black rounded-lg shadow-lg"
        />
        <h1 className="absolute font-bold left-10 bottom-3">{peerName}</h1>
      </div>
    </div>
  );
};

export default Video;
