import React from "react"
import ReactDom from "react-dom/client"
import Header from "./components/Header"
import Body from "./components/Body"
import Courselist from "./components/Body"
import Header1 from "./components/Header"


const reactroot = ReactDom.createRoot(document.getElementById("root"))
reactroot.render(<><Header1 intro="welcome to sv" msg="what's plan?"/></>)


