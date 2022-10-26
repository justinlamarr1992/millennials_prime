import React, { useEffect } from "react";
import { axiosPrivate } from "../../API/axios";
function Subscriber({ userTo, userFrom }) {
  const handleSubscribe = () => {
    console.log(userTo);
    console.log(userFrom);
  };

  useEffect(() => {
    const subscribeNumberVariable = { userTo, userFrom };
    axiosPrivate
      .post("/subscriber", subscribeNumberVariable, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.subscriberNumber);
        } else {
          alert("Failed to Get Subscriber Numbers");
        }
      });
  }, []);

  return (
    <button onClick={handleSubscribe} className="subscribe-button page-button">
      Subscribe
    </button>
  );
}

export default Subscriber;
