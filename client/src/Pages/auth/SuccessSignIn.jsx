import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectCurrentToken,
} from "../../Features/auth/authSlice";
import { Link } from "react-router-dom";

const SuccessSignIn = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  const welcome = user ? `Welcome ${user}!` : "Welcome!";
  const tokenAbbr = `${token.slice(0, 9)}...`;

  const content = (
    <section className="welcome">
      <h1>{welcome}</h1>
      <p>Token: {tokenAbbr}</p>
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
