import React from 'react';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';



function Foodbar() {
  return (
    <Tabs
      defaultActiveKey="profile"
      id="fill-tab-example"
      className="mb-3"
      fill
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