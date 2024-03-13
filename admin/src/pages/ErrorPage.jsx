import { useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
// import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function ErrorPage() {

 const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
 

  const { isFetching, error } = useSelector((state) => state.user);

  const user= useSelector((state)=>state.user.currentUser);

  const handleClick = (e) => {
    e.preventDefault();
     login(dispatch, { username, password });
     setTimeout(() => {
      history.push('/')
    }, 2000)
  
  //       if(user.statusMessage==="Login Successful!"){
  //         toast.success(user.statusMessage,{theme:"colored"} );
  //       }
  //       else{
  //         toast.error(user.statusMessage,{theme:"colored"});
  //       }
  };
  return (
    <div className="login">
      <ToastContainer/>
      <Link to=""><button>Login</button></Link>
      <Link to="/"><button>Homepage</button></Link>
    </div> 
  );
};

