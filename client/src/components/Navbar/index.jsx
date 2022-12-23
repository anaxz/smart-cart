import React from "react";
import './index.css'

const Navbar = () => {
    return (
        <div className="navcont">
            <div className="navbrand">
                <h3>Smart-Cart</h3>
            </div>
            <div className="navlinks">
                <ul>
                    <li><a>Home</a></li>
                    <li><a>About</a></li>
                    <label htmlFor="navsearch"><i className="bi bi-search"></i></label>
                    <input type="text" id="navsearch"/>
                    <li><a><i className="bi bi-cart2"></i></a></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;