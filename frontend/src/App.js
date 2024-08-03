import VideoPlayer from "./components/VideoPlayer";
import Options from "./components/Options";
import Notifications from "./components/Notifications";
import Home from "./components/Home";

export default function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Video Chat App</h1>
      <Home />
      <VideoPlayer />
      {/* <Options>
        <Notifications />
      </Options> */}
    </div>
  );
}
