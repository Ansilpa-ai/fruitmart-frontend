import React from 'react'
import AdminLayout from './AdminLayout'
import './AdminUsers.css'
import { useState,useEffect } from 'react'
import axios from 'axios'

const AdminUsers = () => {

 const [users,setUsers] = useState([])

 useEffect(()=>{
    fetchUsers();
 },[])

 const fetchUsers = async ()=>{
    try{
     const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/users`)
     setUsers(res.data)
    }
    catch(err){
     console.error(err)
    }
 }

  return (
    <AdminLayout>
    <div className='admin-users'>
      <h1>Users</h1>
      <table className='users-table'>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Joined</th>
            </tr>
        </thead>

        <tbody>
            {users.map((u)=>(
                <tr key={u._id}>
                  <td>{u.name || u.username || "-"}</td>
                  <td>{u.email || "-"}</td>
                  <td>{u.createdAt? new Date(u.createdAt).toLocaleDateString() : "-"}</td>
                </tr>
            ))}
        </tbody>
      </table>
      
    </div>
    </AdminLayout>
  )
}

export default AdminUsers
