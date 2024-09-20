import { useEffect, useState } from "react";
import "../css/userDetails.css";
import { formatCoins } from "./FormatPrice";
import { toast } from "react-toastify";

const PaymentHistory = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/payment/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log('Fetched data:', data); // Log the fetched data to inspect its structure

        if (Array.isArray(data)) {
          setPaymentData(data);
        } else {
          throw new Error("Fetched data is not an array");
        }
      } catch (error) {
        // console.error('Error fetching data:', error); 
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formDataString = localStorage.getItem("user");
  const formData = formDataString ? JSON.parse(formDataString) : null;

  const filteredPaymentData = paymentData.filter(
    (item) => formData && item.email === formData.email
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = filteredPaymentData.filter(
    (item) =>
      item.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(item.transactionDate).toLocaleDateString().includes(searchTerm)
  );

  return (
    <div className="history-main">
      <h2>Payment history</h2>
      <form className="search_container">
        <input
          type="text"
          id="search-bar"
          placeholder="Enter Date || Id search"
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
              <th className="table__th">Price</th>
              <th className="table__th">ID</th>
              <th className="table__th">Method</th>
              <th className="table__th">Date</th>
              <th className="table__th"><a href="">Screenshot</a></th>
            </tr><br/>
          </thead>
          <tbody className="table__tbody">
            {loading ? (
              <tr><td colSpan="7">Loading...</td></tr>
            ) : (
              filteredData.map((item, index) => (
                <tr key={index} className="table__tr">
                  <td className="table__td">{item.fullName}</td>
                  <td className="table__td">{item.email}</td>
                  <td className="table__td">{formatCoins(item.totalPrice)}</td>
                  <td className="table__td">{item.transactionId}</td>
                  <td className="table__td">{item.paymentMethod}</td>
                  <td className="table__td">{new Date(item.transactionDate).toLocaleDateString()}</td>
                  <td className="table__td"><a href={item.paymentPic}>Image</a></td>
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
