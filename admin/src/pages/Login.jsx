import { useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
// import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory, Link } from "react-router-dom";
import "./login.css";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  color: red;
`;

export default function Login() {

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
    <div style={{width: '100vw',  
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    
  }} className="login">
    <div  className="col">
      <ToastContainer/>
      <h1>Sign IN</h1><br></br>
      <form>
        <input style={{ padding: 10, marginBottom: 20 }}
        type="text" placeholder="username"   onChange={(e) => setUsername(e.target.value)}></input>
        <br></br><input  style={{ padding: 10, marginBottom: 20 }} type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}
          ></input>
      </form>
      <button  class="Button" style={{ padding: 10, width:100 }}  onClick={handleClick} disabled={isFetching}>Login</button>
      {/* {error && <span>Something went wrong...</span>} */}
      <br></br>
      <br></br>
      <Link to="/register" >CREATE A NEW ACCOUNT</Link>
    </div>
    </div> 
  );
};

