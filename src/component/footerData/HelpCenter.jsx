// src/HelpSupport.jsx
import React from "react";
import "../../css/footerDataIN.css";

const HelpCenter = () => {
  return (
    <div className="mainFooterData">
      <header>
        <h1
          style={{
            textAlign: "start",
          }}
        >
          Help & Support
        </h1>
      </header>
      <main>
        <section>
          <p>
            If you have any questions, concerns, or need assistance, please feel
            free to reach out to us at:
          </p>
        </section>
        <section>
          <span>
            <h3>● Email:</h3>
            <p>
              <a href="mailto:swap.socialpress@gmail.com?subject=Hello!">
                swap.socialpress@gmail.com
              </a>
            </p>
          </span>
          <p>
            You can also join our WhatsApp community for real-time support and
            discussions:
          </p>
        </section>
        <section>
          <span>
            <h3>● WhatsApp Community:</h3>
            <p>
              <a href="https://chat.whatsapp.com/CgwgYt1Pl6e84oZHA2Uy1K">
                Join here
              </a>
            </p>
          </span>
          <p>
            Our support team is here to help you with any inquiries related to
            buying and selling social accounts, gaming accounts, and other
            digital assets on Social Press. We aim to respond to all inquiries
            as quickly as possible.
          </p>
          <p>Thank you for choosing Social Press!</p>
        </section>
      </main>
    </div>
  );
};

export default HelpCenter;
