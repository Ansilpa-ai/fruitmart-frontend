import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './AdminSidebar.css'


const AdminSidebar = () => {

  const navigate = useNavigate()

  const handleLogout = () =>{
    localStorage.removeItem("adminToken")
    navigate("/")
  }

  return (
    <div className='admin-sidebar'>
       <h2 className='admin-title'>Admin Panel</h2>
       <ul className='admin-menu'>
         <li><Link to="/admin/dashboard">Dashboard</Link></li>
         <li><Link to="/admin/adminview">All Products</Link></li>
         <li><Link to="/admin/addproduct">Add Product</Link></li>
         <li><Link to="/admin/users">Users</Link></li>
         <li><Link to="/admin/orders">Orders</Link></li>
         <li><Link to="/admin/lowstock">Low Stock</Link></li>
         <li className='logout-btn' onClick={handleLogout}>Logout</li>
       </ul>
    </div>
  )
}

export default AdminSidebar
