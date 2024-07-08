import { Outlet } from "react-router-dom"
import Sidebar from "../Components/Sidebar"

export const Home = () => {
    return (
        <>  
            <Sidebar prop={<Outlet />}/>
        </>
    )
}

