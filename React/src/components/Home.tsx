import React, { useEffect, useState } from 'react'
import { Category } from '../models/Category'
import { allCategories } from '../services/categoryService'
import { toast } from 'react-toastify'
import { ListGroup,Button } from 'reactstrap'
import { Product } from '../models/Product'
import { allProducts, pageProducts, productByCategory } from '../services/productService'
import { NavLink } from 'react-router-dom'


function Home() {

    const [categories, setCategories] = useState<Category[]>([])
    const [products, setProducts] = useState<Product[]>([])
    const [allProduct,setAllProduct] = useState<Product[]>([])
    const [page, setPage] = useState(0)

    
    useEffect(() => {
     allCategories().then(res =>{
      setCategories(res.data.result)
     }).catch((error)=>{
      toast.error(error)
     })

     allProducts().then(res=>{
      setAllProduct(res.data.products)
     })
    }, [])
    
    const selectCategory = (cid:number) =>{
     productByCategory(cid).then(res=>{
       setProducts(res.data.products)
     })
    }
    
    useEffect(() => {
     pageProducts(page).then(res => {
        setProducts(res.data.content)
     }).catch((error)=>{
      toast.error(error)
     })
    }, [page])
    
  const previous = () =>{
    if(page >0){
     setPage(page-1)
    } 
  }

   const next = () =>{
   if(allProduct.length % 3 > 0){
    if(page <= products.length/3 +1){
     setPage(page+1)
    }
   }else{
    if(page <= products.length){
      setPage(page+1)
    }
   }  
  }

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
    <nav aria-label="Page navigation example" className='mt-3'>
      <ul className="pagination">
        <li className="page-item"><a className="page-link" onClick={()=> previous()}>Previous</a></li>
        <li className="page-item"><a className="page-link" onClick={()=> next()}>Next</a></li>
     </ul>
  </nav>
    </div> 
    </>
  )
}

export default Home