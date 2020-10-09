import React, { createContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

export const ContactContext = createContext();
const initialState = {
  contacts: [
    {
      id: 1,
      name: 'Felix Nogales',
      email: 'felixnoga@gmail.com',
      phone: '696198087',
      type: 'profesional'
    },
    {
      id: 2,
      name: 'Teresa de Miguel',
      email: 'teresa@gmail.com',
      phone: '659523658',
      type: 'personal'
    },
    {
      id: 3,
      name: 'María Sanchez',
      email: 'mariaSan@gmail.com',
      phone: '569985444',
      type: 'profesional'
    },
    {
      id: 4,
      name: 'Pepe Gotera',
      email: 'gotera@gmail.com',
      phone: '56992344',
      type: 'personal'
    }
  ],
  current: null,
  filtered: null
};

export const ContactProvider = (props) => {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  //Add Contact
  const addContact = (contact) => {
    contact.id = uuidv4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };
  //Delete Contact
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };
  //Set current Contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };
  //Clear current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  //Update Contact
  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };
  //Filter Contacts
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };
  //Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        updateContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};
