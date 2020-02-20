import React, { Component } from "react";
import "./App.css";

class MemberList extends Component {
  constructor(props) {
    super(props);
    this.state = { members: [] };
  }

  componentDidMount() {
    chrome.runtime.sendMessage({ greeting: "hello" }, response => {
      console.log(response);
      this.setState({ members: response });
    });
  }

  render() {
    return (
      <div className="MemberList">
        <p className="App-intro">
          See the following LinkedIn members who have opted-in to dating.
        </p>
        {this.state.members.length === 0
          ? "Loading..."
          : this.state.members.map(member => (
              <div className="memberDisplay" key={member.id}>
                <div>
                  <a href={`https://linkedin.com/in/${member.id}`}>
                    {member.name}
                  </a>
                </div>
                <div>{member.tagline}</div>
                <div>{member.relationship_status}</div>
              </div>
            ))}
      </div>
    );
  }
}
export default MemberList;
