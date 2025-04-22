const Leaderboard = ({ users }) => {
    return (
      <div className="leaderboard">
        <h2>Leaderboard</h2>
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
    );
  };
  
  export default Leaderboard;