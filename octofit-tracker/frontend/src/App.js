import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import logo from './octofitapp-small.png';
import './App.css';

function App() {
  return (
    <div>
      {/* ── Navigation ── */}
      <nav className="navbar navbar-expand-lg navbar-dark shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} alt="OctoFit logo" />
            OctoFit Tracker
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {[
                { to: '/users',       label: '🦸 Users' },
                { to: '/teams',       label: '👥 Teams' },
                { to: '/activities',  label: '🏃 Activities' },
                { to: '/leaderboard', label: '🏆 Leaderboard' },
                { to: '/workouts',    label: '💪 Workouts' },
              ].map(({ to, label }) => (
                <li className="nav-item" key={to}>
                  <NavLink
                    className={({ isActive }) =>
                      'nav-link' + (isActive ? ' active' : '')
                    }
                    to={to}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* ── Page content ── */}
      <main className="container py-4">
        <Routes>
          <Route path="/"           element={<Leaderboard />} />
          <Route path="/users"      element={<Users />} />
          <Route path="/teams"      element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts"   element={<Workouts />} />
        </Routes>
      </main>

      {/* ── Footer ── */}
      <footer className="octofit-footer">
        &copy; {new Date().getFullYear()} OctoFit Tracker &mdash; Mona's Fitness App
      </footer>
    </div>
  );
}

export default App;
