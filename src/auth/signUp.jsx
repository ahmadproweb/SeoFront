import React, { useState } from "react";
import {
  MdOutlineDriveFileRenameOutline,
  MdOutlineEmail,
} from "react-icons/md";
import "../css/auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

import { MdDriveFileRenameOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL

import imageSign from '../images/imageSign.png'
import goggleImage from '../images/goggleImage.png'
import logo from '../images/logo.png'

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, confirmPassword, profileImage } = formData;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const formDataObj = new FormData();
      formDataObj.append("firstName", firstName);
      formDataObj.append("lastName", lastName);
      formDataObj.append("email", email);
      formDataObj.append("password", password);
      formDataObj.append("confirmPassword", confirmPassword);
      if (profileImage) {
        formDataObj.append("profileImage", profileImage);
      }

      const response = await fetch(`${VITE_BASE_URL}/api/users/register`, {
        method: "POST",
        body: formDataObj,
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("email", email);
        toast.success(data.message);
        navigate("/verify");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="sign-main">
      <div className="first">
        <div className="logo">
          <img src={logo} alt="" />
          <h1>Sign Up</h1>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse.
        </p>
        <img src={imageSign} alt="" />
      </div>
      <div
        className="line"
        style={{
          height: "100dvh",
        }}
      ></div>
      <div className="second">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="main-input">
            <input type="file"
            required
            onChange={handleFileChange} />
          </div>
          <div className="main-input">
            <label htmlFor="firstName">First Name</label>
            <div className="input">
              <input
                type="text"
                placeholder="Enter Your First Name"
                name="firstName"
                value={formData.firstName}
                required
                onChange={handleInputChange}
              />
              <MdOutlineDriveFileRenameOutline className="input-icons" />
            </div>
          </div>
          <div className="main-input">
            <label htmlFor="lastName">Last Name</label>
            <div className="input">
              <input
                type="text"
                placeholder="Enter Your Last Name"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleInputChange}
              />
              <MdDriveFileRenameOutline className="input-icons" />
            </div>
          </div>
          <div className="main-input">
            <label htmlFor="email">Email</label>
            <div className="input">
              <input
                type="email"
                placeholder="Enter Your Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <MdOutlineEmail className="input-icons" />
            </div>
          </div>
          <div className="main-input">
            <label htmlFor="password">Password</label>
            <div className="input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                required
                name="password"
                value={formData.password}
                onChange={handleInputChange}
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
          <div className="main-input">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password Again"
                name="confirmPassword"
                value={formData.confirmPassword}
                required
                onChange={handleInputChange}
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
            Sign Up
          </button>
        </form>
        <button type="button" className="button2">
          <img src={goggleImage} alt="" /> Sign Up with Google
        </button>
        <h2>
          Don’t have an account? <a href="/login">Sign In</a>
        </h2>
      </div>
    </div>
  );
};

export default SignUp;
