import axios from "axios";

const config = axios.create({
    baseURL : 'http://localhost:8090/',
    timeout: 15000
 })

 export const register = (name:string,surname:string,email:string,password:string) => {

    const sendObj = {
        name : name,
        surname : surname,
        email : email,
        password : password,
        roles : [{"rid":2}]
    }

    return config.post('user/register',sendObj)
 }