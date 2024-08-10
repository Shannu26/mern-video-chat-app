import React, { useEffect, useRef } from "react";

const Video = ({ peer, peerName }) => {
  const ref = useRef();

  useEffect(() => {
    peer.on("stream", (peerStream) => {
      ref.current.srcObject = peerStream;
    });
  }, []);
  return (
    <div className="relative">
      <video
        ref={ref}
        autoPlay
        playsInline
        className="w-full aspect-video bg-black object-cover border-4 border-black rounded-lg shadow-lg"
      />
      <h1 className="absolute font-bold left-3 bottom-3">{peerName}</h1>
    </div>
  );
};

export default Video;
