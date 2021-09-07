import React,{useState,useEffect,useContext} from "react";
//bootstrap
import {Container,Card,Button,Form} from "react-bootstrap";
//react router
import {Link,useHistory,useParams} from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";

export default function SpecificProduct(){
	const history = useHistory();

	const {user} = useContext(UserContext);

	const [name, setName] = useState("")
	const [author,setAuthor] = useState("")
	const [description, setDescription] = useState("")
	const [price, setPrice] = useState("")
	const [quantity,setQuantity] = useState(1)
	//useParams() contains any values that we are trying to pass in the URL stored
	//useParams is how we receive the courseId passed via the URL
	const {productId} = useParams();



	useEffect(()=>{

		fetch(`${process.env.REACT_APP_CAPSTONE3BACKEND}/products/${productId}`)
		.then(res => res.json())
		.then(data =>{

			setName(data.productName)
			setAuthor(data.author)
			setDescription(data.description)
			setPrice(data.price)

		})

	},[])


	//for enroll button
	/*const enroll = () => {

		fetch("http://localhost:4000/users/enroll",{
			method:"POST",
			headers:{
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`
			},
			body: JSON.stringify({
				courseId: courseId
			})
		})
		.then(res => res.json())
		.then(data =>{
			if(data === true){
				Swal.fire({
					title: "Successfully enrolled!",
					icon: "success",
					text:"You have successfully enrolled for this course"
				})
				history.push("/courses")
			}else {
				Swal.fire({
					title: "Something went wrong!",
					icon: "error",
					text:"Please try again"
				})
			}

		})

	}*/
	
	const buy = ()=>{
			console.log("cheng")
		fetch(`${process.env.REACT_APP_CAPSTONE3BACKEND}/orders/createOrder/${productId}`,{
			method:"POST",
			headers:{
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`
			},
			body: JSON.stringify({
				productId: productId,
				quantity: quantity
			})

		})
		.then(res => res.json())
		.then(data => {
			console.log("shaz")
			console.log(data)

			if(data){
				Swal.fire({
					title: "Thank you!",
					icon:"success",
					text:"Enjoy!"
				})
				history.push("/products")
			}else {
				Swal.fire({
					title: "Uh oh!",
					icon: "error",
					text: "Something went wrong."
				})
			}
		}).catch(error =>{
				Swal.fire({
					title: "Uh oh!",
					icon: "error",
					text: error.message
				})
		})
	}

	const addToCart = (productId) => {
	    console.log("asd");
	    fetch(`${process.env.REACT_APP_CAPSTONE3BACKEND}/carts/add-cart/${productId}`, {
	      method: "POST",
	      headers: {
	        "Content-Type": "application/json",
	        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
	      },
	      body: JSON.stringify({
	        quantity: quantity,
	      }),
	    })
	      .then((res) => res.json())
	      .then((data) => {
	        console.log(data);
	        if (data.error) {
	          Swal.fire({
	            title: "Opps!!!",
	            icon: "Error",
	            text: "Something went wrong",
	          });
	        } else {
	          Swal.fire({
	            title: "Yeeeyyy!!!",
	            icon: "success",
	            text: `You added ${name} to your Cart`,
	          });
	        }
	      })
	      .catch((err) => console.log(`ERROR ERROR ERROR ${err}`));
	  };

	return(
		<Container>
			<Card className="mt-5">
				<Card.Header className="bg-dark text-white text-center">
					<h4>{name}</h4>
				</Card.Header>
				<Card.Body>
					<Card.Text>{author}</Card.Text>
					<Card.Text>{description}</Card.Text>
					<h6>Price: <span>&#8369;</span>{price.toLocaleString()}.00</h6>
				</Card.Body>

				<Card.Footer>
				<Form.Control type="number" value={quantity}onChange={e=> setQuantity(e.target.value)} required />
					{
						user.accessToken !== null ?
					<div>
						<Button className="mt-2" variant="primary" block onClick={buy}>Buy
						</Button>

						<Button
                      className="specific-cart" variant="primary" block
                      onClick={() => addToCart(productId)}>Add to Cart</Button>
                    </div>
						:
						<Link className="btn btn-warning btn-block" to="/login">Login to purchase</Link>
					}
					
				</Card.Footer>
			</Card>
		</Container>

		)
}
