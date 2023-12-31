import { User } from './models/User'
import { useNavigate } from 'react-router-dom'
import { decrypt } from './util'
import NavbarUser from './components/NavbarUser'


function UserControl(props:{item:JSX.Element}) {

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
          
           user!.role === "ROLE_user" &&     
           <>
            <NavbarUser user={user!} />
            {props.item}
            </>    
        }
    </>
  )
}

export default UserControl