import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, selectCartItems, selectCurrentUser } from "../redux/selector";
import { addToCart } from "../redux/action";
import { toast } from "react-toastify";
import Footer from "./Footer";
import "../styles/Productdetail.css";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const products = useSelector(selectProducts);
  const cartItems = useSelector(selectCartItems);
  const currentUser = useSelector(selectCurrentUser);
  const [product, setProduct] = useState(null);

  const handleAddToCart = (product) => {
    if (!currentUser) {
      alert("You need to be logged in to add items to the cart!");
      return;
    }

    if (cartItems.some((cartItem) => cartItem.id === product.id)) {
      alert("This item is already in your cart!");
    } else {
      dispatch(addToCart(product));
      toast.success("Item added to cart");
    }
  };

  useEffect(() => {
    const foundProduct = products.find(
      (item) => item.id === parseInt(productId)
    );
    setProduct(foundProduct);
  }, [productId, products]);

  if (!product) return <p>Loading product details...</p>;

  const isProductInCart = cartItems.some(
    (cartItem) => cartItem.id === product.id
  );

  return (
    <>
      <div className="product-details-container">
        <h1 className="product-title">{product.title}</h1>
        <div className="product-details">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="product-image"
          />
          <div className="product-info">
            <p className="product-description">{product.description}</p>
            <p>
              {product.brand ? (
                <p>
                  <strong>Brand:</strong> {product.brand}{" "}
                </p>
              ) : (
                ""
              )}
            </p>
            <p>
              <strong>Price:</strong> ₹{(product.price * 15).toFixed(2)}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Availability:</strong> {product.availabilityStatus}
            </p>
              {/* <img src="./reviews.png" /> */}
            <h3>Reviews
            </h3>
            <ul>
              {product.reviews?.map((review, index) => (
                <li key={index}>
                  <p>
                    <strong>{review.name}:</strong> {review.comment}
                  </p>
                  <p>Rating: {review.rating}</p>
                </li>
              ))}
            </ul>
            {currentUser ? (
              currentUser.role !== "admin" ? (
                <div className="button-container-pd">
                  <button
                    disabled={isProductInCart}
                    onClick={() => handleAddToCart(product)}
                  >
                    {isProductInCart ? "Item in Cart" : "Add to Cart"}
                  </button>
                </div>
              ) : (
                <p>You are an admin, so you cannot add to cart</p>
              )
            ) : (
              <p>Please log in to add to cart</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
