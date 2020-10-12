import React, { useContext, useState, useEffect, useRef } from 'react';
import { ContactContext } from '../../context/contact/contactContext';
import { faUser, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import Input from '../form/Input';
import * as EmailValidator from 'email-validator';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const {
    addContact,
    updateContact,
    current,
    clearCurrent,
    getAllContacts
  } = contactContext;
  useEffect(() => {
    if (current !== null) {
      setContact({ ...current, oldImage: current.image });
      setButtonDisabled(false);
    } else {
      setContact({
        id: '',
        name: '',
        email: '',
        phone: '',
        image: '',
        oldImage: null,
        type: 'personal'
      });
    }
  }, [current]);
  const [contact, setContact] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    image: '',
    oldImage: null,
    type: 'personal'
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const { id, name, email, phone, image, type, oldImage } = contact;
  const onChangeHandler = (e) => {
    if (e.target.name === 'image') {
      setContact({ ...contact, [e.target.name]: e.target.files[0] });
    } else {
      setContact({ ...contact, [e.target.name]: e.target.value });
    }

    if (contact.name.length > 1 && EmailValidator.validate(contact.email)) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  const onClearHandler = () => {
    setContact({
      id: '',
      name: '',
      email: '',
      phone: '',
      image: '',
      type: 'personal'
    });
    if (current) {
      clearCurrent();
    }
    setButtonDisabled(true);
  };
  const onSumbitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', id);
    formData.append('image', image);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('type', type);
    formData.append('oldImage', oldImage);
    if (!current) {
      addContact(formData);
      getAllContacts();
      setButtonDisabled(true);
    } else {
      updateContact(formData);
      clearCurrent();
      setButtonDisabled(true);
    }

    setContact({
      name: '',
      email: '',
      phone: '',
      image: '',
      type: 'personal'
    });
  };
  return (
    <form encType="multipart/form-data" onSubmit={onSumbitHandler}>
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

      <Input
        id="fileInput"
        label={current ? 'Cambiar imagen' : 'Imagen del contacto'}
        type="file"
        placeholder="Subir imagen del contacto"
        name="image"
        onChangeHandler={onChangeHandler}
        hasIcon={true}
        icon={faPhone}
      />
      {current ? (
        <div className="box">
          <p>Imagen actual: </p>
          <img
            className="image is-48x48"
            src={`${process.env.REACT_APP_BACKEND_IMAGES_URL}/${current.image}`}
            alt=""
          />
        </div>
      ) : null}
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
