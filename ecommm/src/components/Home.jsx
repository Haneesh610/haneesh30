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
  const categories = ["fragrances", "furniture", "groceries", "beauty"];

  return (
    <>
      <div className="home-main-container">
        <h1>Welcome to Our Store</h1>

        <section className="hero-section">
          <div className="hero-content">
            <h2>Discover Amazing Products</h2>
            <p>Explore our curated collection of premium items</p>
            <Link to="/product" className="cta-button">
              Shop Now
            </Link>
          </div>
        </section>

        <section className="category-section">
          <h3>Shop by Category</h3>
          <div className="category-grid">
            {categories.map((category) => (
              <Link
                to={`/product?category=${category}`}
                key={category}
                className="category-card"
              >
                <div className="category-content">
                  <h4>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h4>
                  <p>Explore collection</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="carousel-section">
          <h3>Featured Products</h3>
          <Slider {...carouselSettings}>
            {featuredProducts.map((product) => (
              <div key={product.id} className="carousel-item">
                <img src={product.thumbnail} alt={product.title} />
                <div className="product-info">
                  <h4>{product.title}</h4>
                  <p>Price: ₹{(product.price * 15).toFixed(2)}</p>
                  <Link to={`/product/${product.id}`} className="view-details">
                    View Details
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
