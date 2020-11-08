import React from "react";
import VideoList from "./VideoList";

const App = () => {
  const testVideos = [
    { title: "test1", date: "2020-01-01" },
    { title: "test2", date: "2020-02-01" },
  ];
  return <VideoList videos={testVideos} />;
};

export default App;
