import { useNavigate, redirect, useLocation } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redire = redirect();

  const goBack = () => navigate(-1);

  const signIn = () => {
    navigate("/auth/signin", { state: "/settings" });
  };

  console.log("Use Location Hook ", location);

  return (
    <div className="page">
      <div
      // className={"home-container " + (modal ? "user-true" : "user-false")}
      // ref={widthRef}
      >
        <h1>Unauthorized</h1>
        <br />
        <p>You do not have access to the requested page.</p>
        <div className="flexGrow">
          <button onClick={goBack}>Go Back</button>
        </div>
        <div className="flexGrow">
          <button onClick={signIn}>Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
