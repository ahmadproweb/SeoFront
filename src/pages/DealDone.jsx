import React, { useEffect, useState } from 'react';
import '../css/deal.css';
import "../css/buyerPayment.css";
import { toast } from 'react-toastify';
const VITE_ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL; // Read admin email from environment variable
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL; 
function DealDone() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    adminEmail: VITE_ADMIN_EMAIL,
    buyerEmail: '',
    accountInfo: '',
    accountPic: null,
  });
  // Initialize formData with data from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFormData((prevState) => ({
        ...prevState,
        fullName: user.fullName,
        email: user.email
      }));
    }
  }, []);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'accountPic') {
      setFormData({ ...formData, accountPic: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }
    const token = localStorage.getItem('token'); // 

    try {
      const response = await fetch(`${VITE_BASE_URL}/accountinfo/create`, {
        method: 'POST',
        body: form,
        headers: {
          // "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
      });

      const result = await response.json();
      if (response.ok) {
        toast.success('Account information created successfully');
        setFormData({
          buyerEmail: '',
          accountInfo: '',
          accountPic: '',
        })
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <div className='DealBtn'>
        <a href="/SectionFirst">btn1</a>
        <a href="/SectionSecond">btn2</a>
        <a href="/DealCancel">Deal Cancel</a>
      </div>
      <div className="paymentafter">
        <div className="imgAuth">
          <img
            src="https://img.freepik.com/free-vector/checklist-concept-illustration_114360-479.jpg?w=740&t=st=1708034311~exp=1708034911~hmac=bcaed47c9ae3ee37247348450d9f84f2073483848649d0fdea5d199d1209703a"
            alt=""
          />
        </div>
        <form className="formPa" onSubmit={handleSubmit}>
          <div className="welcomePayment">
            <h1>welcome Seller</h1>
          </div>
          <div className="mainFormPayment">
            <div className="mainFormPaymentInner">
              <input
                type="text"
                id="name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                disabled
              />
              <label htmlFor="name">Full Name</label>
            </div>
            <div className="mainFormPaymentInner">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled

              />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="mainFormPayment">
            <div className="mainFormPaymentInner">
              <input
                type="email"
                name="adminEmail"
                value={formData.adminEmail}
                onChange={handleChange}
                disabled

              />
              <label htmlFor="adminEmail">Admin Email</label>
            </div>
            <div className="mainFormPaymentInner">
              <input
                type="email"
                name="buyerEmail"
                value={formData.buyerEmail}
                onChange={handleChange}
              />
              <label htmlFor="buyerEmail">Seller Email</label>
            </div>
          </div>
          <div className="mainFormPaymentInner">
            <textarea
              name="accountInfo"
              value={formData.accountInfo}
              onChange={handleChange}
            />
            <label htmlFor="accountInfo">Account Access (Enter Account Password, etc.)</label>
          </div>
          <div className="mainFormPayment">
            <div className="selected">
              <label>Payment Screenshot:</label>
              <br />
              <br />
              <input
                accept="image/png, image/jpg, image/jpeg"
                type="file"
                id="accountPic"
                name="accountPic"
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" className="sendEmail">
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default DealDone;
