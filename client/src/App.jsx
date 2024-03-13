import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Chart from "./pages/Chart";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";

const App =() =>{
    const user= useSelector((state)=>state.user.currentUser)
    return (
        <Router>
            <Routes>
                <Route path="/" element={user ? <Home/>:<Navigate to="/login"/>}/>
                <Route path="/products/:category" element={user ? <ProductList/>:<Navigate to="/login"/>}/>
                <Route path="/products/" element={user ? <ProductList/>:<Navigate to="/login"/>}/>
                <Route path="/product/:id" element={user ? <Product/>:<Navigate to="/login"/>}/>
                <Route path="/cart" element={user ? <Cart/>:<Navigate to="/login"/>}/>
                <Route path="/login" element={user ? <Navigate to="/" /> : <Login />}/>
                <Route path="/register" element={user ? <Navigate to="/" /> : <Register />}/>
                <Route path="/success" element={user ? <Success/>:<Navigate to="/login"/>}/>
                <Route path="/chart" element={user ? <Chart/>:<Navigate to="/login"/>}/>
                <Route path="/profile" element={user ? <Profile/>:<Navigate to="/login"/>}/>
            </Routes>
        </Router>
    );
};

export default App;