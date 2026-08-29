import React from "react"
import ReactDom from "react-dom/client"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Body from "./components/Body"
import Homepage from "./components/Homepage"
import Error from "./components/Error"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import Productdetail from "./components/Productdetail"

const Applayout = () => {
    return (
        <>
            <Header />
            <Outlet/>
            <Footer />
        </>
    )
}

const Route = createBrowserRouter([
    {
        path: "/",
        element: <Applayout />,
        children: [
            {
                path: "/plan",
                element: <Homepage />
            },
            {
                path: "/home",
                element: <Body />
            },
            {
                path : "/product/:product_id",
                element : <Productdetail/>
            }
        ],
        errorElement : <Error/>
    }
])

const reactroot = ReactDom.createRoot(document.getElementById("root"))
reactroot.render(<><RouterProvider router={Route} /></>)


