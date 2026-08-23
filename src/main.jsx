import React from "react"
import ReactDom from "react-dom/client"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Body from "./components/Body"

var datamart = [
    {
        title : "HTML",
        des : "hyper text markup language"
    },
    {
        title : "CSS",
        des : "casecading style sheet"
    },
    {
        title : "JS",
        des : "Javascript"
    },
    {
        title : "React.js",
        des : "javascript UI library"
    }
]


const reactroot = ReactDom.createRoot(document.getElementById("root"))
reactroot.render(<><Header/>

{
    datamart.map((item,index)=>{
        return(
            <Body title={item.title} des={item.des} key={item.index}/>
        )
    })
}

<Footer/></>)


