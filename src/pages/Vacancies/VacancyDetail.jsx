// src/pages/Vacancies/VacancyDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';

function VacancyDetail() {
  const { id } = useParams();  // read :id from URL
  const navigate = useNavigate();
  const [vacancy, setVacancy] = useState(null);
  const [error, setError] = useState('');
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    fetchVacancy();
  }, [id]);

  const fetchVacancy = async () => {
    try {
      const { data } = await axiosClient.get(`/vacancies/${id}`);
      setVacancy(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Vacancy not found.');
    }
  };

  const applyToVacancy = async () => {
    if (userRole !== 'DIRECTOR') {
      alert('Only directors can apply. Please log in as a director.');
      navigate('/login');
      return;
    }
    try {
      await axiosClient.post(`/applications/${id}/apply`);
      alert('Application submitted successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error applying to vacancy.');
    }
  };

  if (error) {
    return <div style={{ margin: '2rem' }}><p style={{ color: 'red' }}>{error}</p></div>;
  }

  if (!vacancy) {
    return <div style={{ margin: '2rem' }}>Loading vacancy details...</div>;
  }

  return (
    <div style={{ margin: '2rem' }}>
      <h2>{vacancy.title}</h2>
      <p><strong>Company:</strong> {vacancy.companyName}</p>
      <p><strong>Location:</strong> {vacancy.location}</p>
      <p><strong>Function Area:</strong> {vacancy.functionArea}</p>
      <p><strong>Required Experience:</strong> {vacancy.requiredExperience}</p>
      <p><strong>Sitting Fees:</strong> {vacancy.sittingFees}</p>
      <p><strong>Active:</strong> {vacancy.isActive ? 'Yes' : 'No'}</p>

      {userRole === 'DIRECTOR' && (
        <button onClick={applyToVacancy}>Apply</button>
      )}
    </div>
  );
}

export default VacancyDetail;
