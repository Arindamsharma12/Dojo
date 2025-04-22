import React, { useState } from "react";

const Login = () => {
  const [form, setForm] = useState({
    rollnumber: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    // Validation
    if (!/^\d{13}$/.test(form.rollnumber)) {
      setError("Roll number must be exactly 13 digits.");
      return;
    }
    if (form.password.length < 5) {
      setError("Password must be at least 5 characters.");
      return;
    }
    alert("Login submitted (UI only)");
  };

  return (
    <div className="container" style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="rollnumber">Roll Number</label>
          <input
            type="text"
            id="rollnumber"
            name="rollnumber"
            value={form.rollnumber}
            onChange={handleChange}
            required
            autoComplete="username"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
        </div>
        {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
        <button className="btn btn-primary" type="submit" style={{ width: "100%" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;