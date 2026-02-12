import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import AdminPageBtn from "../component/AdminPageBtn";
import LoginPromptNotification from "../component/LoginPromtpNotif";
import { NotfyContext } from "../context/Notfy";
import { useContext } from "react";
import ProductAddedNotification from "../component/Notif";

const MainLayout = () => {
    const { user } = useUser();
    const { showNotification } = useContext(NotfyContext)

    if (!user) {
        return (
            <>
                <LoginPromptNotification />
                {showNotification && <ProductAddedNotification />}
                <Navbar />
                <Outlet />
            </>
        )
    }

    return (
        <>
            {user?.publicMetadata?.role === 'admin' && <AdminPageBtn />}
            <ProductAddedNotification />
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default MainLayout;