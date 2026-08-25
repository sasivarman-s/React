import React from "react"
import ReactDom from "react-dom/client"
import Header from "./components/Header"
import Footer from "./components/Footer"


const reactroot = ReactDom.createRoot(document.getElementById("root"))
reactroot.render(<><Header/><Footer/></>)


