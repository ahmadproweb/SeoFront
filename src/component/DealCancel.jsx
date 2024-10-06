import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL
import "../css/auth.css";
import { FaStarOfLife } from "react-icons/fa";
import { MdOutlineDriveFileRenameOutline, MdOutlineEmail } from 'react-icons/md';
import logo from "../images/logo.png";
import sellerPayment1 from "../images/sellerPayment1.png";

function DealCancel() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [sellerEmail, setSellerEmail] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setFullName(user.fullName);
      setEmail(user.email);
    }

    setAdminEmail(import.meta.env.VITE_ADMIN_EMAIL || '');
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token'); 

    fetch(`${VITE_BASE_URL}/dealCancel/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify({
        fullName,
        email,
        adminEmail,
        sellerEmail
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        toast.success(data.message);
        setSellerEmail('')
      }
    })
    .catch(error => {
      toast.error('Error sending request');
    });
  };

  return (
    <div className="sign-main">
    <div className="first">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <h1>Welcome Seller</h1>
      </div>
      <p>Only seller can use and fill this form</p>
      <img src={sellerPayment1} width={600} height={600} alt="Sign" />
    </div>
    <div className="line"></div>
    <div className="second">
      <form onSubmit={handleSubmit}>
    <h2>Deal Cancel For Seller</h2>
    <div className="main-input">
      <label htmlFor="fullName">Full Name</label>
      <div className="input">
        <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            disabled
        />
        <MdOutlineDriveFileRenameOutline className="input-icons" />
      </div>
    </div>
    <div className="main-input">
      <label htmlFor="email">Email</label>
      <div className="input">
        <input
           type="email"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           required
           disabled
        />
        <MdOutlineEmail className="input-icons" />
      </div>
    </div>

    <div className="main-input">
      <label htmlFor="adminEmail">Admin Email</label>
      <div className="input">
        <input
           type="email"
           value={adminEmail}
           readOnly
        />
        <MdOutlineEmail className="input-icons" />
      </div>
    </div>
    <div className="main-input">
      <label htmlFor="sellerEmail">Seller Email  <FaStarOfLife className="Star"/>   </label>
      <div className="input">
        <input
        type="email"
        value={sellerEmail}
        onChange={(e) => setSellerEmail(e.target.value)}
        required
        />
        <MdOutlineEmail className="input-icons" />
      </div>
    </div>
    <button
      type="submit"
      style={{
        backgroundColor: "green",
        height: "4rem",
        padding: "0rem",
      }}
      className="button1 sendEmail"
    >
      Send
    </button>
  </form>
    </div>
    </div>
  );
}

export default DealCancel;
