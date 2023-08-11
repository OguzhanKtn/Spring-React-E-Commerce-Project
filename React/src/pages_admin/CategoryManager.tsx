import React,{useState,useEffect, FormEvent} from 'react'
import { categorySave } from '../services/adminService'
import { toast } from 'react-toastify'

function CategoryManager() {

  const [categoryName, setCategoryname] = useState('')

const sendForm = (evt:FormEvent)=>{
    evt.preventDefault()
    categorySave(categoryName)?.then(res=>{
        if(res.data.status == true){
            toast.success("Category Added !")
        }else{
            toast.error("Cannot Added !")
        }
    })
}
 
  return (
    <div className='container'>
        <div className="col-sm-6">
        <form onSubmit={sendForm}>
            <div className="mb-3">
                <label className="form-label">Category Name</label>
                <input type="text" className="form-control" onChange={(evt)=> setCategoryname(evt.target.value)}/>
            </div>
             <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    </div>
  )
}

export default CategoryManager