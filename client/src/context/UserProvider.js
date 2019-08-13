import React, { Component } from "react";
import axios from "axios";

const UserContext = React.createContext();

class UserProvider extends Component {
    constructor(){
        super();
        this.state = {
            user: JSON.parse(localStorage.getItem("user")) || {},
            token: localStorage.getItem("token") || "",
            authErrMsg: ""
        };
    }

    handleAuthError = errMsg => {
        this.setState({
            authErrMsg: errMsg
        });
    }

    signup = credentials => {
        axios.post("/auth/signup", credentials)
        .then(res => {
            const {user, token} = res.data;
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            this.setState({
                user,
                token,
                authErrMsg: ""
            });
        })
        .catch(err => this.handleAuthError(err.response.data.errorMessage));
    }

    login = credentials => {

        axios.post("/auth/login", credentials)
        .then(res => {
            const {user, token} = res.data;
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            this.setState({
                user,
                token,
                authErrMsg: ""
            });
        })
        .catch(err => this.handleAuthError(err.response.data.errorMessage));

    }
    logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        this.setState({
            user: {}, 
            token: "",
            authErrMsg: ""
        });
    }

    render() {
        return(
            <UserContext.Provider value={{
                ...this.state,
                signup: this.signup,
                login: this.login,
                logout: this.logout,
                handleAuthError: this.handleAuthError
            }}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export const withUser = Component => props => (

    <UserContext.Consumer>
        {value => <Component {...value} {...props}/> }
    </UserContext.Consumer>
);

export default UserProvider;