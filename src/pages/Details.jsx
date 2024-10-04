import React, { useEffect, useState } from "react";
import "../css/userDetails.css";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import Profile from "../component/profile.jsx";
import PaymentHistory from "../component/PaymentHistory.jsx";
import { FaHistory } from "react-icons/fa";
function Details() {
  const [selectedComponent, setSelectedComponent] = useState("Profile");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [isMenuOpen]);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleButtonClick = (componentName) => {
    setSelectedComponent(componentName);
  };
  return (
    <div className="wrapTy">
      {isMenuOpen ? (
        <RxCross1
          className={isMenuOpen ? "burgerHu white" : "burgerHu"}
          onClick={toggleMenu}
        />
      ) : (
        <GiHamburgerMenu
          className={isMenuOpen ? "burgerHu white" : "burgerHu"}
          onClick={toggleMenu}
        />
      )}
      <div className={isMenuOpen ? "main-part open" : "main-part"}>
        <div className="logo-first-ft">
          <h1>User Details</h1>
        </div>
        <div className="mid-tail">
          <h2>menu</h2>
          <nav>
            <ul>
              <li>
                <CgProfile />
                <button onClick={() => handleButtonClick("Profile")}>Profile</button>
              </li>
              <li>
                <FaHistory />
                <button onClick={() => handleButtonClick("PaymentHistory")}>Payment History</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {selectedComponent === "Profile" && <Profile />}
      {selectedComponent === "PaymentHistory" && <PaymentHistory />}
    </div>
  );
}

export default Details;
