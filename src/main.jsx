import React from "react"
import ReactDom from "react-dom/client"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Body from "./components/Body"
import Homepage from "./components/Homepage"
import Error from "./components/Error"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import Productdetail from "./components/Productdetail"
import Imagerender from "./components/Imagerender"
import ComponentA from "./components/ComponentA"
import { Appcontext, Approvider } from "./context/Appcontext"
import ComponentC from "./components/ComponentC"

const Applayout = () => {
    return (
        <>
            <Header />
            <Outlet />
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
                path: "/",
                element: <Body />
            },
            {
                path: "/plan",
                element: <Homepage />
            },
            {
                path: "/product/:product_id",
                element: <Productdetail />
            },
            {
                path: "/image",
                element: <Imagerender />
            },
            {
                path : "/comp",
                element : <ComponentC/>
            }
        ],
        errorElement: <Error />
    }
])

const reactroot = ReactDom.createRoot(document.getElementById("root"))
reactroot.render(<Approvider><RouterProvider router={Route} /></Approvider>)


