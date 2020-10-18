import React, { useContext, useEffect } from 'react';
import LoginForm from '../auth/LoginForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import '../css/auth.scss';
import { AuthContext } from '../../context/auth/authContext';

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;
  useEffect(() => {
    isAuthenticated && props.history.push('/');
  }, [isAuthenticated, props.history]);
  return (
    <div className="columns is-centered is-mobile mt-4">
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
