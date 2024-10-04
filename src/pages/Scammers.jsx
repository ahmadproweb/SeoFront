import React, { useState, useEffect } from "react";
import "../css/scammer.css";
import { toast } from "react-toastify";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const Scammers = () => {
  const [scammers, setScammers] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchScammers = async () => {
      try {
        const response = await fetch(`${VITE_BASE_URL}/scammers/all`);
        const data = await response.json();
        setScammers(data);
      } catch (error) {
        toast.error("Error fetching scammers data:", error);
      }
    };
    fetchScammers();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 5);
    }, 2000);
    return () => clearInterval(interval);
  }, []);




  return (
    <>
      <div className={`MainScammer`}>
        <h1>Total Scammer {scammers.length}</h1>
        {scammers.map((scammer) => (
          <div key={scammer._id} className="card">
            <div className="firstInner">
              <div className="img">
                <img
                  src={scammer.sPics[currentImageIndex]}
                  alt="Scammer"
                />
              </div>
              <div className="firstInfo">
                <h1>Name</h1>
                <h1>Number</h1>
                <h1>Country</h1>
                <h1>Account Deal</h1>
                <h1>Dealing Time</h1>
              </div>
              <div className="secondInfo">
                <p>{scammer.sName}</p>
                <p>{scammer.sContactNumber}</p>
                <p>{scammer.sCountry}</p>
                <p>{scammer.sAccountdeal}</p>
                <p>{new Date(scammer.sDealingTime).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="secondInner">
              <div className="socialProfile">
                <h1>Social Profile:</h1>
                <a href={scammer.sLink1} target="_blank" rel="noopener noreferrer">
                  Link1
                </a>
                <a href={scammer.sLink2} target="_blank" rel="noopener noreferrer">
                  Link2
                </a>
              </div>
              <button className="reviews">Reviews</button>
            </div>
          </div>
        ))}
      </div>

      
    </>
  );
};

export default Scammers;
