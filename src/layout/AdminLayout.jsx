import AdminHeader from "../pages/admin/component/AdminHeader"
import { Outlet } from "react-router-dom"
import LogoutButton from "../component/LogoutBtn"
import AddProductModal from "../component/AddProduct"
import { useState } from "react"
import HomeButton from "../component/HomeBtn"

function AdminLayout() {

    return (
        <>
            <AdminHeader />
            <Outlet />
            <div className="flex  bottom-4 right-4 space-x-12">
                <HomeButton />
                <LogoutButton />
            </div>


        </>
    )
}

export default AdminLayout