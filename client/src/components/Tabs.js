import React, { Component } from "react";
import { withUser } from "../context/UserProvider.js";
import TabList from "./tabComponents/TabList.js";

class Tabs extends Component {

    constructor(){
        super();
        this.state = {
            title: "",
            artist: "",
            tabUrl: "",
            _tabId: "",
            status: "",
            tabMenu: "Search"
        };
    }

    logout = () => {
        this.props.logout();
    }

    render(){
        return(
        <div>
            <button onClick={this.logout}>Logout</button>
        </div>);
    }
}

export default withUser(Tabs);