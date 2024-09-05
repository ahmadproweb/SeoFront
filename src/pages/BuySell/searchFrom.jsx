import React from "react";

function SearchForm({ search, setSearch }) {
  return (
    <form className="search_container">
      <input
        type="text"
        id="search-bar"
        placeholder="Just Type and Get"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <img
        className="search-icon"
        src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
        alt="Search"
      />
    </form>
  );
}

export default SearchForm;
