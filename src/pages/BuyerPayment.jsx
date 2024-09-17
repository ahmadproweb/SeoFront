import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../css/auth.css";
import Processing from "../component/Processing";
import logo from "../images/logo.png";
import imageSign from "../images/imageSign.png";
import { IoPricetagOutline } from "react-icons/io5";
import {
  MdOutlineDriveFileRenameOutline,
  MdOutlineEmail,
  MdOutlinePermContactCalendar,
} from "react-icons/md";

const VITE_ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const BuyerPayment = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    adminEmail: VITE_ADMIN_EMAIL,
    sellerEmail: "",
    totalPrice: "",
    transactionId: "",
    transactionDate: "",
    paymentMethod: "",
    contactNumber: "",
  });
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState(null);

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    for (const key in formData) {
      formDataObj.append(key, formData[key]);
    }
    if (file) {
      formDataObj.append("paymentPic", file);
    }
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${VITE_BASE_URL}/payment`, {
        method: "POST",
        body: formDataObj,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
      } else {
        toast.error(result.message || "An error occurred");
      }
      setFormData({
        sellerEmail: "",
        totalPrice: "",
        transactionId: "",
        transactionDate: "",
        paymentMethod: "",
        contactNumber: "",
      });
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const renderAccountInfo = () => {
    switch (formData.paymentMethod) {
      case "jazzCash":
        return (
          <div className="accountInfo">
            <div>
              <h1>Account Number</h1>
              <span>03089653131</span>
            </div>
            <div>
              <h1>Account Name</h1>
              <span>MUJEEB ULLAH</span>
            </div>
          </div>
        );
      case "easyPaisa":
        return (
          <div className="accountInfo">
            <div>
              <h1>Account Number</h1>
              <span>03089653131</span>
            </div>
            <div>
              <h1>Account Name</h1>
              <span>MUJEEB ULLAH</span>
            </div>
          </div>
        );
      case "bankAccount":
        return (
          <div className="accountInfo">
            <div>
              <h1>Bank Name</h1>
              <span>Faysal Bank LTD</span>
            </div>
            <div>
              <h1>IBN Number</h1>
              <span>PK25FAYS3599704000005360</span>
            </div>
            <div>
              <h1>Account Name</h1>
              <span>INAM ULLAH</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="sign-main">
      <div className="first">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <h1>Welcome Buyer Payment</h1>
        </div>
        <img src={imageSign} alt="Sign" />
      </div>
      <div className="line"></div>
      <div className="second">
        <form onSubmit={handleSubmit}>
          <div className="main-input">
            <label htmlFor="fullName">Full Name</label>
            <div className="input">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                disabled
              />
              <MdOutlineDriveFileRenameOutline className="input-icons" />
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
            <label htmlFor="sellerEmail">Seller Email</label>
            <div className="input">
              <input
                type="email"
                name="sellerEmail"
                value={formData.sellerEmail}
                onChange={handleChange}
              />
              <MdOutlineEmail className="input-icons" />
            </div>
          </div>
          <div className="main-input">
            <label htmlFor="totalPrice">Total Price</label>
            <div className="input">
              <input
                type="number"
                name="totalPrice"
                value={formData.totalPrice}
                onChange={handleChange}
              />
              <IoPricetagOutline className="input-icons" />
            </div>
          </div>
          <div className="main-input">
            <label htmlFor="transactionId">Transaction ID</label>
            <div className="input">
              <input
                type="number"
                name="transactionId"
                value={formData.transactionId}
                onChange={handleChange}
              />
              <IoPricetagOutline className="input-icons" />
            </div>
          </div>
          <div className="main-input">
            <label htmlFor="transactionDate">Transaction Date</label>
            <div className="input">
              <input
                type="date"
                name="transactionDate"
                value={formData.transactionDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="main-input">
            <div className="input">
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option value="">Select Payment Method</option>
                <option value="jazzCash">JazzCash</option>
                <option value="easyPaisa">EasyPaisa</option>
                <option value="bankAccount">Bank Account</option>
              </select>
            </div>
          </div>
          {renderAccountInfo()}
          <div className="main-input">
            <label>Payment Screenshot:</label>
            <br />
            <br />
            <input
              accept="image/png, image/jpg, image/jpeg"
              type="file"
              id="paymentPic"
              name="paymentPic"
              onChange={handleImageChange}
            />
          </div>
          <div className="main-input">
            <label htmlFor="contactNumber">Contact Number</label>
            <div className="input">
              <input
                type="number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
              />
              <MdOutlinePermContactCalendar className="input-icons" />
            </div>
          </div>
          <button
            style={{ backgroundColor: "green" }}
            className="button1 sendEmail"
            type="submit"
          >
            {loading ? <Processing /> : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BuyerPayment;
