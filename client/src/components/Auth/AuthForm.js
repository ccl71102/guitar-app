import React from "react";

const AuthForm = props => {

    const {username, password, handleChange, handleSubmit, btnText} = props;

    return(
        <form onSubmit={handleSubmit}>
            <input 
                placeholder="Username" 
                onChange={handleChange}
                name="username"
                value={username}
            />            
            <input 
                placeholder="Password" 
                onChange={handleChange}
                name="password"
                value={password}
            />
            <button>{btnText}</button>
        </form>
    )

}

export default AuthForm;