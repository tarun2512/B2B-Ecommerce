import { useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
// import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory, Link } from "react-router-dom";
import { publicRequest, userRequest } from "../requestMethods";

import "./login.css";



export default function Register() {

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
}
  const handleSubmit = async (event) => {
    event.preventDefault();
    inputs.isAdmin=true;
    // console.log(inputs);
    try {

      const res = await publicRequest.post("/auth/register", inputs);
      // console.log(res);
      if(res.statusText==="Registered Successful!")
  {  toast.success(res.statusText,{theme:"colored",autoClose: 1000} );
  }
  else 
  {
    const ero="User Details already in use";
    // if(res.status===500){
    toast.error(ero,{theme:"colored",autoClose: 2000} );}
    } catch (err) {
    }
  
    };
  return (
    <div className="Container">
      <ToastContainer/>
    <div className="Wrapper">
      <h1 className="Title">CREATE AN ACCOUNT</h1>
      <form className="Form" onSubmit={handleSubmit} >
        {/* <input className="input" name="name" placeholder="name"  onChange={handleChange} /> */}
        <input className="input" name="gst" placeholder="GST Number"  onChange={handleChange} pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$" title="Enter a valid GST number" required/>
        <input className="input" name="username" placeholder="username"  onChange={handleChange} required/>
        <input className="input" name="email" placeholder="email"  onChange={handleChange} required/>
        <input className="input" name="password" placeholder="password" type="password"  onChange={handleChange} required/>
        {/* <input className="input" placeholder="confirm password" type="password"  onChange={handleChange} /> */}
        <span classNmae="Agreement">
          By creating an account, I consent to the processing of my personal
          data in accordance with the <b>PRIVACY POLICY</b>
        </span>
        <button className="Button">CREATE</button>
      </form>
      <h3>Already have an account <Link to="/login" >Login</Link></h3>
    </div>
  </div>

  );
};

