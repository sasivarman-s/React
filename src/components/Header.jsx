import React, { useState } from "react"
import ReactDom from "react-dom/client"
import "./main.css"



function Header(){
    var [name, setName] = useState("sasi")
    var [age , setAge] = useState(17)
    return (
        <>
        <h1 className="text-center text-4xl text-blue-700">{name}</h1>
        <h1 className="text-center text-4xl text-blue-700">{age}</h1>
        <button onClick={()=>{
            setName("sasivarman")
            setAge(18)
        }} >
            change name
        </button>
        </>
    )
}


export default Header