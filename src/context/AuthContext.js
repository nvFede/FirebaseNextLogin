// import React, { createContext, useContext, useReducer } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ reducer, initialState, children }) => (
//   <AuthContext.Provider value={useReducer(reducer, initialState)}>
//     {children}
//   </AuthContext.Provider>
// );

// export const useAuth = () => useContext(AuthContext);

// AuthContext.js
import React, { createContext, useReducer } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children, reducer, initialState }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
