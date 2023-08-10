import React from 'react'
import { User } from '../models/User'
import { NavLink, useNavigate } from 'react-router-dom'


function NavbarAdmin(item:{user:User}) {

  const navigate = useNavigate()

  const logout = () =>{
    sessionStorage.removeItem('user')
    navigate('/')
  }

  return (
    <div className="container">
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
           <div className="container-fluid">
             <a className="navbar-brand" href="/dashboard">
               Dashboard
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
                 <li className="nav-item">
                   <a className="nav-link" role="button" onClick={logout}>
                     Logout
                   </a>
                 </li>
                 <li className="nav-item">
                   <a className="nav-link disabled">{item.user && item.user.name} {item.user && item.user.surname}</a>
                 </li>    
               </ul>
               <form className="d-flex" role="search">
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

export default NavbarAdmin