import React, { createContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import contactReducer from './contactReducer';
import {
  getContacts,
  addCnt,
  updateCnt,
  deleteCnt
} from '../../helpers/fetchData';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  GET_CONTACTS,
  CONTACT_ERROR,
  CLEAR_CONTACTS,
  SET_LOADING
} from '../types';

export const ContactContext = createContext();
const initialState = {
  contacts: [],
  current: null,
  filtered: null,
  error: null,
  loadingContacts: false
};

export const ContactProvider = (props) => {
  const [state, dispatch] = useReducer(contactReducer, initialState);
  // useEffect(() => {
  //   const initializeContacts = async () => {
  //     await getAllContacts();
  //   };
  //   initializeContacts();
  // }, []);

  //Add Contact
  const addContact = async (formData) => {
    formData.append('id', uuidv4());
    dispatch({ type: SET_LOADING });
    try {
      const newContact = await addCnt(formData);
      dispatch({ type: ADD_CONTACT, payload: newContact });
    } catch (e) {
      dispatch({ type: CONTACT_ERROR, payload: e.response.data.msg });
    }
  };

  //Get all contacts
  const getAllContacts = async () => {
    try {
      const contacts = await getContacts();
      dispatch({ type: GET_CONTACTS, payload: contacts });
    } catch (e) {
      dispatch({ type: CONTACT_ERROR, payload: e.response.data.msg });
    }
  };

  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  //Delete Contact
  const deleteContact = async (id) => {
    dispatch({ type: SET_LOADING });
    await deleteCnt(id);
    dispatch({ type: DELETE_CONTACT, payload: id });
  };
  //Set current Contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };
  //Clear current Contact
  const clearCurrent = (contact) => {
    dispatch({ type: CLEAR_CURRENT });
  };
  //Update Contact
  const updateContact = async (formdata) => {
    dispatch({ type: SET_LOADING });
    const contact = await updateCnt(formdata);
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
        error: state.error,
        loadingContacts: state.loadingContacts,
        addContact,
        getAllContacts,
        clearContacts,
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
