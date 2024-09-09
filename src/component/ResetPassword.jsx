import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/auth.css";
import imageSign from "../images/imageSign.png";
import logo from "../images/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${VITE_BASE_URL}/api/users/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resetToken: token,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error resetting password");
      }

      toast.success(data.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <div className="sign-main">
        <div className="first">
          <div className="logo">
            <img src={logo} alt="" />
            <h1>Password Reset</h1>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse.
          </p>
          <img src={imageSign} alt="" />
        </div>
        <div className="line"></div>

        <div className="second">
          <h1>Password Reset </h1>
          <form onSubmit={handleSubmit}>
            <div className="main-input">
              <label htmlFor="">New Password</label>
              <div className="input">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  name="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <span onClick={toggleShowPassword}>
                  {showPassword ? (
                    <FaEye className="input-icons" />
                  ) : (
                    <FaEyeSlash className="input-icons" />
                  )}
                </span>
              </div>
            </div>
            <button type="submit" className="button1">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
