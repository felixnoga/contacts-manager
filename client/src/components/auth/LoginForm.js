import React, { useContext, useEffect, useState } from 'react';
import Input from '../form/Input';
import Validator from '../../helpers/validation';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/auth/authContext';
import { AlertContext } from '../../context/alert/alertContext';
import { ALERT_TYPES } from '../../context/types';
import Alerts from '../layout/Alerts';

const LoginForm = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const { email, password } = user;
  const { login, error } = authContext;
  const { setAlert } = alertContext;
  useEffect(() => {
    error === 'Las credenciales son incorrectas' &&
      setAlert('Usuario o password incorrectos', ALERT_TYPES.ERROR);
  }, [error]);

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onClickHandler = (e) => {
    e.preventDefault();
    let pass = true;
    if (!Validator.email(email)) {
      setAlert('El email introducido no es un email válido', ALERT_TYPES.ERROR);
      pass = false;
    }
    if (password.length < 1) {
      setAlert('El password es un campo obligatorio', ALERT_TYPES.ERROR);
      pass = false;
    }
    if (pass) {
      login(user);
      setUser({
        email: '',
        password: ''
      });
    }
  };
  return (
    <form>
      <Alerts />
      <Input
        label="Email"
        type="text"
        name="email"
        value={email}
        placeholder="Introduce tu email"
        hasIcon={true}
        icon={faEnvelope}
        onChangeHandler={onChangeHandler}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        value={password}
        placeholder="Introduce tu password"
        hasIcon={true}
        icon={faKey}
        onChangeHandler={onChangeHandler}
      />
      <button className="button is-primary" onClick={onClickHandler}>
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
