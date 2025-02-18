import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { fetchCart } from "../redux/action";
import { selectProducts } from "../redux/selector";
import Footer from "./Footer";
import "../styles/home.css";

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const featuredProducts = products.slice(0, 11);

  return (
    <>
      <div className="home-main-container">
        <div className="home-top">
          <h1>
            Welcome to Our Store
            <img src="./shopping.png" alt="shopping" />
          </h1>
        </div>

        <section className="hero-section">
          <div className="hero-content">
            <h2>Discover Amazing Products</h2>
            <p>Explore our curated collection of premium items</p>
            <Link to="/product" className="cta-button">
              <img src="./shop-now(1).png" alt="" />
            </Link>
          </div>
        </section>

        <section className="category-section">
          <div className="category-header">
            <h3>
              Browse by Category
              <img src="./list.gif" alt="category-icon" />
            </h3>
          </div>
          <div className="category-grid">
            <div className="category-card">
              <Link to="/product?category=fragrances">
                <div className="category-content">
                  <img
                    src="./perfume.gif"
                    className="category-image"
                    alt="fragrances"
                  />
                  <h4>Fragrances</h4>
                  <p>Explore collection</p>
                </div>
              </Link>
            </div>
            <div className="category-card">
              <Link to="/product?category=furniture">
                <div className="category-content">
                  <img
                    src="./armchair.gif"
                    className="category-image"
                    alt="furniture"
                  />
                  <h4>Furniture</h4>
                  <p>Explore collection</p>
                </div>
              </Link>
            </div>
            <div className="category-card">
              <Link to="/product?category=groceries">
                <div className="category-content">
                  <img
                    src="./basket.gif"
                    className="category-image"
                    alt="groceries"
                  />
                  <h4>Groceries</h4>
                  <p>Explore collection</p>
                </div>
              </Link>
            </div>
            <div className="category-card">
              <Link to="/product?category=beauty">
                <div className="category-content">
                  <img
                    src="./makeup.gif"
                    className="category-image"
                    alt="beauty"
                  />
                  <h4>Beauty</h4>
                  <p>Explore collection</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="whychooseus-section">
          <div className="whychooseus-header">
            <h3>
              Why Choose Us
              <img src="./shrug.png" alt="" />
            </h3>
          </div>
          <div className="whychooseus-grid">
            <div className="whychooseus-card">
              <div className="whychooseus-content">
                <img
                  src="./password.gif"
                  className="whychooseus-image"
                  alt="Secure Payment"
                />
                <h4>Secure Payment</h4>
              </div>
            </div>
            <div className="whychooseus-card">
              <div className="whychooseus-content">
                <img
                  src="./fast-delivery.gif"
                  className="whychooseus-image"
                  alt="Fast Delivery"
                />
                <h4>Fast Delivery</h4>
              </div>
            </div>
            <div className="whychooseus-card">
              <div className="whychooseus-content">
                <img
                  src="./return-of-investment.gif"
                  className="whychooseus-image"
                  alt="30 Days Return"
                />
                <h4>30 Days Return</h4>
              </div>
            </div>
            <div className="whychooseus-card">
              <div className="whychooseus-content">
                <img
                  src="./phone.gif"
                  className="whychooseus-image"
                  alt="24/7 Support"
                />
                <h4>24/7 Support</h4>
              </div>
            </div>
          </div>
        </section>

        <section className="carousel-section">
          <h3 className="carousel-header">
            Featured Products 
            <img src="./fire.gif" alt="" />
          </h3>
          <Slider {...carouselSettings}>
            {featuredProducts.map((product) => (
              <div key={product.id} className="carousel-item">
                <img src={product.thumbnail} alt={product.title} />
                <div className="product-info">
                  <h4>{product.title}</h4>
                  <p>Price: ₹{(product.price * 15).toFixed(2)}</p>
                  <Link to={`/product/${product.id}`} className="view-details">
                    Details
                    <img src="./file.png" />
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </section>
      </div>
      <Footer />
    </>
  );
}
