import React, { Component } from "react"


export default class EditProfile extends Component { 
    
    componentDidMount() {
        chrome.runtime.sendMessage({ requestId: "EditStatus", params: { id: "1" }, payload: { name: "NewName" } }, response => {
          console.log(response);
        });
      }


    render() {
        const parts = document.querySelector(".feed-identity-module__actor-meta")
        .querySelector("a")
        .getAttribute("href").split("/");

        var userId = parts.pop() || parts.pop();


        return (<div>userId</div>);
    }
}