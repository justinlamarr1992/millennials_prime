import React, { useEffect } from "react";
import axios from "axios";

function Subscriber(props) {
  const userTo = props.userTo;
  const userFrom = props.userFrom;
  useEffect(() => {
    // const subscribeNumberVariable = {userTo: };
    // axios.post("/api/subscriber/subscribeNumber", subscribeNumberVariable);
  }, []);

  return <button className="subscribe-button page-button">Subscribe</button>;
}

export default Subscriber;
