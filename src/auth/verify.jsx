import React, { useState, useEffect } from "react";
import "../css/verify.css";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL

const ActivationForm = () => {
  const [email, setEmail] = useState(""); 
  const [code, setCode] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${VITE_BASE_URL}/api/users/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, verificationCode: code }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Email verified successfully!");
        navigate("/login"); 
      } else {
        toast.error(data.message || "Failed to verify email.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="activation-form-container">
      <h3 className="">Please Verify Email</h3>

      <form onSubmit={handleSubmit}>
        <label className="activation-form-label">
          Email:
          <input
            className="activation-form-input"
            type="email"
            value={email}
            readOnly
          />
        </label>
        <label className="activation-form-label">
          Code:
          <input
            className="activation-form-input"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </label>
        <button className="activation-form-button" type="submit">
          Activate
        </button>
      </form>
    </div>
  );
};

export default ActivationForm;
