import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { Outlet } from "react-router-dom";

const BlankLayout = () => {
    return (
        <>
            <Outlet />
        </>
    )
}

export default BlankLayout;