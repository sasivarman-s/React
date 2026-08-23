import React from "react";
import ReactDom from "react-dom/client"
import "./main.css"

function Header(){
    return (
        <>
        <div className="max-w-[100%] bg-yellow-100">
            <div className="w-[80%]  mx-auto">
                <h1 className="text-4xl text-blue-600 text-center p-1" >This is SV react.js practice page!</h1>
            </div>
        </div>
        </>
    )
}

export default Header