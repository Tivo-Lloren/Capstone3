import React,{useState,useEffect} from "react";
//bootstrap
import {Form,Button,Container} from "react-bootstrap";
import Swal from "sweetalert2";
import {useHistory} from "react-router-dom";
import UserContext from "../UserContext";


export default function Register(){

	const [firstName,setFirstName] = useState("");
	const [lastName,setLastName] = useState("");
	const [email,setEmail] = useState("");
	const [password,setPassword] = useState("");
	const [verifyPassword,setVerifyPassword] = useState("");

	const [notificationMsg,setNotificationMsg] = useState("");
	const [registerButton,setRegisterButton] = useState(false);
	//const {user} = useContext(UserContext);
	const history = useHistory();

	
	useEffect(()=>{
		if(firstName !== "" && lastName !== "" && email !== "" && password !== "" &&  verifyPassword !== "" && password === verifyPassword)
	{
		setRegisterButton(true);
		setNotificationMsg("");
	
	}else if(password !== "" && verifyPassword !== "" && password !== verifyPassword){
		setRegisterButton(false);
		setNotificationMsg("password does not match");
	}else {
		setRegisterButton(false);
		setNotificationMsg("");
	}
	}, [firstName,lastName,email,password,verifyPassword,registerButton])


	useEffect(()=>{
		console.log(email);
	}, [email]);

	useEffect(()=>{
		console.log(password);
	}, [password]);

	useEffect(()=>{
		console.log(verifyPassword);
	}, [verifyPassword]);

	const registerUser = e => {
	        e.preventDefault();

	        fetch(`${process.env.REACT_APP_CAPSTONE3BACKEND}/users/register`,{
	        	method: "POST",
	        	headers:{
	        		"Content-Type":"application/json"
	        	},
	        	body: JSON.stringify({
	        		firstName: firstName,
	        		lastName: lastName,
	        		email: email,
	        		password: password
	        	})
	        })
	        .then(res=> res.json())
	        .then(result=>{
	        	console.log(result)
	        	if(result.error){

	        		setNotificationMsg("Email already exists");
	        	}else {
	        		console.log(result);
	        		Swal.fire({
	        			title: "Yaaaay registered!!!",
	        			icon: "success",
	        			text: "You have successfully registered"
	        		})
	        		resetForm();
	        		history.push("/")
	        	}

	    } )

}
	const resetForm = ()=>{
		setFirstName("");
		setLastName("");
		setEmail("");
		setPassword("");
		setVerifyPassword("");
	}

	return(
	<Container fluid>
	<h1>Register</h1>
	<Form onSubmit={e=>registerUser(e)}>
	<div className="mb-3 text-danger">{notificationMsg}</div>
		<Form.Group>
			<Form.Label>First Name:</Form.Label>
			<Form.Control type="text" placeholder="First Name" value={firstName}onChange={e=> setFirstName(e.target.value)} required />
		</Form.Group>

		<Form.Group>
			<Form.Label>Last Name:</Form.Label>
			<Form.Control type="text" placeholder="Last Name" value={lastName}onChange={e=> setLastName(e.target.value)} required />
		</Form.Group>

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
		<Form.Group>
			<Form.Label>Verify Password:</Form.Label>
			<Form.Control type="password" placeholder="Verify Password" value={verifyPassword}onChange={e=> setVerifyPassword(e.target.value)}required />
		</Form.Group>
		{registerButton ?
			<Button variant="primary" type="submit">Submit</Button>:
			<Button variant="primary" type="submit" disabled>Submit</Button>
		}
		<Button variant="danger" onClick={resetForm} className="px-3 ml-3">Reset</Button>
	</Form>
	</Container>
		)
}

