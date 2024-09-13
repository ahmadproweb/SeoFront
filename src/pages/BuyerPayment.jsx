import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/buyerPayment.css";
import Processing from "../component/Processing";

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
    contactNumber: ""
  });
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFormData((prevState) => ({
        ...prevState,
        fullName: user.fullName,
        email: user.email
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
    const token = localStorage.getItem('token'); 

    try {
      const response = await fetch(`${VITE_BASE_URL}/payment`, {
        method: "POST",
        body: formDataObj,
        headers: {
          "Authorization": `Bearer ${token}` 
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
        contactNumber: ""
      })
    } catch (error) {
      toast.error("An error occurred");
    }finally {
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
              <span>03204052642</span>
            </div>
            <div>
              <h1>Account Name</h1>
              <span>hafiz ahmad</span>
            </div>
          </div>
        );
      case "easyPaisa":
        return (
          <div className="accountInfo">
            <div>
              <h1>Account Number</h1>
              <span>18y291y8</span>
            </div>
            <div>
              <h1>Account Name</h1>
              <span>askvaskv</span>
            </div>
          </div>
        );
      case "bankAccount":
        return (
          <div className="accountInfo">
            <div>
              <h1>Account Number</h1>
              <span>281947j9284091287094</span>
            </div>
            <div>
              <h1>Account Name</h1>
              <span>hafiz dev</span>
            </div>
          </div>
        );
      default:
        return null;
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
          <h1>Welcome Buyer Payment</h1>
        </div>
        <div className="mainFormPayment">
          <div className="mainFormPaymentInner">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              disabled 
            />
            <label htmlFor="fullName">Full Name</label>
          </div>
          <div className="mainFormPaymentInner">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled 
            />
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <div className="mainFormPayment">
          <div className="mainFormPaymentInner">
            <input
              type="email"
              name="adminEmail"
              value={formData.adminEmail}
              onChange={handleChange}
              disabled 
            />
            <label htmlFor="adminEmail">Admin Email</label>
          </div>
          <div className="mainFormPaymentInner">
            <input
              type="email"
              name="sellerEmail"
              value={formData.sellerEmail}
              onChange={handleChange}
            />
            <label htmlFor="sellerEmail">Seller Email</label>
          </div>
        </div>
        <div className="mainFormPayment">
          <div className="mainFormPaymentInner">
            <input
              type="number"
              name="totalPrice"
              value={formData.totalPrice}
              onChange={handleChange}
            />
            <label htmlFor="totalPrice">Total Price</label>
          </div>
          <div className="mainFormPaymentInner">
            <input
              type="number"
              name="transactionId"
              value={formData.transactionId}
              onChange={handleChange}
            />
            <label htmlFor="transactionId">Transaction ID</label>
          </div>
        </div>
        <div className="mainFormPayment">
          <div className="mainFormPaymentInner">
            <input
              type="date"
              name="transactionDate"
              value={formData.transactionDate}
              onChange={handleChange}
            />
            <label htmlFor="transactionDate">Transaction Date</label>
          </div>
          <div className="mainFormPaymentInner">
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
        <div className="mainFormPayment">
          <div className="selected">
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
          <div className="mainFormPaymentInner">
            <input
              type="number"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
            />
            <label htmlFor="contactNumber">Contact Number</label>
          </div>
        </div>
        <button type="submit" className="sendEmail">
        {loading ? <Processing/> : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default BuyerPayment;
