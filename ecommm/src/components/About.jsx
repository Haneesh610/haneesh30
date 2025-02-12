import React from "react";
import Footer from "./Footer";
import "../styles/aboutus.css";

const About = () => {
  return (
    <>
      <div className="about-container">
        <div className="about-header">
          <h1>About Us</h1>
        </div>

        <div className="about-content">
          <p style={{ color:"orange" }}>
            Welcome to <strong>IndiaMart</strong> – your one-stop shop for
            premium products that make a difference! We’re not just another
            eCommerce platform; we’re a community dedicated to bringing you
            high-quality items that fit your lifestyle and values.
          </p>
          <p style={{ color:"white" }}>
            Our mission is simple: to provide our customers with top-notch
            products, excellent customer service, and a smooth shopping
            experience. We believe in offering sustainable and ethically sourced
            goods to help our customers make mindful choices while shopping.
          </p>
          <p style={{ color:"green" }}>
            Whether you're looking for the latest fashion items, or home
            essentials, we’ve got you covered. Our team is passionate about
            curating only the best for you.
          </p>
        </div>

        <div className="about-mission-motto">
          <div className="mission">
            <h2>Our Mission</h2>
            <p>
              At <strong>IndiaMart</strong>, we are committed to delivering
              quality products that not only meet but exceed our customers'
              expectations. We aim to make a positive impact on the environment
              by focusing on sustainability and social responsibility.
            </p>
          </div>
          <div className="motto">
            <h2>Our Motto</h2>
            <p>
              "Quality over Quantity, Sustainability over Profit" – We believe
              in creating lasting relationships with our customers while
              contributing positively to the world.
            </p>
          </div>
        </div>

        <div className="about-footer">
          <p>
            Thank you for choosing <strong>IndiaMart</strong> Where quality
            meets care.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;