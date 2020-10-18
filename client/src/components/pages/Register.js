import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth/authContext';

import RegisterForm from '../auth/RegisterForm';
import Alerts from '../layout/Alerts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareSquare } from '@fortawesome/free-solid-svg-icons';
import '../css/auth.scss';

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
  }, [isAuthenticated, props.history]);
  return (
    <div className="columns is-centered mt-3">
      <div className="column is-four-fifths">
        <h3 className="title has-text-info-dark">
          <FontAwesomeIcon icon={faShareSquare} className="login-icon" /> Crear
          cuenta
        </h3>
        <Alerts />
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
