import { Badge } from "@material-ui/core";
import {  ShoppingCartOutlined,HomeOutlined,PowerSettingsNewOutlined,ShopOutlined,AccountCircleRounded, ShowChartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logingout } from "../redux/apiCalls";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "0px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 5px;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h2`
  font-weight: bold;
  ${mobile({ fontSize: "16px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 2px;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;


const Navbar=()=>{
  const quantity =useSelector(state=>state.cart.quantity);
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    logingout(dispatch);
  };

    return(
        <Container>
            <Wrapper>
                <Left>
                <Link to="/"><HomeOutlined style={{padding:"3px", margin:"0px 2px"}} fontSize="medium" /></Link>
                <Link to="/products"><ShopOutlined style={{padding:"3px", margin:"0px 2px"}} fontSize="medium" /></Link>
                </Left>
                <Center>
                    <Logo>B2B Ecom</Logo>
                </Center>
                <Right>
                    <Link to="/cart">
                    <MenuItem>
                        <Badge badgeContent={quantity} color="primary">
                        <ShoppingCartOutlined style={{padding:"3px"}} fontSize="medium" />
                        </Badge>
                    </MenuItem>
                    </Link>
                    <Link to="/chart"><ShowChartOutlined style={{margin:"0px 2px"}}/></Link> 
                    <PowerSettingsNewOutlined onClick={handleClick}  fontSize="medium" style={{margin:"0px 2px"}} disabled={isFetching}/>
                    <Link to="/profile"><AccountCircleRounded style={{margin:"0px 2px"}} fontSize="medium"/></Link>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar