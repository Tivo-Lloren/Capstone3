import React from "react";
import { Link } from "react-router-dom";

export default function Orders({ orderProps }) {
  const {
    productId,
    productName,
    author,
    description,
    price,
    quantity
    
  } = orderProps;

  const totalAmount = price * quantity;
  return (
    <div className="container" >
      
      <div className="container d-flex flex-column justify-content-center align-items-center mb-3 py-3 bg-secondary">
        <h5>{productName}</h5>
        <p>{author}</p>
        <p>{description}</p>
        
        <p>₱{price.toLocaleString()}.00</p>
        <h5>Total ₱{totalAmount.toLocaleString()}.00</h5>

        <Link to={`/products/${productId}`}>
          <button className="btn btn-primary mt-3">Details</button>
        </Link>
      </div>
    </div>
  );
}
