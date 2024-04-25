import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import axios from "../../API/axios";

import useAuth from "../../Hooks/useAuth";

const SuccessSignIn = () => {
  // const user = useSelector(selectCurrentUser);
  // const token = useSelector(selectCurrentToken);

  // const welcome = user ? `Welcome ${user}!` : "Welcome!";
  // const tokenAbbr = `${token.slice(0, 9)}...`;

  const content = (
    <section className="welcome">
      {/* <h1>{welcome}</h1>
      <p>Token: {tokenAbbr}</p> */}
      <h1>You have Logged in</h1>

      <p>
        <Link to="/">Home</Link>
      </p>
      <p>
        <Link to="/prime-news/catalog">Past Videos</Link>
      </p>
    </section>
  );

  return content;
};

export default SuccessSignIn;
