import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCoins } from "../../component/FormatPrice";
import { handleView, handleAccountReport, lockAccount, unlockAccount } from "./fetch"; 
import Bidding from "./Bidding";
import { toast } from "react-toastify"; 

function AccountList({ services }) {
    const navigate = useNavigate();
    const [viewedAccounts, setViewedAccounts] = useState(new Set());
    const [localServices, setLocalServices] = useState([]);

    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
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
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/buySellList/all`);
            const data = await response.json();

            // Load lock status from localStorage
            const storedLocks = JSON.parse(localStorage.getItem('lockedAccounts')) || {};

            const updatedData = data.map(service => ({
                ...service,
                isLocked: storedLocks[service.accountId] || false // Set initial state
            }));

            setLocalServices(updatedData);
        };

        fetchServices();
    }, []); // Run once on mount

    return (
        <div className="main-card">
            {localServices.length > 0 ? (
                localServices.map((service) => (
                    <div className="card-outside" key={service.accountId}>
                        <div className="card-inner">
                            <div className="card-img">
                                <img src={service.imagesUpload1} alt="images" />
                            </div>
                            <div className="card-data">
                                <div className="title">
                                    <h1>{service.accountName}</h1>
                                    <h2>{formatCoins(service.accountPrice)}</h2>
                                    <button
                                        onClick={() =>
                                            handleView(
                                                service.accountId,
                                                viewedAccounts,
                                                setViewedAccounts,
                                                navigate
                                            )
                                        }
                                    >
                                        View Details
                                    </button>
                                </div>
                                <div className="title-data">
                                    <h4>
                                        <strong> Account Id:</strong>
                                        {service.accountId}
                                    </h4>
                                    <h4>
                                        <strong>List Date: </strong>
                                        {new Date(service.createdAt).toLocaleDateString()}
                                    </h4>
                                </div>
                                <div className="title-data">
                                    <h4 style={{ textTransform: "lowercase" }}>
                                        <strong style={{ textTransform: "capitalize" }}>
                                            Seller Email:{" "}
                                        </strong>
                                        {service.sellerDetails.SellerEmail}
                                    </h4>
                                    <h4>
                                        <strong>Seller Full Name: </strong>
                                        {service.sellerDetails.SellerFullName}
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <p>{truncateDescription(service.accountDesc, 500)}</p>
                        <div className="last-data">
                            <h3>
                                <strong>Views:</strong>
                                {service.PageViews}
                            </h3>
                            <h3>
                                <strong>Account Type:</strong>
                                {service.accountType}
                            </h3>
                            <h3>
                                <strong>Monthly Profit: </strong>
                                {formatCoins(service.MonthlyProfit)}
                            </h3>
                            <h3>
                                Profit Margin:
                                <strong>{service.ProfitMargin}%</strong>
                            </h3>
                        </div>
                        <div className="last-data">
                            <button>Chat with Seller</button>
                            <button onClick={() => openPopup(service.accountId)}>Bidding</button>
                            <button onClick={() => {
                                if (user) {
                                    handleAccountReport(service.accountId, localServices, setLocalServices);
                                } else {
                                    toast.error("You must be logged in to report an account.");
                                }
                            }}>
                                Report Account: <strong>{service.reportAccount}</strong>
                            </button>

                            {/* Show lock/unlock buttons based on account status */}
                            {service.isLocked ? (
                                userEmail === service.sellerDetails.SellerEmail && (
                                    <button onClick={() => unlockAccount(service.accountId, userEmail, setLocalServices)}>
                                        Unlock Account
                                    </button>
                                )
                            ) : (
                                userEmail === service.sellerDetails.SellerEmail && (
                                    <button onClick={() => lockAccount(service.accountId, userEmail, setLocalServices)}>
                                        Lock Account
                                    </button>
                                )
                            )}
                        </div>
                        {/* <hr /> */}
                        <div id={`popup-${service.accountId}`} className="overlayBiding">
                            <div className="inner-biding">
                                <a className="close" href="#" onClick={() => closePopup(service.accountId)}>
                                    &times;
                                </a>
                                <Bidding accountId={service.accountId} />
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="error">No Result Found</p>
            )}
        </div>
    );
}

export default AccountList;
