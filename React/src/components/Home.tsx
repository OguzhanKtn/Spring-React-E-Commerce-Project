import React, { useEffect, useState } from 'react'
import { Result } from '../models/Category'
import { allCategories } from '../services/categoryService'
import { toast } from 'react-toastify'
import { ListGroup,Button } from 'reactstrap'
import { Product } from '../models/Product'
import { allProducts, productByCategory } from '../services/productService'
import { NavLink } from 'react-router-dom'
import NavbarUser from './NavbarUser'

function Home() {

    const [categories, setCategories] = useState<Result[]>([])
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
     allCategories().then(res =>{
      setCategories(res.data.result)
     }).catch((error)=>{
      toast.error(error)
     })
    }, [])
    
    const selectCategory = (cid:number) =>{
     productByCategory(cid).then(res=>{
       setProducts(res.data.products)
     })
    }
    
    useEffect(() => {
  
     allProducts().then(res => {
        setProducts(res.data.products)
     }).catch((error)=>{
      toast.error(error)
     })
    }, [])
    

  return (    
    <>
    <div className="container">
    <div className="row">
    <div className="col-sm-2">
      <h4 className='text-center'>Categories</h4>
      <ListGroup>
        {categories.map((item,index) =>(
        <Button className='mt-2' onClick={()=> selectCategory(item.cid)}
        color="dark"
        key={index}>
        {item.name}
    </Button>       
        ))}
      </ListGroup>
    </div>
    <div className='col-sm-10'>
    <h4 className='text-center'>Products</h4>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">Brand</th>
      <th scope="col">Title</th>
      <th scope="col">Price</th>
      <th scope="col">Stock</th>
    </tr>
  </thead>
  <tbody>
    {products.map((item,index)=>(
      <tr key={index}>
      <td><NavLink to={"/detail/"+item.pid}>{item.brand}</NavLink></td>
      <td>{item.title}</td>
      <td>{item.price}$</td>
      <td>{item.stock}</td>
    </tr>
    ))}  
  </tbody>
</table>
    </div>
    </div>
    </div> 
    </>
  )
}

export default Home