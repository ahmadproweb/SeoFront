import React, { useEffect, useState } from "react";
import "../css/scammer.css";
import { toast } from "react-toastify";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

function Scammers() {
  const [scammers, setScammers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchScammers = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${VITE_BASE_URL}/scammers/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch scammers");
      }
      const data = await response.json();
      setScammers(data);
    } catch (error) {
    //   console.error("Error fetching scammers:", error);
      toast.error("Error fetching scammers");
    }
  };

  useEffect(() => {
    fetchScammers();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setScammers((prevScammers) =>
        prevScammers.map((scammer) => {
          if (scammer.sPics.length > 0) {
            const newIndex = (currentImageIndex + 1) % scammer.sPics.length;
            return {
              ...scammer,
              currentImage: scammer.sPics[newIndex],
            };
          }
          return scammer;
        })
      );
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 5);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = scammers.filter(
    (item) =>
      item.sName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sCountry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sContactNumber.toString().includes(searchTerm)
  );

  const handleImageClick = (image) => {
    setEnlargedImage(image);
    document.body.style.overflow = 'hidden'; // Remove scrollbar
  };

  const handleCloseEnlargedImage = () => {
    setEnlargedImage(null);
    document.body.style.overflow = ''; // Restore scrollbar
  };

  return (
    <>
      <div className={`mainServicesPage ${enlargedImage ? "blur-background" : ""}`}>
        <div className="search_container">
          <input
            type="text"
            onChange={handleSearch}
            value={searchTerm}
            id="search-bar"
            placeholder="Enter Scammer Name | Contact No | Country"
          />
          <img
            className="search-icon"
            src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
            alt="Search Icon"
          />
        </div>
        <h1 className="allScammer">Total All Scammers {filteredData.length}</h1>
        <div className="main-scammer">
          {filteredData.map((scammer) => (
            <div className="card-scammer" key={scammer._id}>
              <div className="scammer-data">
                <div className="Data">
                  <h1>Name:</h1>
                  <p>{scammer.sName}</p>
                </div>
                <div className="Data">
                  <h1>Contact No:</h1>
                  <p>{scammer.sContactNumber}</p>
                </div>
                <div className="Data">
                  <h1>Country:</h1>
                  <p>{scammer.sCountry}</p>
                </div>
                <div className="Data">
                  <h1>Account Deal:</h1>
                  <p>{scammer.sAccountdeal}</p>
                </div>
                <div className="Data">
                  <h1>Dealing Time:</h1>
                  <p>{new Date(scammer.sDealingTime).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="imgScammer">
                {scammer.sPics.length > 0 && (
                  <img
                    src={scammer.currentImage || scammer.sPics[0]}
                    alt="Scammer"
                    onClick={() => handleImageClick(scammer.currentImage || scammer.sPics[0])}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {enlargedImage && (
        <div className="enlarged-image-overlay" onClick={handleCloseEnlargedImage}>
          <img src={enlargedImage} alt="Enlarged Scammer" />
        </div>
      )}
    </>
  );
}

export default Scammers;
