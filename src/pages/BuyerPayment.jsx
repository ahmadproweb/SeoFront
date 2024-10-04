import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../css/stripePayment.css";
import Processing from "../component/Processing";
import logo from "../images/logo.png";
import { IoPricetagOutline } from "react-icons/io5";
import {
  MdOutlineDriveFileRenameOutline,
  MdOutlineEmail,
  MdUpdateDisabled,
} from "react-icons/md";
import sellerPayment1 from "../images/sellerPayment1.png";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { TbWorldBolt } from "react-icons/tb";
import { IoIdCardOutline } from "react-icons/io5";
import { LiaCcVisa } from "react-icons/lia";
import { PiBracketsCurly } from "react-icons/pi";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [accountId, setAccountId] = useState("");
  const [accountType, setAccountType] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountPrice, setAccountPrice] = useState("");
  const [fullName, setFullName] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [accountUrl, setAccountUrl] = useState("");
  const [totalPriceUSD, setTotalPriceUSD] = useState("");
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [address, setAddress] = useState("");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [conversionRate, setConversionRate] = useState(0);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setEmailAddress(userData.email);
    }

    const fetchAccounts = async () => {
      try {
        const response = await fetch(`${VITE_BASE_URL}/buySellList/all`);
        const data = await response.json();
        setAccounts(data);
        // console.log("Fetched Accounts:", data);
      } catch (error) {
        // console.error("Error fetching accounts:", error);
        toast.error("Error fetching accounts");
      }
    };

    fetchAccounts();
  }, []);

  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/PKR"
        );
        const data = await response.json();
        setConversionRate(data.rates.USD);
      } catch (error) {
        // console.error("Error fetching conversion rate:", error);
        toast.error("Error fetching conversion rate");
      }
    };

    fetchConversionRate();
  }, []);

  useEffect(() => {
    const accountPriceValue = parseFloat(accountPrice);
    if (!isNaN(accountPriceValue)) {
      const calculatedTotalPrice = accountPriceValue * 1.05;
      setTotalPrice(calculatedTotalPrice.toFixed(2));

      const totalPriceUSDValue = calculatedTotalPrice * conversionRate;
      setTotalPriceUSD(totalPriceUSDValue.toFixed(2));
    } else {
      setTotalPrice("");
      setTotalPriceUSD("");
    }
  }, [accountPrice, conversionRate]);

  useEffect(() => {
    if (accountId) {
      const selectedAccount = accounts.find(
        (account) => account.accountId.toString() === accountId
      );
      if (selectedAccount) {
        setAccountType(selectedAccount.accountType);
        setAccountName(selectedAccount.accountName);
        setAccountPrice(selectedAccount.accountPrice);
        setAccountUrl(selectedAccount.accountUrl);
        setSellerEmail(selectedAccount.sellerDetails.SellerEmail);
        // console.log("Selected Account:", selectedAccount);
      } else {
        setAccountType("");
        setAccountPrice("");
        setAccountName("");
        setAccountUrl("");
      }
    }
  }, [accountId, accounts]);
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryOptions = response.data.map(
          (country) => country.name.common
        );
        setCountries(countryOptions);
      } catch (error) {
        // console.error("Error fetching countries:", error);
        toast.error("Error fetching countries");
      }
    };

    fetchCountries();
  }, []);

  const validateCardHolderName = (name) => {
    const namePattern = /^[a-zA-Z\s]+$/; // Only letters and spaces
    return namePattern.test(name);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateCardHolderName(fullName)) {
      toast.warning("Please enter a valid cardholder name.");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const accountPricePKR = parseFloat(accountPrice);
      const totalPricePKR = accountPricePKR * 1.05;

      const totalPriceUSD = totalPricePKR * conversionRate;
      const totalPriceCents = Math.round(totalPriceUSD * 100);

      // console.log("Total Price in Cents:", totalPriceCents);

      const cardElement = elements.getElement(CardNumberElement);

      const { error, token } = await stripe.createToken(cardElement);

      if (error) {
        toast.error(error);
      } else {
        handlePayment(token.id);
      }
    } catch (error) {
      toast.error("Error during authentication:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (tokenId) => {
    const token = localStorage.getItem("token");
    const totalPriceCents = Math.round(totalPriceUSD * 100); //
    const response = await fetch(`${VITE_BASE_URL}/stripe/paymentCharge`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        token: tokenId,
        fullName,
        emailAddress,
        accountId,
        accountType,
        accountName,
        accountPrice,
        totalPrice,
        amount: totalPriceCents,
        sellerEmail,
        address,
        country,
      }),
    });
    const result = await response.json();

    if (result.success) {
      toast.success("Payment successful!");
      window.location.reload();
    } else {
      toast.error(`Payment failed: ${result.message}`);
      if (result.code === "cardholder_name_invalid") {
        toast.warning(
          "The cardholder name does not match the card information."
        );
      }
    }
  };

  return (
    <div className="StripePayment">
      <div className="firstData">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <h1>Welcome Buyer Payment</h1>
        </div>
        <img src={sellerPayment1} width={500} height={500} alt="Sign" />
      </div>
      <div className="line"></div>
      <div className="secondData">
        <form onSubmit={handleSubmit}>
          <div className="stripeInput">
            <label htmlFor="email">Email</label>
            <div className="input">
              <input type="email" name="email" value={emailAddress} readOnly />
              <MdOutlineEmail className="input-icons" />
            </div>
          </div>

          <div className="StripeRow">
            <div className="stripeInput">
              <label htmlFor="accountId">Select Account Id</label>
              <div className="input">
                <select
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                >
                  <option value="">Select Account Id</option>
                  {accounts.map((account) => (
                    <option key={account.accountId} value={account.accountId}>
                      {account.accountId}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="stripeInput">
              <label htmlFor="accountType">Account Type</label>
              <div className="input">
                <input
                  type="text"
                  name="accountType"
                  value={accountType}
                  readOnly
                />
                <IoPricetagOutline className="input-icons" />
              </div>
            </div>
          </div>
          <div className="StripeRow">
            <div className="stripeInput">
              <label htmlFor="accountName">Account Name</label>
              <div className="input">
                <input
                  type="text"
                  name="accountName"
                  value={accountName}
                  readOnly
                />
                <MdOutlineDriveFileRenameOutline className="input-icons" />
              </div>
            </div>
            <div className="stripeInput">
              <label htmlFor="accountUrl">Account url</label>
              <div className="input">
                <input
                  type="url"
                  name="accountUrl"
                  value={accountUrl}
                  readOnly
                />
                <PiBracketsCurly className="input-icons" />
              </div>
            </div>
          </div>

          <div className="StripeRow">
            <div className="stripeInput">
              <label htmlFor="accountPrice">Account Price</label>
              <div className="input">
                <input
                  type="number"
                  name="accountPrice"
                  value={accountPrice}
                  readOnly
                />
                <IoPricetagOutline className="input-icons" />
              </div>
            </div>

            <div className="stripeInput">
              <label htmlFor="totalPrice">Total Price (with 5% Ta)</label>
              <div className="input">
                <input
                  type="number"
                  name="totalPrice"
                  value={totalPrice}
                  readOnly
                />
                <IoPricetagOutline className="input-icons" />
              </div>
            </div>
          </div>
          <div className="StripeRow">
            <div className="stripeInput">
              <label htmlFor="email">Seller Email</label>
              <div className="input">
                <input
                  type="email"
                  name="sellerEmail"
                  value={sellerEmail}
                  readOnly
                />
                <MdOutlineEmail className="input-icons" />
              </div>
            </div>
            <div className="stripeInput">
              <label htmlFor="totalPriceUSD">Total Price (in Cents)</label>
              <div className="input">
                <input
                  type="number"
                  name="totalPriceUSD"
                  value={(totalPriceUSD * 100).toFixed(0)}
                  readOnly
                />
                <IoPricetagOutline className="input-icons" />
              </div>
            </div>
          </div>

          <div className="StripeRow">
            <div className="stripeInput">
              <label htmlFor="address">Address</label>
              <div className="input">
                <input
                  type="text"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <TbWorldBolt className="input-icons" />
              </div>
            </div>

            <div className="stripeInput">
              <label htmlFor="country">Country</label>
              <div className="input">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">Select Country</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="StripeRow">
            <div className="stripeInput">
              <label htmlFor="fullName">Card Holder Name</label>
              <div className="input">
                <input
                  type="text"
                  name="fullName"
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                  required
                />
                <MdOutlineDriveFileRenameOutline className="input-icons" />
              </div>
            </div>
            <div className="stripeInput">
              <label htmlFor="fullName">Card Number</label>
              <div className="input">
                <CardNumberElement className="formControl" />
                <LiaCcVisa className="input-icons" />
              </div>
            </div>
          </div>
          <div className="StripeRow">
            <div className="stripeInput">
              <label htmlFor="fullName">Expiration Date</label>
              <div className="input">
                <CardExpiryElement className="formControl" />
                <MdUpdateDisabled className="input-icons" />
              </div>
            </div>
            <div className="stripeInput">
              <label htmlFor="fullName">CVC Number</label>
              <div className="input">
                <CardCvcElement className="formControl" />
                <IoIdCardOutline className="input-icons" />
              </div>
            </div>
          </div>

          <button
            style={{ backgroundColor: "green" }}
            className="button1 sendEmail"
            type="submit"
          >
            {loading ? <Processing /> : "Stripe"}
          </button>
        </form>
      </div>
    </div>
  );
};

const BuyerPayment = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default BuyerPayment;
