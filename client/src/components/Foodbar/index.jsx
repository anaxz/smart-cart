import React from 'react';
import { useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Itemcard from '../Itemcard';
import './index.css'


function Foodbar() {

    const [showItems, setShowItems] = useState([]);

    useEffect(() => {
        async function getItemData() {
            const url = 
            const response = url.get()
        }
    })

    function displayItems() {
        return showItems.filter()
    }
    return (
        <Tabs
            defaultActiveKey="profile"
            id="fill-tab-example"
            className="mb-3"
            fill
            variant='pills'
        >
            <Tab eventKey="bakery" title="Bakery">

            </Tab>
            <Tab eventKey="dairy" title="Dairy">

            </Tab>
            <Tab eventKey="meat" title="Meat">

            </Tab>
            <Tab eventKey="fruit_and_veg" title="Fruit & Veg">

            </Tab>
            <Tab eventKey="household" title="Household">

            </Tab>
            <Tab eventKey="toiletries" title="Toiletries">

            </Tab>
            <Tab eventKey="drinks" title="Drinks">

            </Tab>
            <Tab eventKey="other" title="Other">

            </Tab>

        </Tabs>
    );
}

export default Foodbar;