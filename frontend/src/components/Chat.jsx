import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { SocketContext } from "../SocketContext";

const Chat = () => {
  const [message, setMessage] = useState("");
  const { sendMessage, name, messages } = useContext(SocketContext);

  const handleClick = () => {
    sendMessage(message, name);
    setMessage("");
  };
  console.log(messages);
  return (
    <div className="relative w-full h-full bg-white">
      <div className="h-[90%] mx-1 my-[1%] bg-gray-100">
        {messages.map((msg) => {
          return <h1>{msg.message}</h1>;
        })}
      </div>
      <div className="w-[98%] h-[8%] mx-[1%] flex justify-center items-center bottom-0">
        <textarea
          type="text"
          className="placeholder-black-50 shadow appearance-none border w-4/5 h-12 p-4 leading-tight focus:outline-none focus:border-blue-500 font-bold text-sm"
          placeholder="Send Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className={`w-1/5 h-12 text-white focus:outline-none bg-blue-500 hover:bg-blue-600`}
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faPaperPlane} className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
