// UserContext.js
import React, { createContext, useReducer } from 'react';

const UserContext = createContext();

const initialState = {
  user: null,
  createTodoVisible: false,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
    case 'REGISTER':
      return {
        ...state,
        user: action.payload,
        createTodoVisible: true,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        createTodoVisible: false,
      };

    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ userState: state, userDispatch: dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
