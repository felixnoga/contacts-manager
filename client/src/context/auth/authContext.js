import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import setAuthToken from '../../helpers/setAuthToken';
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
    loading: false,
    user: null,
    error: null
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  //Load User (what user is logged in)

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth`
        );
        dispatch({ type: USER_LOADED, payload: res.data });
      } catch (e) {
        dispatch({ type: AUTH_ERROR });
      }
    }
  };
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
      await loadUser();
    } catch (e) {
      e.response &&
        dispatch({ type: REGISTER_FAIL, payload: e.response.data.msg });
      e.request && dispatch({ type: REGISTER_FAIL, payload: 'Error grave' });
    }
  };
  //Login User (create token)
  const login = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth`,
        data
      );
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
      await loadUser();
    } catch (e) {
      dispatch({ type: LOGIN_FAIL, payload: e.response.data.msg });
    }
  };

  //Logout (destroy token)
  const logout = () => {
    dispatch({ type: LOGOUT });
  };
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
        clearErrors,
        loadUser,
        login,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
