import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/home'
import Shop from './components/shop'
import Product from './components/Product'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Login from './components/admin/login'
import { ToastContainer, toast } from 'react-toastify';
import Dashboard from './components/admin/Dashboard'
import { AdminRequiredAuth } from './components/admin/AdminRequireAuth'
import { default as ShowCategories } from './components/admin/category/Show'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/shop' element={<Shop/>}/>
          <Route path='/product' element={<Product/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout/>}/>

          <Route path='/admin/login' element={<Login/>}/>
          <Route path='/admin/dashboard' element={
            <AdminRequiredAuth>
              <Dashboard/>
            </AdminRequiredAuth>
          }/>
          <Route path='/admin/categories' element={
            <AdminRequiredAuth>
              <ShowCategories/>
            </AdminRequiredAuth>
          }/>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </>
  )
}

export default App
