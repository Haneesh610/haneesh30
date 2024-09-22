import React from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import "../../styles/footer.css";
import logo from '../../assets/all-images/logo.png';

const quickLinks = [
  { path: "/about", display: "About" },
  { path: "/privacy-policy", display: "Privacy Policy" },
  { path: "/bikes", display: "Bike Listing" },
  { path: "/contact", display: "Contact" },
];

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer">
      <Container>

        <Row className="mb-4">

          <Col lg="4" md="4" sm="12">
            <div className="logo footer__logo">
              <Link to="/home" onClick={handleLinkClick}>
                <img src={logo} alt="DreamBikes Logo" className="nav-logo" style={{ height: "40px" }} />
              </Link>
              <span>Bike Rental Service</span>
            </div>
            <p className="footer__logo-content">
              Whether you're a thrill-seeker craving the adrenaline rush of a powerful motorbike or someone looking to explore the city at a relaxed pace, DreamBikes has the perfect ride for you.
            </p>
          </Col>

          <Col lg="4" md="4" sm="6" className="d-flex flex-column align-items-center">
            <h5 className="footer__link-title">Quick Links</h5>
            <ListGroup className="text-center">
              {quickLinks.map((item, index) => (
                <ListGroupItem key={index} className="p-0 mt-3 quick__link">
                  <Link to={item.path} onClick={handleLinkClick}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="4" md="4" sm="6">
            <h5 className="footer__link-title">Contact Information</h5>
            <p className="office__info p-0 mt-3">A-69,70 Shivalik Shilp, Ahmedabad, Gujarat, India</p>
            <p className="office__info p-0 mt-3">Phone: +91 98251 96969</p>
            <p className="office__info p-0 mt-3">Email: dreambikes69@gmail.com</p>
            <p className="office__info p-0 mt-3">Office Time: 10am - 7pm</p>
          </Col>
        </Row>

        {/* Footer Bottom */}
        <Row>
          <Col lg="12">
            <div className="footer__bottom">
              <p className="section__description d-flex align-items-center justify-content-center gap-1 pt-4">
                <i className="ri-copyright-line"></i>Copyright {year}, Developed by Haneesh Periwal. All rights reserved.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
