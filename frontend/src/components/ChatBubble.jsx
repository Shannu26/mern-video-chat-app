import React from "react";

const ChatBubble = ({ msg }) => {
  console.log(msg.message);
  return (
    <div className="p-2 bg-blue-500 min-w-[30%] w-fit max-w-[80%] min-h-10 border rounded text-white">
      <h1 className="whitespace-pre-line h-full break-words">{msg.message}</h1>
    </div>
  );
};

export default ChatBubble;
