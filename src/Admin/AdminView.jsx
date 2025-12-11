import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Adminview.css'
import AdminLayout from './AdminLayout'

export default function Adminview () {

 const navigate = useNavigate()
 const [allProducts,setAllProducts] = useState([]) // original data
 const [products,setProducts] = useState([])         // displayed data
 const [category,setCategory] = useState('All')
 const [searchTerm,setSearchTerm] = useState("")


 // Fetch all products once
 useEffect(()=>{
  
   axios.get(`${import.meta.env.VITE_API_URL}/viewproduct`)
   .then((res)=>{
    setAllProducts(res.data)
    setProducts(res.data)
   })
   .catch((err)=>{
    console.log(err)
   })
  },[])

  // Handle category selection
   const filterByCategory = (cat) =>{
    setCategory(cat)
    if(cat==="All"){
      setProducts(allProducts)
      return
    }
     const filtered = allProducts.filter(item => item.category === cat)
    setProducts(filtered)
    
   }

   // Search function
  //  const SearchIT = () => {
  //   if(search.trim()===""){
  //     setProducts(allProducts) // reset when box is empty
  //     return
  //   } 
    
  //     const filtered = allProducts.filter((a)=>a.productname.toLowerCase().includes(search.toLowerCase()))
  //     setProducts(filtered)
    
  // } 

const filteredProducts = products.filter((p)=>p.productname.toLowerCase().includes(searchTerm.toLowerCase()))


  // Delete products
 const deleteProduct = (id) =>{
    axios.delete(`${import.meta.env.VITE_API_URL}/deleteproduct`,{headers:{_id:id}})
    .then((res)=>{
      alert(res.data)
      window.location.reload()
    })
    .catch((err)=>{
      console.log(err)
    })
 }
  

  return (
    <>
    <AdminLayout>
    <div className="admin-container">
      {/* Left side bar */}
      <div className="sidebar">
        <h2>Categories</h2>
      <button className={category==="All" ? "active" : ""} onClick={()=>filterByCategory("All")}>
       All Products
      </button>

      <button className={category==="Dates" ? "active" : ""} onClick={()=>filterByCategory("Dates")}>
       Dates
      </button>

      <button className={category==="Banana" ? "active" : ""} onClick={()=>filterByCategory("Banana")}>
       Banana
      </button>

      <button className={category==="Fruits" ? "active" : ""} onClick={()=>filterByCategory("Fruits")}>
       Fruits
      </button>
     </div>

    {/* Right Side Content */}

    <div className="content">
      <div className="search-container">
        <input className='search-input' type="text" placeholder='Search product...' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
         <button className='search-btn'>
          Search
         </button>
          <button className='add-btn' onClick={()=>navigate("/admin/addproduct")}>
            Add Product
          </button>
      </div>
       
       <h1>{category} </h1>

      <div className="gridcontainer" >
               {
               filteredProducts.map(item=>(
                 <div className="gridbox" key={item._id}>
                  <h3>{item.productname}</h3>
                <img src={`${process.env.REACT_APP_API_URL}/${item.image}`} height="100" />
                
                 <p > Rs.{item.price}</p>
                 <p > {item.quantity} kg</p>
                    
                    <div className="action-buttons">
                      <button className='edit-btn' onClick={()=>navigate(`/admin/editproduct/${item._id}`)}>
                       Edit 
                      </button>
                      <button className='delete-btn' onClick={()=>deleteProduct(item._id)}>
                        Delete
                      </button>
                    </div> 
                  </div>
               ))} 
            </div>
          </div>
        
    </div>
    </AdminLayout>
    </>
    
    
  )
}


