import { Link } from "react-router-dom";
import { useUser } from "../UserContext";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const { user, logout } = useUser();
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          {!user ? (
            <>
              <Link to="/login" className="btn-login">Login</Link>
              <Link to="/signup" className="btn-signup">Sign Up</Link>
            </>
          ) : (
            <div className="navbar-profile" ref={dropdownRef} style={{ position: "relative" }}>
              <div
                className="profile-info"
                onClick={() => setDropdown((d) => !d)}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <img
                  src={user.avatar || "/default-avatar.png"}
                  alt="avatar"
                  className="avatar"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid var(--primary-color)",
                  }}
                />
                <span style={{ fontSize: 22 }}>▼</span>
              </div>
              {dropdown && (
                <div
                  className="profile-dropdown"
                  style={{
                    position: "absolute",
                    right: 0,
                    marginTop: 8,
                    background: "var(--background-light)",
                    color: "var(--text-primary)",
                    borderRadius: 8,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    minWidth: 180,
                    zIndex: 100,
                    padding: "0.5rem 0",
                  }}
                >
                  <div
                    style={{
                      padding: "0.75rem 1.25rem",
                      borderBottom: "1px solid var(--border-color)",
                      textAlign: "center",
                    }}
                  >
                    <strong style={{ fontSize: 18 }}>{user.fullName}</strong>
                    <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                      {user.rollnumber}
                    </div>
                  </div>
                  <button
                    className="btn"
                    style={{
                      width: "100%",
                      background: "none",
                      color: "var(--primary-color)",
                      border: "none",
                      textAlign: "left",
                      padding: "0.75rem 1.25rem",
                      cursor: "pointer",
                    }}
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;