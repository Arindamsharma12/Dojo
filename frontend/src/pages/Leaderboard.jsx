// src/pages/Leaderboard.jsx
import { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchLeaderboard = async () => {
      try {
        // Mock data
        const mockUsers = [
          {
            id: 1,
            name: "Alice Johnson",
            avatar: "/avatars/user1.png",
            problemsSolved: 145,
            score: 9870
          },
          {
            id: 2,
            name: "Bob Smith",
            avatar: "/avatars/user2.png",
            problemsSolved: 132,
            score: 8950
          },
          {
            id: 3,
            name: "Charlie Williams",
            avatar: "/avatars/user3.png",
            problemsSolved: 128,
            score: 8750
          },
          {
            id: 4,
            name: "Diana Martinez",
            avatar: "/avatars/user4.png",
            problemsSolved: 120,
            score: 8200
          },
          {
            id: 5,
            name: "Edward Lee",
            avatar: "/avatars/user5.png",
            problemsSolved: 115,
            score: 7900
          }
        ];
        
        setUsers(mockUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="leaderboard-page">Loading leaderboard...</div>;

  return (
    <div className="leaderboard-page">
      <h1>Leaderboard</h1>
      <div className="leaderboard">
        <div className="leaderboard-header">
          <span>Rank</span>
          <span>User</span>
          <span>Solved</span>
          <span>Score</span>
        </div>
        <div className="leaderboard-list">
          {users.map((user, index) => (
            <div key={user.id} className="leaderboard-row">
              <span className="rank">{index + 1}</span>
              <span className="user">
                <img src={user.avatar} alt={user.name} className="avatar" />
                {user.name}
              </span>
              <span className="solved">{user.problemsSolved}</span>
              <span className="score">{user.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;