import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import "../css/pupo.css";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

function PopFormNew({ togglePopup, user, token, onUpdate }) {
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const handleEmailChangeRequest = async () => {
    try {
      const response = await fetch(
        `${VITE_BASE_URL}/api/users/request-email-change`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email: user.email }),
        }
      );

      if (response.ok) {
        setIsRequestSent(true);
      } else {
        console.error("Failed to send email change request");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEmailChangeConfirm = async () => {
    try {
      const response = await fetch(
        `${VITE_BASE_URL}/api/users/confirm-email-change`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newEmail, verificationCode }),
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        onUpdate(updatedUser); // Update the user data in the parent component
        togglePopup(); // Close the popup
      } else {
        console.error("Failed to confirm email change");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="youtubeFormFill">
        <h1>Email Change</h1>
        <RxCrossCircled className="CrossIcons" onClick={togglePopup} />
      </div>
      <div className="ChangeEmail">
        <h1>Current Email:</h1>
        <h2>{user.email}</h2>
        {!isRequestSent ? (
          <button type="button" onClick={handleEmailChangeRequest}>
            Email Change
          </button>
        ) : (
          <>
            <div className="inputYoutube">
              <label htmlFor="newEmail">New Email:</label>
              <input
                placeholder="Enter new email"
                type="email"
                id="newEmail"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
            </div>
            <div className="inputYoutube">
              <label htmlFor="verificationCode">Verification Code:</label>
              <input
                placeholder="Enter verification code"
                type="number"
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
            </div>
            <button type="button" onClick={handleEmailChangeConfirm}>
              Confirm Email
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default PopFormNew;
