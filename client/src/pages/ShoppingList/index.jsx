import React, { useState } from 'react';

//product_id
let dummyData = [
    { 'id': 1, 'product_id': 2, 'price': 2.5 },
    {'id': 2, 'product_id': 2, 'price': 3 },
    {'id': 3, 'product_id': 2, 'price': 5 }
]

const ShoppingList = ({  }) => {
    const [shopList, setShopList] = useState()

    async function getShoplist() {
        try {
            const url = 'http://127.0.0.1:5000'
            const result = await fetch(`${url}/shopping-list`)
                .then(response => response.json())
                // .then(data => setShopList(data))
            setShopList(result)
        } catch(err){
            console.log(err)
            return err
        }
    }

    const populateList = () => {
        
    }

    return <div>
        {/* {getShoplist()}
        {console.log(shopList)} */}
        <h3>Shopping List</h3>
        <div className='shop-list-items'>
            <p>item title</p>
            <p>price</p>
        </div>
        {dummyData.map((e, i) => <div key={i}>
            <p>{e.product_id}</p>
            <p>Price: {e.price}</p>
        </div>
        )}

        
    </div>
};

export default ShoppingList;

/**
 * displayes shoppinglist even users that arent logged in
 */