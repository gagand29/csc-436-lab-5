import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StateContext } from '../contexts';

export default function Logout() {
  const { dispatch } = useContext(StateContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('access_token'); // Clear the token from local storage
    navigate('/'); // Navigate to the login page
  };

  return (
    <div className="login-container">
      <h2>Logout</h2>
      <button onClick={handleLogout} className="button-container">Logout</button>
    </div>
  );
}
