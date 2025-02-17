import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCartQuantity, removeFromCart} from "../redux/action";
import { selectCartItems, selectCartTotal } from "../redux/selector";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import '../styles/Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const navigate = useNavigate();

  const GST_RATE = 0.18;
  const gstAmount = cartTotal * GST_RATE;
  const totalWithGST = cartTotal + gstAmount;

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1 || isNaN(quantity)) {
      alert("Quantity cannot be less than 1");
      return;
    };
    dispatch(updateCartQuantity(id, quantity));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    navigate('/checkout')
  };

  return (
    <>
      <div className="cart-page">
        {/* <h1>Your Cart</h1> */}
        {cartItems.length === 0 ? (<>
          <p className="emptycart">Your Cart is Empty </p>
            <img src="./emptycart.png" className="emptycart" style={{height:"300px",width:"300px"}}/>
          </>
        ) : (
          <div className="table-container">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Tax (18%)</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => {
                  const itemPrice = item.price * 15;
                  const itemTax = itemPrice * GST_RATE;
                  const itemTotal = (itemPrice + itemTax) * item.quantity; 

                  return (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                        />
                      </td>
                      <td>{item.title}</td>
                      <td>₹{itemPrice.toFixed(2)}</td>
                      <td>₹{(itemTax * item.quantity).toFixed(2)}</td>
                      <td>
                        <input
                          type="number"
                          value={item.quantity}
                          min="1"
                          onChange={(e) =>
                            handleUpdateQuantity(item.id, parseInt(e.target.value))
                          }
                        />
                      </td>
                      <td>₹{itemTotal.toFixed(2)}</td>
                      <td>
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="remove-btn"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="cart-summary">
              <h2>Cart Summary</h2>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{(cartTotal * 15).toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span className="free-shipping">Free</span>
              </div>
              <div className="summary-row">
                <span>Tax (18%):</span>
                <span className="tax">₹{(gstAmount * 15).toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <strong>Total Amount:</strong>
                <strong>₹{(totalWithGST * 15).toFixed(2)}</strong>
              </div>
              <button onClick={handleCheckout}>
                Proceed to Checkout
                <img src="./checkout.png" />
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;