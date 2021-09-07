
import NavBar from "./components/Navbar"
import Home from "./pages/Home";
import {Fragment,useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductPage from "./pages/ProductPage";
//routing components
import {BrowserRouter as Router} from "react-router-dom";
import {Route,Switch,Redirect} from "react-router-dom";
import NotFound from "./pages/NotFound";
//React Context
import UserContext from "./UserContext";
import SpecificProduct from "./pages/SpecificProduct";
import OrderPage from "./pages/OrderPage";
import CartPage from "./pages/CartPage"



function App() {

  const[user,setUser] = useState({
    
    email: localStorage.getItem("email"),
    accessToken: localStorage.getItem("accessToken"),
    isAdmin: localStorage.getItem("isAdmin") === "true"
  });

  const unsetUser = ()=>{
    localStorage.clear();
    setUser({
      email:null,
      accessToken:null,
      isAdmin:null
    })
  };

  return (
    <Fragment>
      <UserContext.Provider value={{user,setUser,unsetUser}}>
        <Router>
          <NavBar />
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/Login" component={Login}/>
              <Route exact path="/Register">
                {user.email !== null ? <Redirect to="/"/>:<Register/>}
              </Route>

              <Route exact path="/products" component={ProductPage}/>
              <Route exact path="/products/:productId" component={SpecificProduct} />
              <Route exact path="/myorder">
                {user.email === null ? <Redirect to="/"/>:<OrderPage/>}
              </Route>
              <Route exact path="/carts">
                {user.email === null ? <Redirect to="/"/>:<CartPage/>}
              </Route>
              <Route component={NotFound} />
              
            </Switch>
        </Router>
      </UserContext.Provider>
    </Fragment>
  );
}

export default App;
