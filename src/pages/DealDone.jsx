import React, { useEffect, useState } from "react";
import "../css/deal.css";
import "../css/buyerPayment.css";
import { toast } from "react-toastify";
import Processing from "../component/Processing";
const VITE_ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
function DealDone() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    adminEmail: VITE_ADMIN_EMAIL,
    buyerEmail: "",
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
          <a href="/codeMatching">Code Matching</a>
          <a href="/paymentMethodSeller">Payment Method Seller</a>
        </div>
        <div className="bgRed">
          <a href="/DealCancel" className="">
            Deal Cancel
          </a>
        </div>
      </div>
      <div className="paymentafter">
        <div className="imgAuth">
          <img
            src="https://img.freepik.com/free-vector/checklist-concept-illustration_114360-479.jpg?w=740&t=st=1708034311~exp=1708034911~hmac=bcaed47c9ae3ee37247348450d9f84f2073483848649d0fdea5d199d1209703a"
            alt=""
          />
        </div>
        <form className="formPa" onSubmit={handleSubmit}>
          <div className="welcomePayment">
            <h1>Acct Info Exchanger</h1>
            <p>Only seller can use and fill this form</p>
          </div>
          <div className="mainFormPayment">
            <div className="mainFormPaymentInner">
              <input
                type="text"
                id="name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                disabled
              />
              <label htmlFor="name">Full Name</label>
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
                name="buyerEmail"
                value={formData.buyerEmail}
                onChange={handleChange}
              />
              <label htmlFor="buyerEmail">Seller Email</label>
            </div>
          </div>
          <div className="mainFormPaymentInner">
            <textarea
              name="accountInfo"
              value={formData.accountInfo}
              onChange={handleChange}
              disabled
            />
          </div>
          <div className="mainFormPayment">
            <div className="selected">
              <label>Payment Screenshot:</label>
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
          </div>
          <div className="Text">
            1. Fill out the form after getting the payment screenshot in the
            email.
            <br />
            2. Confirm your email and seller's email while filling out this
            form.
            <br />
            3. Confirm the account email and password in form filling. So that
            the
            <br />
            buyer does not face any issues have while opening the account.{" "}
            <br />
            (For this you can use the input box below and write the account
            email and password in two places).
            <br />
            4. After filling the form you have to wait 3 or 5 minutes, so that
            the buyer can open and check your account. 5. Now at this time you
            have to get buyer generated code from the buyer. which you have to
            enter in the next form.
            <br />
            So that admin can easily send money into your Account.
            <br />
            6. Form fill Data will be stored
            <div className="Condition">
              <input type="checkbox" onChange={handleCheckboxChange} /> Ready
              Term And Conditions
            </div>
          </div>
          <button type="submit" className="sendEmail" disabled={loading}>
            {loading ? <Processing /> : "Send"}
          </button>
        </form>
      </div>
    </>
  );
}

export default DealDone;
