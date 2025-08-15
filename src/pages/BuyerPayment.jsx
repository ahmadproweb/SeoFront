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
import { FaStarOfLife } from "react-icons/fa";

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

  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [screenshot, setScreenshot] = useState(null);
  const [tidNumber, setTidNumber] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) setEmailAddress(userData.email);

    const fetchAccounts = async () => {
      try {
        const res = await fetch(`${VITE_BASE_URL}/buySellList/all`);
        const data = await res.json();
        setAccounts(data);
      } catch {
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
      } catch {
        toast.error("Error fetching conversion rate");
      }
    };
    fetchConversionRate();
  }, []);

  useEffect(() => {
    const accountPriceValue = parseFloat(accountPrice);
    if (!isNaN(accountPriceValue)) {
      const calculatedTotalPrice = accountPriceValue * 1.05; // +5%
      setTotalPrice(calculatedTotalPrice.toFixed(2));

      const totalPriceUSDValue = calculatedTotalPrice * conversionRate;
      setTotalPriceUSD(totalPriceUSDValue.toFixed(2));
    } else {
      setTotalPrice("");
      setTotalPriceUSD("");
    }
  }, [accountPrice, conversionRate]);

  useEffect(() => {
    if (!accountId) return;
    const selected = accounts.find((a) => a.accountId.toString() === accountId);
    if (selected) {
      setAccountType(selected.accountType);
      setAccountName(selected.accountName);
      setAccountPrice(selected.accountPrice);
      setAccountUrl(selected.accountUrl);
      setSellerEmail(selected.sellerDetails.SellerEmail);
    } else {
      setAccountType("");
      setAccountPrice("");
      setAccountName("");
      setAccountUrl("");
    }
  }, [accountId, accounts]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const opts = response.data.map((c) => c.name.common);
        setCountries(opts);
      } catch {
        toast.error("Error fetching countries");
      }
    };
    fetchCountries();
  }, []);

  const validateCardHolderName = (name) => /^[a-zA-Z\s]+$/.test(name);
  const totalPriceCents = () => {
    const cents = Math.round(Number(totalPriceUSD || 0) * 100);
    return isNaN(cents) ? 0 : cents;
  };

  // ---------- STRIPE SUBMIT ----------
  const handleStripeSubmit = async (e) => {
    e.preventDefault();

    if (!validateCardHolderName(fullName)) {
      toast.warning("Please enter a valid cardholder name.");
      return;
    }

    setLoading(true);
    try {
      const cardElement = elements.getElement(CardNumberElement);
      const { error, token } = await stripe.createToken(cardElement);

      if (error) {
        toast.error(error.message || "Stripe token error");
        return;
      }

      const jwtToken = localStorage.getItem("token");
      const res = await fetch(`${VITE_BASE_URL}/stripe/paymentCharge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          paymentMethod: "stripe",
          token: token.id,
          fullName,
          emailAddress,
          accountId,
          accountType,
          accountName,
          accountPrice,
          totalPrice,
          amount: totalPriceCents(), // cents
          sellerEmail,
          address,
          country,
        }),
      });

      const result = await res.json();
      if (result.success) {
        toast.success("Payment successful!");
        window.location.reload();
      } else {
        toast.error(result.error || "Payment failed");
      }
    } catch (err) {
      toast.error("Stripe payment error");
    } finally {
      setLoading(false);
    }
  };

  // ---------- WALLET (JAZZ/EASY) SUBMIT ----------
  const validateWalletFields = () => {
    if (!screenshot) {
      toast.warning("Please upload payment screenshot.");
      return false;
    }
    if (!tidNumber || !/^\d{6,}$/.test(tidNumber.trim())) {
      toast.warning("Please enter a valid TID number (digits only).");
      return false;
    }
    // Optional file checks
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(screenshot.type)) {
      toast.warning("Only JPG/PNG/WEBP screenshots allowed.");
      return false;
    }
    const mb = screenshot.size / (1024 * 1024);
    if (mb > 5) {
      toast.warning("Screenshot size must be <= 5MB.");
      return false;
    }
    return true;
  };

  const handleWalletSubmit = async (method) => {
    if (!validateWalletFields()) return;

    setLoading(true);
    try {
      const jwtToken = localStorage.getItem("token");
      const fd = new FormData();
      fd.append("paymentMethod", method); // 'jazzcash' | 'easypaisa'
      fd.append("fullName", fullName || "");
      fd.append("emailAddress", emailAddress || "");
      fd.append("accountId", accountId || "");
      fd.append("accountType", accountType || "");
      fd.append("accountName", accountName || "");
      fd.append("accountPrice", accountPrice || "");
      fd.append("totalPrice", totalPrice || "");
      fd.append("amount", String(totalPriceCents())); // align with backend
      fd.append("sellerEmail", sellerEmail || "");
      fd.append("address", address || "");
      fd.append("country", country || "");
      fd.append("tidNumber", tidNumber || "");
      fd.append("screenshot", screenshot); // <--- file

      const res = await fetch(`${VITE_BASE_URL}/stripe/paymentCharge`, {
        method: "POST",
        headers: { Authorization: `Bearer ${jwtToken}` }, // don't set Content-Type manually
        body: fd,
      });

      const result = await res.json();
      if (result.success) {
        toast.success(
          `${method === "jazzcash" ? "JazzCash" : "EasyPaisa"} payment submitted!`
        );
        // Optional: reset wallet fields
        setScreenshot(null);
        setTidNumber("");
        setPaymentMethod("stripe");
      } else {
        toast.error(result.error || "Failed to submit wallet payment");
      }
    } catch (err) {
      toast.error("Wallet payment error");
    } finally {
      setLoading(false);
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
        {/* Stripe submit ONLY when Stripe selected */}
        <form
          onSubmit={
            paymentMethod === "stripe"
              ? handleStripeSubmit
              : (e) => e.preventDefault()
          }
        >
          <div className="stripeInput">
            <label htmlFor="email">
              Email <FaStarOfLife className="Star" />
            </label>
            <div className="input">
              <input type="email" name="email" value={emailAddress} readOnly />
              <MdOutlineEmail className="input-icons" />
            </div>
          </div>

          <h6>1. Account Information </h6>

          <div className="StripeRow">
            <div className="stripeInput">
              <label htmlFor="accountId">
                Select Account Id <FaStarOfLife className="Star" />
              </label>
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

          <h6>2. Account Price & Fee</h6>

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

          <div className="stripeInput">
            <label htmlFor="totalPriceUSD">Total Price (in Cents)</label>
            <div className="input">
              <input
                type="number"
                name="totalPriceUSD"
                value={totalPriceCents()}
                readOnly
              />
              <IoPricetagOutline className="input-icons" />
            </div>
          </div>

          <h6>3. Send payment to Admin</h6>

          {/* Payment method switcher */}
          <div className="payment-method-selection">
            <label
              className={`payment-option ${paymentMethod === "stripe" ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="stripe"
                checked={paymentMethod === "stripe"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="method-label">💳 Stripe</span>
            </label>

            <label
              className={`payment-option ${paymentMethod === "jazzcash" ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="jazzcash"
                checked={paymentMethod === "jazzcash"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="method-label">📱 JazzCash </span>
            </label>

            <label
              className={`payment-option ${paymentMethod === "easypaisa" ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="easypaisa"
                checked={paymentMethod === "easypaisa"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="method-label">💰 EasyPaisa </span>
            </label>
          </div>

          {/* STRIPE FIELDS */}
          {paymentMethod === "stripe" && (
            <>
              <div className="StripeRow">
                <div className="stripeInput">
                  <label htmlFor="address">
                    Address <FaStarOfLife className="Star" />
                  </label>
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
                  <label htmlFor="country">
                    Country <FaStarOfLife className="Star" />
                  </label>
                  <div className="input">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <option value="">Select Country</option>
                      {countries.map((c, idx) => (
                        <option key={idx} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="StripeRow">
                <div className="stripeInput">
                  <label htmlFor="fullName">
                    Card Holder Name <FaStarOfLife className="Star" />
                  </label>
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
                  <label htmlFor="cardNumber">
                    Card Number <FaStarOfLife className="Star" />
                  </label>
                  <div className="input">
                    <CardNumberElement className="formControl" />
                    <LiaCcVisa className="input-icons" />
                  </div>
                </div>
              </div>

              <div className="StripeRow">
                <div className="stripeInput">
                  <label htmlFor="expiry">
                    Expiration Date <FaStarOfLife className="Star" />
                  </label>
                  <div className="input">
                    <CardExpiryElement className="formControl" />
                    <MdUpdateDisabled className="input-icons" />
                  </div>
                </div>
                <div className="stripeInput">
                  <label htmlFor="cvc">
                    CVC Number <FaStarOfLife className="Star" />
                  </label>
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
                disabled={loading}
              >
                {loading ? <Processing /> : `Stripe $${totalPriceUSD || 0}`}
              </button>
            </>
          )}

          {/* JAZZCASH */}
          {paymentMethod === "jazzcash" && (
            <div className="payment-details">
              <h4>JazzCash Payment</h4>
              <img src="/qr.jpeg" alt="JazzCash QR" className="qr-image" />
              <div className="form-group">
                <label>Upload Payment Screenshot</label>
                <input
                  type="file"
                  className="input-file"
                  accept="image/*"
                  onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
                />
              </div>
              <div className="form-group">
                <label>Enter TID Number</label>
                <input
                  type="text"
                  className="input-text"
                  value={tidNumber}
                  onChange={(e) => setTidNumber(e.target.value)}
                  placeholder="e.g. 123456789"
                />
              </div>
              <button
                type="button"
                className="btn-submit btn-jazzcash"
                disabled={loading}
                onClick={() => handleWalletSubmit("jazzcash")}
              >
                {loading ? <Processing /> : `Jazz cash $${totalPriceUSD || 0}`}
              </button>
            </div>
          )}

          {/* EASYPaisa */}
          {paymentMethod === "easypaisa" && (
            <div className="payment-details">
              <h4>EasyPaisa Payment</h4>
              <img src="/qr.jpeg" alt="EasyPaisa QR" className="qr-image" />
              <div className="form-group">
                <label>Upload Payment Screenshot</label>
                <input
                  type="file"
                  className="input-file"
                  accept="image/*"
                  onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
                />
              </div>
              <div className="form-group">
                <label>Enter TID Number</label>
                <input
                  type="text"
                  className="input-text"
                  value={tidNumber}
                  onChange={(e) => setTidNumber(e.target.value)}
                  placeholder="e.g. 987654321"
                />
              </div>
              <button
                type="button"
                className="btn-submit btn-easypaisa"
                disabled={loading}
                onClick={() => handleWalletSubmit("easypaisa")}
              >
                {loading ? <Processing /> : `Easy Paisa $${totalPriceUSD || 0}`}
              </button>
            </div>
          )}
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
