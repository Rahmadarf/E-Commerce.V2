import AdminHeader from "../pages/admin/component/AdminHeader"
import { Outlet } from "react-router-dom"
import LogoutButton from "../component/LogoutBtn"
import AddProductModal from "../component/AddProduct"
import { useState } from "react"

function AdminLayout() {

    return (
        <>
            <AdminHeader />
            <Outlet/>
            <LogoutButton />

        </>
    )
}

export default AdminLayout