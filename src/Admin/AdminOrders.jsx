import React from 'react'
import AdminLayout from './AdminLayout'
import { useState,useEffect } from 'react'
import axios from 'axios'
import './AdminOrders.css'


const AdminOrders = () => {

   const [orders,setOrders] = useState([])
   
   useEffect(()=>{
    axios.get(`${import.meta.env.VITE_API_URL}/admin/orders`)
    .then((res)=>{
        setOrders(res.data)
    })
    .catch((err)=>console.log(err))
   },[])

  return (
    <AdminLayout>
    <div className='admin-page-container'>
      <h1>Orders</h1>
      <table className="admin-table">
        <thead>
            <tr>
              <th>User</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Address</th>
              
              {/* <th>Order ID</th> */}
            </tr>
        </thead>
        <tbody>
            {orders.length > 0 ? (
                orders.map((order)=>(
                <tr key={order._id}>
                  
                  <td>{order.userId?.username || "Unknown"}</td>
                  <td>{order.items.map((i)=>(
                    <p key={i._id} style={{width:"150px"}}>
                      {i.productId?.productname || "Deleted Product"}  ({i.quantity}kg)
                    </p>
                  ))}</td>
                  <td>Rs. {order.totalAmount}</td>
                  <td>{order.status}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  
                  <td>
                    <p><strong>{order.address?.name}</strong></p>
                    <p>{order.address?.email}</p>
                    <p>{order.address?.place}</p>
                    <p>{order.address?.pincode}</p>
                    <p style={{width:"200px"}}>{order.address?.fulladdress}</p>
                  </td>
                  
                  {/* <td>{order._id}</td> */}
                </tr> 
                ))
              ):(
               <tr>
                <td colSpan="6" style={{textAlign:"center"}}>
                  No Orders Found
                </td>
               </tr> 
            )}
        </tbody>
      </table>
    </div>
    </AdminLayout>
  )
}

export default AdminOrders
