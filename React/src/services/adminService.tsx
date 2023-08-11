import axios from "axios";
import { decrypt } from "../util";
import { User } from "../models/User";


const config = axios.create({
    baseURL : 'http://localhost:8090/',
    timeout: 15000
 })

 export const categorySave = (name:string) => {

    const session = sessionStorage.getItem('user') 
    var user:User
    const plainText = decrypt(session!)
    user = JSON.parse(plainText) as User

    const email = user.email
    const password = user.password
    console.log(user)
    
    const sendObj = {
        name:name
    }

    const credentials = window.btoa(`${email}:${password}`);
    try {
        return config.post('category/save',sendObj, {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });
    } catch (error) {
      console.error(error);
      
    }
  };