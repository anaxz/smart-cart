import React, { useEffect, useState } from "react"

const Welcome = ({  }) => {
    const [txt, setTxt] = useState()

    useEffect(() => {
        console.log('triggered')
        fetch('/test').then(resp => resp.json())
         .then(data => {
            setTxt(data);
            console.log(txt)
        });
      }, []);

    return <>
        <p>Welcome to homepage</p>
        <p>{txt}</p>
    </>
}

export default Welcome;