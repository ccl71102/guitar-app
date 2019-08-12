import React, { Component } from "react";

class TabForm extends Component {

    constructor(){
        super();
        this.state = {
            title: ""
        };
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        const { title } = this.state;
        this.props.getTabsFromAPI(title);
        this.setState({
            title: ""
        })
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input className="tab-form-input" onChange={this.handleChange} name="title" value={this.state.title} placeholder="Song Title"/>
                <button className="button">Submit</button>
            </form>
        );
    }
}

export default TabForm