import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { StateContext } from '../contexts'; // Make sure this path is correct

export default function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();
  const { dispatch } = useContext(StateContext);

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      console.error('Passwords do not match');
      return;
    }
    
    try {
      const response = await axios.post('/auth/register', {
        username, 
        password,
        passwordConfirmation // Make sure backend handles this field correctly
      });
      dispatch({ type: 'LOGIN', payload: { ...response.data, username } });
      localStorage.setItem('access_token', response.data.access_token);
      navigate('/todolist');
    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data.error : error.message);
    }
  };

  return (
    <div className="registration-container">
      <form className="registration-form" onSubmit={handleRegistrationSubmit}>
        <label htmlFor="register-username">Username:</label>
        <input
          type="text"
          name="register-username"
          id="register-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="register-password">Password:</label>
        <input
          type="password"
          name="register-password"
          id="register-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input
          type="password"
          name="confirm-password"
          id="confirm-password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <div className="button-container">
          <input type="submit" value="Register" />
        </div>
      </form>
    </div>
  );
}
