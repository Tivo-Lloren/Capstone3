import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import UserCart from "../components/UserCart";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

export default function CartPage() {
  const history = useHistory();
  const [cartList, setCartList] = useState([]);
  const [cartListTotal, setCartListTotal] = useState(0);

  const fetchCartList = () => {
    console.log()
    fetch(`${process.env.REACT_APP_CAPSTONE3BACKEND}/carts/get-cart`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCartList(data);
      });
  };

  const fetchCartListTotal = () => {
    fetch(`${process.env.REACT_APP_CAPSTONE3BACKEND}/carts/user-cart`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCartListTotal(data.totalAmount);
      });
  };
  useEffect(() => {
    fetchCartList();
    fetchCartListTotal();
  }, []);

  const orderAll = () => {
    fetch(`${process.env.REACT_APP_CAPSTONE3BACKEND}/orders/createMultipleOrders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          title: "Yeeeyyy!!!",
          icon: "success",
          text: "You have successfully checked out your items",
        });
        history.push("/products");
      })
      .catch((err) => {
        Swal.fire({
          title: "Oppsss!!!",
          icon: "error",
          text: err.message,
        });
      });
  };

  return (
    <div className="mb-5 mt-2 d-flex flex-row">
      <UserCart
        cartData={cartList}
        fetchCartList={fetchCartList}
        fetchCartListTotal={fetchCartListTotal}
      />
      <div className="cartpage-checkout-wrapper">
        <div className="cartpage-checkout-container">
          <div className="cartpage-location-div">
            <p className="location-text">Location</p>
            <p className="location-address-text">
              <i class="fas fa-search-location"></i> Add shipping address
            </p>
          </div>
          <div className="cartpage-order-summary">
            <p className="cartpage-summary-text">Order Summary</p>
            <div className="cartpage-order-details">
              <div className="d-flex">
                <p className="cartpage-subtotal">
                  Subtotal ({cartList.length}{" "}
                  {cartList.length < 2 ? "item" : "items"})
                </p>
                <span className="cartpage-price ml-auto">
                  &#8369; {cartListTotal.toLocaleString()}.00
                </span>
              </div>

              <div className="d-flex">
                <p className="cartpage-vat">Shipping is free for all items</p>
                <span className="cartpage-price ml-auto">FREE</span>
              </div>

              <div className="cartpage-voucher-div d-flex mb-3">
                <input type="text" placeholder="Dr. Strange Voucher" />
                <Button className="ml-auto">Apply</Button>
              </div>
              <div>
                <div className="d-flex">
                  <p className="cartpage-total">Total</p>
                  <span className="ml-auto cartpage-total-price">
                    &#8369; {cartListTotal.toLocaleString()}.00
                  </span>
                </div>
                <p className="ml-auto">All items are VAT exempt, VAT is Bullshit</p>
              </div>
              <button className="cartpage-btn" onClick={() => orderAll()}>
                Show me the money!!!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
