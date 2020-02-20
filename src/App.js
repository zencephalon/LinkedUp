import React, { useState } from "react";
import "./App.css";
import MemberList from "./MemberList";
import EditProfile from "./EditProfile";

const App = () => {
  return (
    <div className="feed-shared-update-v2 feed-shared-update-v2--minimal-padding feed-shared-update--chat-ui relative full-height Elevation-2dp">
      <div className="App-header">
        <h2>Welcome to LinkedUp</h2>
      </div>
      <EditProfile />
      <MemberList />
    </div>
  );
};

export default App;
