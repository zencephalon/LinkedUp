import React, { Component } from "react"


export default class EditProfile extends Component { 
    
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            tagline: '',
            relationship_status: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const parts = document.querySelector(".feed-identity-module__actor-meta")
        .querySelector("a")
        .getAttribute("href").split("/");
        const userId = parts.pop() || parts.pop();

        chrome.runtime.sendMessage({ requestId: "GetProfile", params: { id: "1" } }, response => {
            console.log("RESPONSE: " +  response);
            if (response) {
                this.setState({ loading: false, tagline: response.tagline, relationship_status: response.relationship_status });
            } else {
                this.setState({ loading: false, tagline: '', relationship_status: '' });
            }           
        });

    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        // chrome.runtime.sendMessage({ requestId: "EditStatus", params: { id: "1" }, payload: { name: "NewName" } }, response => {
        //     console.log(response);
        //   });

        // alert('You info has been updated');
        event.preventDefault();
    }

    render() {

        if (this.state.loading) {
            return (<div>Loading...</div>);
        } else {
            return (<div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Tagline:
                        <input type="text" name="tagline" value={this.state.tagline} onChange={this.handleChange} />
                    </label>
    
                    <label>
                        Relationship Status:
                        <input type="text" name="relationship_status" value={this.state.relationship_status} onChange={this.handleChange} />
                    </label>      
                    <input type="submit" value="Submit" />                  
                </form>
            </div>);
        }        
    }
}