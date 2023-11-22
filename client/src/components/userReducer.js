// userReducer.js
const userReducer = (state, action) => {
    switch (action.type) {
      case 'REGISTER':
        return { ...state, username: action.payload.username };
      // Add other cases as needed (e.g., LOGIN, LOGOUT)
      default:
        return state;
    }
  };
  
  export default userReducer;
  