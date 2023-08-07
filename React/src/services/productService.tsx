
import axios from "axios";
import { Product } from "../models/Product";

const config = axios.create({
    baseURL : 'http://localhost:8090/',
    timeout: 15000
 })

 export const allProducts = () =>{
    return config.get<Product>('product/listAllProducts')
 }

 export const productByCategory = (id:number) => {

    return config.get<Product>('product/listByCategory/'+id)
 }