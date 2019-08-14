import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faGuitar, faListAlt} from "@fortawesome/free-solid-svg-icons";

const Navbar = props => {
    
    return (
        <div id="navbar">
            <NavLink to="/tools" className="navlink" activeClassName={props.location.pathname === "/tools" ? "active" : ""}><FontAwesomeIcon icon={faGuitar}/> Tools</NavLink>
            <NavLink to="/tabs" className="navlink" activeClassName={(props.location.pathname === "/tabs" || props.location.pathname === "/auth") ? "active" : ""}><FontAwesomeIcon icon={faMusic}/> Tabs</NavLink>
            <NavLink to="/credits" className="navlink" activeClassName={props.location.pathname === "/credits" ? "active" : ""}><FontAwesomeIcon icon={faListAlt}/> Credits</NavLink>
        </div>
    );
}

export default withRouter(Navbar);