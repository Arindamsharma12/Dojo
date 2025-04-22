// src/components/ContestCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ContestCard = ({ contest }) => {
  const navigate = useNavigate();
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return <span className="badge pending">Registration Open</span>;
      case 'upcoming':
        return <span className="badge upcoming">Upcoming</span>;
      case 'live':
        return <span className="badge live">Live</span>;
      case 'past':
        return <span className="badge past">Finished</span>;
      default:
        return null;
    }
  };
  
  const handleClick = () => {
    // Navigate to contest details page
    navigate(`/contests/${contest.id}`);
  };
  
  return (
    <div className="contest-card" onClick={handleClick}>
      <div className="contest-card-header">
        <h3 className="contest-title">{contest.title}</h3>
        {getStatusBadge(contest.status)}
      </div>
      
      <p className="contest-description">{contest.description}</p>
      
      <div className="contest-info">
        <div className="contest-time">
          <div>
            <span className="info-label">Start:</span> {formatDate(contest.startTime)}
          </div>
          <div>
            <span className="info-label">End:</span> {formatDate(contest.endTime)}
          </div>
        </div>
        
        <div className="contest-participants">
          <div className="participants-count">
            <span className="info-label">Participants:</span> {contest.participants}
          </div>
        </div>
      </div>
      
      <div className="contest-card-footer">
        <button className="btn btn-primary">
          {contest.status === 'pending' ? 'Register' : 
           contest.status === 'live' ? 'Join Now' : 
           contest.status === 'upcoming' ? 'Set Reminder' : 'View Results'}
        </button>
      </div>
    </div>
  );
};

export default ContestCard;