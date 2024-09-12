import React, { useState } from "react";
import { toast } from "react-toastify";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

function CodeMatching() {
  const [accountId, setAccountId] = useState("");
  const [sellerCode, setSellerCode] = useState("");
  const [buyerCode, setBuyerCode] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!isChecked) {
      toast.error("Please Check");
      return;
    }
    fetch(`${VITE_BASE_URL}/codeMatching/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        accountId: Number(accountId),
        sellerCode: Number(sellerCode),
        buyerCode: Number(buyerCode),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          toast.error(data.message);
        } else {
          toast.success("Code matching created successfully");
          setAccountId("");
          setSellerCode("");
          setBuyerCode("");
        }
      })
      .catch((error) => {
        toast.error("Error submitting form", error);
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
              type="number"
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
              type="number"
              name="sellerCode"
              value={sellerCode}
              onChange={(e) => setSellerCode(e.target.value)}
              required
            />
            <label htmlFor="sellerCode">Seller Code</label>
          </div>
          <div className="mainFormPaymentInner">
            <input
              type="number"
              name="buyerCode"
              value={buyerCode}
              onChange={(e) => setBuyerCode(e.target.value)}
              required
            />
            <label htmlFor="buyerCode">Buyer Code</label>
          </div>
        </div>
        <div className="Text">
          1. Wait 5mins, Buyer can check your Account.
          <br />
          2. In this section, Get Code from buyer through live Chat.
          <br />
          3. Should Confirm both codes then you can move next.
          <br />
          4. Be Aware! Don't send Worng information in form.
          <br />
          <div className="Condition">
            <input type="checkbox" onChange={handleCheckboxChange} /> Ready Term
            And Conditions
          </div>
        </div>
        <button type="submit" className="sendEmail">
          Send
        </button>
      </form>
    </div>
  );
}

export default CodeMatching;
