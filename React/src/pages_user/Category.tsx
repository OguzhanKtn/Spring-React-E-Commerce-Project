import React,{useState,useEffect} from 'react'
import { useParams,NavLink} from 'react-router-dom'
import { Product } from '../models/Product'
import { productByCategory } from '../services/productService'

function Category() {

    const params = useParams()
    const id = params.id

    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
      if(id){
        productByCategory(parseInt(id)).then(res=>{
            setProducts(res.data.products)
        })
      }
    }, [])
    

  return (
   <>
   <div className="container">
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
   
   
   </>
  )
}

export default Category