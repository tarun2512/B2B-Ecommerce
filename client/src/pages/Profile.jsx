import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const User = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const UserDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const UserName = styled.span``;

const UserId = styled.span``;

const UserColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const UserSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UserAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const UserAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const UserPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Userdetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


const Userd= styled.p`
font-size: 20px;  
`;

const Profile = () => {
  const user= useSelector((state)=>state.user.currentUser)
  const [orde,setOrders]= useState([]);
  const orders = orde.filter(p=>p.userId===user._id);
 
  useEffect(() => {
    const getOrders= async()=>{
        try{
            const res= await axios.get("http://localhost:5000/api/orders");
            setOrders(res.data);
        } catch(err){}
    };
    getOrders();

  });

  
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR PROFILE</Title>
        <Userdetail>
                
                    <Userd>
                      <b>Username:</b> {user.username}
                    </Userd>
                    <Userd>
                      <b>Email-Id:</b> {user.email}
                    </Userd>
                    {/* <User>
                      <b>User-Type:</b> Buyer
                    </User> */}
        
                    </Userdetail>
       <Title>YOUR ORDERS</Title>
        <Top>
          <Link to="/"><TopButton>CONTINUE SHOPPING</TopButton></Link>
        </Top>
        <Bottom>
          <Info>
            {orders.map((ord) => (
              <User>
                <UserDetail>
                  {/* <Image src={User.img} /> */}
                  <Details>
                    <UserName>
                      <b>User:</b> {ord.pname}
                    </UserName>
                    <UserId>
                      <b>ID:</b> {ord._id}
                    </UserId>
                  </Details>
                </UserDetail>
                <PriceDetail>
                <Details>
                    <UserName>
                      <b>Quantity:</b> {ord.quantity}
                    </UserName>
                    <UserId>
                      <b>Status:</b> {ord.status}
                    </UserId>
                    </Details>
                  </PriceDetail>
              </User>
            ))}
            <Hr />
          </Info>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Profile;
