import React, { useState } from "react";
import "../css/sell.css";
import { MdAccountCircle, MdOutlinePriceCheck,  MdAttachEmail } from "react-icons/md";
import { IoIosContacts } from "react-icons/io";
import { LiaStreetViewSolid } from "react-icons/lia";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiBracketsCurlyBold } from "react-icons/pi";
import { GiProfit } from "react-icons/gi";
import { FaGem, FaTelegram } from "react-icons/fa";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL


function AccountSell() {
  const [formData, setFormData] = useState({
    accountName: "",
    accountPrice: "",
    accountType: "",
    MonthlyProfit: "",
    ProfitMargin: "",
    ProfitMultiple: "",
    RevenueMultiple: "",
    PageViews: "",
    accountUrl: "",
    socialLink1: "",
    socialLink2: "",
    socialLink3: "",
    socialLink4: "",
    siteAge: "",
    accountDesc: "",
    monetizationEnabled: "",
    earningMethod: "",
    Email: "",
    otherEmail: "",
    ContactNumber: "",
    telegramUsername: "",
    accountImages: [],
  });
  const handleFileChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData((prevData) => ({ ...prevData, accountImages: files }));
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "accountImages") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files, 
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields  = [
      "accountName",
      "accountPrice",
      "accountType",
      "MonthlyProfit",
      "ProfitMargin",
      "ProfitMultiple",
      "RevenueMultiple",
      "PageViews",
      "accountUrl",
      "socialLink1",
      "socialLink2",
      "socialLink3",
      "socialLink4",
      "siteAge",
      "accountDesc",
      "monetizationEnabled",
      "earningMethod",
      "Email",
      "otherEmail",
      "ContactNumber",
      "telegramUsername",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill out the ${field} field.`);
        return;
      }
    }

    try {
      const formDataToSend = new FormData();

      requiredFields.forEach((key) => {
        const value = formData[key];
        if (key === "monetizationEnabled") {
          formDataToSend.append(key, value === "Yes" ? "true" : "false");
        } else {
          formDataToSend.append(key, value ); 
        }
      });

      if (Array.isArray(formData.accountImages)) {
        formData.accountImages.forEach((file) => {
          formDataToSend.append("accountImages", file);
        });
      } else {
        toast.error("Invalid image files. Please try again.");
        return;
      }
      const token = localStorage.getItem('token'); 

      const response = await fetch(`${VITE_BASE_URL}/buySell/create`, {
        method: "POST",
        body: formDataToSend,
             headers: {
          "Authorization": `Bearer ${token}` 
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message || "Something went wrong"}`);
      } else {
        const successData = await response.json();
        toast.success(successData.message || "Account successfully submitted!");
        setFormData({
          accountName: "",
          accountPrice: "",
          accountType: "",
          MonthlyProfit: "",
          ProfitMargin: "",
          ProfitMultiple: "",
          RevenueMultiple: "",
          PageViews: "",
          accountUrl: "",
          socialLink1: "",
          socialLink2: "",
          socialLink3: "",
          socialLink4: "",
          siteAge: "",
          accountDesc: "",
          monetizationEnabled: "",
          earningMethod: "",
          Email: "",
          otherEmail: "",
          ContactNumber: "",
          telegramUsername: "",
          accountImages: [],
        });
      }
    } catch (error) {
      toast.error("Failed to submit the form. Please try again.");
    }
  };

  return (
    <>
      <div className="sellForm2">
        <div className="form_wrapper">
          <div className="form_container">
            <div className="title_container">
              <h2>Account Sell Form</h2>
            </div>
            <div className="row clearfix">
              <div className="">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="col_half">
                      <div className="input_field">
                        <span>
                          <MdAccountCircle className="icon" />
                        </span>
                        <input
                          type="text"
                          id="accountName"
                          name="accountName"
                          placeholder="Account Name"
                          value={formData.accountName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col_half">
                      <div className="input_field">
                        <span>
                          <MdOutlinePriceCheck className="icon" />
                        </span>
                        <input
                          type="number"
                          id="accountPrice"
                          name="accountPrice"
                          placeholder="Account Price"
                          value={formData.accountPrice}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <label htmlFor="accountType">AccountType</label>
                  <div className="input_field select_option">
                    <select
                      id="accountType"
                      name="accountType"
                      value={formData.accountType}
                      onChange={handleChange}
                    >
                      <option value="">Please Select</option>
                      <option>Google & Blog</option>
                      <option>Social Media</option>
                      <option>Gaming</option>
                      <option>Tech & IT</option>
                      <option>Theme & Plugins</option>
                      <option>Other Accounts</option>
                    </select>
                  </div>
                  <div className="row clearfix">
                    <div className="col_half">
                      <div className="input_field">
                        <span>
                          <GiProfit className="icon" />
                        </span>
                        <input
                          type="number"
                          id="MonthlyProfit"
                          name="MonthlyProfit"
                          placeholder="Account Monthly Profit"
                          value={formData.MonthlyProfit}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col_half">
                      <div className="input_field">
                        <span>
                          <GiProfit className="icon" />
                        </span>
                        <input
                          type="number"
                          id="ProfitMargin"
                          name="ProfitMargin"
                          placeholder="Account Profit Margin"
                          value={formData.ProfitMargin}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row clearfix">
                    <div className="col_half">
                      <div className="input_field">
                        <span>
                          <GiProfit className="icon" />
                        </span>
                        <input
                          type="text"
                          id="ProfitMultiple"
                          name="ProfitMultiple"
                          placeholder="Account Profit Multiple"
                          value={formData.ProfitMultiple}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col_half">
                      <div className="input_field">
                        <span>
                          <GiProfit className="icon" />
                        </span>
                        <input
                          type="text"
                          id="RevenueMultiple"
                          name="RevenueMultiple"
                          placeholder="Account Revenue Multiple"
                          value={formData.RevenueMultiple}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row clearfix">
                    <div className="col_half">
                      <div className="input_field">
                        <span>
                          <LiaStreetViewSolid className="icon" />
                        </span>
                        <input
                          type="number"
                          id="PageViews"
                          name="PageViews"
                          placeholder="Account Page Views"
                          value={formData.PageViews}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col_half">
                      <div className="input_field">
                        <span>
                          <PiBracketsCurlyBold className="icon" />
                        </span>
                        <input
                          type="url"
                          id="accountUrl"
                          name="accountUrl"
                          placeholder="Account Account Url"
                          value={formData.accountUrl}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row clearfix">
                    <div className="col_half">
                      <div className="input_field">
                        <span>
                          <PiBracketsCurlyBold className="icon" />
                        </span>
                        <input
                          type="url"
                          id="socialLink1"
                          name="socialLink1"
                          placeholder="Social Link1"
                          value={formData.socialLink1}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col_half">
                      <div className="input_field">
                        <span>
                          <PiBracketsCurlyBold className="icon" />
                        </span>
                        <input
                          type="url"
                          id="socialLink2"
                          name="socialLink2"
                          placeholder="Social Link2"
                          value={formData.socialLink2}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row clearfix">
                    <div className="col_half">
                      <div className="input_field">
                        <span>
                          <PiBracketsCurlyBold className="icon" />
                        </span>
                        <input
                          type="url"
                          id="socialLink3"
                          name="socialLink3"
                          placeholder="Social Link3"
                          value={formData.socialLink3}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col_half">
                      <div className="input_field">
                        <span>
                          <PiBracketsCurlyBold className="icon" />
                        </span>
                        <input
                          type="url"
                          id="socialLink4"
                          name="socialLink4"
                          placeholder="Social Link4"
                          value={formData.socialLink4}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row clearfix">
                    <div className="col_half">
                      <div className="input_field">
                        <span>
                          <FaGem className="icon" />
                        </span>
                        <input
                          type="number"
                          id="siteAge"
                          name="siteAge"
                          placeholder="Account Age"
                          value={formData.siteAge}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col_half">
                      <div className="input_field">
                        <input
                          multiple
                          type="file"
                          id="accountImages"
                          name="accountImages"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="input_field">
                    <textarea
                      placeholder="Account Information Description"
                      id="accountDesc"
                      name="accountDesc"
                      value={formData.accountDesc}
                      onChange={handleChange}
                    />
                  </div>
                  <label htmlFor="monetizationEnabled">
                    Monetization Enabled
                  </label>
                  <div className="input_field select_option">
                    <select
                      id="monetizationEnabled"
                      name="monetizationEnabled"
                      value={formData.monetizationEnabled}
                      onChange={handleChange}
                    >
                      <option value="">Please Select</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>

                  <div className="input_field select_option">
                    <label htmlFor="earningMethod">Earning Method</label>
                    <select
                      id="earningMethod"
                      name="earningMethod"
                      value={formData.earningMethod}
                      onChange={handleChange}
                    >
                      <option>Google Adsense</option>
                      <option>Google ADX</option>
                      <option>Email Marketing</option>
                      <option>Direct Selling products</option>
                      <option>Sell Course/ebooks</option>
                      <option>Other payment method</option>
                    </select>
                  </div>
                  <h3 className="contctinformation">
                    Please fill this contact information 👇 👇 👇
                  </h3>
                  <div className="row clearfix">
                    <div className="col_half">
                      <div className="input_field">
                        <span>
                          <MdAttachEmail className="icon" />
                        </span>
                        <input
                          type="email"
                          id="Email"
                          name="Email"
                          placeholder="Comprosie Email"
                          value={formData.Email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col_half">
                      <div className="input_field">
                        <span>
                          <MdAttachEmail className="icon" />
                        </span>
                        <input
                          type="email"
                          id="otherEmail"
                          name="otherEmail"
                          placeholder="Other Email"
                          value={formData.otherEmail}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="input_field">
                    <span>
                      <IoIosContacts className="icon" />
                    </span>
                    <input
                      type="number"
                      placeholder="Contact Number"
                      id="ContactNumber"
                      name="ContactNumber"
                      value={formData.ContactNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input_field">
                    <span>
                      <FaTelegram className="icon" />
                    </span>
                    <input
                      type="text"
                      id="telegramUsername"
                      name="telegramUsername"
                      placeholder="Telegram UserName"
                      value={formData.telegramUsername}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="container">
                    <input
                      type="checkbox"
                      id="termsCheckbox"
                      name="termsCheckbox"
                    />
                    <label htmlFor="termsCheckbox" id="termsLabel">
                      I agree with terms and conditions
                    </label>
                  </div>
                  <button className="button mt-9" type="submit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountSell;
