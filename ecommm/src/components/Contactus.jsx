import React from "react";
import "../styles/contactus.css";
import Footer from "./Footer";

const Contact = () => {
  return (
    <>
      <div className="contact-page">
        <h1>Contact Us
          <img src="./contact.gif" alt="" />
        </h1>
        <p>
          We'd love to hear from you! Reach out to us for any questions,
          feedback, or support.
        </p>

        <div className="contact-container">
          <div className="contact-info">
            <h2>Our Office
              <img src="./building.gif"/>
            </h2>
            <p>
              <strong>Address:</strong>Wall Street 2, B/h Jungle Bhookh
              Restaurant, A-707, Nr, Ellisbridge, Ahmedabad, Gujarat 380006
            </p>
            <p>
              <strong>Phone:</strong> +91 7961200421
            </p>
            <p>
              <strong>Email:</strong> support@aitiger.com
            </p>
            <h2>Business Hours</h2>
            <p>
              <strong>Monday - Friday:</strong> 10:00 AM - 7:00 PM
            </p>
            <p>
              <strong>Saturday - Sunday:</strong> Closed
            </p>
          </div>

          <div className="contact-form">
            <h2>Send Us a Message
              <img src="./message.gif" alt="" />
            </h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Enter your message"
                  rows="5"
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="map-div">
          <h2>Locate Us 
            <img src="./travel.gif" />
          </h2>
          <div className="map-container">
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44905.35029135024!2d72.50223273125002!3d23.024221700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e16ca9bd86e92f%3A0x15067db165ab67b5!2sSingularity%20Tiger%20Pvt%20Ltd!5e1!3m2!1sen!2sin!4v1738582000375!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: "1px solid black" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;