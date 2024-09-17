import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
import "../css/auth.css";
import { TbCircleDashedNumber0 } from "react-icons/tb";
import { IoPricetagOutline } from "react-icons/io5";
import { MdDriveFileRenameOutline } from "react-icons/md";
import logo from "../images/logo.png";
import imageSign from "../images/imageSign.png";

function PaymentMethodSeller() {
  const [formData, setFormData] = useState({
    accountId: "",
    sendedAmount: "",
    paymentMethod: "",
    accountNumber: "",
    accountName: "",
  });
  const [accounts, setAccounts] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    fetch(`${VITE_BASE_URL}/buySellList/all`)
      .then((response) => response.json())
      .then((data) => {
        setAccounts(data);
      })
      .catch(() => {
        toast.error("Failed to fetch account data");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [name]: value };

      if (name === "accountId") {
        const selectedAccount = accounts.find(
          (account) => account.accountId.toString() === value
        );
        if (selectedAccount) {
          updatedFormData.sendedAmount = selectedAccount.accountPrice;
        } else {
          updatedFormData.sendedAmount = "";
        }
      }

      return updatedFormData;
    });
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!isChecked) {
      toast.error("Please Check");
      return;
    }

    try {
      const response = await fetch(`${VITE_BASE_URL}/sellerPayment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Payment received successfully");
        setFormData({
          accountId: "",
          sendedAmount: "",
          paymentMethod: "",
          accountNumber: "",
          accountName: "",
        });
        setIsChecked(false);
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
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
            <h1>Welcome Seller</h1>
          </div>
          <p>Only seller can use and fill this form</p>
          <img src={imageSign} alt="Sign" />
        </div>
        <div className="line"></div>
        <div className="second">
          <form onSubmit={handleSubmit}>
            <div className="main-input">
              <label htmlFor="accountId">Account Id</label>
              <div className="input">
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
            </div>
            <div className="main-input">
              <label htmlFor="sendedAmount">Sended Amount (Price)</label>
              <div className="input">
                <input
                  name="sendedAmount"
                  value={formData.sendedAmount}
                  onChange={handleChange}
                  required
                />
                <IoPricetagOutline className="input-icons" />
              </div>
            </div>
            <div className="main-input">
              <label htmlFor="paymentMethod">Payment Method</label>
              <div className="input">
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
            </div>
            <div className="main-input">
              <label htmlFor="accountNumber">Account Number</label>
              <div className="input">
                <input
                  name="accountNumber"
                  type="number"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  required
                />
                <TbCircleDashedNumber0 className="input-icons" />
              </div>
            </div>
            <div className="main-input">
              <label htmlFor="accountName">Account Name</label>
              <div className="input">
                <input
                  name="accountName"
                  type="text"
                  value={formData.accountName}
                  onChange={handleChange}
                  required
                />
                <MdDriveFileRenameOutline className="input-icons" />
              </div>
            </div>
            <div className="Text">
              1. Select Your Correct Payment method. <br />
              2. Enter your Correct Account No and Account Name. <br />
              3. Make sure Account no match to Merchant partner <br />
              (Bank, Digital Account Jazzcash/Easypaisa, Crypto Account). <br />
              4. Be Aware! If Account Information is Wrong, We do Nothing.{" "}
              <br />
              5. Payment will be processed in 5 to 15 minutes. <br />
              <div className="Condition">
                <input type="checkbox" onChange={handleCheckboxChange} /> Read
                Terms And Conditions
              </div>
            </div>
            <button
              type="submit"
              style={{ backgroundColor: "green" }}
              className="button1"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PaymentMethodSeller;
