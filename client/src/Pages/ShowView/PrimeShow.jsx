import React from "react";
import Video from "../../Components/video/Video";
import "./primeshow.css";
const PrimeShow = () => {
  return (
    <div
      className="page"
      style={{ paddingLeft: "calc(var(--nav-w) - 2%)", height: "100vh" }}
    >
      <div className="view-container">
        <div className="view-content">
          <Video />
          <h1 className="view-container-heading">Testing</h1>
          <h1>Where did Test Gooiasjoijasdoijasd</h1>
        </div>
      </div>
    </div>
  );
};
export default PrimeShow;
