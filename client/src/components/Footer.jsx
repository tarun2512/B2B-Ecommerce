import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
    display:flex;
    ${mobile({ flexDirection: "column" })}

`
const Left = styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    padding:20px;
`

const Logo = styled.h2``;

const Desc = styled.p`
    margin:20px 0px;
`;
const SocialContainer = styled.div`
    display:flex;
`;
const SocialIcon = styled.div`
    width:40px;
    height:40px;
    border-radius:50%;
    color:white;
    background-color: #${props=>props.color};
    display:flex;
    align-items:center;
    justify-content:center;
    margin-right:20px;
`;

const Center = styled.div`
    flex:1;
    padding:20px;
    ${mobile({ display: "none" })}
`

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}

`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;


const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>B2B Ecom</Logo>
                <Desc>
                There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
                </Desc>
                <SocialContainer>
                    <SocialIcon color="3B5999">
                        <Facebook />
                    </SocialIcon>
                    <SocialIcon color="E4405F">
                        <Instagram />
                    </SocialIcon>
                    <SocialIcon color="55ACEE">
                        <Twitter />
                    </SocialIcon>
                    <SocialIcon color="E60023">
                        <Pinterest />
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem><Link to="/" style={{textDecoration:"None"}}>Home</Link></ListItem>
          <ListItem><Link to="/products" style={{textDecoration:"None"}}>Products</Link></ListItem>
          <ListItem><Link to="/cart" style={{textDecoration:"None"}}>Cart</Link></ListItem>
          <ListItem><Link to="/products/men" style={{textDecoration:"None"}}>Man Fashion</Link></ListItem>
          <ListItem><Link to="/products/women" style={{textDecoration:"None"}}>Woman Fashion</Link></ListItem>
          <ListItem><Link to="/products/kids" style={{textDecoration:"None"}}>Kids Fashion</Link></ListItem>
          {/* <Link to="/"><ListItem>My Account</ListItem></Link> */}
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{marginRight:"10px"}}/> Hospet, India.
        </ContactItem>
        <ContactItem>
          <Phone style={{marginRight:"10px"}}/> +91 1234 567 890
        </ContactItem>
        <ContactItem>
          <MailOutline style={{marginRight:"10px"}} /> contact@b2becm.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
    )
}

export default Footer;