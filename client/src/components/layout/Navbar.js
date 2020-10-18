import React, { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth/authContext';
import { animateBurgerMenuOpen } from '../../helpers/animations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
import '../css/navbar.scss';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ContactContext } from '../../context/contact/contactContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const contactsContext = useContext(ContactContext);
  const { user, logout } = authContext;
  const { clearContacts } = contactsContext;
  const [burgerOpen, setBurgerOpen] = useState(false);
  const burgerMenu = useRef(null);

  const signOutHandler = () => {
    if (burgerOpen) {
      toggleBurgerMenu();
    }
    clearContacts();
    logout();
  };
  const toggleBurgerMenu = () => {
    !burgerOpen &&
      animateBurgerMenuOpen(burgerMenu, setBurgerOpen(!burgerOpen));
    burgerOpen && setBurgerOpen(!burgerOpen);
  };

  const closeMenu = () => {
    burgerOpen && setBurgerOpen(false);
  };
  return (
    <nav className="navbar has-background-primary">
      <div className="navbar-brand ml-3">
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
      <div
        ref={burgerMenu}
        className={`navbar-menu ${burgerOpen ? 'is-active' : ''}`}
      >
        <div className="navbar-start"></div>
        <div className="navbar-end mr-6">
          {user ? (
            <div
              className={`navbar-item has-text-link has-text-weight-bold ${
                burgerOpen
                  ? 'has-text-danger has-text-weight-bold has-text-centered'
                  : ''
              }`}
            >
              <FontAwesomeIcon icon={faUser} fixedWidth color="#3273DC" />{' '}
              {user.name}
            </div>
          ) : null}

          <Link
            to="/"
            onClick={closeMenu}
            className={`navbar-item ${
              burgerOpen ? 'has-text-primary has-text-centered' : ''
            }`}
          >
            Home
          </Link>
          <Link
            to="/register"
            onClick={closeMenu}
            className={`navbar-item ${
              burgerOpen ? 'has-text-primary has-text-centered' : ''
            }`}
          >
            Registrarse
          </Link>
          {user ? (
            <Link
              to="/"
              onClick={signOutHandler}
              className={`navbar-item ${
                burgerOpen ? 'has-text-primary has-text-centered' : ''
              }`}
            >
              Sign Out
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className={`navbar-item ${
                burgerOpen ? 'has-text-primary has-text-centered' : ''
              }`}
            >
              Sign In
            </Link>
          )}
          <Link
            to="/about"
            onClick={closeMenu}
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
