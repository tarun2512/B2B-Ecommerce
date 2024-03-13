import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import {updateProduct} from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useHistory } from 'react-router-dom';

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const history = useHistory();

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a,b)=>{
            return a._id - b._id
        })
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [col, setCol] = useState([]);
  const [siz, setSiz] = useState([]);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };
  const handleCol = (e) => {
    setCol(e.target.value.split(","));
  };
  const handleSiz = (e) => {
    setSiz(e.target.value.split(","));
  };


  const user= useSelector((state)=>state.user.currentUser)
  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, img: downloadURL, categories: cat, color: col, size: siz, adminid: user._id };
          const noti=updateProduct(productId,product, dispatch);
          console.log(noti.res);
          console.log(noti.then());
          console.log(noti["PromiseResult"]);
          noti.then(
            toast("Product updated successfully!")
        )
        noti.catch(
          toast("Product Update failed!")
        
        )
        });
      }
    );
    history.push("/products"); 

  };

  return (
    <div className="product">
      <ToastContainer />
      <div className="productTop">
        {/* <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div> */}
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock.toString()}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form onSubmit={handleClick} className="productForm" >
          <div className="productFormLeft">
            <label>Product Name</label>
            <input name="title" type="text" placeholder={product.title} onChange={handleChange} />
            <label>Product Description</label>
            <input name="desc" type="text" placeholder={product.desc} onChange={handleChange}/>
            <label>Price</label>
            <input name="price" type="number" placeholder={product.price} onChange={handleChange}/>
            <label>In Stock</label>
            <select name="inStock" id="idStock" onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormCenter">
          <label>Categories</label>
          <input type="text" placeholder={product.categories} onChange={handleCat} required />
          <label>Size</label>
          <input type="text" placeholder={product.size} onChange={handleSiz} required />
            <label>Color</label>
          <input type="text" placeholder={product.color} onChange={handleCol} required />
          </div>
          <div className="productFormRight">
            <p>Download and Upload the image to Update Product. Download <a href={product.img} target="_blank" download>Here</a>.</p>
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <input required type="file" id="file" onChange={(e) => setFile(e.target.files[0])}/>
            </div>
            <button type="submit" className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
