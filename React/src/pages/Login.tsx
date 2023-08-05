import React ,{FormEvent,useState}from 'react'
import { login } from '../services/loginService'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const sendForm = async (evt:FormEvent) =>{
        evt.preventDefault()
       await login(email,password).then(res =>{
           console.log(res.data)
        })
    }

  return (
    <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
            <h2>Login</h2>
            <form onSubmit={sendForm}>
            <div className="mt-3">
                <input  required onChange={(evt) => setEmail(evt.target.value)} className='form-control' type='email' placeholder='email' />
            </div>
            <div className="mt-3">
                <input  required onChange={(evt) => setPassword(evt.target.value)} className='form-control' type='password' placeholder='password' />
            </div>
            <button className='btn btn-danger mt-3'>Send</button>
            </form>     
        </div>
        <div className="col-sm-4"></div>
    </div>
  )
}

export default Login