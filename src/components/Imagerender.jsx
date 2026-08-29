import React from "react"
import ReactDom from "react-dom"
import "./main.css"
import { Html, JS, Tcss } from "../assets/Page_images"
import reactimg from "../assets/images/react.js_image.jpeg"
import viteimg from "../assets/images/vite.js_image.png"

function Imagerender(){
    return(
        <>
        <h1 className="p-10 text-6xl text-center text-blue-900 bg-teal-500 m-5">React Image optimazation- CDN and Local storage</h1>
        <h1 className="text-center text-4xl text-blue-800 bg-slate-400 p-5 m-1">Images rendered through CDN aproach</h1>
        <div className="p-1 m-2 rounded-lg flex flex-row items-center justify-center gap-10 ">
            <img className="w-[200px]" src={Html} alt="html"></img>
            <img className="w-[200px]" src={Tcss} alt="tcss"></img>
            <img className="w-[200px]" src={JS} alt="js"></img>
        </div>
        <hr></hr>
        <h1 className="text-center text-4xl text-blue-800 bg-slate-400 p-5 m-5">Image rendered here through Local storage</h1>
        <div className="p-1 m-2 rounded-lg flex flex-row items-center justify-center gap-10 ">
            <img className="w-[200px]" src={reactimg} alt="react_image"></img>
            <img className="w-[200px]" src={viteimg} alt="vite_img"></img>
        </div>
        </>
    )
}

export default Imagerender