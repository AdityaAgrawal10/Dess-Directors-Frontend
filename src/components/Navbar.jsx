import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <AppBar  position="static"
    sx={{
      backgroundColor: 'white',
      color: 'primary.main',
      // subtle shadow
        }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Left Section: Brand Name/Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src="https://dessdigitalmeetings.dess.net/img/logo.jpg" alt="Logo" style={{ height: 50, marginRight: 10 }} />
            {/* This could be an actual <img> logo or just text */}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 'bold',
              marginRight: 2,
            }}
          >
            Dess Directors
          </Typography>
        </Box>

        {/* Middle or Right Section: Conditional Nav Links */}
        <Box>
          {!token && (
            <>
              <Button
                component={RouterLink}
                to="/login"
                variant="text"
                sx={{ marginRight: 1 }}
              >
                Login
              </Button>
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                color="primary"
              >
                Register
              </Button>
            </>
          )}

          {token && userRole === 'DIRECTOR' && (
            <Button
              component={RouterLink}
              to="/director/dashboard"
              variant="text"
              sx={{ marginRight: 1 }}
            >
              Director Dashboard
            </Button>
          )}

          {token && userRole === 'COMPANY' && (
            <Button
              component={RouterLink}
              to="/company/dashboard"
              variant="text"
              sx={{ marginRight: 1 }}
            >
              Company Dashboard
            </Button>
          )}

          {token && (
            <Button variant="outlined" color="secondary" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
