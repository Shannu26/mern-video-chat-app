import React, { useContext, useState } from "react";
import { SocketContext } from "../SocketContext";

const Options = ({ children }) => {
  const { myId, callAccepted, name, setName, leaveCall, callUser, callEnded } =
    useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");
  return (
    <div>
      <h2>{myId}</h2>
      <form noValidate>
        <input
          type="text"
          name="Name"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="Id"
          placeholder="Id to Call"
          value={idToCall}
          onChange={(e) => setIdToCall(e.target.value)}
        />
        {callAccepted && !callEnded ? (
          <button type="button" onClick={leaveCall}>
            Hang Up
          </button>
        ) : (
          <button type="button" onClick={() => callUser(idToCall)}>
            Call User
          </button>
        )}
      </form>
      {children}
    </div>
  );
};

export default Options;
