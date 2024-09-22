import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/contact.css";

const socialLinks = [
  { url: "#",icon: "ri-facebook-line", },
  { url: "#",icon: "ri-instagram-line", },
  { url: "#",icon: "ri-linkedin-line", },
  { url: "#",icon: "ri-twitter-line", },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/contact", formData);
      alert("Inquiry sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message", error);
      alert("Error sending message");
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="7" md="7">
            <h6 className="fw-bold mb-4">Inquire Here</h6>
            <Form onSubmit={handleSubmit}>
              <FormGroup className="contact__form">
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup className="contact__form">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup className="contact__form">
                <Input
                  type="textarea"
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <button className="contact__btn" type="submit">
                Send Message
              </button>
            </Form>
          </Col>
          <Col lg="5" md="5">
            <div className="contact__info">
              <h6 className="fw-bold">Contact Information</h6>
              <p>A-69,70 Shivalik Shilp, Ahmedabad, Gujarat</p>
              <p>Phone: +91 98251 96969</p>
              <p>Email: dreambikes69@gmail.com</p>

              <h6 className="fw-bold mt-4">Follow Us</h6>
              <div className="d-flex align-items-center gap-4 mt-3">
                {socialLinks.map((item, index) => (
                  <Link to={item.url} key={index} className="social__link-icon">
                    <i className={item.icon}></i>
                  </Link>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
