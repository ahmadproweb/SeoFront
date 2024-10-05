import React, { useState } from "react";
import "../css/sell.css";
import { FaStarOfLife } from "react-icons/fa";
import {
  MdAccountCircle,
  MdOutlinePriceCheck,
  MdAttachEmail,
} from "react-icons/md";
import { IoIosContacts } from "react-icons/io";
import { LiaStreetViewSolid } from "react-icons/lia";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiBracketsCurlyBold } from "react-icons/pi";
import { GiProfit } from "react-icons/gi";
import {  FaTelegram } from "react-icons/fa";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

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
    paymentAccountVerified:"",
    documentsAvailable:"",
    accountDesc: "",
    monetizationEnabled: "",
    earningMethod: "",
    Email: "",
    otherEmail: "",
    ContactNumber: "",
    telegramUsername: "",
    accountImages: [],
  });
  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const [paymentGetaway, setPaymentGetaway] = useState(false);
  const [showEarningMethod, setShowEarningMethod] = useState(false);
  const [loading , setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(`Field Name: ${name}, Field Value: ${value}`);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "accountType") {
      setShowSocialLinks(value === "Google & Blog");
      setPaymentGetaway(value === "Payment Getaway");

    }
    if (name === "monetizationEnabled") {
      setShowEarningMethod(value === "Yes");
    }
  };
  
  const handleFileChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData((prevData) => ({ ...prevData, accountImages: files }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Define required fields without paymentAccountVerified and documentsAvailable
    const requiredFields = [
        "accountName",
        "accountPrice",
        "accountType",
        "accountUrl",
        "siteAge",
        "accountDesc",
        "Email",
        "ContactNumber",
        "accountImages"
    ];

    // Validate required fields
    for (const field of requiredFields) {
        if (!formData[field]) {
            toast.error(`Please fill out the ${field} field.`);
            setLoading(false);
            return;
        }
    }

    try {
        const formDataToSend = new FormData();

        // Append required fields to the formDataToSend
        requiredFields.forEach((key) => {
            const value = formData[key];
            formDataToSend.append(key, value);
        });

        // Append optional boolean fields if they are provided
        if (formData.paymentAccountVerified) {
            formDataToSend.append("paymentAccountVerified", formData.paymentAccountVerified === "Yes" ? "true" : "false");
        }

        if (formData.monetizationEnabled) {
            formDataToSend.append("monetizationEnabled", formData.monetizationEnabled === "Yes" ? "true" : "false");
        }
        if (formData.documentsAvailable) {
            formDataToSend.append("documentsAvailable", formData.documentsAvailable === "Yes" ? "true" : "false");
        }

        // Append images
        if (Array.isArray(formData.accountImages) && formData.accountImages.length > 0) {
            formData.accountImages.forEach((file) => {
                formDataToSend.append("accountImages", file);
            });
        } else {
            toast.error("Invalid image files. Please try again.");
            setLoading(false);
            return;
        }

        // Log form data before submission
        // for (let [key, value] of formDataToSend.entries()) {
        //     console.log(`${key}:`, value);
        // }

        const token = localStorage.getItem("token");
        const response = await fetch(`${VITE_BASE_URL}/buySell/create`, {
            method: "POST",
            body: formDataToSend,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            toast.error(`Error: ${errorData.message || "Something went wrong"}`);
        } else {
            const successData = await response.json();
            toast.success(successData.message || "Account successfully submitted!");
            // Reset the form
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
                documentsAvailable: "",  // Reset field
                paymentAccountVerified: "", // Reset field
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
        // console.error(error); // Log the error to the console for debugging
        toast.error("Failed to submit the form. Please try again.");
    } finally {
        setLoading(false);
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
                  <label htmlFor="accountType">Account Name <FaStarOfLife className="Star"/></label><br/>
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
                  <label htmlFor="accountType">Account Price<FaStarOfLife className="Star"/></label><br/>
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
                  <label htmlFor="accountType">AccountType<FaStarOfLife className="Star"/></label><br/>
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
                      <option>Payment Getaway</option>
                      <option>Theme & Plugins</option>
                      <option>Other Accounts</option>
                    </select>
                  </div>
                  {showSocialLinks && (
                    <>
                      <div className="row clearfix">
                        {[1, 2, 3, 4].map((num) => (
                          <div className="col_half" key={`socialLink${num}`}>
                  <label htmlFor="accountType">Social Link {`${num}`}<FaStarOfLife className="Star"/></label><br/>
                            <div className="input_field">
                              <span>
                                <PiBracketsCurlyBold className="icon" />
                              </span>
                              <input
                                type="url"
                                id={`socialLink${num}`}
                                name={`socialLink${num}`}
                                placeholder={`Social Link ${num}`}
                                value={formData[`socialLink${num}`]}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                     
                      <div className="row clearfix">
                        <div className="col_half">
                  <label htmlFor="ProfitMultiple">Profit Multiple<FaStarOfLife className="Star"/></label><br/>
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
                  <label htmlFor="RevenueMultiple">Revenue Multiple<FaStarOfLife className="Star"/></label><br/>
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
                    </>
                  )}
                  <div className="row clearfix">
                  {showSocialLinks && (

                  <div className="col_half">
                  <label htmlFor="ProfitMargin">Profit Margin<FaStarOfLife className="Star"/></label><br/>
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

                  )}
                     <div className="col_half">
                  <label htmlFor="accountUrl">Account Url<FaStarOfLife className="Star"/></label><br/>
                      <div className="input_field">
                        <span>
                          <PiBracketsCurlyBold className="icon" />
                        </span>
                        <input
                          type="url"
                          id="accountUrl"
                          name="accountUrl"
                          placeholder="Account Url"
                          value={formData.accountUrl}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                

                  {paymentGetaway ? (
                     
                    <div className="row clearfix">

                    <div className="col_half">
                     <label htmlFor="paymentAccountVerified">Payment Account Verified<FaStarOfLife className="Star"/></label><br/>
                                       <div className="input_field select_option">
                                         <select
                                           id="paymentAccountVerified"
                                           name="paymentAccountVerified"
                                           value={formData.paymentAccountVerified}
                                           onChange={handleChange}
                                         >
                                           <option value="">Please Select</option>
                                           <option value="Yes">Yes</option>
                                           <option value="No">No</option>
                                         </select>
                                       </div>
                                       </div>
                    <div className="col_half">

                     <label htmlFor="documentsAvailable">Documents Available<FaStarOfLife className="Star"/></label><br/>
                                       <div className="input_field select_option">
                                         <select
                                           id="documentsAvailable"
                                           name="documentsAvailable"
                                           value={formData.documentsAvailable}
                                           onChange={handleChange}
                                         >
                                           <option value="">Please Select</option>
                                           <option value="Yes">Yes</option>
                                           <option value="No">No</option>
                                         </select>
                                       </div>
                                     </div>
                                     </div>
                  ): (
                    <div className="row clearfix">
                    <div className="col_half">
                  <label htmlFor="PageViews">Page Views<FaStarOfLife className="Star"/></label><br/>
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
                  <label htmlFor="MonthlyProfit">Monthly Profit<FaStarOfLife className="Star"/></label><br/>
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
                  </div>
                  )
                  
                  }
                     <label htmlFor="accountDesc">Account Description<FaStarOfLife className="Star"/></label><br/>
                  <div className="input_field">
                    <textarea
                      placeholder="Account Information Description"
                      id="accountDesc"
                      name="accountDesc"
                      value={formData.accountDesc}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="row clearfix">
                    <div className="col_half">
                  <label htmlFor="siteAge">Site Age<FaStarOfLife className="Star"/></label><br/>
                      <div className="input_field">
                        <input
                          type="datetime-local"
                          id="siteAge"
                          name="siteAge"
                          placeholder="Account Age"
                          value={formData.siteAge}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col_half">
                  <label htmlFor="accountImages">Account Images<FaStarOfLife className="Star"/></label><br/>
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
                 {
                  paymentGetaway ? "" :  <div className="row clearfix">
                  <div className="col_half">
                  <label htmlFor="monetizationEnabled">Monetization Enabled<FaStarOfLife className="Star"/></label><br/>
                  <div className="input_field select_option">
                    <select
                      id="monetizationEnabled"
                      name="monetizationEnabled"
                      value={formData.monetizationEnabled}
                      onChange={handleChange}
                    >
                      <option value="">Please Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  </div>
                  {showEarningMethod && (
                  <div className="col_half">
                    <label htmlFor="earningMethod">Earning Method</label><br/>
                  <div className="input_field select_option">
                    <select
                      id="earningMethod"
                      name="earningMethod"
                      value={formData.earningMethod}
                      onChange={handleChange}
                    >
                  {showSocialLinks ? (
                    <>
                      <option>Google Adsense</option>
                      <option>Google ADX</option>
                      <option>Email Marketing</option>
                      <option>Direct Selling products</option>
                      <option>Sell Course/ebooks</option>
                      <option>Other payment method</option>
                    </>

                  ) : (
                 <>
                    <option >Ads Earning</option>
                    <option>Shop Earning</option>
                    <option>Sponsor Earning</option>
                    <option>Referral Earning</option>
                    <option>Other</option>
                 </>

                  )}
                    </select>
                  </div>
                  </div>
                  )}
                  </div>
                 }

                  <h3 className="contctinformation">
                    Please fill this contact information 👇 👇 👇
                  </h3>
                  <div className="row clearfix">
                    <div className="col_half">
                  <label htmlFor="Email">Email<FaStarOfLife className="Star"/></label><br/>
                      <div className="input_field">
                        <span>
                          <MdAttachEmail className="icon" />
                        </span>
                        <input
                          type="email"
                          id="Email"
                          name="Email"
                          placeholder="Seller Email"
                          value={formData.Email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col_half">
                  <label htmlFor="otherEmail">Other Email</label><br/>
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
                  <label htmlFor="ContactNumber">Contact Number<FaStarOfLife className="Star"/></label><br/>
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
                  <label htmlFor="telegramUsername">Telegram Username</label><br/>
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
                  </div><br/>
                  <div className="container">
                    
                    <input
                      type="checkbox"
                      id="termsCheckbox"
                      name="termsCheckbox"
                    />
                    <label htmlFor="termsCheckbox" id="termsLabel">
                      I agree with terms and conditions <FaStarOfLife className="Star"/>
                    </label>
                  </div>
                  <br/><br/>
                  <button className="button mt-9" type="submit">
                    {loading ? 'Processing...' : 'Submit'}
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
