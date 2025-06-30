import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import UserLayout from './components/Layouts/UserLayout'
import Home from './Pages/Home';
import Toaster from 'react-hot-toast'; ;
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import CollectionPage from './Pages/CollectionPage';
import ProductDetails from './components/Product/ProductDetails';
import Checkout from './components/Cart/Checkout';
import OrderConfirmationPage from './Pages/OrderConfirmationPage';
import OrderDetailsPage from './Pages/OrderDetailsPage';
import MyOrderPage from './components/Product/MyOrderPage';
import AdminLayout from './components/Admin/AdminLayout';
import AdminHomePage from './Pages/AdminHomePage';
import UserManagment from './components/Admin/UserManagment';
import ProductManagement from './components/Admin/ProductManagement';
import EditProductPage from './components/Admin/EditProductPage';
import OrderManagement from './components/Admin/OrderManagement';
import {Provider} from "react-redux";
import store from "../redux/store.js";
import ProtectedRoute from './components/Common/ProtectedRoute.jsx';


export default function App() {
  return (
    <Provider store={store}>
    <BrowserRouter future= {{ v7_startTransition : true , v7_relativeSplatPath :true}}>
    <Toaster position= 'top-right' />
    <Routes>
      <Route path="/" element={<UserLayout />} >
      <Route index element={<Home />}/>
      <Route path="login" element={<Login />}/>
      <Route path="register" element={<Register/>}/>
      <Route path="profile" element={<Profile/>}/>
      <Route path="collection/:collection" element={<CollectionPage/>}/>

      <Route path="product/:id" element={<ProductDetails/>}/>
      <Route path="checkout" element={<Checkout/>}/>
      <Route path="order-confirmation" element= {<OrderConfirmationPage/>} />
      <Route path="order/:id" element= {<OrderDetailsPage/>} />
      <Route path="my-orders" element= {<MyOrderPage/>} />
      </Route>
      {/* <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} /> */}
       <Route path="/admin" element= {<ProtectedRoute role="admin"><AdminLayout/></ProtectedRoute>} >
       <Route index element = {<AdminHomePage />} />
       <Route path='users' element = {<UserManagment/>} />
       <Route path='products' element = {<ProductManagement/>} />
       <Route path='products/:id/edit' element = {<EditProductPage/>} />
       <Route path='orders' element = {<OrderManagement/>} />
       </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
  )
}
