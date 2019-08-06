import React, {Component} from "react";
import axios from "axios";

const UserContext = React.createContext();

class UserProvider extends Component {
    constructor(){
        super();
        this.state = {
            user: JSON.parse(localStorage.getItem("user")) || {},
            token: JSON.parse(localStorage.getItem("token")) || ""
        }
    }

    signup = credentials => {
        axios.post("/auth/signup", credentials)
        .then(res => {
            console.log(res)
            const {user, token} = res.data;
            localStorage.setItem("user",JSON.stringify(user));
            localStorage.setItem("token", token);
            this.setState({
                user,
                token
            });
        })
        .catch(err => console.log(err));
    }

    login = credentials => {

        axios.post("/auth/login", credentials)
        .then(res => {
            console.log(res)
            const {user, token} = res.data;
            localStorage.setItem("user",JSON.stringify(user));
            localStorage.setItem("token", token);
            this.setState({
                user,
                token
            });
        })
        .catch(err => console.log(err));

    }
    logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        this.setState({
            user: {}, 
            token: ""
        })

    }

    render() {
        return(
            <UserContext.Provider value={{
                ...this.state,
                signup: this.signup,
                login: this.login
            }}>
                {this.props.children}
            </UserContext.Provider>
        )
    }

}

export const withUser = Component => props => (

    <UserContext.Consumer>
        {value => <Component {...value} {...props}/> }
    </UserContext.Consumer>
);

export default UserProvider;