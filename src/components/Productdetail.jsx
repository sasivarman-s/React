import React from "react"
import ReactDom from "react-dom"
import "./main.css"
import { useParams } from "react-router-dom"

function Productdetail(){
    const data = useParams()
    console.log("params data: ",data);
    
    return(
        <>
        <h1 className="text-center text-4xl bg-blue-800 text-white p-3 hover:bg-blue-900 ">Product detail {data.product_id}</h1>
        </>
    )
}
export default Productdetail