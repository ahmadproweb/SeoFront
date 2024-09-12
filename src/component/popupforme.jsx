import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import "../css/pupo.css";
import { toast } from "react-toastify";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

function PopForm({ togglePopup, user, token, onUpdate }) {
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    profileImage: null,
  });

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: id === "profileImage" ? files?.[0] || null : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("fullName", formData.fullName);
    if (formData.profileImage) {
      formDataToSend.append("profileImage", formData.profileImage);
    }

    try {
      const response = await fetch(`${VITE_BASE_URL}/api/users/update-profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        const updatedUser = await response.json();
        localStorage.setItem('user', JSON.stringify(updatedUser.user)); 
        onUpdate(updatedUser.user); 

        toast.success("Profile updated successfully!");
        togglePopup(); 
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="youtubeFormFill">
        <h1>Update Profile</h1>
        <RxCrossCircled className="CrossIcons" onClick={togglePopup} />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          id="profileImage"
          accept="image/*"
          onChange={handleChange}
        />
        <div className="inputYoutube">
          <label htmlFor="fullName">Full Name:</label>
          <input
            placeholder="Enter Full Name"
            type="text"
            id="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="inputYoutube">
          <button type="submit">Update</button>
        </div>
      </form>
    </>
  );
}

export default PopForm;
