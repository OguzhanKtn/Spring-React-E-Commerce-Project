import React, { useEffect, useState } from 'react'
import { Result } from '../models/Category'
import { allCategories } from '../services/categoryService'
import { toast } from 'react-toastify'
import { ListGroup,Button } from 'reactstrap'
import { Result } from '../models/Product'
import { allProducts } from '../services/productService'

function Home() {

    const [categories, setCategories] = useState<Result[]>([])
    const [products, setProducts] = useState<Result[]>([])

    useEffect(() => {
     allCategories().then(res =>{
      setCategories(res.data.result)
     }).catch((error)=>{
      toast.error(error)
     })
    }, [])
    
    const selectCategory = (cid) =>{
     console.log(cid)
    }
    
    useEffect(() => {
  
     allProducts().then(res => {
        setProducts(res.data.result)
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
    <tr>
      <td></td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
  </tbody>
</table>
    </div>
    </div>
    </div> 
    </>
  )
}

export default Home