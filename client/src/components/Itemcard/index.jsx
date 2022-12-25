import React from "react";

const Itemcard = () => {
    return (
        <div className="cardcont">
            <img src="" alt="" />
            <h4 className="itemname"></h4>
            <p className="price"></p>
            <div className="quantity">
                <label htmlFor="quantbutton"></label>
                <button id="quantbutton"></button>
            </div>
            <button className="addtocart"></button>
        </div>
    )
}

export default Itemcard;