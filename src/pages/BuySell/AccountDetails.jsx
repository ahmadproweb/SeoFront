import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../css/buyDesc.css";

function AccountDetails() {
  const { accountId } = useParams(); // Extract accountId from URL params
  const [detailsBuy, setBuyDetails] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/buySellList/${accountId}`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok. Status: ${response.status}, Message: ${errorText}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setBuyDetails(data);
        console.log("State set to:", data); // Check if this logs correctly
      } catch (error) {
        console.error("Error fetching full details:", error.message);
      }
    };
  
    if (accountId) {
      fetchData();
    } else {
      console.error("No account ID provided");
    }
  }, [accountId]);
  
  console.log("Details Buy state:", detailsBuy);
  

  return (
    <div className="div">
      {detailsBuy ? (
        <div className="upText">
          <h2>{detailsBuy.accountName}</h2>
          <p>{detailsBuy.accountDesc}</p>
          <div className="smallText">
            <div className="small1">
              <h3>Site Age</h3>
              <strong>{detailsBuy.siteAge}</strong>
            </div>
            <div className="small1">
              <h3>Monthly Profit</h3>
              <strong>{detailsBuy.MonthlyProfit}</strong>
            </div>
            <div className="small1">
              <h3>Profit Margin</h3>
              <strong>{detailsBuy.ProfitMargin}</strong>
            </div>
          </div>
          <div className="smallText">
            <div className="small1">
              <h3>Page Views</h3>
              <strong>{detailsBuy.PageViews}</strong>
            </div>
            <div className="small1">
              <h3>Profit Multiple</h3>
              <strong>{detailsBuy.ProfitMultiple}</strong>
            </div>
            <div className="small1">
              <h3>Revenue Multiple</h3>
              <strong>{detailsBuy.RevenueMultiple}</strong>
            </div>
          </div>
          <div className="smallText">
            <div className="small1">
              <h3>Monetization Enabled</h3>
              <strong>{detailsBuy.monetizationEnabled}</strong>
            </div>
            <div className="small1">
              <h3>Earning Method</h3>
              <strong>{detailsBuy.earningMethod}</strong>
            </div>
          </div>
        </div>
      ) : (
        <p className="error">No results found, please check spelling</p>
      )}
    </div>
  );
}

export default AccountDetails;
