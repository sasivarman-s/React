import React from "react"
import ReactDom from "react-dom/client"
import Header from "./components/Header"


const reactroot = ReactDom.createRoot(document.getElementById("root"))
reactroot.render(<><Header/></>)


