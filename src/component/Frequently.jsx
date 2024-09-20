import React, { useState } from "react";
// import "../css/Frequently.css";
import "../css/accordiona.css";
function Frequently() {
  const [openItems, setOpenItems] = useState([]);
  const toggleItem = (index) => {
    setOpenItems((prevOpenItems) =>
      prevOpenItems.includes(index)
        ? prevOpenItems.filter((item) => item !== index)
        : [...prevOpenItems, index]
    );
  };

  const isItemOpen = (index) => openItems.includes(index);

  return (
    <>
      <div className="frequently">
        <div className="textMid">
          <h2>
            frequently asked <span>question</span>
          </h2>
          <p>
            Below are some frequently asked questions (FAQs) that a digital
            marketing and digital account services agency might include to help
            users better understand their services.
          </p>
        </div>
        <div className="Helo">
          <div className="cardAccordin">
          <details
              
              open={isItemOpen(1)}
              onClick={() => toggleItem(1)}
            >
              <summary>
                <span>
                  Could you share insights into the number of customers SocialPress
                   has successfully served?
                </span>
           
              </summary>
              <p>
                Over the years, SocialPress  has successfully served a diverse
                clientele, establishing a track record of satisfied customers
                who have benefited from our digital marketing expertise.
              </p>
            </details>
            <details
              
              open={isItemOpen(2)}
              onClick={() => toggleItem(2)}
            >
              <summary>
                <span>
                  How can SocialPress  help me increase traffic to my website?{" "}
                </span>
       
              </summary>
              <p>
                {" "}
                SocialPress  employs proven SocialPress strategies to boost your website
                traffic and tools. Through targeted keyword optimisation,
                content enhancement, and other techniques, we drive organic
                traffic and improve your online visibility.
              </p>
            </details>
            <details
              
              open={isItemOpen(3)}
              onClick={() => toggleItem(3)}
            >
              <summary>
                <span>
                  Are ad management services included, and how can you optimise
                  my ad campaigns?
                </span>
         
              </summary>
              <p>
                Yes, our services include comprehensive ad management. We
                optimise ad campaigns by refining targeting, ad creatives, and
                budget allocation, ensuring maximum ROI for your advertising
                efforts.
              </p>
            </details>
            <details
              
              open={isItemOpen(4)}
              onClick={() => toggleItem(4)}
            >
              <summary>
                <span>
                  Do you offer website development services, and can you build a
                  customised site for my business?
                </span>
       
              </summary>
              <p>
                Indeed, we provide website development services, crafting
                customised sites tailored to your business needs. Our expertise
                spans various platforms, guaranteeing a website that aligns with
                your brand and objectives.
              </p>
            </details>
            <details
              
              open={isItemOpen(5)}
              onClick={() => toggleItem(5)}
            >
              <summary>
                <span>
                  Is SocialPress  experienced in working with WordPress websites?
                </span>
  
              </summary>
              <p>
              SocialPress  is well-versed in working with WordPress websites,
                delivering tailored solutions for optimal performance, security,
                and user experience.
              </p>
            </details>
            <details
              
              open={isItemOpen(6)}
              onClick={() => toggleItem(6)}
            >
              <summary>
                <span>
                  Can your team improve the speed and performance of my website?
                </span>
       
              </summary>
              <p>
                Our team is dedicated to improving your website’s speed and
                performance. Through optimisations, caching strategies, and
                other techniques, we enhance user experiences and SocialPress rankings.
              </p>
            </details>
            <details
              
              open={isItemOpen(7)}
              onClick={() => toggleItem(7)}
            >
              <summary>
                <span>
                  How can SocialPress  assist with design aspects for my online
                  presence?
                </span>
             
              </summary>
              <p>
              SocialPress  seamlessly integrates design aspects into your
                online presence. From website aesthetics to social media
                graphics, our design services ensure a cohesive and visually
                appealing brand image.
              </p>
            </details>
            <details
              
              open={isItemOpen(8)}
              onClick={() => toggleItem(8)}
            >
              <summary>
                <span>
                  What strategies do you recommend for growing and managing an
                  email list?
                </span>
              
              </summary>
              <p>
                We recommend personalized strategies for growing and managing
                email lists, incorporating lead magnets, targeted campaigns, and
                segmentation to maximize engagement and conversions.
              </p>
            </details>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Frequently;
