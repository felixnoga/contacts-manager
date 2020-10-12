import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';
import authReducer from './authReducer';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  //Load User (what user is logged in)
  //Register User (register a new user)
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/users`,
        formData,
        config
      );
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    } catch (e) {
      e.response &&
        dispatch({ type: REGISTER_FAIL, payload: e.response.data.msg });
      e.request && dispatch({ type: REGISTER_FAIL, payoload: 'Error grave' });
    }
  };
  //Login User (create token)
  //Logout (destroy token)
  //Clear errors
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
