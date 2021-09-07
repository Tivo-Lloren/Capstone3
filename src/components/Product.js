import React, {useState,useEffect} from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
//Add PropTypes here to validate the props
import PropTypes from "prop-types";
import {Link} from "react-router-dom"
import img1 from "../img/devilworshippers.png"
/*import img2 from "../img/worldisyourtoilet.png"
import img3 from "../img/hephepboy.png"
import img4 from "../img/cookingwithpoo.png"*/

export default function Product({productProp}) {
//const images = [img1,img2,img3,img4]


  const { _id,productName,author,description,price} = productProp;




  return (
    
    <Row className="mt-4">
      <Col>
        <Card className="cardHighlight">
          <Card.Body>
            <Card.Title>{productName}</Card.Title>
            <Link to={`/products/${_id}`}><img src={img1} width="150px" className="img-fluid" alt="productimages"/></Link>
            
            {/*{imgtest.map(img =>{
              return(<img src={img.img} width="150px" className="img-fluid" alt={imgtest.img}/>)
            })}*/}
            

            <h6>Author</h6>
            <p>{author}</p>

            <h6>Description</h6>
            <p>{description}</p>

            <h6>Price: </h6>
            <p><span>&#8369;</span>{price.toLocaleString()}.00</p>

            
            <Link className="btn btn-primary" to={`/products/${_id}`}>Details</Link>
          </Card.Body>
          

        </Card>
      </Col>
    </Row>
  );
}


Product.propTypes = {
  
  product: PropTypes.shape({
    
    productName: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired

  })
}


