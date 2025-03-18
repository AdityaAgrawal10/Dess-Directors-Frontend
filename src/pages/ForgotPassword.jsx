// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
  Chip,
} from '@mui/material';
import { Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const { data } = await axiosClient.post('/auth/forgot-password', { email });
      setMessage(data.message); // e.g. "A password reset link has been sent..."
    } catch (err) {
      setError(err.response?.data?.message || 'Error requesting password reset.');
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
            Forgot Your Password?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Don’t worry! We’ll help you reset it quickly so you can get back to discovering 
            exclusive board vacancies or connecting with top-tier directors.
          </Typography>

          {/* Example "help" chips (purely decorative here) */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Chip label="Security" color="default" />
            <Chip label="Safe & Secure" color="default" />
            <Chip label="Quick Recovery" color="default" />
          </Box>
        </Box>
      </Grid>

      {/* RIGHT SECTION (Forgot Password Form) */}
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
            Reset Your Password
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            Enter your email address and we’ll send you a link to reset your password.
          </Typography>

          {message && (
            <Typography variant="body2" color="success.main" sx={{ mb: 2 }}>
              {message}
            </Typography>
          )}
          {error && (
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mb: 2 }}>
            Request Reset Link
          </Button>

          <Typography variant="body2" align="center">
            Remembered your password?{' '}
            <MuiLink component={Link} to="/login">
              Login
            </MuiLink>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ForgotPassword;
