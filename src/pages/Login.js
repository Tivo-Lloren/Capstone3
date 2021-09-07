import React,{useState,useEffect,useContext} from "react";
//bootstrap
import {Form,Button,Container} from "react-bootstrap";
import Swal from "sweetalert2";
//React Context
import UserContext from "../UserContext";

import {Redirect,useHistory} from "react-router-dom";

export default function Login(){


	const {user,setUser} = useContext(UserContext)
	const history = useHistory();
	const [email,setEmail] = useState("");
	const [password,setPassword] = useState("");

	const [loginButton,setLoginButton] = useState(false)

	useEffect(()=>{
		if(email !== "" && password !== "")
	{
		setLoginButton(true)
	
	}else{
		setLoginButton(false)
	}
	}, [email,password,loginButton])

	const loginUser = e => {
	        e.preventDefault();


	        fetch(`${process.env.REACT_APP_CAPSTONE3BACKEND}/users/login`, {
	        	method: "POST",
	        	headers: {
	        		"Content-Type": "application/json"
	        	},
	        	body: JSON.stringify({
	        		email: email,
	        		password: password
	        	})
	        })
	        .then(response => response.json())
	        .then(data =>{
	        	console.log(data)

	        	
	        	if(data.accessToken !== undefined){
	        		localStorage.setItem("accessToken",data.accessToken);
	        		setUser({accessToken:data.accessToken})

	        		Swal.fire({
	        			title:"Yahoooooo!",
	        			icon: "success",
	        			text: "Thank you for logging into Furst Editions"
	        		})

	        		
	        		fetch(`${process.env.REACT_APP_CAPSTONE3BACKEND}/users/`,{
	        			headers:{
	        				Authorization: `Bearer ${data.accessToken}`
	        			}

	        		})
	        		.then(res=> res.json())
	        		.then(result=>{
	        			console.log(result)
	        			localStorage.setItem("email",result.email)
	        			localStorage.setItem("isAdmin",result.isAdmin)
	        			if(result.isAdmin === true){

	        				
	        				setUser({
	        					email:result.email,
	        					isAdmin:result.isAdmin
	        				})
	        				
	        				history.push("/")

	        			}else {
	        				
	        				history.push("/")
	        			}


	        		})

	        	}else {
	        		Swal.fire({
	        			title:"Ooops!",
	        			icon: "error",
	        			text:"Something went wrong, check your credentials"
	        		})

	        	}
	        	setEmail("")
	        	setPassword("")



	        })
  
	    } 

	    if(user.email !==null){
	    	return<Redirect to="/"/>
	    } 

	       return(
	       	<Container fluid>
	       	<h1>Login</h1>
	       	<Form onSubmit={e=>loginUser(e)}>
	       		<Form.Group>
	       			<Form.Label>Email Address:</Form.Label>
	       			<Form.Control type="email" placeholder="Enter email" value={email}onChange={e=> setEmail(e.target.value)} required />
	       			<Form.Text className="text-muted">
	       				We'll never share your email with any one else
	       			</Form.Text>
	       		</Form.Group>
	       		<Form.Group>
	       			<Form.Label>Password:</Form.Label>
	       			<Form.Control type="password" placeholder="Enter Password" value={password}onChange={e=> setPassword(e.target.value)}required />
	       		</Form.Group>
	       		{loginButton ?
	       			<Button variant="primary" type="submit">Submit</Button>:
	       			<Button variant="primary" type="submit" disabled>Submit</Button>
	       		}
	       	</Form>
	       	</Container>
	       		)
	       }
