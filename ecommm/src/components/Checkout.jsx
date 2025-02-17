import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, selectCartTotal } from "../redux/selector";
import { emptyCart, orderHistory } from "../redux/action";
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
    upiId: "",
    cardNo: "",
    cardCVV:"",
    cardExpiry:"",
    cardName:"",
    netBankingDetails: "",
    bankName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const order = {
    items: cartItems,
    total: totalWithGST,
    shippingAddress: formData.shippingAddress,
    paymentMethod: formData.paymentMethod,
    Name: formData.Name,
    email: formData.email,
    phone: formData.phone,
  };

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
        <h2>
          Checkout <img src="./checkout.gif" alt="" />
        </h2>
        <div className="checkout-content">
          <div className="checkout-summary">
            <h3>
              <img src="./package.gif" />
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
                  <img src="./delivery-truck.gif" alt="" />
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
                  <img src="./wallet.gif" alt="" /> Payment Methods
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

                {formData.paymentMethod === "UPI" && (
                  <div className="form-group">
                    <label>Enter UPI ID:</label>
                    <input
                      type="text"
                      name="upiId"
                      value={formData.upiId}
                      onChange={handleInputChange}
                      className="form-input-method"
                      placeholder="username@okbankname"
                      required
                    />
                  </div>
                )}

                {formData.paymentMethod === "Card" && (
                  <div className="form-group">
                    <label>Enter Card Details:</label>
                    <input
                      type="text"
                      name="cardNo"
                      value={formData.cardNo}
                      onChange={handleInputChange}
                      className="form-input-method"
                      placeholder="Enter Card no: 1111 3333 5555 7777"
                      required
                    />
                    <input
                      type="number"
                      name="cardCVV"
                      value={formData.cardCVV}
                      onChange={handleInputChange}
                      className="form-input-method"
                      placeholder="Enter CVV"
                      required
                    />
                    <input
                      type="text"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      className="form-input-method"
                      placeholder="Expiry Date: MM/YY"
                      required
                    />
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="form-input-method"
                      placeholder="Enter Card Holder Name"
                      required
                    />
                  </div>
                )}

                {formData.paymentMethod === "NetBanking" && (
                  <div className="form-group">
                    <label htmlFor="bankName">Select Bank</label>
                    <select
                      name="bankName"
                      id="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                      className="form-input-method"
                      required
                    >
                      <option value="" selected disabled hidden>
                        Select Bank
                      </option>
                      <option value="HDFC">HDFC</option>
                      <option value="ICICI">ICICI</option>
                      <option value="SBI">SBI</option>
                      <option value="Axis">Axis</option>
                      <option value="Kotak">Kotak</option>
                      <option value="PNB">PNB</option>
                    </select>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn"
                disabled={cartItems.length === 0}
              >
                Place Order
                <img src="./tracking.png" alt="" />
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
