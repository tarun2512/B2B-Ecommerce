import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { publicRequest } from "../requestMethods";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("../img/login.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Link = styled.a`
  margin: 15px 0px;
  font-size: 18px;
  text-decoration: underline;
  cursor: pointer;
`;

const Register = () => {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
}
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(inputs);
    try {

      const res = await publicRequest.post("/auth/register", inputs);
      // console.log(res);
      if(res.statusText==="Registered Successful!")
  {  toast.success(res.statusText,{theme:"colored",autoClose: 1000} );
  }
  else 
  {
    if(res.status===500){
    toast.error("User Details already in use",{theme:"colored",autoClose: 2000} );}
   }
   } catch (err) {
    }
  
    };

  return (
    <Container>
      <ToastContainer/>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit} >
          {/* <Input placeholder="name" /> */}
          <Input placeholder="GST Number" name="gst" onChange={handleChange} pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$" title="Enter a valid GST number" required/>
          <Input placeholder="username" name="username" onChange={handleChange} required/>
          <Input placeholder="email" name="email" onChange={handleChange} required/>
          <Input placeholder="password"name="password" type="password" onChange={handleChange} required/>
          {/* <Input placeholder="confirm password" type="password"/> */}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button >CREATE</Button>
        </Form>
        <h3>Already have an account! <Link href="/login" >Login</Link>
        </h3></Wrapper>
    </Container>
  );
};

export default Register;
