import React from 'react';
import RegisterForm from '../auth/RegisterForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareSquare } from '@fortawesome/free-solid-svg-icons';
import '../css/auth.scss';

const Register = () => {
  return (
    <div className="columns is-centered">
      <div className="column is-four-fifths">
        <h3 className="title has-text-info-dark">
          <FontAwesomeIcon icon={faShareSquare} className="login-icon" /> Crear
          cuenta
        </h3>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
