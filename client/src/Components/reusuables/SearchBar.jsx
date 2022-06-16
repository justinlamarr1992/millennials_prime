import React from "react";

import { FaSearch, FaBackspace } from "react-icons/fa";

// import "./home.css";
const SearchBar = () => {
  return (
    <section id="search" className="norm-container con-shade">
      <FaSearch color="#8F92A1" size="2rem" className="input-icon" />
      <input
        className="search-input"
        type="text"
        placeholder="Search in Millennials Prime..."
      />
      {/* only apperae is something typed */}
      <FaBackspace color="#8F92A1" size="2rem" className="input-icon" />
      {/* when pressed deletes all inside search */}
    </section>
  );
};
export default SearchBar;
