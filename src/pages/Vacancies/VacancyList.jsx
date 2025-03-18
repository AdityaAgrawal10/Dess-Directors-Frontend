// src/pages/Vacancies/VacancyList.jsx
//tota;
import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import { Link, useNavigate } from 'react-router-dom';

function VacancyList() {
  const navigate = useNavigate();
  const [vacancies, setVacancies] = useState([]);
  const [error, setError] = useState('');
  const userRole = localStorage.getItem('userRole'); // "DIRECTOR" or "COMPANY" or null

  const [filters, setFilters] = useState({
    location: '',
    functionArea: '',
    minExp: '',
    maxExp: ''
  });


  // PAGINATION: Add page & limit states
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

   // Fetch vacancies on component mount (initial load)
   useEffect(() => {
    fetchVacancies({});
  }, []);

  /**
   * Fetch vacancies from the server, possibly with filters.
   * @param {Object} filterOverrides 
   *   If provided, we use these filters; otherwise we use `filters` from state.
   */
  const fetchVacancies = async (filterOverrides) => {
    try {
      setError('');
      const activeFilters = filterOverrides || filters;

      // We add page & limit to the query params
      const { data } = await axiosClient.get('/vacancies', {
        params: {
          ...activeFilters,
          page,
          limit
        }
      });

      setVacancies(data);
      // If you have a total count from the server, store it in state here
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching vacancies.');
    }
  };

  /**
   * When user types in the filter fields, update our `filters` state.
   */
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  /**
   * When user clicks "Search", fetch vacancies using the current `filters`.
   */
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    // Reset to page 1 whenever they do a new search
    setPage(1);
    fetchVacancies(filters);
  };

  const applyToVacancy = async (vacancyId) => {
    if (userRole !== 'DIRECTOR') {
      alert('Only Directors can apply. Please log in as a director.');
      navigate('/login');
      return;
    }
    try {
      await axiosClient.post(`/applications/${vacancyId}/apply`);
      alert('Application submitted successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error applying to vacancy.');
    }
  };


  // PAGE NAVIGATION
  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  // Whenever page changes, re-fetch with new page
  useEffect(() => {
    fetchVacancies(filters);
    // eslint-disable-next-line
  }, [page]);


  return (
    <div style={{ margin: '2rem' }}>
      <h2>All Vacancies</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* FILTER FORM */}
      <form onSubmit={handleFilterSubmit} style={{ marginBottom: '1rem' }}>
        <div style={{ marginBottom: '0.5rem' }}>
          <label>Location: </label>
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            placeholder="e.g. New York"
            style={{ marginRight: '1rem' }}
          />
          <label>Function Area: </label>
          <input
            type="text"
            name="functionArea"
            value={filters.functionArea}
            onChange={handleFilterChange}
            placeholder="e.g. Finance"
          />
        </div>

        <div style={{ marginBottom: '0.5rem' }}>
          <label>Min Exp: </label>
          <input
            type="number"
            name="minExp"
            value={filters.minExp}
            onChange={handleFilterChange}
            style={{ width: '60px', marginRight: '1rem' }}
          />
          <label>Max Exp: </label>
          <input
            type="number"
            name="maxExp"
            value={filters.maxExp}
            onChange={handleFilterChange}
            style={{ width: '60px' }}
          />
        </div>

        <button type="submit">Search</button>
      </form>
      {/* END FILTER FORM */}

      {/* VACANCY LIST */}
      {vacancies.map((vac) => (
        <div
          key={vac.vacancyId}
          style={{
            border: '1px solid #ccc',
            padding: '1rem',
            margin: '1rem 0'
          }}
        >
          <h4>{vac.title}</h4>
          <p>Company: {vac.companyName}</p>
          <p>Location: {vac.location}</p>
          <p>Function Area: {vac.functionArea}</p>
          {/* If you have the new DB columns: */}
          {vac.minYearsExperience !== null && (
            <p>Min Years Exp: {vac.minYearsExperience}</p>
          )}
          {vac.maxYearsExperience !== null && (
            <p>Max Years Exp: {vac.maxYearsExperience}</p>
          )}

          <Link to={`/vacancies/${vac.vacancyId}`} style={{ marginRight: '1rem' }}>
            View Details
          </Link>

          {userRole === 'DIRECTOR' && (
            <button onClick={() => applyToVacancy(vac.vacancyId)}>Apply</button>
          )}
        </div>
      ))}
      {/* END VACANCY LIST */}

      {/* PAGINATION */}
      {/* PAGINATION CONTROLS */}
      <div style={{ marginTop: '1rem' }}>
        <button onClick={handlePrevPage} disabled={page <= 1}>
          Previous
        </button>
        <span style={{ margin: '0 1rem' }}>Page: {page}</span>
        <button onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
}

export default VacancyList;
