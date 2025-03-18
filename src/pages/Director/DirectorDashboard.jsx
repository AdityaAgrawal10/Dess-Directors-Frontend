// src/pages/Director/EnhancedDirectorDashboard.jsx
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
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';

import axiosClient from '../../api/axiosClient';

function EnhancedDirectorDashboard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  // State variables
  const [profile, setProfile] = useState({});
  const [applications, setApplications] = useState([]);
  const [recommendedVacancies, setRecommendedVacancies] = useState([]);
  const [savedVacancies, setSavedVacancies] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [applicationUpdates, setApplicationUpdates] = useState([]);
  const [profileCompleteness, setProfileCompleteness] = useState(60);

  useEffect(() => {
    fetchDirectorProfile();
    fetchDirectorApplications();
    fetchVacancies();
    fetchSavedVacancies();
    fetchNotifications();
  }, []);

  // ------------------------
  //     DATA FETCHING
  // ------------------------
  const fetchDirectorProfile = async () => {
    try {
      const { data } = await axiosClient.get('/directors/profile');
      setProfile(data);
      // Compute profile completeness based on required fields
      let completeness = 0;
      if (data.fullName) completeness += 20;
      if (data.headline) completeness += 20;
      if (data.location) completeness += 20;
      if (data.experience) completeness += 20;
      if (data.sittingFeesRange) completeness += 20;
      setProfileCompleteness(completeness);
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  const fetchDirectorApplications = async () => {
    try {
      const { data } = await axiosClient.get('/applications/my');
      setApplications(data);
      // Filter applications with status "SHORTLISTED" or "CONTACT_SHARED"
      const updates = data.filter(
        (app) =>
          app.applicationStatus === 'SHORTLISTED' ||
          app.applicationStatus === 'CONTACT_SHARED'
      );
      setApplicationUpdates(updates);
    } catch (err) {
      console.error('Error fetching applications:', err);
    }
  };

  const fetchVacancies = async () => {
    try {
      const { data } = await axiosClient.get('/vacancies');
      // Recommend vacancies by matching profile location (case-insensitive)
      if (profile.location) {
        const recommended = data.filter(
          (vac) =>
            vac.location &&
            vac.location.toLowerCase() === profile.location.toLowerCase()
        );
        setRecommendedVacancies(recommended.length ? recommended.slice(0, 4) : data.slice(0, 4));
      } else {
        setRecommendedVacancies(data.slice(0, 4));
      }
    } catch (err) {
      console.error('Error fetching vacancies:', err);
    }
  };

  const fetchSavedVacancies = async () => {
    try {
      const { data } = await axiosClient.get('/savedVacancies');
      setSavedVacancies(data);
    } catch (err) {
      console.error('Error fetching saved vacancies:', err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const { data } = await axiosClient.get('/notifications');
      setNotifications(data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  // ------------------------
  //        ACTIONS
  // ------------------------
  const applyToVacancy = async (vacancyId) => {
    try {
      await axiosClient.post(`/applications/${vacancyId}/apply`);
      alert('Application submitted successfully!');
      fetchDirectorApplications();
    } catch (err) {
      alert(err.response?.data?.message || 'Error applying to vacancy.');
    }
  };

  const saveVacancy = async (vacancyId) => {
    try {
      await axiosClient.post(`/savedVacancies/${vacancyId}`);
      alert('Vacancy saved!');
      fetchSavedVacancies();
    } catch (err) {
      console.error('Error saving vacancy:', err);
      alert(err.response?.data?.message || 'Error saving vacancy.');
    }
  };

  const getProfileNextStep = () => {
    if (!profile.headline) return 'Add a catchy headline to stand out.';
    if (!profile.location) return 'Add your location.';
    if (!profile.experience) return 'Add your experience details.';
    if (!profile.sittingFeesRange) return 'Add your sitting fees range.';
    return 'Your profile looks great! Keep it updated.';
  };

  return (
    <>
      {/* WAVE-SHAPED HERO BANNER */}
      <Box
        sx={{
          position: 'relative',
          height: 200,
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          color: '#fff',
          mb: 4,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '50px',
            background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 500 150' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.00,49.98 C150.00,150.00 349.07,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z' style='stroke: none; fill: %23ffffff;'/%3E%3C/svg%3E")`,
            backgroundSize: 'cover',
          }}
        />
        <Container sx={{ pt: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Hello, {profile.fullName || 'Director'}!
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Welcome back. Let’s find your next board opportunity.
          </Typography>
        </Container>
      </Box>

      {/* MAIN CONTENT */}
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {/* LEFT SIDEBAR */}
          <Grid item xs={12} md={3}>
            {/* Profile Card */}
            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  sx={{ width: 60, height: 60, mr: 2, bgcolor: 'primary.main' }}
                  alt={profile.fullName || 'D'}
                >
                  {profile.fullName ? profile.fullName.charAt(0) : 'D'}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {profile.fullName || 'Director'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {profile.headline || 'Your headline'}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                Profile Completeness: {profileCompleteness}%
              </Typography>
              <LinearProgress variant="determinate" value={profileCompleteness} sx={{ mb: 1 }} />
              <Typography variant="caption" sx={{ display: 'block', mb: 2 }}>
                {getProfileNextStep()}
              </Typography>
              <Button
                component={Link}
                to="/director/profile/edit"
                variant="contained"
                fullWidth
                startIcon={<EditOutlinedIcon />}
              >
                Improve Profile
              </Button>
            </Paper>

            {/* Quick Links */}
            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Quick Links
              </Typography>
              <List>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/director/profile/edit">
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
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/applications/my">
                    <ListItemIcon>
                      <AssignmentTurnedInOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Applications" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Paper>
          </Grid>
          {/* CENTER COLUMN */}
          <Grid item xs={12} md={6}>
            {/* Recommended Vacancies */}
            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LightbulbOutlinedIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Recommended for You
                </Typography>
              </Box>
              {recommendedVacancies.length === 0 ? (
                <Typography variant="body2">
                  No recommended vacancies at the moment.
                </Typography>
              ) : (
                recommendedVacancies.map((vac) => (
                  <Card key={vac.vacancyId} sx={{ mb: 2 }}>
                    <CardHeader
                      title={vac.title}
                      subheader={vac.companyName}
                      titleTypographyProps={{ fontWeight: 'bold' }}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        Location: {vac.location}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Experience: {vac.requiredExperience}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'space-between' }}>
                      <Box>
                        <Button size="small" onClick={() => applyToVacancy(vac.vacancyId)}>
                          Apply
                        </Button>
                        <Button size="small" component={Link} to={`/vacancies/${vac.vacancyId}`}>
                          Details
                        </Button>
                      </Box>
                      <IconButton onClick={() => saveVacancy(vac.vacancyId)} color="primary">
                        {savedVacancies.find((v) => v.vacancyId === vac.vacancyId) ? (
                          <BookmarkOutlinedIcon />
                        ) : (
                          <BookmarkBorderOutlinedIcon />
                        )}
                      </IconButton>
                    </CardActions>
                  </Card>
                ))
              )}
              <Box sx={{ textAlign: 'right' }}>
                <Button component={Link} to="/vacancies" size="small" endIcon={<ArrowForwardIosOutlinedIcon fontSize="small" />}>
                  View All
                </Button>
              </Box>
            </Paper>

            {/* My Recent Applications */}
            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AssignmentTurnedInOutlinedIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  My Recent Applications
                </Typography>
              </Box>
              {applications.length === 0 ? (
                <Typography variant="body2">
                  You haven&apos;t applied to any vacancies yet.
                </Typography>
              ) : (
                applications.slice(0, 3).map((app) => (
                  <Box key={app.applicationId} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {app.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status: {app.applicationStatus} | Applied On: {new Date(app.appliedAt).toLocaleDateString()}
                    </Typography>
                    <Divider sx={{ mt: 1 }} />
                  </Box>
                ))
              )}
              {applications.length > 3 && (
                <Box sx={{ textAlign: 'right' }}>
                  <Button component={Link} to="/applications/my" size="small" endIcon={<ArrowForwardIosOutlinedIcon fontSize="small" />}>
                    View All
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* RIGHT SIDEBAR */}
          {!isSmallScreen && (
            <Grid item xs={12} md={3}>
              {/* Saved Vacancies */}
              <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <BookmarkOutlinedIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Saved Vacancies
                  </Typography>
                </Box>
                {savedVacancies.length === 0 ? (
                  <Typography variant="body2">
                    You have not saved any vacancies yet.
                  </Typography>
                ) : (
                  savedVacancies.map((vac) => (
                    <Card key={vac.vacancyId} sx={{ mb: 2 }}>
                      <CardHeader
                        title={vac.title}
                        subheader={vac.companyName}
                        titleTypographyProps={{ fontWeight: 'bold' }}
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          Location: {vac.location}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button size="small" component={Link} to={`/vacancies/${vac.vacancyId}`}>
                          Details
                        </Button>
                      </CardActions>
                    </Card>
                  ))
                )}
                <Box sx={{ textAlign: 'right' }}>
                  <Button component={Link} to="/vacancies/saved" size="small" endIcon={<ArrowForwardIosOutlinedIcon fontSize="small" />}>
                    View All Saved
                  </Button>
                </Box>
              </Paper>

              {/* Application Updates */}
              <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <NotificationsNoneOutlinedIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Application Updates
                  </Typography>
                </Box>
                {applicationUpdates.length === 0 ? (
                  <Typography variant="body2">
                    No updates yet.
                  </Typography>
                ) : (
                  applicationUpdates.map((update) => (
                    <Box key={update.applicationId} sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {update.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Status: {update.applicationStatus}
                      </Typography>
                      <Divider sx={{ mt: 1 }} />
                    </Box>
                  ))
                )}
              </Paper>

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
                  - New governance regulations for listed companies
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  - Best practices for connecting with top boards
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  - Upcoming leadership forums and events
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default EnhancedDirectorDashboard;
