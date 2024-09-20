import React from "react";
import "../css/reviews.css";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

function Reviews() {
  return (
    <>
      <div className="ReviewsClient">
        <div className="textMid">
          <h2>
            user <span>reviews</span>
          </h2>
          <p>
          These are all our user reviews that you can see below 👇👇👇
          </p>
        </div>
        <div className="mainSlider">
          <div className="slider3">
            <div className="sliderTrack3">
              <div className="allReviews">
                  <div className="reviews" >
                    <div className="flexSlider">
                      <div className="firstSlider">
                        <div className="img">
                          <img
                            src="https://scontent.flhe7-1.fna.fbcdn.net/v/t39.30808-6/359532171_964291681449458_5738090397605252415_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=9c7eae&_nc_eui2=AeG5hCR81B8XetSU-7_-P7V0REPK7DO4TCtEQ8rsM7hMK26NTr-hzqAsARVjWj6qMBD9uUa40zkhl_yiuh_p6MIG&_nc_ohc=n4WmGIIGESoAX85mHP5&_nc_ht=scontent.flhe7-1.fna&oh=00_AfAXII0X0AtTNkKJggVVAFpBb3zWjuq4TjCKYqMAG4KqEA&oe=65AC4144"
                            alt=""
                          />
                        </div>
                        <h2>hafiz m.ahmad , lahore</h2>
                      </div>
                      <div className="iconsReviews">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaRegStar />
                        <FaRegStar />
                      </div>
                    </div>
                    <div className="paragraph">Such socialpress is a very good website, I have earned a lot of profit from it, and their services are very slow, in case they are also from the country, you can take services from their website. Have 100 percent faith in them</div>
                    <div className="date">January/01/2024</div>
                  </div>
                  <div className="reviews" >
                    <div className="flexSlider">
                      <div className="firstSlider">
                        <div className="img">
                          <img
                            src='https://media.gettyimages.com/id/1364088606/photo/man-standing-on-crowded-street-of-lahore.jpg?s=1024x1024&w=gi&k=20&c=fLc-mXYEVqG0Ha_6dbQUiLEasr36Xj7llXcXJ1Ik2JE='
                            alt=""
                          />
                        </div>
                        <h2>Sheikh Raiz, Lahore</h2>
                      </div>
                      <div className="iconsReviews">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                    </div>
                    <div className="paragraph">The team is super professional and dedicated, easing a lot of our workload. I highly recommend them.</div>
                    <div className="date">Jan/05/2024</div>
                  </div>
                  <div className="reviews" >
                    <div className="flexSlider">
                      <div className="firstSlider">
                        <div className="img">
                          <img
                            src='https://hips.hearstapps.com/hmg-prod/images/701/p-1-dark-circles-under-the-eyes-1519767176.jpg?crop=0.849xw:1xh;center,top&resize=1200:*'
                            alt=""
                          />
                        </div>
                        <h2>Peter Lin, England </h2>
                      </div>
                      <div className="iconsReviews">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaRegStar />
                      </div>
                    </div>
                    <div className="paragraph">Had an amazing experience with the Heroes of SocialPress  team! They are super responsive, consistently offer suggestions to boost our online presence in the F&B industry, and handle our SocialPress and SEM with expertise. No worries on our end. Definitely recommend them!</div>
                    <div className="date">jan/08/2024</div>
                  </div>
                  <div className="reviews" >
                    <div className="flexSlider">
                      <div className="firstSlider">
                        <div className="img">
                          <img
                            src='https://t4.ftcdn.net/jpg/06/34/90/19/360_F_634901964_gwUjD4HrKvmv1ZoIbH2UlUA93sIfBsbI.jpg'
                            alt=""
                          />
                        </div>
                        <h2>Christopher, London</h2>
                      </div>
                      <div className="iconsReviews">
                        <FaStar />
                        <FaStar />
                        <FaRegStar />
                        <FaRegStar />
                        <FaRegStar />
                      </div>
                    </div>
                    <div className="paragraph">The SocialPress  team, made up of highly skilled and passionate professionals, played a crucial role in helping us build a strong digital presence in our local market. They are responsive, flexSliderible, and forward-thinking, consistently meeting our requests and expectations. Working with them over the past 3 years has been a pleasure.</div>
                    <div className="date">Jan/11/2024</div>
                  </div>
                  <div className="reviews" >
                    <div className="flexSlider">
                      <div className="firstSlider">
                        <div className="img">
                          <img
                            src='data:image/jpeg;base64,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'
                            alt=""
                          />
                        </div>
                        <h2>Adam Jo, Mexico</h2>
                      </div>
                      <div className="iconsReviews">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                    </div>
                    <div className="paragraph">In my view, Heroes of ST team is the top digital marketing agency. They boosted our traffic and quality leads by over 350% in just 6 months. Shane, Vance, and the team excel in SEM, SocialPress, and FB marketing. The ROI surpasses traditional marketing methods, and they outshine my previous experiences with other agencies and freelancers. Highly pleased with their services!</div>
                    <div className="date">Jan/01/2024</div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reviews;
