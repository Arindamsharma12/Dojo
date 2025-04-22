import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Frontend validations
    if (!/^\d{13}$/.test(form.rollnumber)) {
      setError("Roll number must be exactly 13 digits.");
      return;
    }
    if (form.password.length < 5) {
      setError("Password must be at least 5 characters.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("username", form.rollnumber); // roll number as username
      if (form.avatar) {
        formData.append("avatar", form.avatar);
      }

      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register", // Change if your backend URL differs
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Signup successful!");
      navigate('/')
      console.log(response.data);
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong";
      setError(message);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={form.fullName}
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
        {error && (
          <div style={{ color: "red", marginBottom: 10 }}>{error}</div>
        )}
        <button
          className="btn btn-primary"
          type="submit"
          style={{ width: "100%" }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
