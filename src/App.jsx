import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import RegUser from './Components/Registration'
import Login from './Components/Login'
import Addproduct from './Admin/Addproduct'
import Userview from './User/Userview&Addcart'
import Adminview from './Admin/AdminView'
import EditProduct from './Admin/Editproduct'
import ViewCart from './User/viewCart'
import Home from './Components/Home/Home'
import UserProfile from './User/UserProfile'
import Payment from './Payment/Payment'
import AdminDashboard from './Admin/AdminDashboard'
import AdminUsers from './Admin/AdminUsers'
import AdminOrders from './Admin/AdminOrders'
import AdminLowStock from './Admin/AdminLowStock'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<RegUser/>}/>
      <Route path='/login' element={<Login/>}/>

      <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
      <Route path='/admin/addproduct' element={<Addproduct/>}/>
      <Route path='/admin/adminview' element={<Adminview/>}/>
      <Route path='/admin/editproduct/:id' element={<EditProduct/>}/>
      <Route path='/admin/users' element={<AdminUsers/>}/>
      <Route path='/admin/orders' element={<AdminOrders/>}/>
      <Route path='/admin/lowstock' element={<AdminLowStock/>}/>
    
  
     <Route path='/user/userview' element={<Userview/>}/>
     <Route path='/user/viewcart' element={<ViewCart/>}/>
      <Route path='/user/profile' element={<UserProfile/>}/>

     <Route path='/payment' element={<Payment/>}/>
    </Routes>
   {/* </div> */}

    </>
  )
}

export default App
