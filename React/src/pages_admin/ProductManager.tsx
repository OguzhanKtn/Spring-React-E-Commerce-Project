import React, { useState, useEffect, FormEvent } from "react";
import { Category } from "../models/Category";
import { allCategories } from "../services/categoryService";
import { allProducts, productDelete, productSave } from "../services/productService";
import { toast } from "react-toastify";
import { Product } from "../models/Product";
import { Button } from "reactstrap";
import { NavLink } from "react-router-dom";

function ProductManager() {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [cid, setCid] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [products,setProducts] = useState<Product[]>([])

  const getOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setCid(value);
  };

  useEffect(() => {
    allCategories().then((res) => {
      setCategories(res.data.result);
    });

    allProducts().then((res)=>{
      setProducts(res.data.products)
    })
  }, []);

  const sendForm = async (evt: FormEvent) => {
    evt.preventDefault();
    await productSave(title, brand, price, stock, cid).then((res) => {
      if (res.status == 200) {
        toast.success("Product has saved !");
      } else {
        toast.error("Product cannot save !");
      }
    });
    const res = await allProducts()
    setProducts(res.data.products)

  };

  const deleteProduct = async(pid:number) => {
    await productDelete(pid).then(res=>{
      if(res.status==200){
        toast.success("Product has deleted !")
      }else{
        toast.error("Cannot deleted !")
      }
    })
    const res = await allProducts()
    setProducts(res.data.products)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-3">
          <h4>Add Product</h4>
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
              <select
                onChange={getOption}
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>Select Category</option>
                {categories.map((item) => (
                  <option value={item.cid}>{item.name}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
        <div className="col-sm-9">
          <h4 className="text-center">Products</h4>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Brand</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
                <th scope="col">Delete</th>
                <th scope="col">Update</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr key={index}>
                  <td>{item.brand}</td>
                  <td>{item.title}</td>
                  <td>{item.price}$</td>
                  <td>{item.stock}</td>
                  <td><Button className="btn btn-danger btn-sm" onClick={()=> deleteProduct(item.pid)}>Delete</Button></td>
                  <td><NavLink to={"/updateproduct/"+item.pid} role="button" className="btn btn-warning btn-sm">Update</NavLink></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductManager;
