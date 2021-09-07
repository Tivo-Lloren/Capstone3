import React, { useState, useEffect } from "react";
import UserOrder from "../components/UserOrder";

export default function OrderPage() {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_CAPSTONE3BACKEND}/orders/myOrders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrderList(data);
      });
  }, []);

  return (
    <div>
      <UserOrder orderData={orderList} />
    </div>
  );
}