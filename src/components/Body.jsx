import React, { useState } from "react"
import "./Body.css"

var [name,setName] = useState("sasi")

function Body(){
    return(
        <>
        <div className="w-[400px] h-[400px] p-2">
            <h1 className="text-green-600 text-3xl">{name}</h1>
            <button onClick={()=>{
                setName("sasivarman")
            }} className="bg-black p-3">change now</button>
        </div>
        </>
    )
}

export default Body