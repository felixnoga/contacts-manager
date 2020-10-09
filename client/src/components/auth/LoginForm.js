import React, { useState } from 'react';
import Input from '../form/Input';
import { faUser, faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';

const LoginForm = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const { email, password } = user;

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onClickHandler = (e) => {
    e.preventDefault();
  };
  return (
    <form>
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
