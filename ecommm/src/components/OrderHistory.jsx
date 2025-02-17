import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/selector";
import Footer from "./Footer";
import "../styles/orderHistory.css";

const OrderHistory = () => {
  const currentUser = useSelector(selectCurrentUser);
  const orders = currentUser?.orders || [];

  return (
    <>
      <div className="orderhistory">
        <h1>
        <img src="./order-history.png"/>Order History
        </h1>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
            <div className="order-list">
            {orders.map((order, index) => {
              const totalItems = order.items.reduce((acc, item) => acc + item.quantity, 0);
              return (
                <div key={index} className="order-item">
                  <div className="order-info">
                    <div className="order-no-date">
                      <h3>Order :- {index + 1}</h3>
                      <h3>Date: {order.date}</h3>
                    </div>
                    <p>Name: {order.Name}</p>
                    <p>Shipping Address: {order.shippingAddress}</p>
                    <p>Total: ₹{(order.total * 15).toFixed(2)}</p>
                    <p>Total Items: {totalItems}</p>
                    <p>Payment Method: {order.paymentMethod}</p>
                  </div>

                  <div className="order-items">
                    <h4>Items:</h4>
                    {order.items.map((item) => (
                      <div key={item.id} className="order-item-details">
                        <img src={item.thumbnail} alt={item.title} />
                        <div>
                          <p>{item.title}</p>
                          <p>Quantity: {item.quantity}</p>
                          <p>Price: ₹{(item.price * 15).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OrderHistory;
