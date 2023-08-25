import React,{FormEvent, useEffect, useState} from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import { User } from '../models/User'
import { Category } from '../models/Category'
import { allCategories } from '../services/categoryService'
import { toast } from 'react-toastify'

function NavbarUser(item:{user:User}) {

  const navigate = useNavigate()

  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
  allCategories().then(res =>{
  setCategories(res.data.result)
  }).catch((error) =>{
    toast.error(error.name)
  })
     
  }, [])
  
  const logout = () =>{
    sessionStorage.removeItem('user')
    navigate('/')
  }

  const sendForm = (evt:FormEvent) =>{
    evt.preventDefault()
    
  }

  return (
  <div className="container">
 <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           Categories
          </a>
          <ul className="dropdown-menu">
            {categories.map((item,index)=>(
               <li><NavLink to={"/category/"+item.cid} className="dropdown-item" key={index} >{item.name}</NavLink></li>
            ))}
           
          </ul>
        </li>
              <li className="nav-item">
                <a className="nav-link" role="button" onClick={logout}>
                  Logout
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled">{item.user && item.user.name} {item.user && item.user.surname}</a>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={sendForm}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
  </div>
     
  )
}

export default NavbarUser