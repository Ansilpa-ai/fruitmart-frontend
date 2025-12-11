import React from 'react'
import { useState } from 'react'
import '../Home/Home.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const Home = () => {

 const [state,setState] = useState({
  email:"",
  password:""
 })

 const navigate = useNavigate()

  const [showPopup, setShowPopup] = useState(false)

 const handleChange = (e) =>{
  setState({...state,[e.target.name]:e.target.value})}

  const handleSubmit = (e) =>{
    e.preventDefault()
    try{
     axios.post(`${process.env.REACT_APP_API_URL}/login`,state)
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
          sessionStorage.setItem('username',response.username);
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
    <div className='home-outline'>
       
        <div className='home-center'>
          <div className="name">
        <h1 className='site-name'><i class="fa-solid fa-lemon"></i>FruitMart</h1>
       </div>
      <p className='firstp'>Welcome to FruitMart</p>
      <h1 className='home-h1'>Always Best Fruits 
        <br />For Everyone</h1>
      <p>Anytime-Anywhere</p>
      <button onClick={()=>setShowPopup(true)}>Shop now</button>
        </div>
        <div className='home-footer'>
         <p className='footer-p'>
        @2025 all rights reserved by FruitMart.
          </p>
        </div>

            {/* Popup Model */}
              
              { showPopup && (
                  <div className='popup-overlay' onClick={()=>setShowPopup(false)}>
                     <div className='login-popup-container' onClick={(e)=>e.stopPropagation()}>
                       <h1 className='popup-login-title'>LOGIN</h1>
                        <form className='popup-login-form' onSubmit={handleSubmit}>
                         <input type="email" name='email' placeholder='Email ID' onChange={handleChange}/>
                        <input type="password" name='password' placeholder='Enter Password' onChange={handleChange} />
                       <button className='login-button1'>
                        Sign In
                       </button>
                        <button className='login-button2' onClick={()=>navigate("/register")}>
                        Register
                       </button>
                       </form>

                       
                     </div>
                  </div>
              )}

        {/* <Second/> */}
        {/* <OfferSection/> */}
        {/* <SpecialOffer/> */}
        {/* <Footer/> */}
 
    </div>
  )
}

export default Home
