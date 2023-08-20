import React, { useEffect, useState } from 'react'
import { Product } from '../models/Product'
import { allOrders } from '../services/orderService'

function OrderList() {

  const [orders, setOrders] = useState<Product[]>([])

  useEffect(() => {
   allOrders().then(res=>{
    setOrders(res.data.products)
   })
  }, [])
  

  return (
   <div className="container">
    <h4 className='text-center'>Orders of Users</h4>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">User</th>
      <th scope="col">Brand</th>
      <th scope="col">Title</th>
      <th scope="col">Price</th>
      <th scope="col">Stock</th>
      <th scope="col">Quantity</th>
    </tr>
  </thead>
  <tbody>
    {
      orders.map((item)=>(
        <tr>
        <td>{item.email}</td>
        <td>{item.brand}</td>
        <td>{item.title}</td>
        <td>{item.price}</td>
        <td>{item.stock}</td>
        <td>{item.quantity}</td>
      </tr>
      ))
    } 
  </tbody>
</table>
   </div>
  )
}

export default OrderList