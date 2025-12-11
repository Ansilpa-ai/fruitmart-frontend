import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../User/viewStyle.css'
import { Link } from "react-router-dom";

export default function ViewCart(){

    const [cart,setCart] = useState([])
    const [total,setTotal] = useState(0)
    const navigate = useNavigate()

    // Fetch cart
    useEffect(()=>{
        
            const userId = sessionStorage.getItem('id');
             if(!userId) return;

            axios.get(`${import.meta.env.VITE_API_URL}/cart/viewcart/${userId}`)
            
          .then((res)=>{
            const items = res.data.data ||  [];
            setCart(items);
            calculateTotal(items);
            console.log("CART DATA :",items)
          })  
          .catch((err)=>{
            console.log(err)
          })  
    },[])

  //  Calculate total

  const calculateTotal = (items) =>{
    let t = 0;
    items.forEach((it)=>{
      if(!it.productId) return
      
       const price = Number(it.productId.price) || 0;
       const qty = Number(it.quantity) || 0;
       t += qty * price;
    })
    setTotal(t)
  }

  // Increase quantity

  const increaseQty = async(cartId,currentQuantity) =>{
     try{
       await axios.put(`${import.meta.env.VITE_API_URL}/cart/increase/${cartId}`,
        {
          quantity : currentQuantity + 1
       })
       const updated = cart.map((item)=>
        item._id === cartId
        ? {...item,quantity:item.quantity + 1}
        : item
       )
       setCart(updated)
       calculateTotal(updated)
     }
     catch(err){
        console.log(err)
     }  
  }

  // Decrease Quantity

  const decreaseQty = async(cartId,currentQuantity)=>{
    if(currentQuantity <= 1) return ;  // stop at one

      try{
        await axios.put(`${import.meta.env.VITE_API_URL}/cart/decrease/${cartId}`,{
        quantity: currentQuantity - 1
      })
      const updated = cart.map((item)=>
      item._id === cartId
      ? {...item,quantity:
        item.quantity - 1 }
        : item
    )
    setCart(updated)
    calculateTotal(updated)
      }
      catch(err){
        console.log(err)
      }
  }

// Remove Item

const removeItem = async(cartId) =>{
  try{
   await axios.delete(`${import.meta.env.VITE_API_URL}/cart/delete/${cartId}`)
   const updatedCart = cart.filter((item)=>item._id !== cartId)
   setCart(updatedCart)
   calculateTotal(updatedCart)
  }
  catch(err){
    console.log("Remove error:",err)
  }
}
const gotoCheckout = () =>{
  navigate("/payment",{state:{total,cart}})
}


    return(
        <>
      <Link to="/user/userview" className='back-cart-btn'><i class="fa-solid fa-arrow-left"></i>Back to Products</Link>
        <div className="cart-page">
           <div className="cart-left">
            <h1 className="cart-title">Your Cart</h1>
              <div className="cart-container">
                 {cart.length === 0 ? (
                   <h2 className="empty">Cart is empty</h2>
                 ):(
                  cart.map((item)=>{
                           if(!item.productId){
                            return (
                         <div className="cart-card" key={item._id}>
                          <div className="cart-details" style={{flex:1}}>
                          <h3 style={{color:"crimson"}}>This product was removed</h3>
                          <p className="sub-total">
                               Quantity : {item.quantity}
                              </p>
                              </div>
                            <button className="remove-btn" onClick={()=>removeItem(item._id)}>
                             Remove
                          </button>
                         </div>
                            )
                           }
       // image may be array(from multer mapping) or string              
           const imgPath = Array.isArray(item.productId.image)
                  ? item.productId.image[0]
                  : item.productId.image;

           const price = Number(item.productId.price) || 0;
           const qty = Number(item.quantity) || 0;
           
               return(
                <div className="cart-card" key={item._id}>
                  <img src={`${import.meta.env.VITE_API_URL}/${imgPath}`} alt="product" className="cart-image" />
                 <div className="cart-right-side">
                  <div className="cart-details">
                  <h3>{item.productId.productname}</h3>
                  <p className="price">Rs.{price}</p>  
                   <div className="qty-box">
                              <button onClick={()=>
                                decreaseQty(item._id,qty)}>-</button>
                            <span> {qty} kg </span> 
                    <button onClick={()=>increaseQty(item._id,qty)}>+</button>  
                     </div>   
                   <p className="sub-total">
                   Subtotal : Rs.{qty * price}
                    </p>       
                 </div>
                  <button className="remove-btn" onClick={()=>removeItem(item._id)}>
                   Remove
                  </button>
                 </div>
                 </div>
                 
               )          
                  })
                 )}
              </div>
           </div>
          
              <div className="cart-summary">
                 <h2>Order Summary</h2>
                 <h3>Total Amount : Rs.{total}</h3>
                 <button className="checkout-btn" onClick={gotoCheckout}>
                   Proceed to Checkout 
                 </button>
                
              </div>
        </div>
        </>
    )
}