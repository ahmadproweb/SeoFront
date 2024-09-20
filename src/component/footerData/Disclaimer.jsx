// src/Disclaimer.jsx
import React from "react";
import "../../css/footerDataIN.css";

const Disclaimer = () => {
  return (
    <div className="mainFooterData">
      <header>
        <h1
          style={{
            textAlign: "start",
          }}
        >
          Disclaimer
        </h1>
      </header>
      <main>
        <section>
          <p>
            The information provided by Social Press is for general
            informational purposes only. While we strive to ensure that the
            information on our website is accurate and up to date, we make no
            warranties or representations of any kind about the completeness,
            accuracy, reliability, suitability, or availability of the
            information, products, services, or related graphics contained on
            the site.
          </p>
        </section>
        <section>
          <h2>1. No Guarantee of Account Value</h2>
          <p>
            When buying or selling digital accounts, such as social media
            accounts or gaming accounts, please be aware that we do not
            guarantee the future value of any account. The market for digital
            accounts can be volatile and may change without notice.
          </p>
        </section>
        <section>
          <h2>2. User Responsibility</h2>
          <p>
            Users are responsible for their interactions with other users and
            for conducting their own due diligence before entering any
            transactions. Social Press is not liable for any losses, damages, or
            disputes arising from these interactions.
          </p>
        </section>
        <section>
          <h2>3. No Professional Advice</h2>
          <p>
            The information on Social Press is not intended as professional
            advice. Always seek the advice of a qualified professional regarding
            any questions you may have.
          </p>
        </section>
        <section>
          <h2>4. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We do not
            control and are not responsible for the content or practices of
            these websites. Clicking on these links is at your own risk.
          </p>
        </section>
        <section>
          <h2>5. Changes to the Disclaimer</h2>
          <p>
            We may update this disclaimer from time to time. Changes will be
            effective immediately upon posting on our website. We encourage you
            to review this disclaimer periodically for any updates.
          </p>
        </section>
        <section>
          <h2>6. Contact Us</h2>
          <p>
            If you have any questions about this disclaimer, please contact us
            at:
          </p>
          <ul>
            <li>
              Email:{" "}
              <a href="mailto:swap.socialpress@gmail.com?subject=Hello!">
                swap.socialpress@gmail.com
              </a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Disclaimer;
