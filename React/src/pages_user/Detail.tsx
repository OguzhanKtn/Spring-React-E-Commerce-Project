import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { Product } from '../models/Product'
import { productDetail } from '../services/productService'

function Detail() {

const params = useParams()
const id = params.id

const [item, setItem] = useState<Product[]>([])


useEffect(() => {
if(id){
    productDetail(id).then(res =>{
       setItem(res.data.products)     
    })
}
}, [])

  return (
    <>
    
    {
      item && 

      <div className="row">
      <div className="col-sm-6">

      {
        item.map((i,index)=> 
        <div key={index}>
        <h2>{i.title}</h2>
        <p>Description : {i.title}</p>
        <p>Price : {i.price}$</p>
        <p>Brand : {i.brand}</p>
        <p>Stock : {i.stock}</p>
        <button className='btn btn-danger'><i className="bi bi-cart3"></i> Add Basket</button>
        </div>
        
        )
      }
       
      </div>
      <div className="col-sm-6">
         
      </div>
    </div>      
    }
    
    </>
  )
}

export default Detail