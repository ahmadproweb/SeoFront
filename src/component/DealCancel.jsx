import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL

function DealCancel() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [sellerEmail, setSellerEmail] = useState('');

  useEffect(() => {
    // Retrieve data from localStorage and environment variables
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setFullName(user.fullName);
      setEmail(user.email);
    }

    // Ensure this environment variable is set
    setAdminEmail(import.meta.env.VITE_ADMIN_EMAIL || '');
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token'); // 

    // Send request to the backend
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
      console.error('Error sending request:', error);
      toast.error('Error sending request');
    });
  };

  return (
    <div className="paymentafter">
      <div className="imgAuth">
        <img
          src="https://img.freepik.com/free-vector/checklist-concept-illustration_114360-479.jpg?w=740&t=st=1708034311~exp=1708034911~hmac=bcaed47c9ae3ee37247348450d9f84f2073483848649d0fdea5d199d1209703a"
          alt="Illustration"
        />
      </div>
      <form className="formPa" onSubmit={handleSubmit}>
        <div className="welcomePayment">
          <h1>Deal Cancel For Seller</h1>
        </div>
        <div className="mainFormPayment">
          <div className="mainFormPaymentInner">
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              disabled
            />
            <label htmlFor="fullName">Full Name</label>
          </div>
          <div className="mainFormPaymentInner">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled

            />
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <div className="mainFormPayment">
          <div className="mainFormPaymentInner">
            <input
              type="email"
              value={adminEmail}
              readOnly
            />
            <label htmlFor="adminEmail">Admin Email</label>
          </div>
          <div className="mainFormPaymentInner">
            <input
              type="email"
              value={sellerEmail}
              onChange={(e) => setSellerEmail(e.target.value)}
              required
              disabled

            />
            <label htmlFor="sellerEmail">Seller Email</label>
          </div>
        </div>
        <button type="submit" className="sendEmail">
          Send
        </button>
      </form>
    </div>
  );
}

export default DealCancel;
