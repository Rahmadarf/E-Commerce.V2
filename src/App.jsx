import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Homee.jsx'
import Product from './pages/Product.jsx'
import Cart from './pages/Cart.jsx'
import MainLayout from './layout/MainLayout.jsx'
import Navbar from './component/Navbar.jsx'
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom'
import BlankLayout from './layout/BlankLayout.jsx'
import LoginPage from './pages/Login.jsx'
import SsoCallback from './component/ssoCallback.jsx'
import Signup from './pages/Signup.jsx'
import VerifyEmail from './pages/VerifyEmail.jsx'
import Account from './pages/Acc.jsx'
import AuthLoader from './pages/OnBoarding.jsx'
import AdminPanel from './pages/admin/AdminPanel.jsx'
import AdminGuard from './protect/AdminGuard.jsx'
import AdminHeader from './pages/admin/component/AdminHeader.jsx'
import AdminLayout from './layout/AdminLayout.jsx'
import AdminProductsList from './pages/admin/ProductList.jsx'
import VerifyLogin from './pages/VerifyLogin.jsx'


function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES*/}
      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify-login" element={<VerifyLogin />} />
        <Route path="/sso-callback" element={<SsoCallback />} />
      </Route>

      {/* PROTECTED ROUTES */}
      <Route
        element={
          <AuthLoader>
            <MainLayout />
          </AuthLoader>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Account />} />
      </Route>


      {/* ADMIN */}
      <Route element={<AdminGuard>
        <AdminLayout />
      </AdminGuard>}>

        <Route path='/admin' element={<AdminProductsList />} />
      </Route>

    </Routes>





  )
}

export default App
