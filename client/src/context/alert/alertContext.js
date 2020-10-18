import React, { useReducer, createContext } from 'react';
import alertReducer from './alertReducer';
import { v4 as uuidv4 } from 'uuid';
import { REMOVE_ALERT, SET_ALERT, CLEAR_ALERTS } from '../types';

export const AlertContext = createContext();
export const AlertProvider = (props) => {
  const initialState = [];
  const [state, dispatch] = useReducer(alertReducer, initialState);

  //Set an alert
  const setAlert = (msg, type, timeout = 10000) => {
    const id = uuidv4();
    dispatch({ type: SET_ALERT, payload: { msg, type, id } });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };
  //Remove an alert
  const removeAlert = (id) => {
    dispatch({ type: REMOVE_ALERT, payload: id });
  };
  //Removes all alerts
  const clearAlerts = () => {
    dispatch({ type: CLEAR_ALERTS });
  };
  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
        removeAlert,
        clearAlerts
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};
