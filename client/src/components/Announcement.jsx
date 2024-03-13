import styled from "styled-components";

const Container = styled.div`
    height:30px;
    background-color: tomato;
    color:white;
    display: flex;
    align-items:center;
    justify-content:center;
    font-size:14px;
    font-weight:500;
`
const Announcemrent= () =>{
    return(
        <Container>
            Bulk items at best price! &nbsp; Grab your deal now!
        </Container>
    )
}
export default Announcemrent;