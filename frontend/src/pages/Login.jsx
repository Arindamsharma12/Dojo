import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    rollnumber: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!/^\d{13}$/.test(form.rollnumber)) {
      setError("Roll number must be exactly 13 digits.");
      return;
    }

    if (form.password.length < 5) {
      setError("Password must be at least 5 characters.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/users/login`,
        {
          rollno: form.rollnumber,
          password: form.password,
        },
        {
          withCredentials: true,
        }
      );

      const userData = response.data?.data?.user;
      login(userData); // Save user in context

      toast.success("Login successful!");
      navigate("/");

    } catch (err) {
      const message = err.response?.data?.message || "Login failed. Try again.";
      toast.error(message);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 400, margin: "0 auto" }}>
      <ToastContainer position="top-center" />
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
