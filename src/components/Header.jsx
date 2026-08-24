import React, { useState } from "react"
import ReactDom from "react-dom/client"
import "./main.css"



function Header(){
    var [count,setCount] = useState(0)
    return(
        <>
        <div className="bg-blue-500 rounded-lg w-[400px] mx-auto py-10 my-10">
            <h1 className="text-white text-center text-5xl">{count}</h1>
            <div className="flex flex-row gap-3 m-5 justify-center items-center p-2" >
                <button onClick={()=>{
                    setCount(count+1)
                }} className="bg-green-800 text-white p-3 rounded-lg">+1</button>
                <button onClick={()=>{
                    setCount(count-1)
                }} className="bg-red-800 text-white p-3 rounded-lg">-1</button>
            </div>
        </div>
        </>
    )
}


export default Header