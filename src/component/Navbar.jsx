import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../css/navbar.css";
import { MdOutlineSell } from "react-icons/md";
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
        <button type="button" onClick={() => navigate("https://web-chat-seo-toolers.vercel.app/")}>
          admin deal
        </button>
        <button type="button" onClick={() => navigate("/chat")}>
          join community
        </button>
        <button type="button" onClick={() => navigate("/scammers")}>
          scam alert
        </button>
        <button type="button" onClick={() => navigate("https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=GTvVlcSBpgJcPLCbFhTdgkPXDdqVbtmnXNfLRwRjmctRHQKwBxrpcBgbkrrLKWDxLbfdZgLJtrplc")}>
          <p>seotoolers@gmail.com</p>
        </button>
      </div>
      <header className={`header ${stickyClass}`}>
        <div className="logo">
          <a href="/">Seotoolers</a>
        </div>
        <nav className={`nav ${isNavOpen ? "nav-open" : ""}`}>
          <ul>
            <li><IoHomeOutline className="font" /><a href="/">home</a></li>
            <li><MdOutlineSell className="font" /><a href="/BuySell">buy & sell</a></li>
            <li><FaRegPaperPlane className="font" /><a href="/liveChat">Live Chat</a></li>
            <li><LuLayoutPanelLeft className="font" /><a href="/DealDone">Deal Done</a></li>
            <li><RiMoneyPoundCircleLine className="font" /><a href="/CodeGenerate">Code Generate</a></li>
          </ul>
        </nav>
        <div className="login_SignUp">
          {isLoggedIn ? (
            <>
              <a href="/details" className="UserDetails" type="button">
                UserDetails
              </a>
              <button className="logout" type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login">Login</a>
              <a href="/signup">Signup</a>
              <a href="/admin">Admin</a>
            </>
          )}
          <div className={`hamburger ${isNavOpen ? "ahmad" : ""}`} style={{ cursor: "pointer" }} onClick={toggleNav}>
            {isNavOpen ? <IoMdClose /> : <RxHamburgerMenu />}
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
