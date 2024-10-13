import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../css/mainCard.css";
import { toast } from "react-toastify";

function AccountDetails() {
  const { accountId } = useParams();
  const [detailsBuy, setBuyDetails] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupImage, setPopupImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/buySellList/${accountId}`
        );
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Network response was not ok. Status: ${response.status}, Message: ${errorText}`
          );
        }
        const data = await response.json();
        setBuyDetails(data);
      } catch (error) {
        toast.error(`Error fetching full details: ${error.message}`);
      }
    };

    if (accountId) {
      fetchData();
    }
  }, [accountId]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isPopupVisible) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isPopupVisible]);

  if (!detailsBuy) {
    return <div>Loading...</div>;
  }

  const images = [
    detailsBuy.imagesUpload1,
    detailsBuy.imagesUpload2,
    detailsBuy.imagesUpload3,
    detailsBuy.imagesUpload4,
  ];

  const handleImageClick = (image) => {
    setPopupImage(image);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setPopupImage("");
  };

  return (
    <div className="main-card-details">
      <div className="card-outside-details">
        <div className="card-inner-details">
          <div className="card-data-details">
            <div className="title-details">
              <h1>{detailsBuy.accountName}</h1>
              <span>
           
              </span>
            </div>
            <h3>
                <strong>Account Id:</strong>{" "}
                 {detailsBuy.accountId}
              </h3>
            <p>{detailsBuy.accountDesc}</p>
           
          </div>
          <div className="card-img-details">
          <h3>
                <strong>Page Views:</strong>{" "}
                 {detailsBuy.PageViews}
              </h3>
            <img
              src={images[currentImageIndex]}
              alt="images"
              onClick={() => handleImageClick(images[currentImageIndex])}
            />
          </div>
          
        </div>
        <div className="last-data-details">
               <div>
              <h3>
                <strong>CreatedAt:</strong>{" "}
                {new Date(detailsBuy.createdAt).toLocaleDateString()}
              </h3>
               <h3> <strong>AccountPrice</strong>{" "} {detailsBuy.accountPrice}</h3>
               </div>
               <h3><a href="">Chat With Seller</a></h3>
            </div>
        <div className="btn-details">
          <div className="btn-inner">
            <h3 style={{ textTransform: "lowercase" }}>
              <strong style={{ textTransform: "capitalize" }}>
                Seller Email:{" "}
              </strong>
              {detailsBuy.sellerDetails.SellerEmail}
            </h3>
            <h3>
              <strong>Seller Full Name:</strong>{" "}
              {detailsBuy.sellerDetails.SellerFullName}
            </h3>
          </div>
          <div className="btn-inner">
            <button>Verified Seller</button>
            <button>Rating</button>
          </div>
          <div className="btn-inner">
            <button>Site Age</button>
            <button>Monthly Profit</button>
            <button>Profit Margin</button>
            <button>Monetization Enabled</button>
            <button>Social Media</button>
            <button>Google Analytics</button>
          </div>
        </div>
      </div>
      <div className="drop-down-image">
        <details>
          <summary>Site age</summary>
          <h1>Site age: {detailsBuy.siteAge}</h1>
          <br />
          <img
            src="https://fps.cdnpk.net/images/home/subhome-ai.webp?w=649&h=649"
            alt="site age"
          />
        </details>
        <details>
          <summary>Monthly Profit</summary>
          <h1>Monthly Profit: {detailsBuy.MonthlyProfit}</h1>
          <br />
          <img
            src="https://fps.cdnpk.net/images/home/subhome-ai.webp?w=649&h=649"
            alt="monthly profit"
          />
        </details>
        <details>
          <summary>Profit Margin</summary>
          <h1>Profit Margin: {detailsBuy.ProfitMargin}</h1>
          <br />
          <img
            src="https://fps.cdnpk.net/images/home/subhome-ai.webp?w=649&h=649"
            alt="profit margin"
          />
        </details>
        <details>
          <summary>Monetization Enabled</summary>
          <h1>Profit Margin: {detailsBuy.monetizationEnabled}</h1>
          <br />
          <img
            src="https://fps.cdnpk.net/images/home/subhome-ai.webp?w=649&h=649"
            alt="profit margin"
          />
        </details>
        <details>
          <summary>Social Media</summary>
          {/* <h1>Profit Margin: {detailsBuy.ProfitMargin}</h1> */}
          <br />
          <img
            src="https://fps.cdnpk.net/images/home/subhome-ai.webp?w=649&h=649"
            alt="profit margin"
          />
        </details>
        <details>
          <summary>Google Analytics</summary>
          {/* <h1>Profit Margin: {detailsBuy.ProfitMargin}</h1> */}
          <br />
          <img
            src="https://fps.cdnpk.net/images/home/subhome-ai.webp?w=649&h=649"
            alt="profit margin"
          />
        </details>
      </div>
      {isPopupVisible && (
        <div className="popup-background" onClick={closePopup}>
          <img src={popupImage} alt="Popup" className="popup-image" />
        </div>
      )}
    </div>
  );
}

export default AccountDetails;
