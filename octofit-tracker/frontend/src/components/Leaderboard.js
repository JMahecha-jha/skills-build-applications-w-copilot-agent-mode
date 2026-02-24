import React, { useState, useEffect } from 'react';

const MEDALS = ['🥇', '🥈', '🥉'];

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Leaderboard: fetching from', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard: fetched data', data);
        const rows = Array.isArray(data) ? data : data.results || [];
        setLeaderboard(rows.slice().sort((a, b) => b.points - a.points));
        setLoading(false);
      })
      .catch(err => {
        console.error('Leaderboard: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div>
      <h2 className="octofit-heading mb-4">🏆 Leaderboard</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}
      <div className="card octofit-card">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <span className="fw-semibold">Team Rankings</span>
          <span className="badge bg-warning text-dark rounded-pill">{leaderboard.length} teams</span>
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered octofit-table mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Rank</th>
                    <th scope="col">Team</th>
                    <th scope="col">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.length === 0 ? (
                    <tr><td colSpan="3" className="text-center text-muted py-3">No data found.</td></tr>
                  ) : (
                    leaderboard.map((entry, index) => (
                      <tr key={entry.id} className={index === 0 ? 'table-warning' : ''}>
                        <td>{MEDALS[index] || index + 1}</td>
                        <td className="fw-semibold">{entry.team}</td>
                        <td><span className="badge bg-success fs-6">{entry.points}</span></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
