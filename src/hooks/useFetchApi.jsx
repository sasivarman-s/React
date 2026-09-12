import React, { useEffect, useState } from "react"
import ReactDom from "react-dom"
import "../components/main.css"

const useFetchApi = () => {
    var [isLoading, setIsloading] = useState(false)
    var [Productarray, setProductarray] = useState([])
    const FetchApi = async () => {
        setIsloading(true)
        var fetching = await fetch("https://dummyjson.com/products")
        var fectched = await fetching.json()
        var finalfecth = fectched.products
        setIsloading(false)


        setProductarray(finalfecth)
    }

    useEffect(() => {
        FetchApi()
    }, [])

    return { Productarray, isLoading }

}

export default useFetchApi