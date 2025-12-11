import React from "react";
import { useState,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './Addproduct.css'
import AdminLayout from "./AdminLayout";

export default function EditProduct(){

    const [product,setProduct] = useState({})
    const navigate = useNavigate()
    const {id} = useParams()
    

    useEffect(()=>{
     
     axios.get(`${import.meta.env.VITE_API_URL}/${id}`)
     .then((res)=>{
        setProduct(res.data)
     })
     .catch((err)=>{
        console.log(err)
     })
     },[id])

    const handleChange = (e) =>{
        setProduct({...product,[e.target.name]:e.target.value})
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        
            axios.put(`${import.meta.env.VITE_API_URL}/${id}`,product)
            .then((res)=>{
                alert(res.data)
                navigate('/admin/adminview')
            })
            .catch((err)=>{
                console.log(err)
            })
           }

return(
    <>
    <AdminLayout>
    <div className="addproduct-container">
        <div className="addproduct-card">

          <h2>Edit Product</h2>

         <form action="" onSubmit={handleSubmit} >

        <label>Product Name</label>
        <input type="text" value={product.productname || ""} disabled className="disabled-field" />  
        
         <label>Price</label>
          <input type="text" name="price" placeholder="Update price" onChange={handleChange} defaultValue={product.price}/>  
          
         <label>Quantity</label>
          <input type="text" name="quantity" placeholder="Update quantity" onChange={handleChange} defaultValue={product.quantity} />  
        
        <label> Category </label>
        <select name="category" value={product.category || ""} onChange={handleChange}>
         <option value="Default">Select</option>   
         <option value="Dates">Dates</option>
         <option value="Banana">Banana</option>
         <option value="Fruits">Fruits</option>
        </select>

        <button type="submit" className="submit-btn">
            Update Product
        </button>

         </form>
        </div>
    </div>
    </AdminLayout>
    </>
)
}