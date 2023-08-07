import axios from "axios";
import { Category } from "../models/Category";

 const config = axios.create({
    baseURL : 'http://localhost:8090/',
    timeout: 15000
 })

 export const allCategories = () =>{
    return config.get<Category>('category/list')
 }