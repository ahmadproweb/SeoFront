import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  MdOutlineDriveFileRenameOutline,
  MdOutlineEmail,
} from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";
import logo from "../images/logo.png";
import codeMatcging1 from "../images/codeMatcging1.png";
import "../css/auth.css";
import { FaStarOfLife } from "react-icons/fa";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

function CodeMatching() {
  const [accountId, setAccountId] = useState("");
  const [sellerCode, setSellerCode] = useState("");
  const [buyerCode, setBuyerCode] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (timeLeft === 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!isChecked) {
      toast.error("Please Check the Terms and Conditions");
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
    <div>
      {timeLeft > 0 ? (
        <h6 className="timer">
          Please Wait: {Math.floor(timeLeft / 60)}:
          {timeLeft % 60 < 10 ? "0" : ""}
          {timeLeft % 60}
        </h6>
      ) : (
        "Time Finish"
      )}
      <>
        <div className="DealBtn">
          <div className="DealBtnInner">
            <a href="/DealDone">Account Info</a>
            <a href="/codeMatching">Code Matching</a>
            <a href="/paymentMethodSeller">Payment Method Seller</a>
          </div>
        </div>
        <div className="sign-main">
          <div className="first">
            <div className="logo">
              <img src={logo} alt="Logo" />
              <h1>Welcome to Code Matching</h1>
            </div>
            <img src={codeMatcging1} width={500} height={500} alt="codeMatching" />
          </div>
          <div className="line"></div>
          <div className="second">
            <form onSubmit={handleSubmit}>
            <h2>Get The Code From Buyer Now</h2>
              <div className="main-input">
                <label htmlFor="accountId">Account Id : <FaStarOfLife className="Star"/></label>
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
                <label htmlFor="buyerCode">Buyer Code : <FaStarOfLife className="Star"/></label>
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
                <label htmlFor="sellerCode">Seller Code : <FaStarOfLife className="Star"/></label>
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
                <span>1.</span> Wait 5 minutes, Buyer can check your Account.
                <br />
                <span>2.</span> In this section, Get Code from buyer through
                live Chat.
                <br />
                <span>3.</span> Confirm both codes then you can move to the next
                step.
                <br />
                <span>4.</span> Be Aware! Don't send wrong information in the
                form.
                <br />
                <div className="Condition">
                  <input type="checkbox" onChange={handleCheckboxChange} /> I
                  have read and agree to the Terms and Conditions
                </div>
              </div>
              <button
                type="submit"
                style={{
                  backgroundColor: "green",
                  height: "4rem",
                  padding: "0rem",
                }}
                className="button1"
              >
                <div className="item">
                  <FaLongArrowAltRight className="arrow1" />
                </div>
              </button>
            </form>
          </div>
        </div>
      </>
    </div>
  );
}

export default CodeMatching;
