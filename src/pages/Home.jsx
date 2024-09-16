import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../css/home.css";
// import For from "../component/For";
import Frequently from "../component/Frequently";
import Listen from "../component/Listen";
import Happy from "../component/happy";
import Reviews from "../component/reviews";
import bgMobile from '../images/bgMobile.png';
import g1 from '../images/g1.png';
import g2 from '../images/g2.png';
import g3 from '../images/g3.png';
import g4 from '../images/g4.png';
import g5 from '../images/g5.png';
import g6 from '../images/g6.png';
import g7 from '../images/g7.png';
import g8 from '../images/g8.png';
import g9 from '../images/g9.png';
import Ecommerce1 from '../images/Ecommerce1.png';
import Homepage2 from '../images/Homepage2.png';
import Responsive3 from '../images/Responsive3.png';
import Template4 from '../images/Template4.png';
import UserInterface5 from '../images/User Interface5.png';
import Checkings1 from '../images/Checkings1.png';
import EmployeeS2 from '../images/EmployeeS2.png';
import GoalS3 from '../images/GoalS3.png';
import LaptopS4 from '../images/LaptopS4.png';
import PresentationS5 from '../images/PresentationS5.png';
import seoo1 from '../images/seoo1.png';
import seoo2 from '../images/seoo2.png';
import seoo3 from '../images/seoo3.png';
import seoo4 from '../images/seoo4.png';

function Home() {
  const navigate = useNavigate();

  const services = [
    { img: g1, text: "Print Design" },
    { img: g2, text: "Digital Illustration" },
    { img: g3, text: "Social Media Graphics / Post’s" },
    { img: g4, text: "Packaging Design " },
    { img: g5, text: "Web Design" },
    { img: g6, text: "graphic6" },
    { img: g7, text: "Branding Design" },
    { img: g8, text: "Motion Graphics" },
    { img: g9, text: "UI/UX Design" },
    { img: Ecommerce1, text: "Responsive Design" },
    { img: Homepage2, text: "Homepage design" },
    { img: Responsive3, text: "Mobile App Development" },
    { img: Template4, text: "website design" },
    { img: UserInterface5, text: "brochure design" },
    { img: Checkings1, text: "Guest Posting / Backlinking" },
    { img: EmployeeS2, text: "Webinar" },
    { img: GoalS3, text: "Marketing Strategies" },
    { img: LaptopS4, text: "Business Tools" },
    { img: PresentationS5, text: "Business Proposal" },
    { img: seoo1, text: "PPC Ads" },
    { img: seoo2, text: "Guest posting/bookmarking" },
    { img: seoo3, text: "Business & Traffic Booster Tools" },
    { img: seoo4, text: "Adds" },
  ];

  const [shuffledServices, setShuffledServices] = useState(services);

  useEffect(() => {
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };

    shuffleArray(services);
    setShuffledServices([...services]);
  }, []); //

  return (
    <div className="data">
      <div className="firstDataSeo">
        <img src={bgMobile} alt="My Image" width={300} height={100} />
        <div className="textMain">
          <h3>SocialPress SMM, Rank Learner & Digital Accounts Website</h3>
          <p>
            The largest and cheapest SocialPress, Digital Accounts SMM panel on the
            market. Buy AdSense, YouTube, Gaming And Much More With SMM
            Panel.
          </p>
          <div className="buttonMain">
            <button type="button" onClick={() => navigate("/services")}>
              Website design
            </button>
            <button type="button" onClick={() => navigate("/services")}>
              Handle social account
            </button>
            <button type="button" onClick={() => navigate("/services")}>
            SocialPress / Ppc
            </button>
          </div>
          <form className="search-container">
            <input
              type="text"
              id="search-bar"
              placeholder="Just Type and Get"
            />
            <img
              className="search-icon"
              src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
              alt="Search"
            />
          </form>
        </div>
      </div>

      <div className="servicesSeo">
        <div className="textMid">
          <h2>
            Our <span>services</span>
          </h2>
          <p>
            We have all these services that we can provide you at this time.
            If you want to buy any service, click on that service and contact
            us.
          </p>
        </div>
        <div className="mainREl">
          <div className="slider2">
            <div className="sliderTrack">
              {shuffledServices.map((service, index) => (
                <div key={index} className="servicesGrid">
                  <div className="boxSer">
                    <div className="img">
                      <img src={service.img} alt="Service" />
                    </div>
                    <p>{service.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="servicesButton">
          <button
            type="button"
            onClick={() => window.location.href = "https://wa.me/+923033148200"}
          >
            <abbr title="Just Click If You Want Any Service">Contact Us</abbr>
          </button>
        </div>
      </div>

      <Happy />

      <Listen />

      {/* <For /> */}

      <Reviews />

      <Frequently />
    </div>
  );
}

export default Home;
