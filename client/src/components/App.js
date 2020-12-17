import React from "react";
import VideoCanvas from "./VideoCanvas";
import Subscriptions from "./Subscriptions";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Route exact path="/" component={VideoCanvas} />
        <Route exact path="/Subscriptions" component={Subscriptions} />
      </div>
    </BrowserRouter>
  );
};

export default App;
