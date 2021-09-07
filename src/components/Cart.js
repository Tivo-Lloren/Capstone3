import React, { useState, useEffect } from "react";
import "../CartStyle.css";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

export default function Cart({ cartProps, fetchCartList, fetchCartListTotal }) {
  const history = useHistory();
  const {
    productName,
    price,
    productImage,
    productId,
    quantity,
    description,
  } = cartProps;

  const [editQty, setEditQty] = useState(quantity);
  const [decrementBtn, setDecrementBtn] = useState(false);
  const [totalAmount, setTotalAmount] = useState(editQty * price);

  useEffect(() => {
    if (editQty < 2) {
      setDecrementBtn(true);
      setTotalAmount(editQty * price);
    } else {
      setDecrementBtn(false);
      setTotalAmount(editQty * price);
    }
  }, [editQty, totalAmount]);

  const incrementQty = () => {
    setEditQty(editQty + 1);
    addToCart(1);
  };

  const decrementQty = () => {
    setEditQty(editQty - 1);
    addToCart(-1);
  };

  const addToCart = (quantity) => {
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
        fetchCartListTotal();
      })
      .catch((err) => console.log(`ERROR ERROR ERROR ${err}`));
  };

  const orderProduct = () => {
    fetch(`${process.env.REACT_APP_CAPSTONE3BACKEND}/orders/createOrder/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        quantity: editQty,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          Swal.fire({
            title: "Hmmmm",
            icon: "Error",
            text: "Something went wrong",
          });
        } else {
          Swal.fire({
            title: "Boo Yah!!!",
            icon: "success",
            text: "You have successfully ordered!",
          });
          history.push("/products");
        }
      })
      .catch((err) => console.log(`ERROR ERROR ERROR ${err}`));
  };

  const deleteCart = () => {
    fetch(`${process.env.REACT_APP_CAPSTONE3BACKEND}/carts/delete-cart/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.notInCart) {
          Swal.fire({
            title: "Yeeeyyy!!!",
            icon: "success",
            text: `You have successfully removed ${productName}`,
          });
          fetchCartList();
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Hmmmm..",
          icon: "error",
          text: `Something went wrong ${err.message}`,
        });
      });
  };

  return (
    <div className="cart-wrapper">
      <div className="cart-carts-container">
        <div className="d-flex align-items-center cart-item-container">
          {/*<img
            src={`${process.env.REACT_APP_API_URL}/${productImage}`}
            className="cart-image"
            alt={`image_of_${productName}`}
          />*/}
          <div className="cart-body">
            <p className="cart-description">{`${description.substr(
              0,
              50
            )}...`}</p>
            <p className="brand">
              Title: <a href="www.google.com">{productName}</a>
            </p>
            <span className="cart-promo">Take it and go!</span>
          </div>
          <div className="d-flex flex-column justify-content-end cart-price-div">
            <p className="cart-price">₱ {price.toLocaleString()}</p>

            <div clasName="d-flex flex-row">
              <span className="mr-2">
                <i class="far fa-heart"></i>
              </span>
              <span>
                <i onClick={() => deleteCart()} class="fas fa-trash-alt"></i>
              </span>
            </div>
          </div>
          <div className="cart-item-total-div d-flex flex-column">
            <div className="cart-qty mb-1">
              <button
                disabled={decrementBtn}
                className="specific-decrement"
                onClick={() => decrementQty()}
              >
                <i class="fas fa-minus"></i>
              </button>
              <span className="m-2">{editQty}</span>
              <button
                className="specific-increment"
                onClick={() => incrementQty()}
              >
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <div className="cart-item-total mt-1">
              <small>Total ₱{totalAmount.toLocaleString()}</small>
            </div>

            <button className="cart-btn" onClick={() => orderProduct()}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
