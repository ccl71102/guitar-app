import React from "react";

const AuthForm = props => {

    const { 
            username, 
            password, 
            handleChange, 
            handleSubmit, 
            btnText 
        } = props;

    return(
        <form className="auth-form" onSubmit={handleSubmit}>
            <input 
                className="auth-input"
                placeholder="Username" 
                onChange={handleChange}
                name="username"
                value={username}
                required
            />            
            <input 
                type="password"
                className="auth-input"
                placeholder="Password" 
                onChange={handleChange}
                name="password"
                value={password}
                required
            />
            <button className="button">{btnText}</button>
        </form>
    );
}

export default AuthForm;