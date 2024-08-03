import React, { useContext, useState } from "react";
import { SocketContext } from "../SocketContext";

const Home = () => {
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const { joinRoom } = useContext(SocketContext);
  return (
    <div className="max-w-md mx-auto mt-10 font-serif">
      <form className="bg-white p-6 border rounded shadow-md">
        <input
          type="text"
          className="shadow appearance-none border rounded w-full p-4 my-4 leading-tight focus:outline-none focus:border-blue-500 font-bold text-l"
          placeholder="Meeting ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          required
        />
        <input
          type="text"
          className="shadow appearance-none border rounded w-full p-4 my-4 leading-tight focus:outline-none focus:border-blue-500 font-bold text-l"
          placeholder="Your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <div className="flex justify-center">
          <button
            type="button"
            className="bg-blue-500 text-white w-40 hover:bg-blue-700 p-3 border rounded hover:cursor-pointer"
            onClick={() => joinRoom(roomId, userName)}
          >
            Join Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
