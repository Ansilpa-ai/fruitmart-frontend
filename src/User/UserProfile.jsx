import React from 'react'
import '../User/UseProfile.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const UserProfile = () => {

    const username = sessionStorage.getItem('username')
    const id = sessionStorage.getItem("id")
    const navigate = useNavigate()

    const handleLogout = ()=>{
   sessionStorage.clear()
   navigate('/')
    }
  return (
    <div className='styles-page'>
        <Link to="/user/userview" className='back-btn'><i class="fa-solid fa-arrow-left"></i>Back to Products</Link>
        <div className='styles-card'>
            <h2 className='styles-title'>My Profile</h2>
            <div className='styles-infoRow'>
                <span className='styles-label'>Username : </span>
                <span className='styles-value'>{username || "Not Available"}</span>
            </div>
            <div className='styles-infoRow'>
                <span className='styles-label'>User ID : </span>
                <span className='styles-value'>{id || "Not Available"}</span>
            </div>
            <button className='styles-button' onClick={handleLogout}>Logout</button>
        </div>
    </div>
  )
}

export default UserProfile
