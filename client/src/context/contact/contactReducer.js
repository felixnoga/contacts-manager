import {
  ADD_CONTACT,
  CLEAR_CONTACTS,
  CLEAR_CURRENT,
  CLEAR_ERRORS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  DELETE_CONTACT,
  FILTER_CONTACTS,
  GET_CONTACTS,
  SET_CURRENT,
  UPDATE_CONTACT
} from '../types';

const contactReducer = (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        error: null,
        contacts: [...state.contacts, action.payload]
      };
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: []
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        )
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        )
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT: {
      return {
        ...state,
        current: null
      };
    }
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return (
            contact.name.match(regex) ||
            contact.email.match(regex) ||
            contact.phone.match(regex)
          );
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    default:
      return state;
  }
};

export default contactReducer;
