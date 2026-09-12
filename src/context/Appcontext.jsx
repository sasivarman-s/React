import React, { createContext, useState } from "react"
import ReactDom from "react-dom"
import "../components/main.css"

export const Appcontext = createContext()

export const Approvider =({children})=>{

    const [values,setValues] = useState("context is being verified")

    const value = {
        values,
        setValues
    }

    return(
        <Appcontext value={value}>{children}</Appcontext>
    )
}