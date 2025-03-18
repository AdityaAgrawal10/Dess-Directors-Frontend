// src/pages/Company/CompanyProfile.jsx

import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';

function CompanyProfile() {
  const [profile, setProfile] = useState({
    companyName: '',
    companyDescription: '',
    location: '',
    website: ''
  });
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosClient.get('/companies/profile');
        setProfile(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load profile.');
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSuccessMsg('');
      setError('');
      await axiosClient.put('/companies/profile', profile);
      setSuccessMsg('Profile updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating profile.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ margin: '2rem' }}>
      <h2>Company Profile</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Company Name:</label>
          <input
            name="companyName"
            value={profile.companyName || ''}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="companyDescription"
            value={profile.companyDescription || ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Location:</label>
          <input
            name="location"
            value={profile.location || ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Website:</label>
          <input
            name="website"
            value={profile.website || ''}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default CompanyProfile;
