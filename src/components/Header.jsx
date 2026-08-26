import React, { useState } from "react"
import ReactDom from "react-dom/client"
import "./main.css"
import { useEffect } from "react"
import Card from "./Card"


function Header() {
    var [productarray, setProductarray] = useState([])
    const CardData = async () => {
        var fetching = await fetch("https://dummyjson.com/products")
        var fectched = await fetching.json()
        setProductarray([fectched.products])
        console.log(fectched.products);

    }

    useEffect(() => {
        CardData()
    }, [])

    return (
        <>
            {
                productarray.map((items, i) => {
                    return <Card title={items.title} price={items.price} image={items.thumbnail} />
                })
            }
        </>
    )
}


export default Header