import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Addproduct.css'
import AdminLayout from "./AdminLayout";

export default function Addproduct(){

    const [product,setProduct] = useState({})
    const [image,setImage] = useState(null)
    const [preview,setPreview] = useState(null)
    const [category,setCategory] = useState("")
    const navigate = useNavigate()

    const handleChange = (e) =>{
        setProduct({...product,[e.target.name]:e.target.value})
    }
    const handleImage = (e) =>{
      const file = e.target.files[0]
        setImage(file)
      setPreview(URL.createObjectURL(file))  
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        const formdata = new FormData()
        formdata.append("productname",product.productname)
        formdata.append("price",product.price)
        formdata.append("quantity",product.quantity)
        if(image){
            formdata.append("image",image)
        }
        formdata.append("category",category)
        
          axios.post(`${import.meta.env.VITE_API_URL}/addproduct`,formdata,
            {headers:{"Content-Type":"multipart/form-data"}})
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
            <h1>Add New Product</h1>
      <form action="" onSubmit={handleSubmit}>
          
           <label>Product Name</label>
            <input type="text" name="productname" onChange={handleChange} placeholder="Enter Product name" required/>
          
          <label>Price</label>
            <input type="text" name="price" onChange={handleChange} placeholder="Enter Price" required/>
          
          <label>Quantity</label>
            <input type="text" name="quantity" onChange={handleChange} placeholder="Enter Quantity" required/>
          
          <label>Upload Image</label>
            <input type="file" name="image" onChange={handleImage} accept="image/*"/>

            <select onChange={(e)=>setCategory(e.target.value)}>
              <option value="">Select Category</option>
              <option value="Dates">Dates</option>
              <option value="Banana">Banana</option>
              <option value="Fruits">Fruits</option>
            </select>
          
            {preview && (
              <img src={preview} alt="preview" className="preview-img"/>
            )}

            <button type="submit" className="submit-btn">
             Add Product
            </button>
          
        </form>
          </div>
        </div>
        
        </AdminLayout>
        </>
    )
}