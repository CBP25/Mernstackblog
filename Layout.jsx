import { Navbar } from "./Navbar"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Footer } from "./footer"

export function Layout ()  {
    let user = sessionStorage.getItem("User")
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
        navigate("/")
        }
        }, [user])
        
    return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
    )
  };