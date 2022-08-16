import React from "react";
import PropTypes from "prop-types";

const Message = ({ msg }) => {
  return <div>{msg}</div>;
  //   TODO:make dismissable message block
};

Message.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default Message;
