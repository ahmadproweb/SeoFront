import React, { useState } from "react";
import "../css/BuyerPayment.css";
import { toast } from "react-toastify";

const BuyerPayment = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    selectPaymentMethod: "",
    description: "",
    userName: "",
    transitionId: "",
    transactionDate: "",
    totalAccountPrice: "",
    image: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(`User typing in ${name} field: ${value}`);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log("Selected image file:", file);
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: file,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      name,
      email,
      phone,
      selectPaymentMethod,
      userName,
      image,
      description,
      transitionId,
      transactionDate,
      totalAccountPrice,
    } = formData;
    console.log("Form data submitted:", formData);
    if (
      !name ||
      !email ||
      !phone ||
      !selectPaymentMethod ||
      !userName ||
      !image ||
      !description ||
      !totalAccountPrice ||
      !transactionDate
    ) {
      toast.success("Please fill in all input fields", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 800,
      });
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("email", email);
    formDataToSend.append("phone", phone);
    formDataToSend.append("selectPaymentMethod", selectPaymentMethod);
    formDataToSend.append("description", description);
    formDataToSend.append("userName", userName);
    formDataToSend.append("transitionId", transitionId);
    formDataToSend.append("transactionDate", transactionDate);
    formDataToSend.append("totalAccountPrice", totalAccountPrice);
    formDataToSend.append("image", image);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/Account/upload-image`, {
      method: "POST",
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((res) => {
        toast.success("Your Form Has Been Submitted. You will be contacted within 2 to 5 hours", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 800,
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          selectPaymentMethod: "",
          description: "",
          userName: "",
          transitionId: "",
          transactionDate: "",
          totalAccountPrice: "",
          image: null,
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Something went wrong. Please try again later");
      });
  };

  const renderAccountInfo = () => {
    switch (formData.selectPaymentMethod) {
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
      <div className="imgAuth">
        <img
          src="https://img.freepik.com/free-vector/checklist-concept-illustration_114360-479.jpg?w=740&t=st=1708034311~exp=1708034911~hmac=bcaed47c9ae3ee37247348450d9f84f2073483848649d0fdea5d199d1209703a"
          alt=""
        />
      </div>
      <form className="formPa" onSubmit={handleSubmit}>
        <div className="welcomePayment">
          <h1>welcome Buyer Payment</h1>
        </div>
        <div className="mainFormPayment">
          <div className="mainFormPaymentInner">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <label htmlFor="floating_first_name">Full Name</label>
          </div>
          <div className="mainFormPaymentInner">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="floating_last_name"> Email</label>
          </div>
          </div>
        <div className="mainFormPayment">

          <div className="mainFormPaymentInner">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="floating_last_name">Admin Email</label>
          </div>
          <div className="mainFormPaymentInner">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="floating_last_name">Seller Email</label>
          </div>
        </div>
       
        <div className="mainFormPayment">
          <div className="mainFormPaymentInner">
            <input
              type="number"
              id="totalAccountPrice"
              name="totalAccountPrice"
              value={formData.totalAccountPrice}
              onChange={handleChange}
            />
            <label>Total Price</label>
          </div>
          <div className="mainFormPaymentInner">
            <input
              type="number"
              id="transitionId"
              name="transitionId"
              value={formData.transitionId}
              onChange={handleChange}
            />
            <label>Transition Id</label>
          </div>
        </div>
        <div className="mainFormPayment">
          <div className="mainFormPaymentInner">
            <input
              type="text"
              id="transactionDate"
              name="transactionDate"
              value={formData.transactionDate}
              onChange={handleChange}
            />
            <label>Transaction Date</label>
          </div>
          <div className="mainFormPaymentInner">
            <select
              id="selectPaymentMethod"
              name="selectPaymentMethod"
              value={formData.selectPaymentMethod}
              onChange={handleChange}
            >
              <option value="Select Payment Method">
                Payment Send Select Please
              </option>
              <option value="jazzCash">jazzCash</option>
              <option value="easyPaisa">easyPaisa</option>
              <option value="bankAccount">bankAccount</option>
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
            accept="image/png , image/jpg , image/jpeg"
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
          />
        </div>
        <div className="mainFormPaymentInner">
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <label>Contact Number</label>
          </div>
       
        </div>

        <button type="submit" className="sendEmail">
          Send
        </button>
      </form>
    </div>
  );
};

export default BuyerPayment;
