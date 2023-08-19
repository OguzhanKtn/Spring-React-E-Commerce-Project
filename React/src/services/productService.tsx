
import axios from "axios";
import { Product } from "../models/Product";
import { Image } from "../models/Image";

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

export const productDetail = (id:string) => {
   return config.get<Product>('product/detail/'+id)
}

export const productImages = (id:string) =>{
   return config.get<Image>('https://dummyjson.com/products/'+id)
}

export const productSave = (title:string,brand:string,price:string,stock:string,cid:string) => {
 const sendObj= {
      title:title,
      brand:brand,
      price:price,
      stock:stock,
      cid:cid
   }
   return config.post('product/save',sendObj)
}