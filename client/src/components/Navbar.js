import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faGuitar, faListAlt} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    return (
        <div>
            <Link to="/tools"><FontAwesomeIcon icon={faGuitar}/> Tools</Link>
            <Link to="/tabs"><FontAwesomeIcon icon={faMusic}/> Tabs</Link>
            <Link to="/credits"><FontAwesomeIcon icon={faListAlt}/> Credits</Link>
        </div>
    )
}

export default Navbar;