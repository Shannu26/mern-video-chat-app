import VideoPlayer from "./components/VideoPlayer";
import Home from "./components/Home";
import Media from "./components/Media";
import MeetingRoom from "./components/MeetingRoom";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div>
      {/* <h1 className="text-3xl font-bold underline">Video Chat App</h1> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomId/media" element={<Media />} />
        <Route path="/room/:roomId" element={<MeetingRoom />} />
      </Routes>
      {/* <VideoPlayer /> */}
      {/* <Options>
        <Notifications />
      </Options> */}
    </div>
  );
}
