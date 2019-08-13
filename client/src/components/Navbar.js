import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faGuitar, faListAlt} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    
    return (
        <div id="navbar">
            <NavLink to="/tools" activeClassName="active"><FontAwesomeIcon icon={faGuitar}/> Tools</NavLink>
            <NavLink to="/tabs" activeClassName="active"><FontAwesomeIcon icon={faMusic}/> Tabs</NavLink>
            <NavLink to="/credits" activeClassName="active"><FontAwesomeIcon icon={faListAlt}/> Credits</NavLink>
        </div>
    );
}

export default Navbar;