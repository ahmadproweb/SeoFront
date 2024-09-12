import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import PopForm from "./popupforme";
import "../css/pupo.css";
import { FaPencil } from "react-icons/fa6";
import PopFormNew from "./PopFormNew";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

function Profile() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    profileImage: "",
  });
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isEmailPopupVisible, setIsEmailPopupVisible] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      // try {
        const response = await fetch(`${VITE_BASE_URL}/api/users/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser({
            fullName: data.fullName,
            email: data.email,
            profileImage: data.profileImage,
          });
        } 
      // } catch (error) {
      //   console.error("Failed to fetch user data:", error);
      //   // Handle errors or redirect
      // }
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
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      profileImage: updatedUser.profileImage,
    });
  };

  return (
    <div className="profile-main">
      <h2>
        Profile
        <FaPencil onClick={togglePopup} />
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
              {user.fullName} 
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
                togglePopup={toggleEmailPopup}
                user={user}
                token={token} 
                onUpdate={handleUserUpdate} 
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
                user={user}
                token={token}
                onUpdate={handleUserUpdate}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
