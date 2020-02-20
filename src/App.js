import React, { Component } from "react";
import "./App.css";

class App extends Component {
  clickMe = () => {
    chrome.runtime.sendMessage({ greeting: "hello" }, function(response) {
      console.log(response);
    });
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to LinkedUp</h2>
        </div>
        <p className="App-intro">
          See the following LinkedIn members who have opted-in to dating.
        </p>
        <button onClick={this.clickMe}>Click me</button>
      </div>
    );
  }
}

export default App;
