import React, { useEffect, useState } from "react";
import { addToCart, fetchCart } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, selectCartItems, selectCurrentUser } from "../redux/selector";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "./Footer";
import "../styles/Main.css";

const Main = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const cartItems = useSelector(selectCartItems);
  const currentUser = useSelector(selectCurrentUser);
  const error = useSelector((state) => state.cart.error);
  const [filterType, setFilterType] = useState("");
  const [category, setCategory] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFilterType(params.get("filter") || "");
    setCategory(params.get("category") || "");
  }, [location.search]);

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

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setFilterType(newFilter);
    updateUrlParams(newFilter, category);
  };

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setCategory(newCategory);
    updateUrlParams(filterType, newCategory);
  };

  const updateUrlParams = (filter, category) => {
    const params = new URLSearchParams();
    if (filter) params.set("filter", filter);
    if (category) params.set("category", category);
    navigate({ search: params.toString() });
  };

  const getSortedProducts = (products) => {
    switch (filterType) {
      case "priceHighToLow":
        return [...products].sort((a, b) => b.price - a.price);
      case "priceLowToHigh":
        return [...products].sort((a, b) => a.price - b.price);
      case "nameAZ":
        return [...products].sort((a, b) => a.title.localeCompare(b.title));
      case "nameZA":
        return [...products].sort((a, b) => b.title.localeCompare(a.title));
      default:
        return products;
    }
  };

  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;
  const sortedAndFilteredProducts = getSortedProducts(filteredProducts);

  const resetFilters = () => {
    setFilterType("");
    setCategory("");
    navigate({ search: "" });
  };

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <>
      <div className="app-container">
        {error && <p className="error-message">Error: {error}</p>}
        <div className="filter-container">
          <select
            value={filterType}
            onChange={handleFilterChange}
            className="filter-dropdown"
          >
            <option value="" disabled>
              Select a filter
            </option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="nameAZ">Name: A to Z</option>
            <option value="nameZA">Name: Z to A</option>
          </select>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="filter-dropdown"
          >
            <option value="" disabled>
              Select a Category
            </option>
            <option value="beauty">Beauty</option>
            <option value="fragrances">Fragrances</option>
            <option value="furniture">Furniture</option>
            <option value="groceries">Groceries</option>
          </select>
          <button onClick={resetFilters} className="reset-button">
            Reset
          </button>
        </div>
        {products.length === 0 ? (
          <p className="loading">Loading products...</p>
        ) : (
          <div className="product-list">
            {sortedAndFilteredProducts.map((item) => (
              <div key={item.id} className="product-card">
                <img src={item.thumbnail} alt={item.title} />
                <h1>{item.title}</h1>
                <div className="product-details-container-main">
                  <div className="rating-container">
                    <p>Rating: ⭐{item.rating}</p>
                    <button>
                      <Link
                        to={`/product/${item.id}`}
                        className="view-details-btn"
                      >
                        View Details
                      </Link>
                    </button>
                  </div>
                  <div className="price-container">
                    <p>Price: ₹{(item.price * 15).toFixed(2)}</p>
                    {cartItems.some((cartItem) => cartItem.id === item.id) ? (
                      <p className="item-in-cart-message">
                        Item is in the cart
                      </p>
                    ) : currentUser ? (
                      currentUser.role !== "admin" ? (
                        <button onClick={() => handleAddToCart(item)}>
                          Add to Cart
                        </button>
                      ) : null
                    ) : (
                      <p>Please log in to add to cart</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Main;
