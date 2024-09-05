import React, { useState } from "react";

function History () {
    const [searchResults, setSearchResults] = useState([]); // Use 'null!' to assert that it's an array
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchParam, setSearchParam] = useState('');

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/users/payments/admin/admin/search/${searchParam}`);
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            const data = await res.json();
            setSearchResults(data.data);
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    const handleSearch = () => {
        fetchData();
    };
  return (
    <div className="history-main">
      <h2>Payment history</h2>
      <form className="search-container">
        <input type="text" id="search-bar"
        value={searchParam} onChange={(e) => setSearchParam(e.target.value)}
        placeholder="Just Type and Get" />
        <img
          className="search-icon"
          onClick={handleSearch}
          src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
        />
      </form>
      <div className="card-history">
      {error && <div>{error}</div>}
            {isLoading && <div>Loading...</div>}
            {searchResults && searchResults.length === 0 && !error && !isLoading && <div>No Payment Results found.</div>}
            {searchResults && searchResults.length > 0 && (
                <table className="table">
                    <thead className="table__thead">
                        <tr className="table__head">
                            {Object.keys(searchResults[0]).map((key) => (
                                <th className="table__th" key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead><br/>
                    <tbody className="table__tbody">
                        {searchResults.map((result , index) => (
                            <tr key={index} className="table__tr">
                                {Object.values(result).map((value, idx) => (
                                    <td className="table__td table__mobile-title" key={idx}>{value}</td>
                                ))} <br/><br/>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
      </div>
    </div>
  );
};

export default History;
