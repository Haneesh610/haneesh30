import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Cart from "./Cart";
import Main from "./MAin";
import About from "./About";
import Contact from "./Contactus";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import ProductDetails from "./ProductDetail";
import Checkout from "./Checkout";
import OrderHistory from "./OrderHistory";
import Admin from "./Admin";
import AdminLogin from "./AdminLogin";
import "../styles/Header.css";
import { FaSearch } from "react-icons/fa";
import { TbLogout, TbHistory } from "react-icons/tb";
import { selectProducts, selectCurrentUser } from "../redux/selector";
import { GiHamburgerMenu } from "react-icons/gi";
import { logoutUser } from "../redux/action";
import { toast } from "react-toastify";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const Products = useSelector(selectProducts);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartCount = cartItems.length;

  const searchTimeout = useRef(null);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(() => {
      setResult(
        query
          ? Products.filter((product) =>
              product.title.toLowerCase().includes(query.toLowerCase())
            )
          : []
      );
    }, 500);
  };

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setIsSearchVisible(false);
    }
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownVisible(false);
    }
  };

  const handleLogout = () => {
    toast.success("Logout successful");
    dispatch(logoutUser());
    navigate("/");
  };

  const handleOrderHistory = () => {
    if (!currentUser) {
      toast.error("Please login to view order history");
      navigate("/login");
    } else if (currentUser.role === "admin") {
      toast.error("Admins cannot view order history");
    } else {
      navigate("/order-history");
    }
  };

  useEffect(() => {
    document.addEventListener("mouseover", handleClickOutside);
    return () => document.removeEventListener("mouseout", handleClickOutside);
  }, []);

  const handleCartClick = () => {
    if (!currentUser) {
      toast.error("Please login to view cart");
      navigate("/login");
    }
  };

  return (
    <div className="header">
      <div className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img src="/logo-transparent-png.png" alt="Logo" />
          </Link>
        </div>

        <div className="navbar-links">
          <Link to="/product" className="navbar-item">
            Products
          </Link>
          <Link to="/about" className="navbar-item">
            About Us
          </Link>
          <Link to="/contact" className="navbar-item">
            Contact Us
          </Link>
        </div>

        <div className="nav-right">
          <div
            ref={searchRef}
            className={`search-container ${isSearchVisible ? "active" : ""}`}
          >
            <FaSearch
              size={20}
              className="search-icon"
              onClick={() => setIsSearchVisible(!isSearchVisible)}
            />
            <input
              type="search"
              placeholder="Search..."
              value={search}
              className="search-input"
              onChange={handleSearchChange}
              onFocus={() => setIsSearchVisible(true)}
            />
            {isSearchVisible && search && (
              <div className="search-results">
                {result.length > 0 ? (
                  result.map((product) => (
                    <Link
                      to={`/product/${product.id}`}
                      key={product.id}
                      className="search-result-item"
                    >
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.title}
                          className="result-product-image"
                        />
                      )}
                      <div className="product-details">
                        <div className="product-name">{product.title}</div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p>No results found</p>
                )}
              </div>
            )}
          </div>

          <div className="cart-div">
            <span className="cart-count">{cartCount}</span>
            {currentUser ? (
              <Link to="/cart" className="cart-icon">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
                  alt="Cart"
                />
              </Link>
            ) : (
              <div onClick={handleCartClick} className="cart-icon">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
                  alt="Cart"
                />
              </div>
            )}
          </div>

          <div ref={dropdownRef} className="hamburger-menu">
            <GiHamburgerMenu
              size={30}
              onClick={() => setIsDropdownVisible(!isDropdownVisible)}
            />
            {isDropdownVisible && (
              <div className="dropdown-menu">
                {currentUser ? (
                  <div>
                    <button
                      className="dropdown-item logout-button"
                      onClick={handleLogout}
                    >
                      <TbLogout size={17} style={{ margin: "0 auto" }} />
                      Logout
                    </button>
                    {currentUser.role !== "admin" && (
                      <button
                        className="dropdown-item order-history"
                        onClick={handleOrderHistory}
                      >
                        <TbHistory size={17} style={{ margin: "0 auto" }} />
                        Order History
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    <Link to="/login" className="dropdown-item">
                      Login
                    </Link>
                    <Link to="/signup" className="dropdown-item">
                      Sign Up
                    </Link>
                    <Link to="/admin-login" className="dropdown-item">
                      Admin
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Main />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default Header;
