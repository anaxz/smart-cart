import React, { useState, useEffect } from "react";
import Itemcard from "../Itemcard";
import CardGroup from 'react-bootstrap/CardGroup';

const ShowItems = ({ shopping, setShopping, data, category }) => {

    console.log(data)
    console.log(category)
    return (
        <CardGroup id="cardgroup">
            {
                data
                    .filter(product => product[2] == category)
                    .map(product => <Itemcard shopping={shopping} setShopping={setShopping} data={product} />)
            }
        </CardGroup>
    )
}

export default ShowItems;