import React, { useContext } from "react"
import ReactDom from "react-dom"
import "./main.css"
import { Appcontext } from "../context/Appcontext"

function ComponentC(){

    const {values,setValues} = useContext(Appcontext)


    return(
        <>
        <h1 className="text-center text-4xl bg-pink-400 m-2 text-white p-3">componentC {values}</h1>
        <div className="flex flex-row justify-center items-center">
            <button className="px-3 py-2 text-white bg-green-500 text-2xl rounded-full" onClick={()=>{
                setValues("context succesfully updated")
            }} >change</button>
        </div>
        </>
    )
}

export default ComponentC