import React from "react";
import './index.css'

const Navbar = () => {
    return (
        <div className="navbar-cont">
            <div className="navbrand">
                <h3>Smart-Cart</h3>
            </div>
            <div className="navlinks">
                <ol>
                    <li><a>Home</a></li>
                    <li><a>About</a></li>
                    <li><a><i class="bi bi-search"></i></a></li>
                    <li><a><i class="bi bi-cart2"></i></a></li>
                </ol>
            </div>
        </div>
    )
}

export default Navbar;