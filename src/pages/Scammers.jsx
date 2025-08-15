import { useState, useEffect } from "react";
import "../css/scammer.css";
import { toast } from "react-toastify";
import { BsPersonCircle, BsPersonFillExclamation, BsFillPersonLinesFill } from "react-icons/bs";
import { AiFillTikTok } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const Scammers = () => {
  const [scammers, setScammers] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedScammer, setSelectedScammer] = useState(null);

  const togglePopup = (scammer = null) => {
    setSelectedScammer(scammer);
    setCurrentImageIndex(0);
    setIsPopupVisible((prev) => !prev);
  };

  useEffect(() => {
    if (isPopupVisible) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isPopupVisible]);

  useEffect(() => {
    const fetchScammers = async () => {
      try {
        const response = await fetch(`${VITE_BASE_URL}/scammers/all`);
        const data = await response.json();
        setScammers(data);
      } catch (error) {
        toast.error("Error fetching scammers data");
      }
    };
    fetchScammers();
  }, []);

  useEffect(() => {
    if (isPopupVisible && selectedScammer?.sPics?.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedScammer.sPics.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPopupVisible, selectedScammer]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = scammers.filter(
    (item) =>
      item.sName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sCountry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sContactNumber.toString().includes(searchTerm) ||
      item.sCnicNumber.toString().includes(searchTerm)
  );

  return (
    <>
      <div className="MainScammer">
        <div className="searching_area">
          <div className="searchBtn">
            <div className="inputMain">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by Name , Country | Number"
              />
              <button>
                <IoSearch />
              </button>
            </div>
          </div>
          <h1>Total Scammer {filteredData.length}</h1>
        </div>

        <div className="main_container_scammer_page_one">
          {filteredData.map((scammer) => (
            <div className="row_one" key={scammer._id}>
              <div className="scammer_name_and_icon">
                <BsPersonCircle className="scammer_icon" />
                Name : {scammer.sName}
              </div>
              <div className="account_type_and_icon">
                <AiFillTikTok className="scammer_icon" />
                Account Type {scammer.sAccountdeal}
              </div>
              <div className="scammer_cnic_ph_no_and_icon">
                <BsPersonFillExclamation className="scammer_icon" />
                CNIC No {scammer.sCnicNumber}, Ph No {scammer.sContactNumber}
              </div>
              <button
                className="full_scammer_detail_and_icon"
                onClick={() => togglePopup(scammer)}
              >
                <BsPersonFillExclamation className="scammer_icon" />
                Full Scammer Details & SS
              </button>
            </div>
          ))}
        </div>

        {isPopupVisible && selectedScammer && (
          <div className="overlay2" onClick={() => togglePopup(null)}>
            <div className="popup2" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn2" onClick={() => togglePopup(null)}>
                <RxCrossCircled size={28} />
              </button>

              <div className="main_container_scammer_page_two">
                <div className="image_and_dot">
                  <img
                    src={selectedScammer.sPics[currentImageIndex]}
                    alt="scammer"
                  />
                  <div className="buttons">
                    {selectedScammer.sPics.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        style={{
                          backgroundColor:
                            currentImageIndex === index ? "black" : "transparent",
                        }}
                      ></button>
                    ))}
                  </div>
                </div>

                <div className="buttons_two">
                  <div className="scammer_name_and_icon_two">
                    <BsPersonCircle className="scammer_icon_two" />
                    Scammer Name : {selectedScammer.sName}
                  </div>
                  <div className="scammer_name_and_icon_two">
                    <AiFillTikTok className="scammer_icon_two" />
                    Account Type {selectedScammer.sAccountdeal}
                  </div>
                  <div className="scammer_name_and_icon_two">
                    <BsFillPersonLinesFill className="scammer_icon_two" />
                    Dealing Date & Time{" "}
                    {new Date(selectedScammer.sDealingTime).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </div>

                  <div className="scammer_name_and_icon_two">
                    <BsPersonFillExclamation className="scammer_icon_two" />
                    Scammer CNIC No : {selectedScammer.sCnicNumber} , Ph No :{" "}
                    {selectedScammer.sContactNumber}
                  </div>
                </div>

                <div className="buttons_three">
                  <div className="scammer_name_and_icon_two">
                    <BsPersonCircle className="scammer_icon_two" />
                    Social Links <a href={selectedScammer.sLink1}>Link</a> ,<a href={selectedScammer.sLink2}> Link 2</a>
                  </div>
                  <div className="scammer_name_and_icon_two">
                    <AiFillTikTok className="scammer_icon_two" />
                    Report to Cyber Crime Dept.
                  </div>
                  <div className="scammer_name_and_icon_two">
                    <BsFillPersonLinesFill className="scammer_icon_two" />
                    Dealing Date & Time
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Scammers;
