import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import BuySell from "./pages/BuySell/BuySell";
import CodeGenerate from "./pages/CodeGenerate";
import DealDone from "./pages/DealDone";
import LoginPage from "./auth/LoginPage";
import SignUp from "./auth/register";
import VerifyAuth from "./auth/verify";
import Details from "./pages/Details";
import AccountDetails from "./pages/BuySell/AccountDetails";
import AccountSell from "./component/accountSell";
import Custom404 from "./not-found";
import BuyerPayment from "./pages/BuyerPayment";
import DealCancel from "./component/DealCancel";
import ResetPassword from "./component/ResetPassword";
import ProtectedRoute from "./component/ProtectedRoute";

import "./index.css";
import CodeMatching from "./component/CodeMatching";
import PaymentMethodSeller from "./component/PaymentMethodSeller";
import Scammers from "./pages/Scammers";
import CookiesPolicy from "./component/footerData/cookiesPolicy";
import Disclaimer from "./component/footerData/Disclaimer";
import PrivacyPolicy from "./component/footerData/PrivacyPolicy";
import Terms from "./component/footerData/Terms";
import Refund from "./component/footerData/Refund";
import HelpCenter from "./component/footerData/HelpCenter";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/BuySell" element={<BuySell />} />
        <Route path="/accountSell" element={<AccountSell />} />
        <Route path="/BuySell/:accountId" element={<AccountDetails />} />

        <Route
          path="/GenerateCode"
          element={
            <ProtectedRoute>
              <CodeGenerate />
            </ProtectedRoute>
          }
        />

        <Route path="/payment" element={<BuyerPayment />} />
        <Route path="/DealDone" element={<DealDone />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<VerifyAuth />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/details"
          element={
            <ProtectedRoute>
              <Details />
            </ProtectedRoute>
          }
        />
        <Route path="/CodeMatching" element={<CodeMatching />} />
        <Route path="/paymentMethodSeller" element={<PaymentMethodSeller />} />
        <Route path="/DealCancel" element={<DealCancel />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/scammers" element={<Scammers />} />
        <Route path="/cookiesPolicy" element={<CookiesPolicy />} />
        <Route path="/Disclaimer" element={<Disclaimer />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/Terms" element={<Terms />} />
        <Route path="/HelpCenter" element={<HelpCenter />} />
        <Route path="/Refund" element={<Refund />} />
        <Route path="*" element={<Custom404 />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
