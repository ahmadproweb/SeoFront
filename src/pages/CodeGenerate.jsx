import "../css/payment.css";
import React from "react";
import BuyerCode from "../component/buyerCode";
import SellerCode from "../component/sellerCode";

const Page = () => {


  const openPopup = () => {
    const overlay = document.getElementById("popup1");
    if (overlay) {
      overlay.style.visibility = "visible";
      overlay.style.opacity = "1";
      disableScroll();
    }
  };

  const disableScroll = () => {
    document.body.classList.add('no-scroll');
  };

  const openPopup2 = () => {
    const overlay = document.getElementById("popup2");
    if (overlay) {
      overlay.style.visibility = "visible";
      overlay.style.opacity = "1";
      disableScroll();
    }
  };
  return (
    <>
      <div className="paymentMain">
        <div className="flex">
          <a type="button">admin Deal (account exchange)</a>
        </div>

        <div className="flex3">
          <div className="flex2">
            <p>buyer</p>
            <a href="#popup1" onClick={openPopup}>
              Create code for secure payment <br /> and account login
              Confidential 
            </a>
          </div>

          <div id="popup1" className="overlay">
            <div className="popupCode">
              <BuyerCode />
            </div>
          </div>

          <div className="flex2">
            <p>seller</p>
            <a href="#popup2" onClick={openPopup2}>
              Create code for secure payment <br /> and account login
              Confidential 
            </a>
          </div>

          <div id="popup2" className="overlay">
            <div className="popupCode">
              <SellerCode />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
