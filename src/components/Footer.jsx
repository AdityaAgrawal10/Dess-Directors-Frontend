// src/components/Footer.jsx
import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ backgroundColor: '#1e3c72', color: '#fff', py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Director Hiring Portal
            </Typography>
            <Typography variant="body2">
              Connecting visionary directors with leading companies.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ textAlign: { xs: 'left', md: 'right' } }}
          >
            <Link href="#" color="inherit" sx={{ mx: 1 }}>
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" sx={{ mx: 1 }}>
              Terms of Service
            </Link>
            <Link href="#" color="inherit" sx={{ mx: 1 }}>
              Contact Us
            </Link>
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          &copy; {new Date().getFullYear()}Dess Director Hiring Portal. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
