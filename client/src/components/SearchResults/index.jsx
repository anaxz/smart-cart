import React from "react";

const datalist = [1, 'Bread', 'Bakery']
const SearchResults = ({  }) => {
    return <>
        <h3>Search Results</h3>
        {datalist.map((e, i) => <div key={i}>
            <p>{e}</p>
        </div>
        )}
    </>
}

export default SearchResults