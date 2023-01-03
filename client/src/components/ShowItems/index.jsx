import React, { useState, useEffect } from "react";
import Itemcard from "../Itemcard";

const ShowItems = ({ shopping, setShopping, data, category }) => {

    console.log(data)
    console.log(category)
    return (
        <>
            {
                data
                .filter(product => product[2] == category)
                    .map(product => <Itemcard shopping={shopping} setShopping={setShopping} data={product} /> )
            }
        </>
    )
}

export default ShowItems;