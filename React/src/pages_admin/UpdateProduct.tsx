import React, { useState, useEffect, FormEvent } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Product } from "../models/Product";
import { productDetail, productUpdate } from "../services/productService";
import { toast } from "react-toastify";

function UpdateProduct() {
const [title, setTitle] = useState("");
const [brand, setBrand] = useState("");
const [price, setPrice] = useState("");
const [stock, setStock] = useState("");
const [product,setProduct] = useState<Product>()

const navigate = useNavigate();
const params = useParams();
const id = params.id;

useEffect(() => {
  productDetail(id!).then(res=>{
    setProduct(res.data)
    setTitle(res.data.title)
    setBrand(res.data.brand)
  })
}, [])

const sendForm = async(evt:FormEvent)=>{
    evt.preventDefault()
    await productUpdate(id!,title,brand,price,stock).then(res=>{
        if(res.status=200){
            navigate("/productmanager")
        }else{
            toast.error("Cannot updated !")
        }
    })
}


  return (
    <div className="container">
        <div className="col-sm-6">
        <form onSubmit={sendForm}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                value={product?.title}
                disabled
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Brand</label>
              <input
                type="text"
                value={product?.brand}
                disabled
                className="form-control"
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
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
    </div>
  )
}

export default UpdateProduct