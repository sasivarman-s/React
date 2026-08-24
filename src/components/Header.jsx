import React, { useState } from "react"
import ReactDom from "react-dom/client"
import "./main.css"



function Header(){
    var [valid,setValid] = useState(true)
    return(
        <>
        <div className="bg-slate-300 p-10 mx-auto my-auto max-w-[70%]:" >
            <h1 className="text-center text-5xl">{valid ? "true" : "flase"}</h1>
            <button onClick={()=>{
                setValid(!valid)
            }} className={` ${valid ?"bg-green-600" : "bg-red-500" } text-center text-2xl  text-white p-2 rounded-lg`}>change</button>
        </div>
        </>
    )
}


export default Header