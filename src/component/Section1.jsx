import React, { useState } from 'react';
import { toast } from 'react-toastify';
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL

function SectionFirst() {
  const [accountId, setAccountId] = useState('');
  const [sellerCode, setSellerCode] = useState('');
  const [buyerCode, setBuyerCode] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token'); // 

    // Submit form data to the backend
    fetch(`${VITE_BASE_URL}/codeMatching/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify({
        accountId: Number(accountId),  // Convert to number
        sellerCode:Number(sellerCode),
        buyerCode:Number(buyerCode),
      })
    })
    
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        toast.error(data.message);
      } else {
        toast.success('Code matching created successfully');
        // Clear form fields if needed
        setAccountId('');
        setSellerCode('');
        setBuyerCode('');
      }
    })
    .catch(error => {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form');
    });
  };

  return (
    <div className="paymentafter">
      <div className="imgAuth">
        <img
          src="https://img.freepik.com/free-vector/checklist-concept-illustration_114360-479.jpg?w=740&t=st=1708034311~exp=1708034911~hmac=bcaed47c9ae3ee37247348450d9f84f2073483848649d0fdea5d199d1209703a"
          alt="Checklist"
        />
      </div>
      <form className="formPa" onSubmit={handleSubmit}>
        <div className="welcomePayment">
          <h1>Welcome Code Matching</h1>
        </div>
        <div className="mainFormPayment">
          <div className="mainFormPaymentInner">
            <input
              type="text"
              name="accountId"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              required
            />
            <label htmlFor="accountId">Account ID</label>
          </div>
        </div>
        <div className="mainFormPayment">
          <div className="mainFormPaymentInner">
            <input
              type="text"
              name="sellerCode"
              value={sellerCode}
              onChange={(e) => setSellerCode(e.target.value)}
              required
            />
            <label htmlFor="sellerCode">Seller Code</label>
          </div>
          <div className="mainFormPaymentInner">
            <input
              type="text"
              name="buyerCode"
              value={buyerCode}
              onChange={(e) => setBuyerCode(e.target.value)}
              required
            />
            <label htmlFor="buyerCode">Buyer Code</label>
          </div>
        </div>
        <button type="submit" className="sendEmail">
          Send
        </button>
      </form>
    </div>
  );
}

export default SectionFirst;
