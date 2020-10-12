import React, { useState, useContext, useEffect } from 'react';
import Input from '../form/Input';
import { faUser, faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { AlertContext } from '../../context/alert/alertContext';
import { AuthContext } from '../../context/auth/authContext';
import { ALERT_TYPES } from '../../context/types';
import Validator from '../../helpers/validation';

const RegisterForm = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { register, error, clearErrors } = authContext;
  const { setAlert } = alertContext;
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    equalPassword: false
  });

  useEffect(() => {
    if (error === 'El usuario ya existe')
      setAlert('El usuario con ese email ya existe', ALERT_TYPES.ERROR);
    clearErrors();
  }, [error]);

  const { name, email, password, password2 } = user;

  const onBlurHandler = (e) => {
    if (errors[e.target.name]) {
      Validator[e.target.name](e.target.value) &&
        setErrors({ ...errors, [e.target.name]: false });
    }
  };
  const validateForm = () => {
    let pass = true;
    if (!Validator.name(name)) {
      setErrors((prevState) => ({ ...prevState, name: true }));
      setAlert(
        'El nombre debe contener solamente caracteres alfanuméricos (cualquier letra del abecedario y números)',
        ALERT_TYPES.ERROR
      );
      pass = false;
    } else {
      setErrors((prevState) => ({ ...prevState, name: false }));
    }
    if (!Validator.email(email)) {
      setErrors((prevState) => ({ ...prevState, email: true }));
      setAlert('Email incorrecto', ALERT_TYPES.ERROR);
      pass = false;
    } else {
      setErrors((prevState) => ({ ...prevState, email: false }));
    }

    if (!Validator.password(password)) {
      setErrors((prevState) => ({ ...prevState, password: true }));
      setAlert(
        'El password debe contener al menos 8 caracteres y tener al menos una mayúscula.',
        ALERT_TYPES.ERROR
      );
      pass = false;
    } else {
      setErrors((prevState) => ({ ...prevState, password: false }));
    }
    if (!Validator.password2(password, password2)) {
      setErrors((prevState) => ({ ...prevState, equalPassword: true }));
      setAlert('Los passwords no coinciden', ALERT_TYPES.ERROR);
      pass = false;
    } else {
      setErrors((prevState) => ({ ...prevState, equalPassword: false }));
    }
    return pass;
  };

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onClickHandler = (e) => {
    e.preventDefault();
    if (alertContext.alerts.length) {
      alertContext.clearAlerts();
    }
    if (validateForm()) {
      register({ name, email, password });
      setUser({ name: '', email: '', password: '', password2: '' });
    }
  };
  return (
    <form>
      <Input
        label="Nombre"
        type="text"
        name="name"
        value={name}
        placeholder="Introduce tu nombre"
        hasIcon={true}
        icon={faUser}
        onChangeHandler={onChangeHandler}
        addedClass={errors.name ? 'is-danger' : ''}
        onBlurHandler={onBlurHandler}
      />
      <Input
        label="Email"
        type="text"
        name="email"
        value={email}
        placeholder="Introduce tu email"
        hasIcon={true}
        icon={faEnvelope}
        onChangeHandler={onChangeHandler}
        onBlurHandler={onBlurHandler}
        addedClass={errors.email ? 'is-danger' : ''}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        value={password}
        placeholder="Introduce un password"
        hasIcon={true}
        icon={faKey}
        onChangeHandler={onChangeHandler}
        onBlurHandler={onBlurHandler}
        addedClass={errors.password ? 'is-danger' : ''}
      />
      <Input
        label="Repite el password"
        type="password"
        name="password2"
        value={password2}
        placeholder="Repite tu password"
        hasIcon={true}
        icon={faKey}
        onChangeHandler={onChangeHandler}
        addedClass={errors.equalPassword ? 'is-danger' : ''}
      />
      <button className="button is-primary" onClick={onClickHandler}>
        Registrarse
      </button>
    </form>
  );
};

export default RegisterForm;
