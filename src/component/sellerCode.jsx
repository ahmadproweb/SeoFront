import React, { useEffect, useState } from "react";
import "../css/code.css";
import { toast } from "react-toastify";
import logo from '../images/logo.png'
import Processing from "./Processing";


const removeHashFromURL = () => {
  history.replaceState(null, "", window.location.pathname + window.location.search);
};



const SellerCode = () => {
  const [formNumber, setFormNumber] = useState(0);
  const [stepList] = useState(["Your Information", "Sell account", "GCF(Generate Code First)", "Finish"]);
  const [accountData, setAccountData] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [selectedAccountType, setSelectedAccountType] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [code, setCode] = useState("");
  const [paymentForBuyer, setPaymentForBuyer] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      // try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/buySellList/all`);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        setAccountData(data);
      // } catch (error) {
      //   console.error("Error fetching data:", error);
      // }
    };
    

    fetchData();
  }, []);

  useEffect(() => {
    const selectedAccount = accountData.find((account) => account.accountId === selectedAccountId);
    if (selectedAccount) {
      setSelectedAccountType(selectedAccount.accountType);
    } else {
      setSelectedAccountType("");
    }
  }, [selectedAccountId, accountData]);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setFullName(userData.fullName);
      setEmailAddress(userData.email);
    }
  }, []);

  const closePopup = () => {
    const overlay = document.getElementById("popup1");
    if (overlay) {
      overlay.style.visibility = "hidden";
      overlay.style.opacity = "0";
      enableScroll();
      removeHashFromURL();
    }
    setFormNumber(0);
  };

  const enableScroll = () => {
    document.body.classList.remove("no-scroll");
  };

  const handleBackClick = () => {
    setFormNumber((prevFormNumber) => prevFormNumber - 1);
  };

  const handleNextClickPart1 = () => {
    setFormNumber((prevFormNumber) => prevFormNumber + 1);
  };

  const handleNextClickPart2 = () => {
    setFormNumber((prevFormNumber) => prevFormNumber + 1);
  };

  const handleSubmit = async () => {
    // console.log("Full Name:", fullName);
    // console.log("Email Address:", emailAddress);
    // console.log("Buyer Name:", buyerName);
    // console.log("Payment Buyer:", paymentForBuyer);
    // console.log("Selected Account ID:", selectedAccountId);
    // console.log("Selected Account Type:", selectedAccountType);
    // console.log("Code:", code);
    const token = localStorage.getItem('token'); 
    setLoading(true);
     
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/codeGenerator/create/seller`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({
          fullName,
          emailAddress,
          buyerName,
          paymentForBuyer,
          accountId: selectedAccountId,
          accountType: selectedAccountType,
          code,
        }),
      });
  
      if (!response.ok) {
        // console.error("Response not OK:", response);
  
        const data = await response.json().catch(() => null);
  
        if (data && data.errors && Array.isArray(data.errors)) {
          data.errors.forEach((error) => toast.error(error));
        } else {
          toast.error(data?.message || "Something went wrong");
        }
      } else {
        const data = await response.json();
        toast.success("Information submitted successfully!");
        setFormNumber(3);
      }
    } catch (error) {
      // console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form.");
    }finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="containerMain">
      <div className="card">
        <div className="form">
          <button type="button">
            <a className="close" href="" onClick={closePopup}>
              &times;
            </a>
          </button>
          <div className="left-side">
            <div className="left-heading">
              <h3>SellerCode Form</h3>
            </div>
            <div className="steps-content">
              <h3>
                Step <span className="step-number">{formNumber + 1}</span>
              </h3>
              {stepList.map((step, index) => (
                <p
                  key={index}
                  className={`step-number-content ${
                    index === formNumber ? "active" : "d-none"
                  }`}
                >
                  {step}
                </p>
              ))}
            </div>
            <ul className="progress-bar">
              {stepList.map((step, index) => (
                <li
                  key={index}
                  className={index === formNumber ? "active" : "actives"}
                >
                  {step}
                </li>
              ))}
            </ul>
          </div>
          <div className="right-side">
            {/* Step 1 */}
            <div className={`main ${formNumber === 0 ? "active" : ""}`}>
              <img src={logo} alt="" />
              <div className="Text2">
                <h2>Your Information</h2>
              </div>
              <div className="input-text">
                <div className="input-div">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled
                  />
                </div>
                <div className="input-div">
                  <label>E-mail Address</label>
                  <input
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    disabled
                  />
                </div>
              </div>
              <div className="buttons">
                <button className="next_button" onClick={handleNextClickPart1}>
                  Next Step
                </button>
              </div>
            </div>

            {/* Step 2 */}
            <div className={`main ${formNumber === 1 ? "active" : ""}`}>
              <img src={logo} alt="" />
              <div className="Text2">
                <h2>Buy user Info</h2>
              </div>
              <div className="input-text">
                <div className="input-div">
                  <input
                    type="text"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                  />
                  <span>Buyer Name</span>
                </div>
                <div className="input-div">
                  <input
                    type="number"
                    value={paymentForBuyer}
                    onChange={(e) => setPaymentForBuyer(e.target.value)}
                  />
                  <span>Payment Buyer</span>
                </div>
              </div>

              <div className="input-text">
                <div className="input-div">
                  <h1>Total Account Id Available:</h1>
                  <select
                    value={selectedAccountId ?? ""}
                    onChange={(e) => setSelectedAccountId(parseInt(e.target.value, 10))}
                  >
                    <option value="">Select Account Id</option>
                    {accountData.map((account) => (
                      <option
                        key={account.accountId}
                        value={account.accountId}
                      >
                        {account.accountId}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-div">
                  <h1>Account Type:</h1>
                  <select
                    value={selectedAccountType}
                    onChange={(e) => setSelectedAccountType(e.target.value)}
                  >
                    {accountData
                      .filter(
                        (account) =>
                          account.accountId === selectedAccountId 
                      )
                      .map((account) => (
                        <option
                          key={account.accountType}
                          value={account.accountType}
                        >
                          {account.accountType}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="buttons button_space">
                <button className="back_button" onClick={handleBackClick}>
                  Back
                </button>
                <button className="next_button" onClick={handleNextClickPart2}>
                  Next Step
                </button>
              </div>
            </div>

            {/* Step 3 */}
            <div className={`main ${formNumber === 2 ? "active" : ""}`}>
              <img src={logo} alt="" />
              <div className="text89">
                <h2 style={{ fontSize: "1.2rem" }}>
                  Type 8 Digital Code (As You Wish):
                </h2>
                <p style={{ fontSize: "1rem" }}>
                  (Make sure capital letters & digits are correct)
                </p>
              </div>
              <div className="input-text">
                <div className="input-div">
                  <input
                    type="number" 
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    maxLength={8}
                    required
                  />
                  <span>Code</span>
                </div>
              </div>

              <div className="buttons button_space">
                <button className="back_button" onClick={handleBackClick}>
                  Back
                </button>
                <button className="next_button" onClick={handleSubmit} disabled={loading}>
        {loading ? <Processing/> : 'Send'}
                </button>
              </div>
            </div>

            {/* Step 4 */}
            <div className={`main ${formNumber === 3 ? "active" : ""}`}>
              <img src={logo} alt="" />
              <svg
                className="checkmark"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
              >
                <circle
                  className="checkmark__circle"
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />
                <path
                  className="checkmark__check"
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>

              <div className="Text2 congrats">
                <h2>Congratulations!</h2>
                <p>
                  Thanks Mr./Mrs. <span className="shown_name"></span> your
                  information have been submitted successfully for the future
                  reference we will contact you soon.
                </p>
                <a href="">More Details</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerCode;
