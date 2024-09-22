import React, { useRef } from 'react';
import { Container } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import "../../styles/header.css";
import logo from '../../assets/all-images/logo.png';

const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/about", display: "About" },
  { path: "/bikes", display: "Bikes" },
  { path: "/contact", display: "Contact" },
  { path: "/login", display: "Login" },
  { path: "/signup", display: "Signup" },
];

const Header = () => {
  const menuRef = useRef(null);

  const toggleMenu = () => {
    menuRef.current.classList.toggle("menu__active");
  };

  return (
    <header className="header">
      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            {/* Logo */}
            <div className="logo">
              <Link to="/home">
                <img
                  src={logo}
                  alt="DreamBikes Logo"
                  className="nav-logo"
                  style={{ height: "40px" }}
                />
              </Link>
            </div>

            <span className="mobile__menu" onClick={toggleMenu}>
              <i className="ri-menu-line"></i>
            </span>

            {/* Navigation links with close button */}
            <div className="navigation" ref={menuRef}>
              <span className="mobile__menu__close" onClick={toggleMenu}>
                <i className="ri-close-line"></i>
              </span>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                    onClick={toggleMenu} // Close menu on link click
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
