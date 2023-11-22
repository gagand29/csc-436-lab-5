import React, { useContext } from 'react';
import { StateContext } from '../contexts';
import Logout from './Logout';

export default function UserDashboard() {
  const { state } = useContext(StateContext);

  return (
    <div className="user-dashboard">
      <h1>Welcome, {state.loggedInUser.username}</h1>
      <Logout />
    </div>
  );
}
