import React, { useState, useEffect } from "react";
import Itemcard from "../Itemcard";
import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const ShowItems = ({ shopping, setShopping, data, category }) => {

    // console.log(data)
    // console.log(category)
    return (
        <Row className="justify-content-center">
            {
                data
                    .filter(product => product[2] == category)
                    .map(product => (<Col xs={2} className="mx-3 my-3 justify-content-center"><Itemcard data={product} /></Col>))
            }
        </Row>
    )
}

export default ShowItems;