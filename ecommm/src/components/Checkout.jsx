import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, selectCartTotal } from "../redux/selector";
import { emptyCart, orderHistory } from "../redux/action";
import { ShoppingBag, Truck, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "./Footer";
import "../styles/checkout.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const navigate = useNavigate();
  const GST_RATE = 0.18;
  const gstAmount = cartTotal * GST_RATE;
  const totalWithGST = cartTotal + gstAmount;

  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    phone: "",
    shippingAddress: "",
    paymentMethod: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const order = {
    items:cartItems,
    total:totalWithGST,
    shippingAddress:formData.shippingAddress,
    paymentMethod:formData.paymentMethod,
    Name:formData.Name,
    email:formData.email,
    phone:formData.phone
  }

  const handleOrder = () => {
    if (!formData.phone) {
      alert("Phone Number is required.");
      return;
    } else if (isNaN(formData.phone) || formData.phone.length < 10) {
      alert("Phone Number must be at least 10 digits and numeric.");
      return;
    }

    if (!formData.paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    dispatch(orderHistory(order));
    dispatch(emptyCart());
    toast.success("Order placed successfully!");
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleOrder();
  };


  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>You need to add items to the cart before proceeding to checkout.</p>
        <button onClick={() => navigate("/product")}>Go to Products</button>
      </div>
    );
  }

  return (
    <>
      <div className="checkout-container">
        <h2>Checkout</h2>
        <div className="checkout-content">
          <div className="checkout-summary">
            <h3>
              <ShoppingBag className="icon" />
              Order Summary
            </h3>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.thumbnail} alt={item.title} />
                  <div className="cart-item-info">
                    <h4>{item.title}</h4>
                    <p>Price: ₹{(item.price * 15).toFixed(2)}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="checkout-summary-details">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{(cartTotal * 15).toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Tax (18%):</span>
                <span>₹{(gstAmount * 15).toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <strong>Total Amount:</strong>
                <strong>₹{(totalWithGST * 15).toFixed(2)}</strong>
              </div>
            </div>
          </div>

          <div className="order-form">
            <form className="checkout-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <h3>
                  <Truck className="icon" />
                  Shipping Information
                </h3>
                <label>Name:</label>
                <input
                  type="text"
                  name="Name"
                  value={formData.Name}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Shipping Address:</label>
                <input
                  type="text"
                  name="shippingAddress"
                  value={formData.shippingAddress}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="payment-methods">
                <h3>
                  <CreditCard className="icon" /> Payment Methods
                </h3>
                <div className="payment-option">
                  <div>
                    <input
                      type="radio"
                      id="COD"
                      name="paymentMethod"
                      value="COD"
                      checked={formData.paymentMethod === "COD"}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="COD">Cash on Delivery</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="UPI"
                      name="paymentMethod"
                      value="UPI"
                      checked={formData.paymentMethod === "UPI"}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="UPI">UPI</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="Card"
                      name="paymentMethod"
                      value="Card"
                      checked={formData.paymentMethod === "Card"}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="Card">Card</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="NetBanking"
                      name="paymentMethod"
                      value="NetBanking"
                      checked={formData.paymentMethod === "NetBanking"}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="NetBanking">Net Banking</label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn"
                disabled={cartItems.length === 0}
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;