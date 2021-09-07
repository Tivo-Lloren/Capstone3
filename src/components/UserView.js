import React,{useState,useEffect} from "react";
import Product from "./Product";



export default function UserView({productData}){

	const [products,setProducts] = useState([])

	useEffect(()=>{

		const productsArr = productData.map(product =>{
			
			if(product.isActive === true){
				return(
					<Product key={product._id} productProp={product}/>
					)
			}else{
				return null
			}
		});
		
		setProducts(productsArr)

	},[productData])

	return(
		<>
			{products}
		</>


		)
}