import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "../../css/buyDesc.css";
import { toast } from "react-toastify";

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
        // console.log("Fetched data:", data);
        setBuyDetails(data);
        // console.log("State set to:", data);
      } catch (error) {
        toast.error("Error fetching full details:", error.message);
      }
    };
  
    if (accountId) {
      fetchData();
    } 
  }, [accountId]);
  
  console.log("Details Buy state:", detailsBuy);
  
  const imageUrls = [
    detailsBuy?.imagesUpload1,
    detailsBuy?.imagesUpload2,
    detailsBuy?.imagesUpload3,
    detailsBuy?.imagesUpload4,
  ].filter(Boolean); // Filters out any null or undefined values

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
            {imageUrls.length > 0 && (
              <Carousel>
                {imageUrls.map((image, index) => (
                  <div key={index}>
                    <img src={image} alt={`Image ${index + 1}`} />
                  </div>
                ))}
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
