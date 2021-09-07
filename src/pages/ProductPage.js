import React,{useState,useEffect,useContext} from "react";

//bootstrap
import {Container} from "react-bootstrap";
import UserContext from "../UserContext";
//components
import AdminView from "../components/AdminView";
import UserView from "../components/UserView";

import Product from "../components/Product";


export default function ProductPage(){
	const {user} = useContext(UserContext);
	const [allProducts,setAllProducts] = useState([]);

	const fetchData = ()=>{
		console.log(process.env.REACT_APP_CAPSTONE3BACKEND)
		fetch(`${process.env.REACT_APP_CAPSTONE3BACKEND}/products/`)
		.then(res => res.json())
		.then(data =>{
			console.log(data)

			setAllProducts(data)
		})
	}

	useEffect(()=>{
		fetchData()
	},[])

	return(
		<Container>
		{
			(user.isAdmin === true)  ?
			<AdminView productData={allProducts} fetchData={fetchData}/> 
			:
			<>
			<h1 className="text-center mt-5">Current Listings</h1>
			<UserView productData={allProducts} />
			</>
		}
		</Container>


		)
}
	