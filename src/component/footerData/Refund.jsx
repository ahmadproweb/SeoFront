// src/Refund.jsx
import React from "react";
import "../../css/footerDataIN.css";

const Refund = () => {
  return (
    <div className="mainFooterData">
      <header>
        <h1
          style={{
            textAlign: "start",
          }}
        >
          Refund & Return Policy
        </h1>
      </header>
      <main>
        <section>
          <p>
            At Social Press, we strive to provide a seamless experience for
            buying and selling digital accounts, gaming accounts, monetized
            websites, themes, plugins, and more. However, we understand that
            there may be situations where a refund or return is necessary. This
            Refund & Return Policy outlines our procedures and conditions
            regarding refunds and returns.
          </p>
        </section>
        <section>
          <h2>1. Return Policy for Digital Accounts</h2>
          <h3>Personal Data</h3>
          <p>
            Once a digital account is sold, it cannot be returned to the seller,
            nor can the payment be refunded. However, if a buyer wishes to list
            the account for sale and negotiate a return with the original
            seller, this may be possible under the following conditions:
          </p>
          <span>
            <h3>● Fees Apply:</h3>
            <p>
              A fee will apply for each account returned. This fee will be
              deducted from the final amount due to the seller.
            </p>
          </span>
        </section>
        <section>
          <h2>2. Payment Confirmation</h2>
          <p>
            Before any payment is released to the seller, we will first confirm
            the amount due based on the transaction. Once confirmed, the payment
            will be processed and sent to the seller.
          </p>
        </section>
        <section>
          <h2>3. Cancellation of Transactions</h2>
          <p>
            If a buyer determines they cannot purchase an account during the
            live code matching process, they can cancel the deal by following
            these steps:
          </p>
          <p>
            ● Click the "Cancel Deal" button and fill out a short cancellation
            form.
          </p>
          <p>
            ● Please note that during canceling deal, the buyer see the seller
            account and cannot change any account settings, like the email or
            password. Buyers should check the account details and discuss any
            issues directly with the seller through live chat.
          </p>
        </section>
        <section>
          <h2>4. Seller Confirmation Required</h2>
          <p>
            Once a buyer has successfully negotiated the return of an account
            with the seller, the payment will be sent to the buyer only after
            the seller confirms that the account has been returned to their
            possession. This step ensures that both parties are satisfied with
            the transaction.
          </p>
        </section>
        <section>
          <h2>9. Contact Us</h2>
          <p>
            If you have any questions or concerns regarding our Refund & Return
            Policy, please feel free to contact us at:
          </p>
          <p>
            ● Email:{" "}
            <a href="mailto:swap.socialpress@gmail.com?subject=Hello!">
              swap.socialpress@gmail.com
            </a>
          </p>
          <p>
            We appreciate your understanding and cooperation as we work to
            ensure a positive experience for all users of Social Press. Thank
            you for choosing us for your digital account transactions!
          </p>
        </section>
      </main>
    </div>
  );
};

export default Refund;
