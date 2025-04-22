// src/components/ProblemCard.jsx
import React from 'react';

const ProblemCard = ({ problem, onClick }) => {
  return (
    <div className="problem-card" onClick={onClick}>
      <div className="problem-status">
        {problem.solved ? (
          <span className="status-indicator solved">✓</span>
        ) : (
          <span className="status-indicator unsolved"></span>
        )}
      </div>
      <div className="problem-title">
        {problem.title}
      </div>
      <div className="problem-difficulty">
        <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>
          {problem.difficulty}
        </span>
      </div>
      <div className="problem-topics">
        {problem.topics.join(", ")}
      </div>
      <div className="problem-acceptance">
        {problem.acceptance}
      </div>
    </div>
  );
};

export default ProblemCard;