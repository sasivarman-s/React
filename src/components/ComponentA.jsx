import React, { useState } from "react"
import ReactDom from "react-dom"
import "./main.css"
import ComponentB from "./ComponentB"

function ComponentA() {

    var [name, setName] = useState("Sasi")

    return (
        <>
            <h1 className="text-4xl text-center p-1 m-1 text-red-600 bg-slate-300">{name}</h1>
            <ComponentB setName={setName} />
        </>
    )
}

export default ComponentA