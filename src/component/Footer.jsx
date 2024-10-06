import React from "react";
import "../css/footer.css";
// import { MdMarkEmailRead } from "react-icons/md";
// import { SiFiverr } from "react-icons/si";
// import { FaWhatsapp } from "react-icons/fa";
// import { FaLinkedin } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaMedium } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import "../css/footerDataIN.css";

function Footer() {
  return (
    <>
      <section className="footer">
        <footer className="new_footer_area ">
          <div className="new_footer_top">
            <div className="footer_bg">
              <div className="footer_bg_one"></div>
              <div className="footer_bg_two"></div>
            </div>
          </div>
        </footer>
        <div className="footer-row">
          {/* <div className="footer-col">
            <h4>about us</h4>
            <ul className="links">
              <li>
                <a href="/">home</a>
              </li>
              <li>
                <a href="/BuySell">buy & sell</a>
              </li>
              <li>
                <a href="/GenerateCode">Code Generate</a>
              </li>
              <li>
                <a href="/payment">Payment</a>
              </li>
              <li>
                <a href="/DealDone">Deal Done</a>
              </li>
            </ul>
          </div> */}
          {/* <div className="footer-col">
            <h4>Working Hour's</h4>
            <ul className="links">
              <li>
                <a href="#">Monday: 9Am to 11Pm</a>
              </li>
              <li>
                <a href="#">Tuesday: 9Am to 11Pm</a>
              </li>
              <li>
                <a href="#">Wednesday: 9Am to 11Pm</a>
              </li>
              <li>
                <a href="#">Thursday: 9Am to 11Pm</a>
              </li>
              <li>
                <a href="#">Friday: 9Am to 11Pm</a>
              </li>
              <li>
                <a href="#">Saturday: 9Am to 11Pm</a>
              </li>
              <li>
                <a href="#">Sunday: Off Day</a>
              </li>
            </ul>
          </div> */}
          <div className="footer-col">
            <h4>Helpful Page's</h4>

            <ul className="links">
              <li>
                <a href="/Refund"> Refund & Return Policy </a>
              </li>
              <li>
                <a href="/Terms">term and conditions</a>
              </li>
              <li>
                <a href="/PrivacyPolicy">privacy policy</a>
              </li>

              <li>
                <a href="/Disclaimer">disclaimer</a>
              </li>
              <li>
                <a href="/cookiesPolicy">cookies policy</a>
              </li>
              <li>
                <a href="/GenerateCode">Code Generate</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>support</h4>
            <ul className="links">
              <li>
                <a href="#">help & support</a>
              </li>
              <li>
                <a href="/HelpCenter">contact us</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>social links</h4>
            <p>
              Subscribe to our newsletter for a weekly dose of news, updates,
              helpful tips, and exclusive offers.
            </p>
            <div className="icons">
              <a href="https://www.facebook.com/seotoolers">
                <FaFacebookF className="favFooter" />
              </a>
              <a href="https://twitter.com/seotoolers">
                <FaTwitter className="favFooter " />
              </a>
              <a href="mailto:swap.socialpress@gmail.com?subject=Hello!">
                <MdOutlineMail className="favFooter" />
              </a>
              <a href="https://medium.com/@seotoolers">
                <FaMedium className="favFooter" />
              </a>
            </div>
          </div>
        </div>
        {/* <div className="footer_bottom">
          <div>
            <p>
              website Developed By :{" "}
              <a href="https://hafizdeveloper.com">
                <abbr title="hafiz ahmad web team">Hafiz Developer</abbr>
              </a>
            </p>
          </div>
          <div className="iconDev ">
            <a href="https://wa.me/+923193223060">
              <FaWhatsapp className="fa" />
            </a>
            <a href="https://www.linkedin.com/in/hafiz-ahmad-523a54296">
              <FaLinkedin className="fa" />
            </a>
            <a href="https://mail.google.com/mail/u/0/?ogbl#inbox?compose=GTvVlcSGLrRTJtXtNzvCFSTCbCjBQxgRbLCcpsFWVBDGLfRHNfbJLQQcpvfcXvxbNmrRPbCTBFpdJ">
              <MdMarkEmailRead className="fa" />
            </a>
            <a href="">
              <SiFiverr className="fa" />
            </a>
          </div> */}
        {/* </div> */}
      </section>
    </>
  );
}

export default Footer;
