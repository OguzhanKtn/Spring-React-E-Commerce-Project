import axios from "axios";
import { Product } from "../models/Product";

const config = axios.create({
    baseURL : 'http://localhost:8090/',
    timeout: 15000
 })

 export const order = (uid:string,pid:number) =>{

    const sendObj = {
        uid:uid,
        pid:pid
        
    }
        return config.post('order/save',sendObj)
 }

 export const userOrders = (uid:string)=>{
    return config.get<Product>('order/listByUser/'+uid)
 }

 export const deleteOrder = (oid:number) =>{
    return config.get('order/delete/'+oid)
 }

 export const allOrders = ()=>{
   return config.get<Product>('order/listAll')
 }
