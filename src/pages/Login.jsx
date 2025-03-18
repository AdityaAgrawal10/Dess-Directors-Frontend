// src/pages/Login.jsx
import React, { useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
  Chip,
  Divider,
  IconButton
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

// You can replace this with any icon you want, or a custom Google button
import GoogleIcon from '@mui/icons-material/Google';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await axiosClient.post('/auth/login', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.user.role);

      // Redirect based on user role
      if (data.user.role === 'DIRECTOR') {
        navigate('/director/dashboard');
      } else if (data.user.role === 'COMPANY') {
        navigate('/company/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      {/* LEFT SECTION (Marketing / Branding) */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          color: '#fff',
          p: 5,
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        }}
      >
        <Box sx={{ maxWidth: 400, ml: 5 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            Find Your Next Board Opportunity
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Unlock exclusive board-level roles at top companies, or find visionary leaders
            to join your board. Empower your career and organization with the right fit.
          </Typography>

          {/* Example "quick search" chips (purely decorative here) */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Chip label="Finance" color="default" />
            <Chip label="MNC" color="default" />
            <Chip label="Software & IT" color="default" />
            <Chip label="Analytics" color="default" />
            <Chip label="HR" color="default" />
            <Chip label="Project Mgmt" color="default" />
          </Box>
        </Box>
      </Grid>

      {/* RIGHT SECTION (Login Form) */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 3, md: 8 },
          py: { xs: 5, md: 0 },
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            maxWidth: 400,
            width: '100%',
            mx: 'auto',
            textAlign: 'left',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
            Login
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            Welcome back! Please enter your details.
          </Typography>

          {error && (
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          {/* Email/Username Field */}
          <TextField
            label="Email ID / Username"
            variant="outlined"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          {/* Password Field */}
          <TextField
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          {/* Forgot Password Link */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <MuiLink component={Link} to="/forgot-password" variant="body2">
              Forgot Password?
            </MuiLink>
            <MuiLink component={Link} to="/register" variant="body2">
              Register for free
            </MuiLink>
          </Box>

          {/* Login Button */}
          <Button type="submit" variant="contained" fullWidth sx={{ mb: 2 }}>
            Login
          </Button>

          {/* Alternative Login Options */}
          <Button
            variant="text"
            fullWidth
            sx={{ mb: 1 }}
            onClick={() => alert('OTP login flow not yet implemented')}
          >
            Use OTP to Login
          </Button>

          <Divider sx={{ my: 2 }}>Or</Divider>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={() => alert('Google login flow not yet implemented')}
          >
            Sign in with Google
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
