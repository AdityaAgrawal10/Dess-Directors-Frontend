// src/pages/ResetPassword.jsx
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
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const { data } = await axiosClient.post('/auth/reset-password', { token, newPassword });
      setMessage(data.message);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error resetting password.');
    }
  };

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      {/* LEFT SECTION (Branding/Marketing) */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          p: 5,
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          color: '#fff',
        }}
      >
        <Box sx={{ maxWidth: 400, ml: 5 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            Reset Your Password Securely
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Enter your new password below. Our secure process ensures your account remains protected.
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Chip label="Secure" color="default" />
            <Chip label="Reliable" color="default" />
            <Chip label="Fast" color="default" />
          </Box>
        </Box>
      </Grid>

      {/* RIGHT SECTION (Reset Password Form) */}
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
            Reset Password
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            Enter your new password and confirm it below.
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
            label="New Password"
            variant="outlined"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mb: 2 }}>
            Reset Password
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

export default ResetPassword;
