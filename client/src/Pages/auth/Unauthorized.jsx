import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

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
      </div>
    </div>
  );
};

export default Unauthorized;
