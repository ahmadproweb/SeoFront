import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCoins } from "../../component/FormatPrice";
import { handleView, handleReport } from "./fetch"; // Adjust the path as necessary

function AccountList({ services }) {
  const navigate = useNavigate();
  const [viewedAccounts, setViewedAccounts] = useState(new Set());
  const [localServices, setLocalServices] = useState(services || []); // Initialize to an empty array if services is undefined

  useEffect(() => {
    setLocalServices(services); // Sync local services with props
  }, [services]);

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
                  <span>
                    <h2>{formatCoins(service.accountPrice)}</h2>
                    <button onClick={() => handleView(service.accountId, viewedAccounts, setViewedAccounts, navigate)}>
                      Account Details
                    </button>
                  </span>
                </div>
                <p>{service.accountDesc}</p>
              </div>
            </div>
            <div className="last-data">
              <h3>
                Seller Email:{" "}
                <strong style={{ textTransform: "lowercase" }}>
                  {service.sellerDetails.SellerEmail}
                </strong>
              </h3>
              <h3>
                Seller Full Name: <strong>{service.sellerDetails.SellerFullName}</strong>
              </h3>
              <h3>
                Account Id: <strong>{service.accountId}</strong>
              </h3>
              <h3>
                Monthly Profit: <strong>{formatCoins(service.MonthlyProfit)}</strong>
              </h3>
              <h3>
                Profit Margin: <strong>{service.ProfitMargin}%</strong>
              </h3>
            </div>
            <div className="last-data">
              <h3>
                Account Type: <strong>{service.accountType}</strong>
              </h3>
              <h3>
                Views: <strong>{service.PageViews}</strong>
              </h3>
              <h3>
                List Date: <strong>{new Date(service.createdAt).toLocaleDateString()}</strong>
              </h3>
              <a href="">Chat with Seller</a>
              <button>Bidding</button>
              <button onClick={() => handleReport(service.accountId, localServices, setLocalServices)}>
                Report Account: <strong>{service.reportAccount}</strong>
              </button>
            </div>
            <hr />
          </div>
        ))
      ) : (
        <p className="error">No Result Found</p>
      )}
    </div>
  );
}

export default AccountList;
