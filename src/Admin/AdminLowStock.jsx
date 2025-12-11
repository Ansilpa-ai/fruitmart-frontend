import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import AdminLayout from './AdminLayout'
import './AdminOrders.css'

const AdminLowStock = () => {

  const [lowStock, setLowStock] = useState([])

  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_API_URL}/admin/lowstock`)
    .then((res)=>{
      setLowStock(res.data)
    })
    .catch((err)=> console.log(err))
  },[])

  return (
    <AdminLayout>
    <div className='admin-page-container'>
      <h1>Low Stock Products</h1>
          
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity Left</th>
                <th>Category</th>
                <th>Image</th>
              </tr>
            </thead>
             <tbody>
              {lowStock.length > 0 ? (
                lowStock.map((p,index) => (
                  <tr key={index}>
                    <td>{p.name}</td>
                    <td style={{color:"red",fontWeight:"bold"}}>{p.quantityLeft}</td>
                    <td>{p.category}</td>
                    <td>
                      {p.image && p.image.length > 0 ? (
                        <img src={`${process.env.REACT_APP_API_URL}/${p.image[0]}`} height="50" alt='product' />
                      ) : (
                        "No Image"
                      )}
                    </td>  
                  </tr>
                ))
              ):(
                <tr>
                  <td colSpan="4" style={{textAlign:"center"}}>
                    No Low Stock Items
                  </td>
                </tr>
              )}
             </tbody>
          </table>
         </div>
    </AdminLayout>
  )
}

export default AdminLowStock
