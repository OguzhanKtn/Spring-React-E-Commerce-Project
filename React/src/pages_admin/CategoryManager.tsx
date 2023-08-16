import React, { useState, useEffect, FormEvent } from "react";
import { allCategories, categoryDelete, categorySave } from "../services/categoryService";
import { toast } from "react-toastify";
import { Category } from "../models/Category";
import { Button } from "reactstrap";

function CategoryManager() {
  const [categoryName, setCategoryname] = useState("");
  const [categories,SetCategories] = useState<Category[]>([])

  const sendForm = async (evt:FormEvent) => {
    evt.preventDefault()
   await categorySave(categoryName)?.then((res) => {
      if (res.data.status == true) {
        toast.success("Category Added !");
      } else {
        toast.error("Cannot Added !");
      }
    });
    const res = await allCategories()
    SetCategories(res.data.result)
  };

  useEffect( () => {
    allCategories().then(res =>{
      SetCategories(res.data.result)
    })
  }, [])

  const deleteCategory = async (cid:number)=>{
    await categoryDelete(cid).then(res=>{
      if(res.status==200){
        toast.success("Category deleted!")
      }else{
        toast.error("Cannot deleted!")
      }
     })

     const res = await allCategories()
     SetCategories(res.data.result)

  }
  

  return (
    <div className="container">
      <div className="col-sm-6">
        <form onSubmit={sendForm}>
          <div className="mb-3">
            <label className="form-label">Category Name</label>
            <input
              type="text"
              className="form-control"
              onChange={(evt) => setCategoryname(evt.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Category Name</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
                {categories.map((item,index)=>(
                <tr key={index}>
                <td>{item.name}</td>
                <td><Button className="btn btn-danger btn-sm" onClick={() => deleteCategory(item.cid)}>Delete</Button></td>
              </tr>       
                ))}    
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CategoryManager;
