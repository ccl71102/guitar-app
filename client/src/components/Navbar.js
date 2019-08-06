import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <Link to="/tools">Tools</Link>
            <Link to="/tabs">Tabs</Link>
            <Link to="/credits">Credits</Link>
        </div>
    )
}

export default Navbar;