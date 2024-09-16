import React from "react";
import "../css/listen.css";
import imageIcon from "../images/favicon.ico"
import { useNavigate } from 'react-router-dom';


function Listen() {
  const navigate  = useNavigate();
  return (
    <>
      <div className="listenBetter">
        <div className="imgListen">
          <img
            src="https://img.freepik.com/free-photo/standard-quality-control-concept-m_23-2150041866.jpg?w=996&t=st=1705517663~exp=1705518263~hmac=aa0eb9d201fbb9a1c3906b894365804d5ff8ea1a2a5be3ef94659c26ab9b5dda"
            alt=""
          />
        </div>
        <div className="textListen">
          <span>
            <img src={imageIcon} width={30} height={30}  alt="" />
            <a href="https://socialpress.online">socialpress.online</a>
          </span>
          <h3>Listen Better. Plan Better. Build Better</h3>
          <p>
            Our team consists of skilled professionals who are experts in areas
            like Web Development, Graphics designing, SocialPress, social media
            marketing, and PPC advertising. We provide various services to help
            clients succeed online. We know every business is different, so we
            personalize our approach for each client, working closely with them
            to understand their goals. Our process begins by understanding the
            business and ends with delivering results.
            <br /><br/>
            Our team consists of skilled professionals who are experts in areas
            like Web Development, Graphics designing, SocialPress, social media
            marketing, and PPC advertising. We provide various services to help
            clients succeed online. We know every business is different, so we
            personalize our approach for each client, working closely with them
            to understand their goals. Our process begins by understanding the
            business and ends with delivering results.
          </p>
          <button type="button" 
          onClick={()=>navigate("https://wa.me/+923033148200")}
         >contact us</button>
        </div>
      </div>
    </>
  );
}

export default Listen;
