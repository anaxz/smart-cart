import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'

const datalist = [1, 'Bread', 'Bakery']
const SearchResults = ({  }) => {

    const [item, setItem] = useState()

    const dispatch = useDispatch()
    const items = useSelector(state => state)

    function getItem(){
        const arr = Object.values(items)
        setItem(arr[2])
        return item
    }

    

    return <>
        <h3>Search Results</h3>
        <p>{console.log(getItem())}</p>
        {datalist.map((e, i) => <div key={i}>
            <p>{e}</p>
        </div>
        )}
    </>
}

export default SearchResults;