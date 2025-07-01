import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function Bidding({ accountId }) {
  const [bidData, setBidData] = useState({
    bidAmount: '',
    timeLimit: ''
  });
  const [bids, setBids] = useState([]);
  const [hasBidded, setHasBidded] = useState(false);
  const [showForm, setShowForm] = useState(true); // Controls form visibility
  const [isAccountLocked, setIsAccountLocked] = useState(false); // Track account status
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;
  const userName = user?.fullName;
  const userEmail = user?.email;

  useEffect(() => {
    fetchBids();
    checkIfBidded(); // Check if the user has already bidded
    checkAccountStatus(); // Check if the account is locked
  }, []);

  const fetchBids = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/bids/${accountId}`);
      const data = await response.json();
      setBids(data);
    } catch (error) {
      console.error('Error fetching bids:', error);
    }
  };

  const checkIfBidded = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/bids/check/${accountId}/${userId}`);
      const data = await response.json();
      setHasBidded(data.hasBidded);
      if (data.hasBidded) {
        setShowForm(false); // Hide form if the user has already placed a bid
      }
    } catch (error) {
      console.error('Error checking bid status:', error);
    }
  };

  const checkAccountStatus = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/accounts/${accountId}`); // Ensure you have an endpoint for this
      const account = await response.json();
      setIsAccountLocked(account.isLocked);
      if (account.isLocked) {
        setShowForm(false); // Hide form if the account is locked
      }
    } catch (error) {
      console.error('Error checking account status:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBidData({ ...bidData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be login in to place a bid.");
      return;
  }

    if (hasBidded) {
      alert('You have already placed a bid on this account.');
      return;
    }
    if (isAccountLocked) {
      alert('This account is currently freeze. Bidding is not allowed.');
      return;
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/bids`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...bidData, accountId, userId, name: userName, email: userEmail })
      });
      if (response.ok) {
        setShowForm(false); // Hide the form after successful submission
        fetchBids();
        checkIfBidded(); // Check again to confirm bid status
      } else {
        const errorData = await response.json();
        console.error('Error submitting bid:', errorData.message);
        toast.error( errorData.message);
      }
    } catch (error) {
      console.error('Error submitting bid:', error);
    }
  };

  return (
    <div className="Data-Biding">
      {isAccountLocked ? (
        <p>This account is currently freeze. Bidding is not allowed.</p>
      ) : (
        showForm && (
          <>
            <h1>Your Bidding</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-inner">
                <div className="input-biding">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={userName || ''}
                    required
                    disabled
                  />
                </div>
                <div className="input-biding">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={userEmail || ''}
                    required
                    disabled
                  />
                </div>
                <div className="input-biding">
                  <label>Enter your bid:</label>
                  <input
                    type="number"
                    name="bidAmount"
                    placeholder="Enter bid amount"
                    value={bidData.bidAmount}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-biding">
                  <label>Time Limit:</label>
                  <input
                    type="datetime-local"
                    name="timeLimit"
                    value={bidData.timeLimit}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="input-biding">
                <button type="submit" disabled={hasBidded}>Submit</button>
              </div>
            </form>
          </>
        )
      )}
      <div className="user-seller">
        <h1>Recent Bidding User</h1>
        <a href="#">Chat With Seller</a>
      </div>
      {bids.map((bid, index) => (
        <div className="recent-biding" key={index}>
          <div className="user-biding">
            <h2>User</h2>
            <h3>{index + 1}</h3>
          </div>
          <div className="user-biding">
            <h2>Time</h2>
            <h3>{new Date(bid.timeLimit).toLocaleString()}</h3>
          </div>
          <div className="user-biding">
            <h2>Name</h2>
            <h3>{bid.name}</h3>
          </div>
          <div className="user-biding">
            <h2>Email</h2>
            <h3>{bid.email}</h3>
          </div>
          <div className="user-biding">
            <h2>Price</h2>
            <h3>{bid.bidAmount}</h3>
          </div>
          <div className="user-biding">
            <h2>Dealing Status</h2>
            <h3>{bid.dealingStatus}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Bidding;
