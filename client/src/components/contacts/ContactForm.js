import React, { useContext, useState, useEffect } from 'react';
import { ContactContext } from '../../context/contact/contactContext';
import { faUser, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import Alerts from '../layout/Alerts';
import Input from '../form/Input';
import * as EmailValidator from 'email-validator';
import { AuthContext } from '../../context/auth/authContext';
import { AlertContext } from '../../context/alert/alertContext';
import { ALERT_TYPES } from '../../context/types';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { isAuthenticated } = authContext;
  const { setAlert } = alertContext;
  const {
    addContact,
    updateContact,
    current,
    clearCurrent,
    getAllContacts,
    error
  } = contactContext;

  const [fileValue, setFileValue] = useState('');

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
  useEffect(() => {
    if (error === 'Tamaño máximo de imagen 1 MB') {
      setAlert(
        'El tamaño de la imagen no puede superar 1 Mb',
        ALERT_TYPES.ERROR
      );
    }
    if (error === 'Archivo no valido') {
      setAlert(
        'Sólo se permiten archivos de imagen jpeg, jpg, png y webp.',
        ALERT_TYPES.ERROR
      );
    }
  }, [error]);
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
      setFileValue(e.target.value);
      setContact({ ...contact, [e.target.name]: e.target.files[0] });
    } else {
      setContact({ ...contact, [e.target.name]: e.target.value });
    }

    if (
      contact.name.length > 1 &&
      EmailValidator.validate(contact.email) &&
      isAuthenticated
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };
  const onClearHandler = (e) => {
    e.preventDefault();
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
    setFileValue('');
  };
  if (!isAuthenticated) {
    return (
      <h4>Registrate o logeate para empezar a gestionar tus contactos.</h4>
    );
  }
  return (
    <form encType="multipart/form-data" onSubmit={onSumbitHandler}>
      <h3 className="title is-size-4">
        {current ? 'Editar contacto' : 'Añadir contacto'}
      </h3>
      <Alerts />
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
        value={fileValue}
        name="image"
        onChangeHandler={onChangeHandler}
        hasIcon={true}
        icon={faPhone}
      />
      {current ? (
        <div className="box">
          <p>Imagen actual: </p>
          <img className="image is-48x48" src={current.image} alt="" />
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
