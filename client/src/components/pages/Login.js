import React from 'react';
import LoginForm from '../auth/LoginForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import '../css/auth.scss';

const Login = () => {
  return (
    <div className="columns is-centered">
      <div className="column is-four-fifths">
        <h3 className="title has-text-info-dark">
          <FontAwesomeIcon icon={faSignInAlt} className="login-icon" /> Inicia
          tu sesión
        </h3>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
