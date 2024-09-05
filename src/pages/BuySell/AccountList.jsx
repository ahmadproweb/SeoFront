import React from "react";
import { useNavigate } from "react-router-dom";

import { formatCoins } from "../../component/FormatPrice";

function AccountList({ services }) {
  const navigate = useNavigate();

  return (
    <>
      {services.length > 0 ? (
        services.map((service) => (
          <div className="account" key={service.accountId}>
            <h3>{service.accountType}</h3>
            <div className="gridAccount">
              <div className="class">
                <h2>Serial No</h2>
                <p>{service.accountId}</p>
              </div>
              <div className="class">
                <h2>Acc Name</h2>
                <p>{service.accountName}</p>
              </div>
              <div className="class">
                <h2>Acc Price</h2>
                <p>{formatCoins(service.accountPrice)}</p>
              </div>
              <div className="class">
                <h2>Acc Age</h2>
                <p>{service.siteAge}</p>
              </div>
              <div className="class">
                <h2>Acc URL</h2>
                <a
                  href={service.accountUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {service.accountUrl}
                </a>
              </div>
              <div className="class">
                <h2>Deal</h2>
                <button type="button"
                  onClick={() => navigate(`/liveChat`)}
                >Live Chat</button>
              </div>
              <div className="class">
                <h2>Details</h2>
                <button
                  type="button"
                  onClick={() => navigate(`/BuySell/${service.accountId}`)}
                >
                  View Details
                </button>
              </div>
              <div className="class">
                <button type="button">Buy Now</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="error">No results found</p>
      )}
    </>
  );
}

export default AccountList;
