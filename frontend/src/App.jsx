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
import { default as CreateCategory } from './components/admin/category/Create'
import { default as EditCategory } from './components/admin/category/Edit'
import { default as ShowBrands } from './components/admin/brand/Show'
import { default as CreateBrand } from './components/admin/brand/Create'
import { default as EditBrand } from './components/admin/brand/Edit'

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
          <Route path='/admin/categories/create' element={
            <AdminRequiredAuth>
              <CreateCategory/>
            </AdminRequiredAuth>
          }/>
          <Route path='/admin/categories/edit/:id' element={
            <AdminRequiredAuth>
              <EditCategory/>
            </AdminRequiredAuth>
          }/>
          <Route path='/admin/brands' element={
            <AdminRequiredAuth>
              <ShowBrands/>
            </AdminRequiredAuth>
          }/>
          <Route path='/admin/brands/create' element={
            <AdminRequiredAuth>
              <CreateBrand/>
            </AdminRequiredAuth>
          }/>
          <Route path='/admin/brands/edit/:id' element={
            <AdminRequiredAuth>
              <EditBrand/>
            </AdminRequiredAuth>
          }/>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </>
  )
}

export default App
