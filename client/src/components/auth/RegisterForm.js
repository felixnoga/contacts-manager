import React, { useState } from 'react';
import Input from '../form/Input';
import { faUser, faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';

const RegisterForm = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const { name, email, password, password2 } = user;

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onClickHandler = (e) => {
    e.preventDefault();
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
      />
      <button className="button is-primary" onClick={onClickHandler}>
        Registrarse
      </button>
    </form>
  );
};

export default RegisterForm;
