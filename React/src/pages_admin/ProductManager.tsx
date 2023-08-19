import React, { useState, useEffect, FormEvent } from "react";
import { Category } from "../models/Category";
import { allCategories } from "../services/categoryService";
import { productSave } from "../services/productService";
import { toast } from "react-toastify";

function ProductManager() {

const [title, setTitle] = useState('')
const [brand, setBrand] = useState('')
const [price, setPrice] = useState('')
const [stock, setStock] = useState('')
const [cid,setCid] = useState('')
const[categories,setCategories] = useState<Category[]>([])

const getOption = (event:React.ChangeEvent<HTMLSelectElement>) =>{
  const value = event.target.value
  setCid(value)
}

useEffect(() => {
 allCategories().then(res =>{
  setCategories(res.data.result)
 })

}, [])

const sendForm = async (evt:FormEvent) =>{
evt.preventDefault()
await productSave(title,brand,price,stock,cid).then(res =>{
  if(res.status == 200){
    toast.success("Product has saved !")
  }else{
    toast.error("Product cannot save !")
  }
})
}



  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-3">
          <form onSubmit={sendForm}>
            <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              onChange={(evt) => setTitle(evt.target.value)}
            />
            </div>
            <div className="mb-3">
            <label className="form-label">Brand</label>
            <input
              type="text"
              className="form-control"
              onChange={(evt) => setBrand(evt.target.value)}
            />
            </div>
            <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="text"
              className="form-control"
              onChange={(evt) => setPrice(evt.target.value)}
            />
            </div>
            <div className="mb-3">
            <label className="form-label">Stock</label>
            <input
              type="text"
              className="form-control"
              onChange={(evt) => setStock(evt.target.value)}
            />
            </div>
            <div className="mb-3">
            <select onChange={getOption} className="form-select" aria-label="Default select example">
               <option selected>Category</option>
               {
                categories.map((item)=>(
                  <option value={item.cid}>{item.name}</option>
                ))
               }
               
            </select>
            </div>
            <button type="submit" className="btn btn-primary">
            Save
          </button>
          </form>
        </div>
        <div className="col-sm-9">

        </div>
      </div>
    </div>
  )
}

export default ProductManager