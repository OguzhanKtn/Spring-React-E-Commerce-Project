import React from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from './models/User'
import { decrypt } from './util'
import NavbarAdmin from './components/NavbarAdmin'

function AdminControl(props:{item:JSX.Element}) {

const navigate = useNavigate()
const stSession = sessionStorage.getItem('user')


var user:User

if(stSession !== null){
    try{
        const plainText = decrypt(stSession)
        user = JSON.parse(plainText) as User
    }catch(error){
        sessionStorage.removeItem('user')
        navigate('/')
    }
}


  return (
    <>
        {
          
           user!.role === "ROLE_admin" &&     
           <>
            <NavbarAdmin user={user!} />
            {props.item}
            </>    
        }
    </>
  )
}

export default AdminControl