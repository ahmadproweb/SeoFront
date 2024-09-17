import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/navbar.css";
import { LuLayoutPanelLeft } from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoHomeOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { FaRegPaperPlane } from "react-icons/fa";
import { RiMoneyPoundCircleLine } from "react-icons/ri";

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    document.body.style.overflow = isNavOpen ? "auto" : "hidden";
  };

  const [stickyClass, setStickyClass] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);

  const stickNavbar = () => {
    setStickyClass(window.scrollY > 10 ? "sticky-nav" : "");
  };

  return (
    <>
      <div className="headerButton">
        <button type="button">
          <a href="https://chat.whatsapp.com/CgwgYt1Pl6e84oZHA2Uy1K">
            Join Community
          </a>
        </button>
        <button type="button" onClick={() => navigate("/scammers")}>
          scam alert
        </button>
        <button type="button">
          <a href="mailto:swap.socialpress@gmail.com?subject=Hello!">
            swap.socialpress@gmail.com
          </a>
        </button>
      </div>
      <header className={`header ${stickyClass}`}>
        <div className="logo">
          <a href="/">Socialpress</a>
        </div>
        <nav className={`nav ${isNavOpen ? "nav-open" : ""}`}>
          <ul>
            <li>
              <IoHomeOutline className="font" />
              <a href="/">home</a>
            </li>
            <li>
              <FaRegPaperPlane className="font" />
              <a href="/GenerateCode">Generate Code</a>
            </li>
            <li>
              <RiMoneyPoundCircleLine className="font" />
              <a href="/payment">Buyer Payment</a>
            </li>
            <li>
              <LuLayoutPanelLeft className="font" />
              <a href="/DealDone">Deal Done</a>
            </li>
          </ul>
        </nav>
        <div className="login_SignUp">
          {isLoggedIn ? (
            <>
              <a href="/details" className="UserDetails" type="button">
                UserDetails
              </a>
              <a href="/BuySell">Buy & Sell</a>
              <button className="logout" type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login">Login</a>
              <a href="/signup">Signup</a>
              <a href="/BuySell">Buy & Sell</a>
            </>
          )}
          <div
            className={`hamburger ${isNavOpen ? "ahmad" : ""}`}
            style={{ cursor: "pointer" }}
            onClick={toggleNav}
          >
            {isNavOpen ? <IoMdClose /> : <RxHamburgerMenu />}
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
