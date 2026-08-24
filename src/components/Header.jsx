import React, { useState } from "react"
import ReactDom from "react-dom/client"
import "./main.css"
import { stringify } from "postcss"



function Header() {
    var [userdata, setUserdata] = useState([])

    var [user, setUser] = useState({
        name : "",
        age : ""
    })
    return (
        <>
            <div className="p-10 bg-lime-200 space-y-5 rounded-lg max-w-[70%] mx-auto">
                <div>
                    <label> Name:</label>
                    <input placeholder="enter your name?" className="p-2 outline-none rounded-md" onChange={(e)=>{
                        
                        setUser((prev)=>{
                            return {...prev, name : e.target.value}
                        })
                    }}></input>
                </div>
                <div>
                    <label> age:</label>
                    <input placeholder="enter your age?" className="p-2 outline-none rounded-md" onChange={(e)=>{
                        setUser((prev)=>{
                            return {...prev,age: e.target.value}
                        })
                    }} ></input>
                </div>
                <div>
                    <button className="bg-purple-600 text-2xl text-white p-2 rounded" onClick={()=>{
                        setUserdata((prev)=>{
                            return [...prev,user]
                        })
                    }} >post!</button>
                </div>
                {
                    userdata.map((item,i)=>{
                        return (
                            <>
                            <div className="p-2 m-1 bg-cyan-300 rounded-lg w-[200px] h-[200px]">
                                <h1 className="text-white text-center text-3xl">{item.name}</h1>
                                <h2 className="text-white text-center text-2xl">{item.age}</h2>
                            </div>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}


export default Header