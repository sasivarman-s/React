import React from "react";
import ReactDom from "react-dom/client"
import "./main.css"

function Body(props){
    return(
        <>
        <div className="max-w-[100%] grid grid-cols-2">
            <div className="w-[200px] h-[200px] m-5 bg-green-500 border rounded-lg">
                <h1 className="text-center text-2xl">{props.title}</h1>
                <h2 className="text-center text-2xl">{props.des}</h2>
            </div>
        </div>
        </>
    )
}
export default Body