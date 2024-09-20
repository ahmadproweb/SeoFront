import React, { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../css/auth.css";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import imageSign from '../images/imageSign.png';
import goggleImage from '../images/goggleImage.png';
import logo from '../images/logo.png';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${VITE_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Trigger storage event manually
        window.dispatchEvent(new Event('storage'));

        toast.success("Login successful!");
        navigate("/"); 
      } else {
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const handlePasswordReset = async () => {
    const response = await fetch(`${VITE_BASE_URL}/api/users/reset-password-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Password reset link sent to your email.");
    } else {
      toast.error(data.message || "Please Enter The Videos");
    }
  };

  return (
    <>
      <div className="sign-main">
        <div className="first">
          <div className="logo">
            <img src={logo} alt="" />
            <h1>Sign In</h1>
          </div>
          <p>
            SocialPress.online
          </p>
          <img src={imageSign} alt="" />
        </div>
        <div className="line"></div>
        <div className="second">
          <h1>Sign In </h1>
          <form onSubmit={handleLogin}>
            <div className="main-input">
              <label htmlFor="">Email</label>
              <div className="input">
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineEmail className="input-icons" />
              </div>
            </div>
            <div className="main-input">
              <label htmlFor="">Password</label>
              <div className="input">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            <a className="resetPassword" onClick={handlePasswordReset}>Forgot Password</a>
            <button type="submit" className="button1">
              Sign in
            </button>
          </form>
          <button type="button" className="button2">
            <img src={goggleImage} alt="" /> Sign in with Google
          </button>
          <h2>
            Don’t have any account?<a href="/signup">Sign Up</a>
          </h2>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
