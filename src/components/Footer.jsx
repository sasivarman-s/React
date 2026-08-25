import React from "react"
import ReactDom from "react-dom"
import "./main.css"

function Footer(){
    return(
        <>
        <div className="max-w-[100%] bg-amber-200">
            <div className="w-[80%] mx-auto flex flex-col items-center justify-center">
                <h1 className="text-blue-500 text-4xl text-center">To more follow this link!</h1>
                <a href="https://sasivarman-portfolio.vercel.app/" className="text-white text-center bg-fuchsia-600  rounded-lg p-1">click to go to developer portfolio</a>
            </div>
        </div>
        </>
    )
}
export default Footer