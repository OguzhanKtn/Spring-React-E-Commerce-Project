import React, { useEffect, useState } from "react";
import { deleteOrder, order, userOrders } from "../services/orderService";
import { decrypt } from "../util";
import { useNavigate } from "react-router-dom";
import { User } from "../models/User";
import { Product} from "../models/Product";
import { Button } from "reactstrap";
import { toast } from "react-toastify";

function Basket() {

    const navigate = useNavigate();
    const [orders, setOrders] = useState<Product[]>([]);
    const [totalPrice,setTotalPrice] = useState(Number)

    const session = sessionStorage.getItem("user")
    let total = 0
  
    useEffect(() => {
      if (session) {
        var user: User;
        const plainText = decrypt(session)
        user = JSON.parse(plainText) as User
            userOrders(user.uid).then(res =>{
              setOrders(res.data.products)
              res.data.products.map((item) => {
                total += item.quantity * item.price;
            });  
            setTotalPrice(total);
            })
                           
      } else {
        navigate("/login");
      } 
    }, []);

   
    const cancelOrder = async (oid: number) => {

      await deleteOrder(oid);
      var user: User;
      const plainText = decrypt(session!);
      user = JSON.parse(plainText) as User;
    
      const res = await userOrders(user.uid);
      setOrders(res.data.products);
        
      res.data.products.map((item) => {
          total += item.quantity * item.price;
      });
    
      setTotalPrice(total);

      if(orders.length >0){
        toast.success("One product has removed !")
      }else{
        toast.warning("No any product in basket !")
      }
    };


    
  return (
    <div>
 <>
      {orders.length > 0 && (
        <div className="container">
          <div className="col-sm-6">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Brand</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item,index)=>(
                <tr key={index}>
                  <th scope="row">{item.brand}</th>
                  <td>{item.title}</td>
                  <td>{item.price} $</td>
                  <td>{item.quantity}</td>
                  <td><Button className="btn btn-danger btn-sm" onClick={()=> cancelOrder(item.oid)}>Delete</Button></td>
                </tr>
              ))}         
            </tbody>
          </table>
          </div>
          <div className="col-sm-6">
            <h4>Total Price : {totalPrice!} $</h4>
          </div>
        </div>
      )}
  </>

    </div>
  )
}

export default Basket