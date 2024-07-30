import VideoPlayer from "./components/VideoPlayer";
import Options from "./components/Options";
import Notifications from "./components/Notifications";

export default function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Video Chat App</h1>
      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
    </div>
  );
}
