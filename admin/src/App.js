import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import OrderList from "./pages/orderList/OrderList";
import Order from "./pages/order/Order";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Analitics from "./pages/analitic/Analitic";
import Sales from "./pages/sales/Sales";
import {useSelector} from 'react-redux'
import ErrorPage from "./pages/ErrorPage";

function App() {
  const user= useSelector((state)=>state.user.currentUser);

  return (
    <Router>
      <Switch>
        <Route path="/login"><Login/></Route>
        <Route path="/register"><Register/></Route>
        {/* <Route path="/login"><Login/></Route> */}
      {user && (
      <>
      
      <Topbar />
      <div className="container">
        <Sidebar />
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/products">
            <ProductList />
          </Route>
          <Route path="/product/:productId">
            <Product />
          </Route>
          <Route path="/orders">
            <OrderList />
          </Route>
          <Route exact path="/analitics">
            <Analitics/>
          </Route>
          <Route exact path="/sales">
            <Sales/>
          </Route>
          <Route path="/order/:orderId">
            <Order />
          </Route>
          <Route path="/newproduct">
            <NewProduct />
          </Route>
               
      </div>
      </>
        )}</Switch>
    </Router>
  );
}

export default App;
