// src/pages/Register.jsx
import React, { useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Chip,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState('DIRECTOR'); // default role
  const [form, setForm] = useState({
    email: '',
    password: '',
    fullName: '',
    companyName: '',
  });
  const [error, setError] = useState('');

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Build the payload
    const payload = {
      email: form.email,
      password: form.password,
      role,
    };

    // If Director, include fullName
    if (role === 'DIRECTOR') {
      payload.fullName = form.fullName;
    }

    // If Company, include companyName
    if (role === 'COMPANY') {
      payload.companyName = form.companyName;
    }

    try {
      const { data } = await axiosClient.post('/auth/register', payload);
      // Store token and role
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.user.role);

      // Redirect based on user role
      if (data.user.role === 'DIRECTOR') {
        navigate('/director/dashboard');
      } else if (data.user.role === 'COMPANY') {
        navigate('/company/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      {/* LEFT SECTION (Branding / Marketing) */}
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
            Join Our Board Leadership Community
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Create your account to discover exclusive board vacancies or find top-tier directors
            for your organization. Take the next step in building a transformative leadership team.
          </Typography>

          {/* Example "categories" chips (purely decorative here) */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Chip label="Strategy" color="default" />
            <Chip label="Innovation" color="default" />
            <Chip label="Global" color="default" />
            <Chip label="Startups" color="default" />
            <Chip label="Consulting" color="default" />
            <Chip label="Leadership" color="default" />
          </Box>
        </Box>
      </Grid>

      {/* RIGHT SECTION (Registration Form) */}
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
            Register
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            Create your account to get started
          </Typography>

          {error && (
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          {/* Email Field */}
          <TextField
            label="Email"
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

          {/* Role Selection */}
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
            I am registering as:
          </Typography>
          <RadioGroup
            row
            value={role}
            onChange={handleRoleChange}
            sx={{ mb: 3 }}
          >
            <FormControlLabel
              value="DIRECTOR"
              control={<Radio />}
              label="Director"
            />
            <FormControlLabel
              value="COMPANY"
              control={<Radio />}
              label="Company"
            />
          </RadioGroup>

          {/* Director Fields */}
          {role === 'DIRECTOR' && (
            <TextField
              label="Full Name"
              variant="outlined"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
          )}

          {/* Company Fields */}
          {role === 'COMPANY' && (
            <TextField
              label="Company Name"
              variant="outlined"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
          )}

          <Button type="submit" variant="contained" fullWidth sx={{ mb: 2 }}>
            Create Account
          </Button>

          <Typography variant="body2" align="center">
            Already have an account?{' '}
            <MuiLink component={Link} to="/login">
              Login
            </MuiLink>
          </Typography>

          <Divider sx={{ my: 3 }}>Or</Divider>

          {/* Social / Alternate Auth Buttons (placeholders) */}
          <Button
            variant="outlined"
            fullWidth
            sx={{ mb: 1 }}
            onClick={() => alert('Google OAuth not yet implemented')}
          >
            Sign up with Google
          </Button>
          <Button
            variant="text"
            fullWidth
            onClick={() => alert('OTP Registration not yet implemented')}
          >
            Use OTP to Register
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Register;
