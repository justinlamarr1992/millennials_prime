// import React, { useState } from "react";

// import { FaSearch, FaBackspace } from "react-icons/fa";
// import { Link, useSearchParams } from "react-router-dom";

// // import "./home.css";
// const SearchBar = () => {
//   const [searchParams, setSearchParams] = useSearchParams({ s: "" });
//   const search = searchParams.get("s");
//   console.log(searchParams.get("s"));
//   return (
//     // test with div
//     <div>
//       <section id="search" className="norm-container con-shade">
//         <FaSearch color="#8F92A1" size="2rem" className="input-icon" />
//         <input
//           className="search-input"
//           type="text"
//           onChange={(e) => setSearchParams({ s: e.target.value })}
//           value={search}
//           placeholder="Search in Millennials Prime..."
//         />
//         {/* only apperae is something typed */}
//         <FaBackspace color="#8F92A1" size="2rem" className="input-icon" />
//         {/* when pressed deletes all inside search */}
//       </section>
//       <div>
//         <Link to={`/user/users/${search}`}>User Results {search}</Link>
//       </div>
//     </div>
//   );
// };
// export default SearchBar;
