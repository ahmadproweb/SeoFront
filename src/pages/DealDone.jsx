import React, { useEffect, useState } from "react";
import "../css/deal.css";
import "../css/buyerPayment.css";
import "../css/auth.css";
import iconI from "../images/iconI.png";
import { FaLongArrowAltRight } from "react-icons/fa";
import {
  MdOutlineDriveFileRenameOutline,
  MdOutlineEmail,
} from "react-icons/md";
import { toast } from "react-toastify";
import Processing from "../component/Processing";
const VITE_ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
import logo from "../images/logo.png";
import DealDone1 from "../images/DealDone1.png";
import { FaStarOfLife } from "react-icons/fa";
function DealDone() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    adminEmail: VITE_ADMIN_EMAIL,
    buyerEmail: "",
    accountDesc: "",
    accountInfo: `1. You have 5 minutes to check seller account.
2. You can cancel the deal if the account is not correct (Email & Password or others).
3. In case of deal cancellation, You Need Seller generated code & Contact with admin.
4. If the seller doesn't give you the code, you can report it to the admin.`,
    accountPic: null,
  });
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFormData((prevState) => ({
        ...prevState,
        fullName: user.fullName,
        email: user.email,
      }));
    }
  }, []);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "accountPic") {
      setFormData({ ...formData, accountPic: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChecked) {
      toast.error("Please Check");
      return;
    }
    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }
    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const response = await fetch(`${VITE_BASE_URL}/accountinfo/create`, {
        method: "POST",
        body: form,
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Account information created successfully");
        setFormData({
          buyerEmail: "",
          accountPic: "",
          accountDesc: "",
        });
      } else {
        toast.error(`Error: ${result.message}`);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="DealBtn">
        <div className="DealBtnInner">
          <a href="/DealDone">Account Info</a>
          <a href="/codeMatching">Code Matching</a>
          <a href="/paymentMethodSeller">Payment Method Seller</a>
        </div>
        <div className="bgRed">
          <a href="/DealCancel" className="">
            Deal Cancel
          </a>
        </div>
      </div>
      <div className="sign-main">
        <div className="first">
          <div className="logo">
            <img src={logo} alt="" />
            <h1>Acct Info Exchanger</h1>
          </div>
          <p>Only seller can use and fill this form</p>
          <img src={DealDone1} width={600} height={600} alt="" />
        </div>
        <div className="line"></div>
        <div className="second">
          <form onSubmit={handleSubmit}>
            <h2>Send Account Email & Password to Buyer</h2>
            <div className="main-input">
              <label htmlFor="fullName">Full Name</label>
              <div className="input">
                <input
                  type="text"
                  id="name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled
                />
                <MdOutlineDriveFileRenameOutline className="input-icons" />
              </div>
            </div>
            <div className="main-input">
              <label htmlFor="email">Email</label>
              <div className="input">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                />
                <MdOutlineEmail className="input-icons" />
              </div>
            </div>

            <div className="main-input">
              <label htmlFor="adminEmail">Admin Email</label>
              <div className="input">
                <input
                  type="email"
                  name="adminEmail"
                  value={formData.adminEmail}
                  onChange={handleChange}
                  disabled
                />
                <MdOutlineEmail className="input-icons" />
              </div>
            </div>
            <div className="main-input">
              <label htmlFor="buyerEmail">
                Buyer Email <FaStarOfLife className="Star" />{" "}
              </label>
              <div className="input">
                <input
                  type="email"
                  name="buyerEmail"
                  value={formData.buyerEmail}
                  onChange={handleChange}
                />
                <MdOutlineEmail className="input-icons" />
              </div>
            </div>
            <div className="main-input">
              <label htmlFor="accountDesc">
                Account Info : <FaStarOfLife className="Star" />
              </label>
              <div className="input">
                <textarea
                  name="accountDesc"
                  value={formData.accountDesc}
                  onChange={handleChange}
                  placeholder="Account Info"
                />
              </div>
            </div>
            <div className="main-input">
              <label
                htmlFor="accountInfo"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontWeight: "300",
                    color: "red",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  (Must Read Before Filling) <FaStarOfLife className="Star" />
                </span>{" "}
                <img
                  src={iconI}
                  width={20}
                  style={{
                    cursor: "pointer",
                  }}
                  alt=""
                />
              </label>
              <div className="input">
                <textarea
                  name="accountInfo"
                  value={formData.accountInfo}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>
            <div className="main-input">
              <label htmlFor="accountPic">
                Account Pic <FaStarOfLife className="Star" />
              </label>
              <br />
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
            <div className="Text">
              <span>1.</span> Fill out the form after getting the payment
              screenshot in the email.
              <br />
              <span>2.</span> Confirm your email and seller's email while
              filling out this form.
              <br />
              <span>3.</span> Confirm the account email and password in form
              filling. So that the
              <br />
              buyer does not face any issues have while opening the account.{" "}
              <br />
              (For this you can use the input box below and write the account
              email and password in two places).
              <br />
              <span>4.</span> After filling the form you have to wait 3 or 5
              minutes, so that the buyer can open and check your account. <br />
              <span>5.</span> Now at this time you have to get buyer generated
              code from the buyer. which you have to enter in the next form. So
              that admin can easily send money into your Account.
              <br />
              <span>6.</span> Form fill Data will be stored
              <div className="Condition">
                <input type="checkbox" onChange={handleCheckboxChange} /> Ready
                Term And Conditions
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
              {loading ? (
                <Processing />
              ) : (
                <div className="item">
                  <FaLongArrowAltRight className="arrow1" />
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default DealDone;
