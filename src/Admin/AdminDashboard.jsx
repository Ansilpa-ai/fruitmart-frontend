import React from 'react'
import { useState,useEffect } from "react";
import axios from "axios";
import AdminLayout from './AdminLayout';
import './AdminDashboard.css'

const AdminDashboard = () => {
 
  const [stats,setStats] = useState({
    users: 0,
    orders: 0,
    products: 0,
    lowStock: 0,
  })

  useEffect(()=>{
    fetchStats();
  },[])

  const fetchStats = async() =>{
    try{
     const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/dashboard`)
     setStats(res.data)
    }
    catch(err){
      console.log(err)
    }
  }

  return (
     <AdminLayout>
    <div className='admin-dashboard'>
      <h1>Dashboard</h1>
       <div className="dashboard-cards">
         <div className="dash-card">
          <h2>{stats.users}</h2>
          <p>Total Users</p>
         </div>
         <div className="dash-card">
          <h2>{stats.products}</h2>
          <p>Total Products</p>
         </div>
         <div className="dash-card">
          <h2>{stats.orders}</h2>
          <p>Total Orders</p>
         </div>
         <div className="dash-card-low-stock">
          <h2>{stats.lowStock}</h2>
          <p>Low Stock Items</p>
         </div>
       </div>
    </div>
    </AdminLayout>
  )
}

export default AdminDashboard
