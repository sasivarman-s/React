import React from "react"
import ReactDom from "react-dom"
import "./main.css"

function ComponentB({ setName }) {
    return (
        <div className="space-y-3">
            <h2 className="text-center text-2xl">Componenet-B</h2>
            <div className="flex flex-row justify-center items-center">
            <button className="p-1 bg-green-600 rounded-lg text-2xl text-white" onClick={() => {
                setName("Sasivarman")
            }}>change now </button>
            </div>
        </div>

    )
}

export default ComponentB