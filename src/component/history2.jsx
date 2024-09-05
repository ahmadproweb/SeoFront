import { useEffect, useState } from "react";

function History2(){
  const [paymentData, setPaymentData] = useState([]);
  const [accountData, setAccountData] = useState([]);
  const [sellerPayment, setSellerPaymentData] = useState([]);
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL

 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [paymentsResponse, accountsResponse, sellerPaymentsResponse] =
          await Promise.all([
            fetch(
              `${VITE_BASE_URL}/buyerPayment-form/payments`
            ),
            fetch(
              `${VITE_BASE_URL}/Account/All_Payment_accounts_deatils`
            ),
            fetch(
              `${VITE_BASE_URL}/buyerPayment-form/payments`
            ),
          ]);

        const [paymentsData, accountsData, sellerPaymentsData] =
          await Promise.all([
            paymentsResponse.json(),
            accountsResponse.json(),
            sellerPaymentsResponse.json(),
          ]);

        setPaymentData(paymentsData.data);
        setAccountData(accountsData.accounts);
        setSellerPaymentData(sellerPaymentsData.data); // Assuming you have another state variable for seller payment data
        console.log(paymentsData.data);
        console.log(accountsData.accounts);
        console.log(sellerPaymentsData.data); // Assuming you have another state variable for seller payment data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const formDataString = localStorage.getItem("formData");
  const formData = formDataString ? JSON.parse(formDataString) : null;

  const filteredPaymentData = paymentData.filter(
    (item) => formData && item.email === formData.email
  );

  const filteredAccountData = accountData.filter(
    (item) => formData && item.email === formData.email
  );
  const filteredSellerData = sellerPayment.filter(
    (item) => formData && item.email === formData.email
  );

  return (
    <>
      <div className="history-main">
        <h2>Payment history</h2>

        <div className="card-history">
          <table className="table">
            <thead className="table__thead">
              <tr className="table__head">
                <th className="table__th">UserName</th>
                <th className="table__th">Email</th>
                <th className="table__th">TotalPrice</th>
                <th className="table__th">TransitionId</th>
                <th className="table__th">PaymentMethod</th>
                <th className="table__th">TransactionDate</th>
              </tr>
            </thead>
            <br />
            <br />
            <tbody className="table__tbody">
              {filteredPaymentData.map((item, index) => (
                <tr key={index} className="table__tr">
                  <td className="table__td">{item.userName}</td>
                  <td className="table__td">{item.email}</td>
                  <td className="table__td">{item.totalAccountPrice}</td>
                  <td className="table__td">{item.transitionId}</td>
                  <td className="table__td">{item.selectPaymentMethod}</td>
                  <td className="table__td">{item.transitionData}</td>
                </tr>
              ))}
              <br />
              {filteredAccountData.map((item, index) => (
                <tr key={index} className="table__tr">
                  <td className="table__td">{item.userName}</td>
                  <td className="table__td">{item.email}</td>
                  <td className="table__td">{item.totalAccountPrice}</td>
                  <td className="table__td">{item.transitionId}</td>
                  <td className="table__td">{item.selectPaymentMethod}</td>
                  <td className="table__td">{item.transactionDate}</td>
                </tr>
              ))}
              <br />
              {filteredSellerData.map((item, index) => (
                <tr key={index} className="table__tr">
                  <td className="table__td">{item.userName}</td>
                  <td className="table__td">{item.emailAddress}</td>
                  <td className="table__td">{item.totalAccountPrice}</td>
                  <td className="table__td">{item.transitionId}</td>
                  <td className="table__td">{item.selectPaymentMethod}</td>
                  <td className="table__td">{item.transitionIdDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default History2;
