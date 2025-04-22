import React, { useState } from "react";

const Signup = () => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    rollnumber: "",
    avatar: null,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setForm({ ...form, avatar: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
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
    alert("Signup submitted (UI only)");
  };

  return (
    <div className="container" style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={form.fullname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
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
            autoComplete="new-password"
          />
        </div>
        <div className="input-group">
          <label htmlFor="rollnumber">Roll Number</label>
          <input
            type="text"
            id="rollnumber"
            name="rollnumber"
            value={form.rollnumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="avatar">Avatar (optional)</label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
        <button className="btn btn-primary" type="submit" style={{ width: "100%" }}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;