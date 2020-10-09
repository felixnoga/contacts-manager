import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
import '../css/navbar.scss';

const Navbar = ({ title, icon }) => {
  const [burgerOpen, setBurgerOpen] = useState(false);
  const toggleBurgerMenu = () => {
    setBurgerOpen(!burgerOpen);
  };
  return (
    <nav className="navbar has-background-primary mb-6">
      <div className="navbar-brand">
        <FontAwesomeIcon
          className="navbar-item has-text-white"
          icon={faAddressBook}
          size="4x"
        />
        <Link
          to="/"
          className="navbar-item has-text-white has-text-weight-bold is-size-5"
          id="title"
        >
          {title}
        </Link>
        <Link
          to="#"
          role="button"
          className={`navbar-burger burger ${burgerOpen ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded="false"
          onClick={toggleBurgerMenu}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </Link>
      </div>
      <div className={`navbar-menu ${burgerOpen ? 'is-active' : ''}`}>
        <div className="navbar-start"></div>
        <div className="navbar-end mr-6">
          <Link
            to="/"
            className={`navbar-item ${
              burgerOpen ? 'has-text-primary has-text-centered' : ''
            }`}
          >
            Home
          </Link>
          <Link
            to="/register"
            className={`navbar-item ${
              burgerOpen ? 'has-text-primary has-text-centered' : ''
            }`}
          >
            Registrarse
          </Link>
          <Link
            to="/login"
            className={`navbar-item ${
              burgerOpen ? 'has-text-primary has-text-centered' : ''
            }`}
          >
            Sign In
          </Link>
          <Link
            to="/about"
            className={`navbar-item ${
              burgerOpen ? 'has-text-primary has-text-centered' : ''
            }`}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'Contacts App',
  icon: 'faAddressBook'
};
export default Navbar;
