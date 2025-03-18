// src/pages/Director/DirectorProfileLinkedIn.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Paper,
  Grid,
  Avatar,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
} from '@mui/material';
import axiosClient from '../../api/axiosClient';

function DirectorProfileLinkedIn() {
  const [profile, setProfile] = useState({
    fullName: '',
    headline: '',
    experience: '',
    location: '',
    sittingFeesRange: '',
  });
  const [loading, setLoading] = useState(true);
  const [updateSuccess, setUpdateSuccess] = useState('');
  const [updateError, setUpdateError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosClient.get('/directors/profile');
        setProfile(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateSuccess('');
    setUpdateError('');
    try {
      await axiosClient.put('/directors/profile', profile);
      setUpdateSuccess('Profile updated successfully.');
    } catch (err) {
      setUpdateError(err.response?.data?.message || 'Error updating profile.');
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6">Loading Profile...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Cover Photo Section */}
      <Box
        sx={{
          height: 220,
          backgroundImage: 'url(https://via.placeholder.com/1200x220?text=Cover+Photo)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          borderRadius: 2,
          mb: 8,
        }}
      >
        {/* Overlapping Profile Avatar */}
        <Avatar
          src="https://via.placeholder.com/150"
          alt={profile.fullName}
          sx={{
            width: 150,
            height: 150,
            border: '4px solid white',
            position: 'absolute',
            bottom: -75,
            left: 40,
          }}
        />
      </Box>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Grid container spacing={4}>
          {/* Left Side: Profile Header & Summary */}
          <Grid item xs={12} md={4}>
            <Box sx={{ ml: { md: 2 } }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {profile.fullName}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
                {profile.headline || 'Your professional headline goes here'}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">
                <strong>Location:</strong> {profile.location || 'Not specified'}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                <strong>Sitting Fees:</strong> {profile.sittingFeesRange || 'Not specified'}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                A well-crafted profile helps you stand out and attract top companies.
              </Typography>
            </Box>
          </Grid>

          {/* Right Side: Editable Form */}
          <Grid item xs={12} md={8}>
            {updateSuccess && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {updateSuccess}
              </Alert>
            )}
            {updateError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {updateError}
              </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Full Name"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Headline"
                    name="headline"
                    value={profile.headline}
                    onChange={handleChange}
                    fullWidth
                    required
                    placeholder="e.g. Experienced Board Director in Finance"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Experience"
                    name="experience"
                    value={profile.experience}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Share a brief summary of your professional experience..."
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Location"
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Sitting Fees Range"
                    name="sittingFeesRange"
                    value={profile.sittingFeesRange}
                    onChange={handleChange}
                    fullWidth
                    placeholder="e.g. 2000-5000 USD per meeting"
                  />
                </Grid>
              </Grid>
              <Box sx={{ mt: 3, textAlign: 'right' }}>
                <Button type="submit" variant="contained" color="primary">
                  Save Profile
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default DirectorProfileLinkedIn;
