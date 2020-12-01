import React from "react";
import VideoCanvas from "./VideoCanvas";

const vloggerInfo = [
  { id: 257215079, source: "bilibili" },
  { id: 99157282, source: "bilibili" },
  { id: 176037767, source: "bilibili" },
  { id: 398581197, source: "bilibili" },
  { id: "UCISrVZmDM4x-Rq9mmNUw7Zw", source: "youtube" },
  { id: 290526283, source: "bilibili" },
  { id: 25807917, source: "bilibili" },
  { id: "UCEDkO7wshcDZ7UZo17rPkzQ", source: "youtube" },
];

const App = () => {
  return <VideoCanvas vloggerInfos={vloggerInfo} />;
};

export default App;
