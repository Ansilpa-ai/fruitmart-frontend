import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../User/userview.css'

export default function Userview(){
  
  const navigate = useNavigate()
  const [product,setProduct] = useState([])
  const [kgValues, setKgValues] = useState({})

  useEffect(()=>{
    
    axios.get(`${import.meta.env.VITE_API_URL}/viewproduct`)
    .then((res)=>{
      setProduct(res.data)

    const initialKg = {}
    res.data.forEach(item => initialKg[item._id] = 1)
    setKgValues(initialKg)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])  

  function addToCart(productId,quantity){
    const userId = sessionStorage.getItem('id')
    
     axios.post(`${import.meta.env.VITE_API_URL}/cart/addcart/${userId}`,{productId,quantity})
     .then((res)=>{
      alert(res.data.message)
     })
     .catch(()=>{
      alert("Error adding to cart")
     })
    }

  return (
    <>
   <nav className="user-navbar">
    <div className="nav-left">
      <h2 className="nav-logo">FruitMart</h2>
    </div>

    <div className="nav-center">
      <ul className="nav-links">
        <li onClick={()=>navigate('/user/userview')}>Home</li>
        <li onClick={()=>navigate('/user/profile')}>My Profile</li>
        <li onClick={()=>navigate('/user/viewcart')}>ViewCart <i class="fa-solid fa-cart-shopping"></i></li>
        
      </ul>
    </div>

    <div className="nav-right">
      <span className="user-name">
        {sessionStorage.getItem('username')}
      </span>
      <button className="logout-btn" onClick={()=>{sessionStorage.clear();
        window.location.href = "/"
      }}>
        Logout
      </button>
    </div>
   </nav>


    <div className='page'>
      <header className='header'>
        <h2>Our Products</h2>
      </header>

        <div className='product-grid'>
          { product.map((item)=>(
            <div className='product-card' key={item._id}>
               <img src={`${import.meta.env.VITE_API_URL}/${item.image}`} alt={item.productname}
               className='product-img' />
                <h3 className='product-title'>
                  {item.productname}
                </h3>
                <p className='product-price'>Rs.{item.price * (kgValues[item._id] || 1)}</p>
      
      {/* kg selector */}

                <div className="kg-selector">
                  <button className="kg-btn" onClick={()=>setKgValues(prev=>({...prev,[item._id]: prev[item._id] > 1 ? prev[item._id] - 1 : 1}))}>
                   - 
                  </button>
                  <span>{kgValues[item._id]}kg</span>

                  <button className="kg-btn" onClick={()=>setKgValues(prev=>({...prev,[item._id]: prev[item._id] + 1}))}>
                   + 
                  </button>
                </div>

                <button className='add-btn' onClick={()=>addToCart(item._id,kgValues[item._id])}>
                  Add to Cart
                </button>
            </div>
          ))
          }
        </div>
    </div>
    </>
  )
}


