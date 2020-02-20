import React, { useState } from "react";
import "./App.css";
import MemberList from "./MemberList";
import EditProfile from "./EditProfile";

const App = () => {
  return (
    <div className="App">
      <div className="App-header">
        <h2>Welcome to LinkedUp</h2>
      </div>
      <MemberList />
      <EditProfile />
    </div>
  );
};

export default App;
