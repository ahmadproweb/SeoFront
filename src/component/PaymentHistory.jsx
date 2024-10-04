import { useEffect, useState } from "react";
import "../css/userDetails.css";
import { toast } from "react-toastify";
import { formatCoins } from "./FormatPrice";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;


const PaymentHistory = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${VITE_BASE_URL}/stripe/allPayment`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
      
        const data = await response.json();
        // console.log('Fetched payment data:', data); // Log the fetched payment data
      
        if (Array.isArray(data)) {
          setPaymentData(data);
        } else {
          throw new Error("Fetched data is not an array");
        }
      } catch (error) {
        // console.error("Error fetching data:", error);
        toast.error("Error fetching data: " + error.message); // Display the error message
      } finally {
        setLoading(false);
      }
      
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = paymentData.filter(
    (item) =>
      item.accountId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(item.createdAt).toLocaleDateString().includes(searchTerm) // Check if 'createdAt' is correct
  );

  return (
    <div className="history-main">
      <h2>Payment History</h2>
      <form className="search_container">
        <input
          type="text"
          id="search-bar"
          placeholder="Enter Account Id | Date to search"
          value={searchTerm}
          onChange={handleSearch}
        />
        <img
          className="search-icon"
          src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
          alt="Search"
        />
      </form>
      <div className="card-history">
        <table className="table">
          <thead className="table__thead">
            <tr className="table__head">
              <th className="table__th">Full Name</th>
              <th className="table__th">Email</th>
              <th className="table__th">Seller Email</th>
              <th className="table__th">Id</th>
              <th className="table__th">Type</th>
              <th className="table__th">Name</th>
              <th className="table__th">Price</th>
              <th className="table__th">Price With (Tax)</th>
              <th className="table__th">Total Pay Cents</th>
              <th className="table__th">Country</th>
              <th className="table__th">Address</th>
              <th className="table__th">Date</th>
            </tr>
          </thead>
          <tbody className="table__tbody">
            {loading ? (
              <tr>
                <td colSpan="10">Loading...</td>
              </tr>
            ) : paymentData.length === 0 ? (
              <tr>
                <td colSpan="10">No payment history available.</td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr key={index} className="table__tr">
                  <td className="table__td">{item.fullName}</td>
                  <td className="table__td">{item.emailAddress}</td>
                  <td className="table__td">{item.sellerEmail}</td>
                  <td className="table__td">{item.accountId}</td>
                  <td className="table__td">{item.accountType}</td>
                  <td className="table__td">{item.accountName}</td>
                  <td className="table__td">
                    {formatCoins(item.accountPrice)}
                  </td>
                  <td className="table__td">
                    {formatCoins(item.totalPrice)}
                  </td>
                  <td className="table__td">
                    {item.amount}
                  </td>
                  <td className="table__td">{item.country}</td>
                  <td className="table__td">{item.address}</td>
                  <td className="table__td">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
