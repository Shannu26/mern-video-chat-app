import React, { useContext } from "react";
import { SocketContext } from "../SocketContext";

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  return (
    <div>
      {call.isReceivedCall && !callAccepted && (
        <div>
          <h1>{call.name} is Calling</h1>
          <button type="button" onClick={answerCall}>
            Answer Call
          </button>
        </div>
      )}
    </div>
  );
};

export default Notifications;
