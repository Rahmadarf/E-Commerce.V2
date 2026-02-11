import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import AdminPageBtn from "../component/AdminPageBtn";

const MainLayout = () => {
    const { user } = useUser();

    if (!user) {
        return (
            <>
                <Navbar />
                <Outlet />
            </>
        )
    }

    return (
        <>
            {user?.publicMetadata?.role === 'admin' && <AdminPageBtn />}
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default MainLayout;