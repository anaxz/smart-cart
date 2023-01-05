import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { Darknavbar } from "../../layout";
import Itemcard from "../../components/Itemcard";
import '../../components/Itemcard/index.css'


const datalist = [1, 'Bread', 'Bakery']
const SearchResults = ({ }) => {

    const dispatch = useDispatch()
    const items = useSelector(state => state)

    function getItem(type) {
        const arr = Object.values(items)
        let product = arr[2]
        let category = arr[2][2]

        if (type === 'product') return product
        else if (type === 'category') return category
        else return -1
    }

    return <>
        <Darknavbar />
        <h3>Search Results</h3>
        <Itemcard data={getItem('product')} />
    </>
}

export default SearchResults;