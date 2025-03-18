// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DirectorDashboard from './pages/Director/DirectorDashboard';
import DirectorProfile from './pages/Director/DirectorProfile';
import CompanyDashboard from './pages/Company/CompanyDashboard';
import CompanyProfile from './pages/Company/CompanyProfile';
import VacancyList from './pages/Vacancies/VacancyList';
import VacancyDetail from './pages/Vacancies/VacancyDetail';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';



function App() {
  return (
    <Router>
     <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Director */}
        <Route path="/director/dashboard" element={<ProtectedRoute requiredRole="DIRECTOR"><DirectorDashboard /></ProtectedRoute>} />
        <Route path="/director/profile/edit" element={<DirectorProfile />} />

        {/* Company */}
        <Route path="/company/dashboard" element={<ProtectedRoute requiredRole="COMPANY"><CompanyDashboard /></ProtectedRoute>} />
        <Route path="/company/profile/edit" element={<CompanyProfile />} />

        <Route path="/vacancies" element={<VacancyList />} />
        <Route path="/vacancies/:id" element={<VacancyDetail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

      </Routes>
    </Router>
  )
}

export default App
