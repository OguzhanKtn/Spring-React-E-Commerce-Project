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

    const session = sessionStorage.getItem("user");
  
    useEffect(() => {
      if (session) {
        var user: User;
        const plainText = decrypt(session);
        user = JSON.parse(plainText) as User;
        userOrders(user.uid).then((res) => {
          setOrders(res.data.products);
        });
      } else {
        navigate("/login");
      }
    }, []);
  
    const cancelOrder = (oid:number) => { 
        deleteOrder(oid).then(res=>{   
          setOrders(orders => orders.filter((u) => u.oid !== oid))
          toast.warning("Product has removed from your basket !")   
        })
        
    }

  return (
    <div>
 <>
      {orders && (
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Brand</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item,index)=>(
                <tr key={index}>
                  <th scope="row">{item.brand}</th>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td><Button className="btn btn-danger btn-sm" onClick={()=> cancelOrder(item.oid)}>Delete</Button></td>
                </tr>
              ))}
                
            </tbody>
          </table>
        </div>
      )}
    </>

    </div>
  )
}

export default Basket