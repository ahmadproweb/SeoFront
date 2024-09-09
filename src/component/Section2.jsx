import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

function SectionSecond() {
  const [formData, setFormData] = useState({
    accountId: '',
    sendedAmount: '',
    paymentMethod: '',
    accountNumber: '',
    accountName: '',
  });
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    // Fetch account data from the API
    fetch(`${VITE_BASE_URL}/buySellList/all`)
      .then((response) => response.json())
      .then((data) => {
        setAccounts(data);
      })
      .catch((error) => {
        console.error('Error fetching account data:', error);
        toast.error('Failed to fetch account data');
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [name]: value };

      // If accountId is changed, update the sendedAmount with accountPrice
      if (name === 'accountId') {
        const selectedAccount = accounts.find(
          (account) => account.accountId.toString() === value
        );
        if (selectedAccount) {
          updatedFormData.sendedAmount = selectedAccount.accountPrice;
        } else {
          updatedFormData.sendedAmount = '';
        }
      }

      return updatedFormData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // 

    try {
      const response = await fetch(`${VITE_BASE_URL}/sellerPayment/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success('Payment received successfully');
        // Clear form after successful submission
        setFormData({
          accountId: '',
          sendedAmount: '',
          paymentMethod: '',
          accountNumber: '',
          accountName: '',
        });
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="paymentafter">
      <ToastContainer />
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
            <select
              id="accountId"
              name="accountId"
              value={formData.accountId}
              onChange={handleChange}
              required
            >
              <option value="">Select Account ID</option>
              {accounts.map((account) => (
                <option key={account.accountId} value={account.accountId}>
                  {account.accountId}
                </option>
              ))}
            </select>
          </div>
          <div className="mainFormPaymentInner">
            <input
              name="sendedAmount"
              value={formData.sendedAmount}
              onChange={handleChange}
              required
            />
            <label htmlFor="sendedAmount">Sended Amount (Price)</label>
          </div>
        </div>
        <div className="mainFormPaymentInner">
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="">Payment Method</option>
            <option value="jazzCash">JazzCash</option>
            <option value="easyPaisa">EasyPaisa</option>
            <option value="bankAccount">Bank Account</option>
          </select>
        </div>
        <div className="mainFormPayment">
          <div className="mainFormPaymentInner">
            <input
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              required
            />
            <label htmlFor="accountNumber">Account Number</label>
          </div>
          <div className="mainFormPaymentInner">
            <input
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
              required
            />
            <label htmlFor="accountName">Account Name</label>
          </div>
        </div>
        <button type="submit" className="sendEmail">Send</button>
      </form>
    </div>
  );
}

export default SectionSecond;
