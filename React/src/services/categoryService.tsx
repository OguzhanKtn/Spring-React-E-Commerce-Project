import axios from "axios";
import { Category } from "../models/Category";

 const config = axios.create({
    baseURL : 'http://localhost:8090/',
    timeout: 15000
 })

 export const allCategories = () =>{
    return config.get<Category>('category/list')
 }

 export const categorySave = (name:string) => {
    
   const sendObj = {
       name:name
   }
   
       return config.post('category/save',sendObj) 
 }

 export const categoryDelete = (cid:number) =>{
   return config.get('category/delete/'+cid)
 }