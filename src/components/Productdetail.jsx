import React, { useEffect, useState } from "react"
import ReactDom from "react-dom"
import "./main.css"
import { useParams } from "react-router-dom"

function Productdetail(props){
    const data = useParams()
    const [cardarray, setCardarray] = useState([]) 
    const Cardapi = async () =>{
        var cardfecth = await fetch(`https://dummyjson.com/products/${product_id}`)
        var cardfetching = await cardfecth.json()
        setCardarray(cardfetching)
    }
    useEffect(()=>{
        Cardapi()
    },[])

    return(
        <>
        <h1 className="text-center text-4xl bg-blue-800 text-white p-3 hover:bg-blue-900 ">Product detail {data.product_id}</h1>
        </>
    )
}
export default Productdetail