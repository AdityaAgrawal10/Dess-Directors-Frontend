import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Tabs,
  Tab,
  TextField,
  useMediaQuery,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Footer from '../components/Footer';

function Home() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [search, setSearch] = useState({ keyword: '', location: '' });

  const handleTabChange = (_, newValue) => setTabValue(newValue);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({ ...prev, [name]: value }));
  };

  const handleVacancySearch = (e) => {
    e.preventDefault();
    navigate(`/vacancies?keyword=${encodeURIComponent(search.keyword)}&location=${encodeURIComponent(search.location)}`);
  };

  return (
    <>
      {/* Main Hero Section */}
      <Box sx={{
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        minHeight: '100vh',
        color: '#fff',
        pt: 8,
        pb: 4,
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant={isSmallScreen ? 'h3' : 'h2'} sx={{ fontWeight: 'bold', mb: 2 }}>
                Transform Your Board Career
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, lineHeight: 1.5, color: '#d0d0d0' }}>
                Whether you’re a visionary director or a forward-thinking company, find the perfect match to elevate board-level leadership.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button component={Link} to="/register" variant="contained" size="large" sx={{ boxShadow: 3 }}>
                  Get Started
                </Button>
                <Button component={Link} to="/login" variant="outlined" size="large" sx={{ borderColor: '#fff', color: '#fff', boxShadow: 3 }}>
                  Login
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box component="img" src="https://images.unsplash.com/photo-1573165231977-3f0e27806045" alt="Board Leadership" sx={{ width: '100%', borderRadius: 3, boxShadow: 6 }} />
            </Grid>
          </Grid>

          {/* Audience-specific Section */}
          <Box sx={{ mt: 10, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>Who Is This For?</Typography>
            <Tabs value={tabValue} onChange={handleTabChange} centered textColor="inherit" indicatorColor="secondary">
              <Tab label="Directors" />
              <Tab label="Companies" />
            </Tabs>
            <Box sx={{ mt: 4 }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {tabValue === 0
                  ? 'Are you an experienced board member seeking new challenges? Discover exclusive board vacancies tailored to your expertise.'
                  : 'Are you a company in search of visionary leadership? Access our curated database of top-tier board professionals ready to drive your success.'}
              </Typography>
              <Button component={Link} to="/register" variant="contained" size="large">
                {tabValue === 0 ? 'Join as Director' : 'Join as Company'}
              </Button>
            </Box>
          </Box>

          {/* Open Vacancy Search Section */}
          <Box sx={{ mt: 10, mb: 6, textAlign: 'center', backgroundColor: '#fff', borderRadius: 3, py: 6, px: 2 }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: '#1e3c72' }}>Explore Open Vacancies</Typography>
            <Typography variant="body1" sx={{ mb: 4, color: '#555' }}>Enter a keyword and location to quickly find board opportunities that match your expertise.</Typography>
            <Box component="form" onSubmit={handleVacancySearch} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
              <TextField variant="outlined" label="Keyword" name="keyword" value={search.keyword} onChange={handleInputChange} sx={{ width: { xs: '100%', sm: '300px' } }} />
              <TextField variant="outlined" label="Location" name="location" value={search.location} onChange={handleInputChange} sx={{ width: { xs: '100%', sm: '300px' } }} />
              <Button type="submit" variant="contained" size="large" sx={{ boxShadow: 3 }}>Search</Button>
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default Home;
