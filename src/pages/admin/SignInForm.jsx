import React, { useState } from "react";
import "../../styles/SignInForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StylishForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => { 
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!formData.email || !formData.password) {
      setMessage("Please fill in all fields.");
      return;
    }
    try {
      setIsSubmitting(true);

      const { data } = await axios.post(
        "https://onlinegiftbackend.onrender.com/api/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );
      localStorage.setItem("adminToken", data.token);
      setMessage("Success! Redirecting...");
      navigate("/admin/dashboard");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="form_conatainer">
      <div className="stylish-card">
        <div className="form-header">
          <h2>Admin Login</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              disabled={isSubmitting}
            />
          </div>

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Login"}
          </button>

          {message && (
            <p
              className={`status-message ${
                message.includes("Success") ? "success" : "error"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default StylishForm;
