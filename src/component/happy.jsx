import React, { useState } from "react";
import "../css/cardClient.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
function Happy() {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  const users = [
    {
      name: "Experienced Team",
      description:
        "Our skilled experts have years of industry knowledge to deliver high-quality solutions for your business.",
      img: "https://images.unsplash.com/photo-1633532445251-1c376f9c5291?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTN8MTA0NDQ0NHx8ZW58MHx8fHx8",
    },
    {
      name: " Tailored Services",
      description:
        "We customize our offerings to meet your specific needs, providing IT solutions that perfectly suit your requirements.",
      img: "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-927022.jpg&fm=jpg",
    },
    {
      name: "Customer-Focused",
      description:
        " Your goals and satisfaction come first. We collaborate closely with you to ensure projects are completed on time and within budget.",
      img: "data:image/jpeg;base64,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",
    },
    {
      name: "Innovation",
      description:
        " Our forward-looking team is committed to staying ahead in technology, making sure your solutions are modern and advanced.",
      img: "https://c4.wallpaperflare.com/wallpaper/832/597/277/500px-space-space-art-solar-system-wallpaper-preview.jpg",
    },
  ];
  const handleNextClick = () => {
    setCurrentUserIndex((prevIndex) => (prevIndex + 1) % users.length);
  };

  const handlePrevClick = () => {
    setCurrentUserIndex(
      (prevIndex) => (prevIndex - 1 + users.length) % users.length
    );
  };

  return (
    <div className="happyClients">
      <div className="textMid">
        <h2>
          Why <span>Choose Us?</span>
        </h2>
        <p>
          Access top-notch SocialPress tools, enriching learning courses,
          and elevate your online presence strategically. We navigate social
          networks, understand Google algorithms, and excel in effective
          marketing strategies. Our premium plans offer an exclusive,
          community-oriented experience. Join us for a digital journey where
          quality, innovation, and customer satisfaction seamlessly converge.
        </p>
      </div>
      <div className="animation">
        <button type="button" onClick={handlePrevClick}>
          <FaArrowLeftLong />
          prev{" "}
        </button>
        <button type="button" onClick={handleNextClick}>
          next <FaArrowRightLong />
        </button>
      </div>
      <div className="allCard">
        <div className="card">
          <img src={users[currentUserIndex].img} alt="" />
          <div className="text">
            <h1>{users[currentUserIndex].name}</h1>
            <p>{users[currentUserIndex].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Happy;
