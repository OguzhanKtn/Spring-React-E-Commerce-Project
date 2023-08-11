import React ,{FormEvent,useState}from 'react'
import { login } from '../services/loginService'
import { NavLink, useNavigate } from 'react-router-dom'
import { encrypt } from '../util'


function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const sendForm = async (evt:FormEvent) =>{
        evt.preventDefault()
       await login(email,password).then(res =>{
        const stData = JSON.stringify(res.data.result)
        const cipherText = encrypt(stData)
        sessionStorage.setItem('user',cipherText)
        console.log(res.data.result)
        if(res.data.result.role == "ROLE_user"){
          navigate('/profile')
        }else if(res.data.result.role == "ROLE_admin"){
          navigate('/dashboard')
        }
        })
    }

  return (
    <div className='container' id='login'>    
         <form className="form-signin" onSubmit={sendForm}>
          <div className="text-center">
          <img className="mb-4" src="https://cdn-icons-png.flaticon.com/512/2170/2170153.png" alt="" width="72" height="72" />
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          </div>   
            <label className="sr-only">Email address</label>
            <input type="email" className="form-control" placeholder="Email address" required onChange={(evt) => setEmail(evt.target.value)} />
            <label className="sr-only">Password</label>
            <input type="password" name="password" id="password" className="form-control" placeholder="Password" required onChange={(evt) => setPassword(evt.target.value)} />
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            <NavLink to={"/register"} className="btn btn-lg btn-success btn-block">Register</NavLink>
            <p className="mt-5 mb-3 text-muted">&copy; İstanbul Eğitim Akademi</p>
        </form>      
    </div>
     
  
  )
}

export default Login