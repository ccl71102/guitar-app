import React, { Component } from "react";
import axios from "axios";
import { withUser } from "../../context/UserProvider.js";
import TabList from "./TabList.js";
import TabForm from "./TabForm.js";
import Tab from "./Tab.js";

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

    getTabsFromAPI = (title) =>{
        axios.get(`http://www.songsterr.com/a/ra/songs.json?pattern=${title}`)
        .then(res => {
            this.setState({
                tabs: res.data.map(tab => 
                    <Tab 
                        key={tab.id}
                        title={tab.title} 
                        artist={tab.artist.name}
                        _tabId={tab.id}
                        tabUrl={`http://www.songsterr.com/a/wa/song?id=${tab.id}`} 
                        status={"found"} 
                        saveTab={this.saveTab} 
                        setWorking={this.setWorking} 
                        deleteTab={this.deleteTab} 
                        setDone={this.setDone}
                    />)
            })
        })
        .catch(err => console.log(err));
    }

    saveTab = tab => {

        tab.status = "new";
        tokenAxios.post("/api/tabs/", tab)
        .then(res => {
            this.setState({
                tabs: this.state.tabs.filter(item => Number(tab._tabId) !== Number(item.key))
            });  
        })
        .catch(err => console.log(err));
    }

    setWorking = tab => {
        tab.status = "working";
        tokenAxios.put(`/api/tabs/${tab._id}`,tab)
        .then(res => {
            this.setState(prevState => ({
                tabs: prevState.tabs.map(item => item._id === tab._id ? res.data : item)
            }), this.getTabs("new"));
        })
        .catch(err => {
            console.log(err);
        });
    }

    setDone = tab => {
        tab.status = "done";
        tokenAxios.put(`/api/tabs/${tab._id}`,tab)
        .then(res => {
            this.setState(prevState => ({
                tabs: prevState.tabs.map(item => item._id === tab._id ? res.data : item)
            }), this.getTabs("working"));
        })
        .catch(err => {
            console.log(err);
        });
    }

    deleteTab = (_id, status ) => {
        tokenAxios.delete(`/api/tabs/${_id}`)
        .then(res => {
            this.setState({
                    tabs: this.state.tabs.filter(tab => tab._id !== _id)
                }, this.getTabs(status));
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
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    handleChange = e => {
        const { name, value } = e.target;

        if(name === "tabMenu") {
            if(value !== "search") {
                this.setState({
                    [name]: value
                }, () => this.getTabs(value));
            } else {
                this.setState({
                    [name]: value,
                    tabs: []
                }, () => this.getTabs(value));
            }
        } else {
            this.setState({
                [name]: value
            });
        }
    }

    logout = () => {
        this.props.logout();
    }

    loadSearchResults = () => {

        try{
            return this.state.tabs
        } catch(err){
            return "whoops"
        }
    }

    loadForm = () => {
        if(this.state.tabMenu !== "search") {
            if(this.state.tabs.length !== 0){
                return (
                    <TabList 
                        { ...this.state } 
                        { ...this.props }
                        saveTab={ this.saveTab }
                        deleteTab={ this.deleteTab }
                        setDone={ this.setDone }
                        setWorking={ this.setWorking }
                    />
                );
            } else {
                return <p className="tabs-text">No results</p>
            }
        }
        else {
            return (
            <>
                <TabForm getTabsFromAPI={this.getTabsFromAPI}/>
                {
                    this.loadSearchResults()
                }
            </>
            )
        }
    }

    render(){
        return(
        <div>
            <div className="tabs-logout">
                <p className="tabs-text tabs-title">Welcome, <span className="tabs-username">{JSON.parse(localStorage.getItem("user")).username}</span></p>
                <button className="button" onClick={this.logout}>Logout</button>
            </div>
            <div className="tabs-dropdown-menu">
                <select className="dropdown" name="tabMenu" onChange={this.handleChange}>
                    <option value="search">Search</option>
                    <option value="new">New Tabs</option>
                    <option value="working">Tabs In Progress</option>
                    <option value="done">Finished Tabs</option>
                </select> 
            </div>
            <div className="tabs-list">
                
                {
                    this.loadForm()           
                }
            </div>
        </div>
        );
    }
}

export default withUser(Tabs);