import React,{useState,useEffect} from "react";
//bootstrap
import {Table,Button,Modal,Form} from "react-bootstrap";
import Swal from "sweetalert2";

export default function AdminView(props){
	//Destructure our course data from the props being passed by the parent component
	const {productData,fetchData} = props

	
	const [productId,setProductId] = useState("")

	const [products,setProducts] = useState([]);

	//Add state for Form in Add Course
	const [name,setName] = useState("")
	const [author,setAuthor] = useState("")
	const [description,setDescription] = useState("")
	const [price,setPrice] = useState(0)

	//States for the Modal of Add Course
	const [showAdd,setShowAdd] = useState(false)
	//State for update Course modals(open/close)
	const[showEdit,setShowEdit] = useState(false)

	//Functions to handle opening and closing our Add Course Modal
	const openAdd = () => setShowAdd(true)
	const closeAdd = () => setShowAdd(false)

	//Function to handle opening our Edit Course Modal, which first needs to fetch the current course's data so that it can populate the values of the inputs in the modal form
	const openEdit = (product) => {
		/*fetch(`http://localhost:4000/courses/${ courseId}`,{
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`
			}
		})*/
		//.then(res => res.json())
		//.then(data => {
			//Populate all input values with the course information that we fetched
			console.log(product)

			setProductId(product._id)
			setName(product.productName)
			setAuthor(product.author)
			setDescription(product.description)
			setPrice(product.price)
		//})

		//Then, open the modal
		setShowEdit(true)
	}


	//Function to handle closing our Edit Course Modal. We need to reset all relevant states back to their default values, so we can reuse them
	const closeEdit = () =>{
		setShowEdit(false)
		setName("")
		setAuthor("")
		setDescription("")
		setPrice(0)
	}


	useEffect(()=>{
		const productsArr = productData.map(product =>{
			return(
				<tr key={product._id}>
					<td>{product._id}</td>
					<td>{product.productName}</td>
					<td>{product.author}</td>
					<td>{product.description}</td>
					<td>{product.price}</td>
					<td className={product.isActive ? "text-success" : "text-danger"}>
						{product.isActive ? "Available" : "Unavailable"}
					</td>
					<td className= "d-flex justify-content-center">
						<Button className="m-2" variant="primary" size="sm" onClick={() => openEdit(product)}>Update</Button>
						{
							product.isActive
							?
							<Button className="m-2" variant="danger" size="sm" onClick={() => archiveToggle(product._id,product.isActive)}>Disable
							</Button>
							:
							<Button className="m-2" variant="success" size="sm" onClick={() => activateToggle(product._id,product.isActive)}>Enable</Button>
						}
					</td>
				</tr>


				)
		})

		setProducts(productsArr)
	},[productData])

	//function for the Add Course
	const addProduct = (e)=>{
		e.preventDefault();

		fetch(`${process.env.REACT_APP_CAPSTONE3BACKEND}/products/create`,{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`
			},
			body: JSON.stringify({
				name: name,
				author: author,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			if(data === true){
				//Run our fetchData function that we passed from our parent component, in order to re-render our page.
				//Show a success message
				fetchData()
				Swal.fire({
					title: "Success!",
					icon: "success",
					text: "Product successfully added"
				})
				//Reset all states to their default values, for better user experience(inputs are blank again if the user decides to add another course)
				setName("")
				setAuthor("")
				setDescription("")
				setPrice(0)

				//Close our modal
				closeAdd()
			}else {
				fetchData()
				Swal.fire({
					title: "Oops! Something went wrong",
					icon: "error",
					text: "Please try again"
				})
			}
		})
	}

	//Update a Course
	const editProduct = (e,productId)=>{
		e.preventDefault()

		fetch(`${process.env.REACT_APP_CAPSTONE3BACKEND}/products/${productId}`,{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`
			},
			body: JSON.stringify({
				name: name,
				author: author,
				description: description,
				price: price
			})

		})
		.then(res => res.json())
		.then(data =>{
			if(data === true){
				fetchData()
				Swal.fire({
					title: "Success",
					icon: "success",
					text: "Product successfully updated"
				})
				closeEdit()
			}else {
				fetchData()
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please try again"
			})

		}
	})

	}

	//Archive a Product
	const archiveToggle = (productId,isActive) => {
		fetch(`${process.env.REACT_APP_CAPSTONE3BACKEND}/products/archive/${productId}`,{
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`
			},
			body: JSON.stringify({
				isActive: isActive
			})
		})
		.then(res => res.json())
		.then(data => {
			if(data === true){
				fetchData()
				Swal.fire({
					title:"Success",
					icon: "success",
					text: "Product Successfully unarchived"
				})
			}else {
				fetchData()
				Swal.fire({
					title:"Something went wrong",
					icon: "error",
					text: "Please try again"

				})
			}
		})
	}
	//Activate Course
	const activateToggle = (productId,isActive) => {
		fetch(`${process.env.REACT_APP_CAPSTONE3BACKEND}/products/activate/${productId}`,{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`
			},
			body: JSON.stringify({
				isActive: isActive
			})
		})
		.then(res => res.json())
		.then(data => {
			if(data === true){
				fetchData()
				Swal.fire({
					title:"Success",
					icon: "success",
					text: "Product Successfully activated!"
				})
			}else {
				fetchData()
				Swal.fire({
					title:"Something went wrong",
					icon: "error",
					text: "Please try again"

				})
			}
		})
	}

	return(
		<>
			<div className="text-center my-4">
				<h2>Admin Dashboard</h2>

				<div className="d-flex justify-content-center">
					<Button variant="primary" onClick={openAdd}>Add New Product</Button>
				</div>
			</div>
			<Table striped bordered hover responsive>
				<thead className="bg-dark text-white">
					<tr>
						<th>Id</th>
						<th>Name</th>
						<th>Author</th>
						<th>Description</th>
						<th>Price</th>
						<th>Availability</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{products}
				</tbody>
			</Table>
			{/*ADD MODAL*/}

			<Modal show={showAdd} onHide={closeAdd}>
				<Form onSubmit={e => addProduct(e)}>
					<Modal.Header closeButton>
						<Modal.Title>Add Product</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" placeholder="Enter Book Title" required value={name} onChange={e => setName(e.target.value)}/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Author</Form.Label>
							<Form.Control type="text" placeholder="Enter Title of Author" required value={author} onChange={e => setAuthor(e.target.value)}/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Description</Form.Label>
							<Form.Control type="text" placeholder="Enter Description" required value={description} onChange={e => setDescription(e.target.value)}/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Price</Form.Label>
							<Form.Control type="number" required value={price} onChange={e => setPrice(e.target.value)}/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeAdd}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>
				</Form>
			</Modal>

		{/*EDIT MODAL*/}

			<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={e => editProduct(e,productId)}>
					<Modal.Header closeButton>
						<Modal.Title>Edit Product</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" placeholder="Enter Title of A Course" required value={name} onChange={e => setName(e.target.value)}/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Author</Form.Label>
							<Form.Control type="text" placeholder="Enter Title of Author" required value={author} onChange={e => setAuthor(e.target.value)}/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Description</Form.Label>
							<Form.Control as="textarea" rows={4} placeholder="Enter Description" required value={description} onChange={e => setDescription(e.target.value)}/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Price</Form.Label>
							<Form.Control type="number" required value={price} onChange={e => setPrice(e.target.value)}/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeEdit}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>
				</Form>
			</Modal>

		</>

		)
}