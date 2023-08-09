import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productDetail, productImages } from "../services/productService";
import { Product } from "../models/Product";
import { Image } from "../models/Image";
import { User } from "../models/User";
import { decrypt } from "../util";
import { order } from "../services/orderService";
import { toast } from "react-toastify";

function Detail() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const [item, setItem] = useState<Product>();
  const [image, setImage] = useState("");
  const [imgPrd, setImgprd] = useState<Image>();

  useEffect(() => {
    if (id) {
      productDetail(id).then((res) => {
        console.log(res.data)
        setItem(res.data);
      });
    }
  }, []);

  useEffect(() => {
    if (id) {
      productImages(id).then((res) => {
        setImgprd(res.data);
        setImage(res.data.images[0]);
      });
    }
  }, []);

const addBasket = (pid:number) => {
  const stSession = sessionStorage.getItem('user')
  if(stSession == null){
    navigate("/login")
  }else {
    var user:User
    const plainText = decrypt(stSession)
    user = JSON.parse(plainText) as User
    order(user.uid,pid).then(res =>{
      toast.success("Product added in your basket")
    })
  }
}

  return (
    <>
      {item && (
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-4">
            <h2>{item.title}</h2>
            <p>Description : {item.title}</p>
            <p>Price : {item.price}$</p>
            <p>Brand : {item.brand}</p>
            <p>Stock : {item.stock}</p>
            <button className="btn btn-danger" onClick={()=> addBasket(item.pid)}>
              <i className="bi bi-cart3"></i> Add Basket
            </button>
          </div>
          <div className="col-sm-6">
            <img src={image} className="img-fluid img-thumbnail" />
          </div>
        </div>
      )}
      {imgPrd && (
        <div className="row">
          <div className="col-sm-6"></div>
          <div className="col-sm-6">
            <div className="row mt-3">
              {imgPrd.images.map((item, index) => (
                <div
                  className="col-2"
                  key={index}
                  role="button"
                  onClick={() => setImage(item)}
                >
                  <img src={item} className="img-thumbnail" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Detail;
