// src/contexts.js
import React, { createContext, useReducer } from 'react';
import { appReducer, initialState } from './appReducer';

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};
