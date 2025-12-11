import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../Components/Login.css'

 export default function Login() {

 const [state,setState] = useState({
  email:"",
  password:""
 })

 const navigate = useNavigate()

 const handleChange = (e) =>{
  setState({...state,[e.target.name]:e.target.value})}

  const handleSubmit = (e) =>{
    e.preventDefault()
    try{
     axios.post(`${import.meta.env.VITE_API_URL}/login`,state)
     .then((res)=>{
      const response = res.data
      alert(response.msg)
      console.log(response.id)
      if(response.status===200){
        if(response.role ==="admin"){
          console.log(response.msg)
          navigate('/admin/adminview')
        }
        else{
          sessionStorage.setItem('id',response.id);
          sessionStorage.setItem('username',response.username)
          navigate('/user/userview')
        }
        console.log(sessionStorage.getItem('id'))
        console.log(sessionStorage.getItem('username'))
      }
      else{
        console.log("Wrong status code")
      }
     })
     .catch((err)=>{
      console.error("Error",err)
     })
    }
    catch(err){
      console.log(err)
    }
  }

  return (
  <>
  <div className='login-page'>
    <div className='login-form'>
     <h1>LOGIN</h1>
  <form onSubmit={handleSubmit}>
   <p>
    <input type="email" name='email' placeholder='Email ID' onChange={handleChange} />
   </p>
   <p>
    <input type="password" name='password' placeholder='Enter Password' onChange={handleChange} />
   </p>
   <button className='login-button1'>Sign In</button>
   <button className='login-button2' onClick={()=>{navigate('/register')}} >Register</button>
  </form>
  
    </div>
  </div>
  
  </>
  )
}


