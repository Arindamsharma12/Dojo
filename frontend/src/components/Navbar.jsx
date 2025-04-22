import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <img src="/logo.png" alt="Dojo Logo" className="navbar-logo" />
          <span className="navbar-title">DOJO</span>
        </Link>
        <div className="navbar-links">
          <Link to="/problems" className="navbar-link">Problems</Link>
          <Link to="/contests" className="navbar-link">Contests</Link>
          <Link to="/leaderboard" className="navbar-link">Leaderboard</Link>
        </div>
        <div className="navbar-auth">
          <button className="btn-login">Login</button>
          <button className="btn-signup">Sign Up</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;