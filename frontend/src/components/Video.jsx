import React, { useEffect, useRef } from "react";

const Video = ({ peer, stream }) => {
  const ref = useRef();

  useEffect(() => {
    peer.on("stream", (peerStream) => {
      console.log(`${peerStream}`);
      ref.current.srcObject = peerStream;
    });
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      playsInline
      muted
      width={"100px"}
      height={"100px"}
      style={{ border: "1px solid red" }}
    />
  );
};

export default Video;
