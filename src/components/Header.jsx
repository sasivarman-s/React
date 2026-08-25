import React, { useState } from "react"
import ReactDom from "react-dom/client"
import "./main.css"
import { useEffect } from "react"




function Header() {
    var [count, setCount] = useState(0)
    var [name,setName] = useState("sasi")
    useEffect(()=>{
        setCount(count+1)
    },[name])
    return (
        <>
        <div className="p-5 bg-lime-400 m-[50px] rounded-lg w-[200px] space-y-3  ">
            <h1 className="text-3xl text-white">Count</h1>
            <h1 className="bg-black text-white p-2 rounded-full text-center text-2xl">{count}</h1>
            <div className="p-10 border-r-yellow-900">
                <h1 className="text-white p-1 text-2xl">{name}</h1>
                <button className="bg-emerald-300 p-2 rounded-lg text-white" onClick={()=>{
                    setName("sasivarman")
                }}>change.</button>
            </div>
        </div>
        </>
    )
}


export default Header