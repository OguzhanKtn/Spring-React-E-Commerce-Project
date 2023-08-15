import React, { useState, useEffect, FormEvent } from "react";
import { allCategories, categorySave } from "../services/categoryService";
import { toast } from "react-toastify";
import { Category } from "../models/Category";

function CategoryManager() {
  const [categoryName, setCategoryname] = useState("");
  const [categories,SetCategories] = useState<Category[]>([])

  const sendForm = (evt: FormEvent) => {
    evt.preventDefault();
    categorySave(categoryName)?.then((res) => {
      if (res.data.status == true) {
        toast.success("Category Added !");
      } else {
        toast.error("Cannot Added !");
      }
    });
  };

  useEffect(() => {
    allCategories().then(res=>{
        SetCategories(res.data.result)
    })
  }, [])
  

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
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
                {categories.map((item,index)=>(
                <tr key={index}>
                <td>{item.name}</td>
                <td></td>
                <td>@mdo</td>
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
