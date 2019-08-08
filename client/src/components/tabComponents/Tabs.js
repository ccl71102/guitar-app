import React, { Component } from "react";
import axios from "axios";
import { withUser } from "../../context/UserProvider.js";
import TabList from "./TabList.js";

const tokenAxios = axios.create();

tokenAxios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    return config;
});

class Tabs extends Component {

    constructor(){
        super();
        this.state = {
            tabs: [],
            title: "",
            artist: "",
            tabUrl: "",
            _tabId: "",
            status: "",
            tabMenu: "search"
        };
    }

    componentDidMount(){
    //    tokenAxios.get(`/api/tabs?_id=${this.props.user._id}`)
    //     .then(res => {
    //         this.setState({tabs: res.data});
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
    }

    setWorking = tab => {
        tab.status = "working"
        console.log(tab)
        tokenAxios.put(`/api/tabs/${tab._id}`,tab)
        .then(res => {
            this.setState(prevState => ({
                tabs: prevState.tabs.map(item => item._id === tab._id ? res.data : item)
            }))
        })
        .catch(err => {
            console.log(err);
        });
    }

    setDone = tab => {
        tab.status = "done"
        console.log(tab)
        tokenAxios.put(`/api/tabs/${tab._id}`,tab)
        .then(res => {
            this.setState(prevState => ({
                tabs: prevState.tabs.map(item => item._id === tab._id ? res.data : item)
            }))
        })
        .catch(err => {
            console.log(err);
        });
    }

    deleteTab = _id => {
        tokenAxios.delete(`/api/tabs/${_id}`)
        .then(res => {
            this.setState({
                    tabs: this.state.tabs.filter(tab => tab._id !== _id)
                }
            )
        })
        .catch(err => {
            console.log(err);
        });
    }

    getTabs = status => {
        tokenAxios.get(`/api/tabs?_id=${this.props.user._id}`)
        .then(res => {
            this.setState({
                tabs: res.data.filter(tab => tab.status === status)
            })
        })
        .catch(err => {
            console.log(err);
        });
    }

    handleChange = e => {
        const { name, value } = e.target;

        if(name === "tabMenu") {
            this.setState({
                [name]: value
            }, () => this.getTabs(value));
        } else {
            this.setState({
                [name]: value
            })
        }
    }


    logout = () => {
        this.props.logout();
    }

    render(){
        return(
        <div>
            <div>
                <p>Welcome, {JSON.parse(localStorage.getItem("user")).username}</p>
                <button onClick={this.logout}>Logout</button>
            </div>
            <select name="tabMenu" onChange={this.handleChange}>
                <option value="search">Search</option>
                <option value="new">New Tabs</option>
                <option value="working">In Progress Tabs</option>
                <option value="done">Finished Tabs</option>
            </select>
            {
                this.state.tabs.length !== 0 ?
                <TabList 
                    { ...this.state } 
                    { ...this.props }
                    deleteTab={ this.deleteTab }
                    setDone={ this.setDone }
                    setWorking={ this.setWorking }
                    saveTab={ this.saveTab }
                />
                :
                <p>No results</p>
            }
        </div>
        );
    }
}

export default withUser(Tabs);