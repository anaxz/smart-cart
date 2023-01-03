import React, { useState, useEffect } from 'react';

let dummyData = [
    { 'id': 1, 'product_id': 2, },
    {'id': 2, 'product_id': 3, },
    {'id': 3, 'product_id': 1 }
]

// replace dummyData with shoplist - shoplist will be a prop
const ShoppingList = ({  }) => {
    const [productList, setProductList] = useState()
    const [priceList, setPriceList] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        
        // getProductList()
    }, [])

    async function getProduct(productID) {
        try {
            const url = 'http://127.0.0.1:5000'
            const resp = await fetch(`${url}/products/${productID}`)
                .then(response => response.json() )
                .then(data => {
                    console.log('--getProduct data')
                    console.log(data)

                    setProductList(data)
                })
        } catch(err){
            console.log(err)
            return err
        }
    }

    const getProductList = () => {
        console.log('loading')

        dummyData.map(async e => {
            console.log('--dummyData')
            console.log(e)

            const result = await getProduct(e.product_id)
            console.log('--getProductList resp')
            console.log(result)
            // console.log(Object.keys(result) )
            // if(result !== undefined){
            //     console.log('>>inside if statem..')
            //     console.log(result)
            //     setProductList(result)
            // }

            
            // console.log(productList)
        })

        // if(dummyData.length === productList.length){
        //     setIsLoading(false)
        //     console.log('loading done')
        // }
        
        setIsLoading(false)
    }

    const displayData = () => {
        console.log('loaded')

         // return <>
        //     { dummyData.map((e, i) => <div key={i}>
        //         <p>test</p>
        //     <p>product_id: {e.product_id}</p>
        //     {/* <p>name: {getProduct(e.product_id)}</p> */}
        // </div>
        // )} </>
    }

   

    return <div>
        <h3>Shopping List</h3>
        <div className='shop-list-items'>
            <p>item title</p>
            <p>price</p>
        </div>

        { isLoading ? getProductList() : displayData() }
        
    </div>
};

export default ShoppingList;