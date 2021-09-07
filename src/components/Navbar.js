
import { Nav, Navbar } from "react-bootstrap";
import React,{useContext} from "react"
import {Link,NavLink,useHistory} from "react-router-dom";

//React Context
import UserContext from "../UserContext";

export default function NavBar() {
  
  const history = useHistory();

  const {user,unsetUser} = useContext(UserContext);
  console.log(user)

  const logout = ()=>{
    unsetUser();
    
    history.push("/login")

  }

  let rightNav = (user.email !== null) ?
  (
    <>
   {user.isAdmin === true ?
    <Nav.Link onClick={logout}>Logout</Nav.Link>
    : 
    <>
    <Nav.Link as={NavLink} to="/myorder">My Order</Nav.Link>
    <Nav.Link as={NavLink} to="/carts">Cart</Nav.Link>
    <Nav.Link onClick={logout}>Logout</Nav.Link>
    </>
   }
   </>
     
  )
  :
  (
    <>
    <Nav.Link as={NavLink} to="/Login">Login</Nav.Link>
    <Nav.Link as={NavLink} to="/Register">Register</Nav.Link>
    </>
  )

  return (
    <Navbar className="nav-container" expand="lg">
      <Navbar.Brand as={Link} to="/" className="ml-3 nav-logo">
        Furst Editions
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/Products">Products</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          {rightNav}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}