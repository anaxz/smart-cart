import React from "react";
import Itemcard from "../Itemcard";

const ShowItems = ({ data, category }) => {
    console.log(data)
    console.log(category)
    return (
        // <div>
        //     <Itemcard />
        // </div>
        <>
            {
                data
                .filter(product => product[2] == category)
                    .map(product => <Itemcard data={product} /> )
            }
        </>
    )
}

export default ShowItems;