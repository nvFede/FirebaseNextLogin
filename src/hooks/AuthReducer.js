export const initialState = {
    user: null,
    error: null,
  };
  
  export const authReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          user: action.user,
          error: null, // Clear any previous errors
        };
      case 'LOGIN_FAILURE':
        return {
          ...state,
          error: action.error,
        };
      case 'SIGNUP_SUCCESS':
        return {
          ...state,
          user: action.user,
          error: null, // Clear any previous errors
        };
      case 'SIGNUP_FAILURE':
        return {
          ...state,
          error: action.error,
        };
      case 'LOGOUT':
        return {
          ...state,
          user: null, // Clear the user on logout
          error: null, // Clear any errors
        };
      default:
        return state;
    }
  };
  