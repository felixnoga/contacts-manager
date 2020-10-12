import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ContactContext } from '../../context/contact/contactContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const onDeleteHandler = (id) => {
    deleteContact(id);
    clearCurrent();
  };

  return (
    <div className="column is-half-desktop">
      <div className="card mb-3">
        <div className="card-header">
          <h5 className="card-header-title is-size-7">
            <figure className="image is-32x32 mr-2">
              <img
                className="is-rounded"
                src={`${process.env.REACT_APP_BACKEND_IMAGES_URL}/${contact.image}`}
              />
            </figure>
            {contact.name}
          </h5>
          <p className="card-header-icon">
            {contact.type === 'profesional' ? (
              <span className="tag is-link">
                {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
              </span>
            ) : (
              <span className="tag is-success">
                {' '}
                {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
              </span>
            )}
          </p>
        </div>
        <div className="card-content is-size-7">
          <p className="py-2">
            <FontAwesomeIcon icon={faEnvelope} className="has-text-primary" />{' '}
            Email: {contact.email}
          </p>
          <p className="py-2">
            <FontAwesomeIcon icon={faPhone} className="has-text-primary" />{' '}
            Teléfono: {contact.phone}
          </p>
        </div>
        <div className="card-footer py-3 px-3">
          <button
            className="button is-primary is-small mr-2"
            onClick={() => setCurrent(contact)}
          >
            Editar
          </button>
          <button
            className="button is-danger is-small"
            onClick={() => onDeleteHandler(contact.id)}
          >
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;
