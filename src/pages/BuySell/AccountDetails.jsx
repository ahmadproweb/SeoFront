import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "../../css/buyDesc.css";

function AccountDetails() {
  const { accountId } = useParams(); 
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
        console.log("State set to:", data);
      } catch (error) {
        console.error("Error fetching full details:", error.message);
      }
    };
  
    if (accountId) {
      fetchData();
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
        <div className="CarouselReact">
        {detailsBuy.imagesUpload1 && (
            <Carousel>
              {detailsBuy.imagesUpload1 && <div><img src={detailsBuy.imagesUpload1} alt="Image 1" /></div>}
              {detailsBuy.imagesUpload2 && <div><img src={detailsBuy.imagesUpload2} alt="Image 2" /></div>}
              {detailsBuy.imagesUpload3 && <div><img src={detailsBuy.imagesUpload3} alt="Image 3" /></div>}
              {detailsBuy.imagesUpload4 && <div><img src={detailsBuy.imagesUpload4} alt="Image 4" /></div>}
            </Carousel>
          )}
        </div>
        </div>
      ) : (
        <p className="error">No results found, please check spelling</p>
      )}
    </div>
  );
}

export default AccountDetails;
