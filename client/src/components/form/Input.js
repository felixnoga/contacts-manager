import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Input = (props) => {
  const {
    label,
    placeholder,
    value,
    name,
    onChangeHandler,
    onBlurHandler,
    hasIcon,
    icon,
    type,
    addedClass
  } = props;
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className={`control ${hasIcon ? 'has-icons-left' : ''}`}>
        <input
          className={`input ${addedClass}`}
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
        />
        <span className="icon is-small is-left">
          <FontAwesomeIcon icon={icon} />
        </span>
      </div>
    </div>
  );
};

export default Input;
