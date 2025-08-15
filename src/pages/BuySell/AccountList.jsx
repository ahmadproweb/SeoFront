import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCoins } from "../../component/FormatPrice";
import {
  handleView,
  handleAccountReport,
  lockAccount,
  unlockAccount,
} from "./fetch";
import Bidding from "./Bidding";
import { toast } from "react-toastify";
import { BsFillArrowDownRightSquareFill } from "react-icons/bs";
import { TiSocialTwitterCircular } from "react-icons/ti";
import { MdThumbsUpDown } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { BsPersonExclamation } from "react-icons/bs";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaLock } from "react-icons/fa";
function AccountList({ services }) {
  const navigate = useNavigate();
  const [viewedAccounts, setViewedAccounts] = useState(new Set());
  const [localServices, setLocalServices] = useState(services);

  const [openRow, setOpenRow] = useState(null); // track which row_three is open

  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user ? user.email : null; // Set to null if user not logged in

  // Notify if the user is not logged in
  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in to perform this action.");
    }
  }, [user]);

  const truncateDescription = (description, maxLength) => {
    if (!description) return "";
    return description.length > maxLength
      ? `${description.substring(0, maxLength)}...`
      : description;
  };

  const openPopup = (accountId) => {
    const overlay = document.getElementById(`popup-${accountId}`);
    if (overlay) {
      overlay.style.visibility = "visible";
      overlay.style.opacity = "1";
      disableScroll();
    }
  };

  const closePopup = (accountId) => {
    const overlay = document.getElementById(`popup-${accountId}`);
    if (overlay) {
      overlay.style.visibility = "hidden";
      overlay.style.opacity = "0";
      enableScroll();
    }
  };

  const disableScroll = () => {
    document.body.classList.add("no-scroll");
  };

  const enableScroll = () => {
    document.body.classList.remove("no-scroll");
  };

  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/buySellList/all`
      );
      const data = await response.json();

      // Load lock status from localStorage
      const storedLocks =
        JSON.parse(localStorage.getItem("lockedAccounts")) || {};

      const updatedData = data.map((service) => ({
        ...service,
        isLocked: storedLocks[service.accountId] || false, // Set initial state
      }));

      setLocalServices(updatedData);
    };

    fetchServices();
  }, []); // Run once on mount

  useEffect(() => {
    setLocalServices(services);
  }, [services]);

  return (
    <div className="main-card">
      <div className="main_container_scammer_page_three">
        {localServices.length > 0 ? (
          localServices.map((service) => (
            <div className="scammer_page_three_box" key={service.accountId}>
              <div className="row_one">
                <div className="info_group">
                  <div className="page_number">{service.accountId}</div>
                  <p>
                    {" "}
                    {service.accountType} : {service.accountName}
                  </p>
                </div>
                <button
                  className="download_badge"
                  onClick={() =>
                    setOpenRow(
                      openRow === service.accountId ? null : service.accountId
                    )
                  }
                >
                  <span>
                    {formatCoins(service.accountPrice)}
                    <BsFillArrowDownRightSquareFill
                      className={`icon ${openRow === service.accountId ? "rotate" : ""}`}
                    />
                  </span>
                </button>
              </div>
              <div className="row_two">
                <button className="buttons_in_row_two">
                  <span>
                    <TiSocialTwitterCircular size={20} className="iconss" />
                    Social Account
                  </span>
                </button>
                <button
                  className="buttons_in_row_two"
                  onClick={() => openPopup(service.accountId)}
                >
                  <span>
                    <MdThumbsUpDown size={20} className="iconss" />
                    Bid Your Price
                  </span>
                </button>
                <div
                  id={`popup-${service.accountId}`}
                  className="overlayBiding"
                >
                  <div className="inner-biding">
                    <a
                      className="close"
                      href="#"
                      onClick={() => closePopup(service.accountId)}
                    >
                      &times;
                    </a>
                    <Bidding accountId={service.accountId} />
                  </div>
                </div>
                <button
                  className="buttons_in_row_two"
                  onClick={() => navigate(`/payment`)}
                >
                  <span>
                    <FaShoppingBag size={20} className="iconss" />
                    Buy now
                  </span>
                </button>
                <button
                  className="buttons_in_row_two"
                  onClick={() =>
                    handleView(
                      service.accountId,
                      viewedAccounts,
                      setViewedAccounts,
                      navigate
                    )
                  }
                >
                  <span>
                    <BsFillPersonLinesFill size={20} className="iconss" />
                    Account Full Details
                  </span>
                </button>
              </div>
              <hr />
              <div
                className={`row_three ${openRow === service.accountId ? "open" : ""}`}
              >
                <button
                  className="buttons_in_row_two"
                  onClick={() => {
                    if (user) {
                      handleAccountReport(
                        service.accountId,
                        localServices,
                        setLocalServices
                      );
                    } else {
                      toast.error(
                        "You must be logged in to report an account."
                      );
                    }
                  }}
                >
                  <span>
                    <BsPersonExclamation size={20} className="iconss" />
                    Report this Acc.({service.reportAccount})
                  </span>
                </button>
                <button className="buttons_in_row_two">
                  <span>
                    <IoChatbubbleEllipsesOutline size={20} className="iconss" />
                    Chat With Seller
                  </span>
                </button>

                {service.isLocked
                  ? userEmail === service.sellerDetails.SellerEmail && (
                      <button
                        onClick={() =>
                          unlockAccount(
                            service.accountId,
                            userEmail,
                            setLocalServices
                          )
                        }
                      >
                        Acc. Unlock
                      </button>
                    )
                  : userEmail === service.sellerDetails.SellerEmail && (
                      <button
                        className="buttons_in_row_two"
                        onClick={() =>
                          lockAccount(
                            service.accountId,
                            userEmail,
                            setLocalServices
                          )
                        }
                      >
                        <span>
                          <FaLock size={20} className="iconss" />
                          Acc. Lock
                        </span>
                      </button>
                    )}

                <button className="buttons_in_row_two">
                  <span>
                    <CgProfile size={20} className="iconss" />
                    Seller Profile
                  </span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="error">No Result Found</p>
        )}
      </div>
    </div>
  );
}

export default AccountList;
