import React, { useContext, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ContactContext } from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import ContactFilter from '../contacts/ContactFilter';
import Alerts from '../layout/Alerts';
import '../css/contacts.scss';
import { AlertContext } from '../../context/alert/alertContext';
import { ALERT_TYPES } from '../../context/types';
import { AuthContext } from '../../context/auth/authContext';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { contacts, filtered, getAllContacts } = contactContext;

  const { isAuthenticated, token, user } = authContext;

  useEffect(() => {
    getAllContacts();
  }, [token]);

  const nodeRef = useRef(null);

  if (contacts.length === 0 && isAuthenticated) {
    return (
      <>
        <h4>No tienes contactos aún. Añade algunos.</h4>
      </>
    );
  }
  return (
    <>
      <h3 className="title is-size-4">Contactos de {user && user.name}</h3>
      <div className="columns">
        <div className="column">
          <ContactFilter />
        </div>
      </div>

      <TransitionGroup className="columns is-multiline">
        {filtered
          ? filtered.map((contact) => (
              <CSSTransition
                nodeRef={nodeRef}
                key={contact.id}
                timeout={500}
                classNames="item"
              >
                <ContactItem contact={contact} />
              </CSSTransition>
            ))
          : contacts.map((contact) => (
              <CSSTransition
                nodeRef={nodeRef}
                key={contact.id}
                timeout={500}
                classNames="item"
              >
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </>
  );
};

export default Contacts;
