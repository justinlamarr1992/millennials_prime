import React from "react";
import PropTypes from "prop-types";

const Progress = ({ percentage }) => {
  // TODO: customize progress bar
  return (
    <div>
      <label for="progress-bar">Downloading progress:</label>
      <progress id="progress-bar" value={percentage} max="100">
        {percentage}
      </progress>
    </div>
  );
};

Progress.propTypes = { percentage: PropTypes.number.isRequired };

export default Progress;
