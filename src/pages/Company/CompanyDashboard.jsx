// src/pages/Company/EnhancedCompanyDashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

// Material UI Icons
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';

import axiosClient from '../../api/axiosClient';

function EnhancedCompanyDashboard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  // State variables for company profile, vacancies, applications, notifications, and new vacancy form
  const [profile, setProfile] = useState({});
  const [vacancies, setVacancies] = useState([]);
  const [applications, setApplications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [profileCompleteness, setProfileCompleteness] = useState(50);
  const [newVacancy, setNewVacancy] = useState({
    title: '',
    functionArea: '',
    location: '',
    requiredExperience: '',
    sittingFees: '',
    minYearsExperience: '',
    maxYearsExperience: '',
  });
  const [postingError, setPostingError] = useState('');
  const [postingSuccess, setPostingSuccess] = useState('');

  useEffect(() => {
    fetchCompanyProfile();
    fetchMyVacancies();
    fetchCompanyApplications();
    fetchCompanyNotifications();
  }, []);

  // ------------------------
  //     DATA FETCHING
  // ------------------------
  const fetchCompanyProfile = async () => {
    try {
      const { data } = await axiosClient.get('/companies/profile');
      setProfile(data);
      // Compute profile completeness (example logic)
      let completeness = 0;
      if (data.companyName) completeness += 30;
      if (data.companyDescription) completeness += 30;
      if (data.location) completeness += 20;
      if (data.website) completeness += 20;
      setProfileCompleteness(completeness);
    } catch (err) {
      console.error('Error fetching company profile:', err);
    }
  };

  const fetchMyVacancies = async () => {
    try {
      const { data } = await axiosClient.get('/vacancies/my/list');
      setVacancies(data);
    } catch (err) {
      console.error('Error fetching company vacancies:', err);
    }
  };

  const fetchCompanyApplications = async () => {
    try {
      const { data } = await axiosClient.get('/applications/company');
      setApplications(data);
    } catch (err) {
      console.error('Error fetching company applications:', err);
    }
  };

  const fetchCompanyNotifications = async () => {
    try {
      const { data } = await axiosClient.get('/notifications/company');
      setNotifications(data);
    } catch (err) {
      console.error('Error fetching company notifications:', err);
    }
  };

  // ------------------------
  //        ACTIONS
  // ------------------------
  const handlePostNewVacancy = async (e) => {
    e.preventDefault();
    setPostingError('');
    setPostingSuccess('');
    try {
      await axiosClient.post('/vacancies', newVacancy);
      setPostingSuccess('Vacancy posted successfully.');
      // Clear form
      setNewVacancy({
        title: '',
        functionArea: '',
        location: '',
        requiredExperience: '',
        sittingFees: '',
        minYearsExperience: '',
        maxYearsExperience: '',
      });
      fetchMyVacancies();
    } catch (err) {
      setPostingError(err.response?.data?.message || 'Error posting vacancy.');
    }
  };

  const handleVacancyChange = (e) => {
    setNewVacancy({ ...newVacancy, [e.target.name]: e.target.value });
  };

  const updateApplicationStatus = async (applicationId, newStatus) => {
    try {
      await axiosClient.put(`/applications/${applicationId}`, { applicationStatus: newStatus });
      alert('Application status updated!');
      fetchCompanyApplications();
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating application.');
    }
  };

  return (
    <>
      {/* HERO SECTION */}
      <Box
        sx={{
          position: 'relative',
          height: 180,
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          color: '#fff',
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          pl: 4,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Hello, {profile.companyName || 'Company'}!
        </Typography>
      </Box>

      {/* MAIN CONTENT */}
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {/* LEFT SIDEBAR */}
          <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
              {/* Company Profile Overview */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  My Profile
                </Typography>
                <Typography variant="body2">
                  <strong>Name:</strong> {profile.companyName}
                </Typography>
                <Typography variant="body2">
                  <strong>Location:</strong> {profile.location}
                </Typography>
                <Typography variant="body2">
                  <strong>Website:</strong> {profile.website}
                </Typography>
                <Typography variant="body2">
                  <strong>Description:</strong> {profile.companyDescription}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                Profile Completeness: {profileCompleteness}%
              </Typography>
              <LinearProgress variant="determinate" value={profileCompleteness} sx={{ mb: 2 }} />
              <Button
                component={Link}
                to="/company/profile/edit"
                variant="contained"
                fullWidth
                startIcon={<EditOutlinedIcon />}
              >
                Edit Profile
              </Button>
            </Paper>

            {/* Quick Links */}
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Quick Links
              </Typography>
              <List>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/company/profile/edit">
                    <ListItemIcon>
                      <EditOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Edit Profile" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/vacancies">
                    <ListItemIcon>
                      <WorkOutlineOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Browse Vacancies" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* CENTER COLUMN */}
          <Grid item xs={12} md={6}>
            {/* Posted Vacancies */}
            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <WorkOutlineOutlinedIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  My Posted Vacancies
                </Typography>
              </Box>
              {vacancies.length === 0 ? (
                <Typography variant="body2">
                  You have not posted any vacancies yet.
                </Typography>
              ) : (
                vacancies.map((vac) => (
                  <Card key={vac.vacancyId} sx={{ mb: 2 }}>
                    <CardHeader
                      title={vac.title}
                      subheader={`Location: ${vac.location}`}
                      titleTypographyProps={{ fontWeight: 'bold' }}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {vac.functionArea} | Experience: {vac.requiredExperience}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                      <Button size="small" component={Link} to={`/vacancies/${vac.vacancyId}`}>
                        Details
                      </Button>
                      <Button size="small" component={Link} to={`/vacancies/edit/${vac.vacancyId}`}>
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                ))
              )}
              <Box sx={{ textAlign: 'right' }}>
                <Button component={Link} to="/vacancies/my" size="small" endIcon={<ArrowForwardIosOutlinedIcon fontSize="small" />}>
                  View All
                </Button>
              </Box>
            </Paper>

            {/* New Vacancy Form */}
            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Post a New Vacancy
              </Typography>
              {postingError && (
                <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                  {postingError}
                </Typography>
              )}
              {postingSuccess && (
                <Typography variant="body2" color="success.main" sx={{ mb: 2 }}>
                  {postingSuccess}
                </Typography>
              )}
              <Box component="form" onSubmit={handlePostNewVacancy}>
                <TextField
                  label="Title"
                  variant="outlined"
                  name="title"
                  value={newVacancy.title}
                  onChange={handleVacancyChange}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Function Area"
                  variant="outlined"
                  name="functionArea"
                  value={newVacancy.functionArea}
                  onChange={handleVacancyChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Location"
                  variant="outlined"
                  name="location"
                  value={newVacancy.location}
                  onChange={handleVacancyChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Required Experience"
                  variant="outlined"
                  name="requiredExperience"
                  value={newVacancy.requiredExperience}
                  onChange={handleVacancyChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Sitting Fees"
                  variant="outlined"
                  name="sittingFees"
                  value={newVacancy.sittingFees}
                  onChange={handleVacancyChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Min Years of Experience"
                  variant="outlined"
                  name="minYearsExperience"
                  type="number"
                  value={newVacancy.minYearsExperience}
                  onChange={handleVacancyChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Max Years of Experience"
                  variant="outlined"
                  name="maxYearsExperience"
                  type="number"
                  value={newVacancy.maxYearsExperience}
                  onChange={handleVacancyChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained" fullWidth>
                  Post Vacancy
                </Button>
              </Box>
            </Paper>

            {/* Recent Applications */}
            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AssignmentTurnedInOutlinedIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  All Applications to My Vacancies
                </Typography>
              </Box>
              {applications.length === 0 ? (
                <Typography variant="body2">
                  No applications received yet.
                </Typography>
              ) : (
                applications.map((app) => (
                  <Box key={app.applicationId} sx={{ mb: 2, p: 1, border: '1px solid #ccc', borderRadius: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {app.fullName} applied for {app.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status: {app.applicationStatus} | Applied On: {new Date(app.appliedAt).toLocaleDateString()}
                    </Typography>
                    <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => updateApplicationStatus(app.applicationId, 'REVIEWED')}
                      >
                        Mark as REVIEWED
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => updateApplicationStatus(app.applicationId, 'CONTACT_SHARED')}
                      >
                        Mark as CONTACT_SHARED
                      </Button>
                    </Box>
                    <Divider sx={{ mt: 1 }} />
                  </Box>
                ))
              )}
            </Paper>
          </Grid>

          {/* RIGHT SIDEBAR */}
          {!isSmallScreen && (
            <Grid item xs={12} md={3}>
              {/* Notifications */}
              <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TrendingUpOutlinedIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Notifications
                  </Typography>
                </Box>
                {notifications.length === 0 ? (
                  <Typography variant="body2">
                    No new notifications.
                  </Typography>
                ) : (
                  notifications.map((notif) => (
                    <Box key={notif.notificationId} sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        {notif.message}
                      </Typography>
                      <Divider sx={{ mt: 1 }} />
                    </Box>
                  ))
                )}
              </Paper>

              {/* Industry Updates / Tips */}
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Industry Updates
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  - Latest board governance trends
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  - Best practices for board recruitment
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  - Upcoming industry events
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default EnhancedCompanyDashboard;
