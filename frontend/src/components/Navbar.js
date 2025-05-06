import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate(token ? '/stores' : '/login')}>Store Rating</Typography>
        {!token ? (
          <>
            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
            <Button color="inherit" onClick={() => navigate('/signup')}>Signup</Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate('/stores')}>Stores</Button>
            {role === 'admin' && <Button color="inherit" onClick={() => navigate('/admin')}>Admin</Button>}
            {role === 'owner' && <Button color="inherit" onClick={() => navigate('/owner')}>Owner</Button>}
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
