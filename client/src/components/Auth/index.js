import React, { Component } from "react"
import AuthForm from "./AuthForm.js";
import { withUser } from "../../context/UserProvider.js"

class Auth extends Component {
    constructor(){
        super();
        this.state = {
            username: "",
            password: "",
            isToggled: false
        }
    }

    toggler = () => this.setState(prevState => ({
        isToggled: !prevState.isToggled
    }));

    handleChange = e => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSignup = e => {
        e.preventDefault();
        const userCredentials = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.signup(userCredentials);
    }

    handleLogin = e => {
        e.preventDefault();
        const userCredentials = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.login(userCredentials);

    }

    render(){
        return(
            <div className="auth-form">
                {this.state.isToggled ?
                <>
                    <AuthForm
                        username={this.state.username}
                        password={this.state.password}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSignup}
                        btnText="Sign Up"
                    />
                    <p className="tabs-text">Have an account? Click <span className="tan" onClick={this.toggler}>here</span> to login instead.</p>
                    <p className="tabs-text">{this.props.authErrMsg}</p>
                </>
                :
                <>
                    <AuthForm
                        username={this.state.username}
                        password={this.state.password}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleLogin}
                        btnText="Login"
                    />
                    <p className="tabs-text">New user? Click <span className="tan" onClick={this.toggler}>here</span> to create an account.</p>
                    <p className="tabs-text">{this.props.authErrMsg}</p>
                </>}
            </div>
        )
    }
}

export default withUser(Auth);