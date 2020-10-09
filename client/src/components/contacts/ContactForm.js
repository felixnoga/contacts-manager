import React, { useContext, useState, useEffect } from 'react';
import { ContactContext } from '../../context/contact/contactContext';
import { faUser, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import Input from '../form/Input';
import * as EmailValidator from 'email-validator';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, updateContact, current, clearCurrent } = contactContext;
  useEffect(() => {
    if (current !== null) {
      setContact(current);
      setButtonDisabled(false);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
    }
  }, [current]);
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const { name, email, phone, type } = contact;
  const onChangeHandler = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
    if (contact.name.length > 1 && EmailValidator.validate(contact.email)) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  const onClearHandler = () => {
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    });
    if (current) {
      clearCurrent();
    }
    setButtonDisabled(true);
  };
  const onSumbitHandler = (e) => {
    e.preventDefault();
    if (!current) {
      addContact(contact);
      setButtonDisabled(true);
    } else {
      updateContact(contact);
      clearCurrent();
      setButtonDisabled(true);
    }

    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    });
  };
  return (
    <form onSubmit={onSumbitHandler}>
      <h3 className="title is-size-4">
        {current ? 'Editar contacto' : 'Añadir contacto'}
      </h3>

      <Input
        label="Nombre:"
        placeholder="Nombre"
        value={name}
        name="name"
        hasIcon={true}
        icon={faUser}
        onChangeHandler={onChangeHandler}
      />
      <Input
        label="Email"
        placeholder="Email"
        value={email}
        name="email"
        onChangeHandler={onChangeHandler}
        hasIcon={true}
        icon={faEnvelope}
      />
      <Input
        label="Teléfono"
        placeholder="Teléfono"
        value={phone}
        name="phone"
        onChangeHandler={onChangeHandler}
        hasIcon={true}
        icon={faPhone}
      />

      <div className="field">
        <label className="label">Tipo de contacto: </label>
        <div className="control">
          <div className="select">
            <select value={type} name="type" onChange={onChangeHandler}>
              <option value="personal">Personal</option>
              <option value="profesional">Profesional</option>
            </select>
          </div>
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link is-small" disabled={buttonDisabled}>
            {current ? 'Editar contacto' : 'Añadir contacto'}
          </button>
        </div>
        <div className="control">
          <button
            className="button is-danger is-small"
            onClick={onClearHandler}
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
