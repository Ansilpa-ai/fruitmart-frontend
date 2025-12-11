import React from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import '../Payment/Payment.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


const Payment = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const {total,cart} = location.state

  const [address,setAddress] = useState({
  name:"",
  email:"",
  phone:"",
  pincode:"",
  place:"",
  fulladdress:""
})

const handleChange = (e) =>{
  setAddress({
    ...address,
    [e.target.name]:e.target.value
  })
}


  const handlePayment = async() =>{
    try{
    const payload = {
      userId:cart[0].userId,
      items:cart.map((item)=>({
        productId:item.productId._id,
        quantity:item.quantity,
        price:item.productId.price
      })),
      totalAmount:total,
      address: address
    }
    await axios.post(`${import.meta.env.VITE_API_URL}/admin/order`,payload)

    alert("Order Placed Successfully!")
      
  // alert("Payment Successful!")
    setTimeout(() => {
      navigate('/')
    }, 300);
    }
    catch(err){
      console.log(err)
      alert("Payment failed!")
    }  
  }


  return (
    <>
   <button className='payment-back-button' onClick={()=>navigate(-1)}>
    Back
   </button> 
    <div className='payment-page'>
      <h1>Checkout</h1>

      <div className="address-box">
        <h2>Delivery Address</h2>
         <input name='name' placeholder='Full Name' onChange={handleChange} />
         <input name='email' placeholder='Email' onChange={handleChange} />
         <input name='phone' placeholder='Phone Number' onChange={handleChange} />
         <input name='pincode' placeholder='Pincode' onChange={handleChange} />
         <input name='place' placeholder='Place' onChange={handleChange} />
         <textarea name="fulladdress" placeholder='Full Address' rows="3" onChange={handleChange}></textarea>
      </div>
       
        <div className="payment-list">
          {cart.map((item)=>(
            <div className="payment-item" key={item._id}>
             <span className='p-name'>{item.productId?.productname}</span>
             <span className='p-qty'>{item.quantity} kg</span>
             <span className='p-price'>Rs. {item.productId?.price}</span>
            </div>
          ))}
        </div>
         <div className='payment-info'>
          Total Amount : Rs. {total}
        </div>
        <button className='pay-btn' onClick={handlePayment} >
          Proceed to Pay
        </button>
    </div>
    </>
  )
}

export default Payment
