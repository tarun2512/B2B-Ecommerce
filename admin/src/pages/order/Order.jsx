import { Link, useLocation } from "react-router-dom";
import "./order.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { updateOrder } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

export default function Order() {
  const history = useHistory();

  const location = useLocation();
  const orderId = location.pathname.split("/")[2];
  
  const order = useSelector((state) =>
    state.order.orders.find((order) => order._id === orderId)
  );
  
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === order.productId)
  );

  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    setInputs(() => {
      return { [e.target.name]: e.target.value };
    });
  };
  console.log(inputs);

  const handleClick = (e) => {
    e.preventDefault();
    updateOrder(orderId,inputs, dispatch);
    history.push("/orders"); 
  }


  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Order</h1>
       </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Order id: </span>
              <span className="productInfoValue">{ order._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Product id: </span>
              <span className="productInfoValue">{ product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock.toString()}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Ordered Product Name</label>
            <input type="text" value={product.title} disabled/>
            <label>Product Description</label>
            <input type="text" value={product.desc} disabled/>
            {/* <label>Price</label>
            <input type="text" value={product.price} disabled/> */}
            <label>Ordered Color</label>
            <input type="text" value={order.pcolor} disabled/>
            <label>Ordered Size</label>
            <input type="text" value={order.psize} disabled/>
          </div>
          <div className="orderFormCenter">
          <label>Address</label>
            <input type="text" value={order.address.line1} disabled/>
            {/* <input type="text" value={order.address.line2} disabled/> */}
            <input type="text" value={order.address.city} disabled/>
            <input type="text" value={order.address.postal_code} disabled/>
            <input type="text" value={order.address.country} disabled/>
            <label>Ordered Quantity</label>
            <input type="text" value={order.quantity} disabled/>
            <label>Order Status</label>
            <select name="status" id="status"  onChange={handleChange}>
              <option value={order.status}>{order.status}</option>
              <option value="dispached">Dispached</option>
              <option value="completed">Completed</option>
              <option value="cancel">Cancel</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              </div>
            <button className="productButton" onClick={handleClick}>Update Order Status</button>
          </div>
        </form>
      </div>
    </div>
  );
}
