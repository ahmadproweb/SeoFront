import React, { useState } from "react";
import { toast } from "react-toastify";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
import "../css/auth.css";
import {
  MdOutlineDriveFileRenameOutline,
  MdOutlineEmail,
} from "react-icons/md";
import logo from "../images/logo.png";
import imageSign from "../images/imageSign.png";
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
    <>
      <div className="DealBtn">
        <div className="DealBtnInner">
          <a href="/DealDone">Account Info</a>
          <a href="/codeMatching">Code Matching</a>
          <a href="/paymentMethodSeller">Payment Method Seller</a>
        </div>
      </div>

      <div className="sign-main">
      <div className="first">
        <div className="logo">
          <img src={logo} alt="" />
        <h1>Welcome Code Matching</h1>
        </div>
        <img src={imageSign} alt="" />
      </div>
      <div
        className="line"
      ></div>
      <div className="second">
        <form onSubmit={handleSubmit}>
          <div className="main-input">
            <label htmlFor="accountId">Account Id</label>
            <div className="input">
              <input
              type="number"
              name="accountId"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              required
              />
              <MdOutlineDriveFileRenameOutline className="input-icons" />
            </div>
          </div>
          <div className="main-input">
            <label htmlFor="buyerCode">Buyer Code</label>
            <div className="input">
              <input
                type="number"
                name="buyerCode"
                value={buyerCode}
                onChange={(e) => setBuyerCode(e.target.value)}
                required
              />
              <MdOutlineEmail className="input-icons" />
            </div>
          </div>
       
          <div className="main-input">
            <label htmlFor="sellerCode">Seller Code</label>
            <div className="input">
              <input
               type="number"
               name="sellerCode"
               value={sellerCode}
               onChange={(e) => setSellerCode(e.target.value)}
               required
              />
              <MdOutlineEmail className="input-icons" />
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
              <input type="checkbox" onChange={handleCheckboxChange} /> Ready
              Term And Conditions
            </div>
          </div>
          <button type="submit" style={{
            backgroundColor: 'green'
          }} className="button1" >
        Send
          </button>
          
        </form>
      </div>
    </div>
    </>
  );
}

export default CodeMatching;
