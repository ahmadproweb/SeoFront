import "../css/payment.css";
import React, { useEffect, useState } from "react";
import BuyerCode from "../component/buyerCode";
import SellerCode from "../component/sellerCode";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const Page = () => {
  const [isSeller, setIsSeller] = useState(false);
  useEffect(() => {
    fetch(`${VITE_BASE_URL}/buySellList/all`)
      .then((response) => response.json())
      .then((data) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userEmail = user?.email;
        const isSellerEmail = data.some(item => item.sellerDetails?.SellerEmail === userEmail);
        if (isSellerEmail) {
          setIsSeller(true);
        }
      })
  }, []);

  const openPopup = () => {
    const overlay = document.getElementById("popup1");
    if (overlay) {
      overlay.style.visibility = "visible";
      overlay.style.opacity = "1";
      disableScroll();
    }
  };

  const openPopup2 = () => {
    const overlay = document.getElementById("popup2");
    if (overlay) {
      overlay.style.visibility = "visible";
      overlay.style.opacity = "1";
      disableScroll();
    }
  };

  const disableScroll = () => {
    document.body.classList.add("no-scroll");
  };

  return (
    <div className="paymentMain">
      <div className="flex">
        <a type="button">admin Deal (account exchange)</a>
      </div>
      <div className="flex3">
        {isSeller ? (
          <div className="flex2">
            <p>seller</p>
            <a href="#popup2" onClick={openPopup2}>
              Create code for secure payment <br /> and account login Confidential
            </a>
          </div>
        ) : (
          <div className="flex2">
            <p>buyer</p>
            <a href="#popup1" onClick={openPopup}>
              Create code for secure payment <br /> and account login Confidential
            </a>
          </div>
        )}
        <div id={isSeller ? "popup2" : "popup1"} className="overlay">
          <div className="popupCode">
            {isSeller ? <SellerCode /> : <BuyerCode />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
