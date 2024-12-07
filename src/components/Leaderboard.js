import React, { useState, useEffect } from 'react';
import './Leaderboard.css'; // Scoped styles for leaderboard

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  const loadLeaderboard = () => {
    const registeredUsers = JSON.parse(localStorage.getItem('users')) || [];
    const storedScores = JSON.parse(localStorage.getItem('leaderboard')) || [];

    // Filter leaderboard entries to only include registered users
    const validScores = storedScores.filter((entry) =>
      registeredUsers.some((user) => user.email === entry.email)
    );

    // Sort leaderboard by score in descending order
    validScores.sort((a, b) => b.score - a.score);

    setScores(validScores);
  };

  useEffect(() => {
    // Initial load of leaderboard data
    loadLeaderboard();

    // Event listener for leaderboard updates
    const handleLeaderboardUpdate = () => loadLeaderboard();
    window.addEventListener('leaderboardUpdate', handleLeaderboardUpdate);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('leaderboardUpdate', handleLeaderboardUpdate);
    };
  }, []);

  const updateLeaderboard = (newEntry) => {
    const registeredUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the user is registered
    const isRegistered = registeredUsers.some((user) => user.email === newEntry.email);
    if (!isRegistered) {
      alert('User not registered. Cannot add to leaderboard.');
      return;
    }

    // Fetch the current leaderboard
    const currentScores = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const updatedScores = [...currentScores];

    // Update or add the new score
    const existingIndex = updatedScores.findIndex((entry) => entry.email === newEntry.email);
    if (existingIndex !== -1) {
      // Update the score if the user already exists
      updatedScores[existingIndex].score = newEntry.score;
    } else {
      // Add the new entry if not already on the leaderboard
      updatedScores.push(newEntry);
    }

    // Sort scores by descending order
    updatedScores.sort((a, b) => b.score - a.score);

    // Save the updated leaderboard to local storage
    localStorage.setItem('leaderboard', JSON.stringify(updatedScores));

    // Dispatch a custom event to notify other components
    const event = new Event('leaderboardUpdate');
    window.dispatchEvent(event);
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-content">
        <h2>Leaderboard</h2>
        {scores.length > 0 ? (
          <ul className="leaderboard-list">
            {scores.map((score, index) => (
              <li key={index} className="leaderboard-item">
                <span className="username">{score.username}</span>: 
                <span className="score">{score.score}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-scores">No scores available</p>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
