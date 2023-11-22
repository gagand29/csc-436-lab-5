import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { StateContext, StateProvider } from './contexts';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Registration from './components/Registration';
import TodoList from './components/TodoList';
import UserDashboard from './components/UserDashboard';

function AppContent() {
  const { state } = useContext(StateContext);

  return (
    <Routes>
      <Route path="/" element={state.loggedInUser ? <Navigate to="/todolist" /> : <Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/todolist" element={state.loggedInUser ? <TodoList /> : <Navigate to="/" />} />
      <Route path="/dashboard" element={state.loggedInUser ? <UserDashboard /> : <Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <StateProvider>
      <Header />
      <AppContent />
      <Footer />
    </StateProvider>
  );
}

export default App;
