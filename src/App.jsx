import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import BuySell from "./pages/BuySell/BuySell";
import LiveChat from "./pages/LiveChat";
import CodeGenerate from "./pages/CodeGenerate";
import DealDone from "./pages/DealDone";
import LoginPage from "./auth/LoginPage";
import SignUp from "./auth/signUp";
import VerifyAuth from "./auth/verifyAuth";
import Details from "./pages/Details";
import AccountDetails from "./pages/BuySell/AccountDetails";
import AccountSell from "./component/accountSell";
import Custom404 from "./not-found";
import "./index.css";
import BuyerPayment from "./pages/BuyerPayment";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/BuySell" element={<BuySell />} />
        <Route path="/accountSell" element={<AccountSell />} />
        <Route path="/BuySell/:accountId" element={<AccountDetails />} />
        <Route path="/liveChat" element={<LiveChat />} />
        <Route path="/CodeGenerate" element={<CodeGenerate />} />
        <Route path="/payment" element={<BuyerPayment />} />
        <Route path="/DealDone" element={<DealDone />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<VerifyAuth />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/details" element={<Details />} />
        <Route path="*" element={<Custom404 />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
