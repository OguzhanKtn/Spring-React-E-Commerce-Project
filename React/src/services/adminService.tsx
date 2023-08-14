import axios from "axios";

const config = axios.create({
    baseURL : 'http://localhost:8090/',
    timeout: 15000,
 })

 export const categorySave = (name:string) => {
    
    const sendObj = {
        name:name
    }
    
        return config.post('category/save',sendObj)
 
  }