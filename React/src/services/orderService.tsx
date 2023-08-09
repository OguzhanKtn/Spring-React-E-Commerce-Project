import axios from "axios";

const config = axios.create({
    baseURL : 'http://localhost:8090/',
    timeout: 15000
 })

 export const order = (uid:string,pid:number,title:string,brand:string,price:number,stock:number) =>{

    const sendObj = {
        uid:uid,
        products : [
            {
                id:pid,
                title:title,
                brand:brand,
                price:price,
                stock:stock
            }
        ]
    }
        return config.post('order/save',sendObj)
 }