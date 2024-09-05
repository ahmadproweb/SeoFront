import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import PopForm from "./popupforme"; // Adjust the import path as needed
import "../css/pupo.css";
import { FaPencil } from "react-icons/fa6";
import PopFormNew from "./PopFormNew";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

function Profile() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileImage: "",
  });
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isEmailPopupVisible, setIsEmailPopupVisible] = useState(false);

  const token = localStorage.getItem("token"); // Fetch token from localStorage

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${VITE_BASE_URL}/api/users/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            profileImage: data.profileImage,
          });
        } else {
          // Handle errors or redirect
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        // Handle errors or redirect
      }
    };

    fetchUserData();
  }, [token]);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
    document.body.classList.toggle("no-scroll", !isPopupVisible);
  };

  const toggleEmailPopup = () => {
    setIsEmailPopupVisible(!isEmailPopupVisible);
    document.body.classList.toggle("no-scroll", !isEmailPopupVisible);
  };

  const handleUserUpdate = (updatedUser) => {
    setUser({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      profileImage: updatedUser.profileImage,
    });
  };

  return (
    <div className="profile-main">
      <h2>
        Profile<FaPencil onClick={togglePopup} />
      </h2>
      <div className="card-profile">
        <div className="profile-image">
          {user.profileImage ? (
            <img src={user.profileImage} alt={`${user.firstName}'s profile`} />
          ) : (
            <div>No Image</div>
          )}
        </div>
        <div className="profile-text">
          <div className="name">
            <h1>
              {user.firstName} {user.lastName}
            </h1>
            <a href="#" onClick={toggleEmailPopup}>
              {user.email} <FaPencil />
            </a>
          </div>
          <div className="icon-main">
            <h4>Follow me on</h4>
            <div className="icon">
              <FaFacebookF />
              <FaYoutube />
              <FaInstagram />
              <FaLinkedin />
              <MdMarkEmailUnread />
            </div>
          </div>
        </div>
      </div>
      {isEmailPopupVisible && (
        <>
          <div className="overlay" onClick={toggleEmailPopup}></div>
         <div className="mainPopup">

          <div className="popup">
            <PopFormNew
              togglePopup={toggleEmailPopup} // Use toggleEmailPopup to close the new popup
              user={user} // Pass user data as props
              token={token} // Pass token as props
              onUpdate={handleUserUpdate} // Pass update handler
            />
          </div>
          </div>
        </>
      )}
      {isPopupVisible && (
        <>
          <div className="overlay" onClick={togglePopup}></div>
         <div className="mainPopup">
         <div className="popup">
            <PopForm
              togglePopup={togglePopup}
              user={user} // Pass user data as props
              token={token} // Pass token as props
              onUpdate={handleUserUpdate} // Pass update handler
            />
          </div>
         </div>
        </>
      )}
    </div>
  );
}

export default Profile;
