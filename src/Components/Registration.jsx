import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Components/Registeration.css'


export default function RegUser(){

const [state,setState] = useState({
  username:"",
  email:"",
  password:""
})

const navigate = useNavigate()

const handleChange = (e) =>{
  setState({...state,[e.target.name]: e.target.value})}

  const handleSubmit = (e) =>{
    e.preventDefault()
    try{
      axios.post(`${import.meta.env.VITE_API_URL}/register`,state)
      .then((res)=>{
        alert(res.data)
        navigate('/')
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    catch(err){
      console.log("Error",err)
    }
  }

  return (
   <>
   
   <div className='register-page'>
    <div className='register-box'>
     <h1>REGISTER</h1>
    <form action="" onSubmit={handleSubmit}>
     
      <input type="text" name='username' onChange={handleChange} placeholder='Full Name' />
     
     
      <input type="email" name='email' onChange={handleChange} placeholder='Email ID' />
     
      <input type="password" name='password' onChange={handleChange} placeholder='Create Password' />
     
     <button className='register-btn'>Submit</button>
    </form>
    </div>
   
    </div>
    
    
   </>
  )
}


