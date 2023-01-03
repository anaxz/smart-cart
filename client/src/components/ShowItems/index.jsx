import React from "react";
import Itemcard from "../Itemcard";

const ShowItems = ({ product_data, category }) => {
    return (
        // <div>
        //     <Itemcard />
        // </div>
        <>
            {
                product_data
                .filter(product => product.category == category)
                    .map(product => <Itemcard data={product } />)
            }
        </>
    )
}

export default ShowItems;