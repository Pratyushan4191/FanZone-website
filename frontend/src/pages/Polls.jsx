import React, { useState, useEffect } from 'react';

export default function Polls({ showToast }) {
  const [pollsList, setPollsList] = useState([]);
  
  // Track which polls have been voted on (persist in localStorage)
  const [votedPolls, setVotedPolls] = useState(() => {
    return JSON.parse(localStorage.getItem('fanzone_voted_polls')) || {};
  });

  useEffect(() => {
    localStorage.setItem('fanzone_voted_polls', JSON.stringify(votedPolls));
  }, [votedPolls]);

  // Load polls from backend API
  useEffect(() => {
    fetch('/api/polls')
      .then(res => res.json())
      .then(data => setPollsList(data))
      .catch(e => console.error("Error loading polls:", e));
  }, []);

  const handleVote = (pollId, optionKey, optionLabel) => {
    // Prevent double voting
    if (votedPolls[pollId]) return;

    fetch(`/api/polls/${pollId}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ optionKey })
    })
      .then(res => res.json())
      .then(updatedPoll => {
        // Update local state list
        setPollsList(prev => prev.map(p => p.id === pollId ? updatedPoll : p));
        // Register voted status
        setVotedPolls(prev => ({ ...prev, [pollId]: optionKey }));
        showToast(`Voted for "${optionLabel}"!`);
      })
      .catch(e => {
        console.error("Voting error:", e);
        showToast("Error casting vote. Please try again.");
      });
  };

  return (
    <div id="main">
      <div className="explore-header" style={{ justifyContent: 'center', textAlign: 'center', flexDirection: 'column' }}>
        <h1 className="explore-title">
          <i className="fas fa-poll" style={{ color: 'var(--primary-blue)', marginRight: '10px' }}></i> 
          Fan Community Polls
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '10px', maxWidth: '600px' }}>
          Have your say! Vote on trending topics in movies, music, sports, and gaming, and see results instantly updated across the community.
        </p>
      </div>

      <div className="polls-container">
        {pollsList.map((poll) => {
          const hasVoted = !!votedPolls[poll.id];
          const userChoice = votedPolls[poll.id];

          return (
            <div key={poll.id} className="poll-wrapper">
              <span className={`category-badge ${poll.category.toLowerCase()}`} style={{ position: 'static', display: 'inline-flex', marginBottom: '15px' }}>
                {poll.category}
              </span>
              <h3 className="poll-question">{poll.question}</h3>
              
              <div className="poll-options">
                {poll.options.map((option) => {
                  // Calculate percentages
                  const percentage = poll.totalVotes > 0 
                    ? Math.round((option.votes / poll.totalVotes) * 100) 
                    : 0;
                  
                  const isSelected = userChoice === option.key;

                  return (
                    <button
                      key={option.key}
                      className={`poll-option-btn ${hasVoted ? 'voted' : ''}`}
                      disabled={hasVoted}
                      onClick={() => handleVote(poll.id, option.key, option.label)}
                      style={isSelected ? { borderColor: 'var(--primary-blue)', background: 'rgba(37, 99, 235, 0.08)' } : {}}
                    >
                      {/* Percent Fill Indicator */}
                      {hasVoted && (
                        <div 
                          className="poll-option-percentage-bar" 
                          style={{ width: `${percentage}%` }}
                        />
                      )}
                      
                      <span className="poll-option-label">
                        {isSelected && <i className="fas fa-check-circle" style={{ color: 'var(--primary-blue)', marginRight: '8px' }}></i>}
                        {option.label}
                      </span>
                      
                      {hasVoted && (
                        <span className="poll-option-result">
                          {percentage}% ({option.votes.toLocaleString()})
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="poll-footer">
                <span>Total Votes: {poll.totalVotes.toLocaleString()}</span>
                <span>{hasVoted ? "Thanks for voting!" : "Status: Active"}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
