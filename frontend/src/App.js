import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StoreList from './pages/StoreList';
import AdminDashboard from './pages/AdminDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/stores" element={<StoreList />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/owner" element={<OwnerDashboard />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
