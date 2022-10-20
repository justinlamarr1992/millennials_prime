import React, { useEffect } from "react";
import { axiosPrivate } from "../../API/axios";
function Subscriber(props) {
  const userTo = props.userTo;
  const userFrom = props.userFrom;

  // useEffect(() => {
  //   const subscribeNumberVariable = {userTo: };
  //   axiosPrivate.post("/subscriber/subscribeNumber", subscribeNumberVariable, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //       withCredentials: true,
  //     })
  //   }, [])

  return <button className="subscribe-button page-button">Subscribe</button>;
}

export default Subscriber;
