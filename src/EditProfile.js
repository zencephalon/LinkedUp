import React, { Component } from "react";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      tagline: "",
      relationship_status: "",
      profileExists: null
    };
  }

  componentDidMount() {
    const parts = document
      .querySelector(".feed-identity-module__actor-meta")
      .querySelector("a")
      .getAttribute("href")
      .split("/");
    const userId = parts.pop() || parts.pop();
    const name = document.querySelector(
      '[data-control-name="identity_welcome_message"]'
    ).innerText;

    chrome.runtime.sendMessage(
      { requestId: "GetProfile", params: { id: userId } },
      response => {
        console.log("RESPONSE: " + response);
        if (response) {
          this.setState({
            loading: false,
            tagline: response.tagline,
            relationship_status: response.relationship_status,
            profileExists: true,
            userId,
            name
          });
        } else {
          this.setState({
            loading: false,
            tagline: "",
            relationship_status: "",
            profileExists: false,
            userId,
            name
          });
        }
      }
    );
  }

  handleRelationshipStatusChange = event => {
    this.setState({ relationship_status: event.target.value });
  };
  handleTaglineChange = event => {
    this.setState({ tagline: event.target.value });
  };

  handleSubmit = event => {
    const { name, tagline, relationship_status, userId } = this.state;
    chrome.runtime.sendMessage(
      {
        requestId: "EditStatus",
        params: { id: userId },
        payload: { name, tagline, relationship_status, id: userId }
      },
      response => {
        console.log(response);
      }
    );

    // alert('You info has been updated');
    event.preventDefault();
  };

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Tagline:
              <input
                type="text"
                name="tagline"
                value={this.state.tagline}
                onChange={this.handleTaglineChange}
              />
            </label>

            <label>
              Relationship Status:
              <input
                type="text"
                name="relationship_status"
                value={this.state.relationship_status}
                onChange={this.handleRelationshipStatusChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  }
}
