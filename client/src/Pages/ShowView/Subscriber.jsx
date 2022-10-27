import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

const Subscriber = ({ userTo, userFrom }) => {
  const axiosPrivate = useAxiosPrivate();

  const subscribeNumberVariable = { userTo, userFrom };

  const [subscriberNumber, setSubscriberNumber] = useState(0);

  // const userTo = "Is this ist hardedcoded";
  // const userFrom = "It Maybe";

  const handleSubscribe = async () => {
    console.log(userTo);
    console.log(userFrom);
    try {
      const response = await axiosPrivate.post(
        "http://localhost:4000/subscribe/",
        subscribeNumberVariable
      );
      console.log(JSON.stringify(response?.data));
      // TODO: Make this in the use State and not on click
      setSubscriberNumber(response.data.subscriberNumber);
      console.log(response.data.subscriberNumber);
    } catch (err) {
      console.log(err);
      alert("Failed to Get Subscriber Numbers");
    }
  };

  useEffect(() => {
    console.log(userTo);
    console.log(userFrom);

    // axiosPrivate
    //   // .post("http://localhost:4000/subscribe/", userTo, userFrom, {})
    //   .post("http://localhost:4000/subscribe/", subscribeNumberVariable, {})
    //   .then((response) => {
    //     if (response.data.success) {
    //       console.log(response.data);
    //     } else {
    //       alert("Failed to Get Subscriber Numbers");
    //       // console.log(userTo, userFrom);
    //       console.log(subscribeNumberVariable);
    //     }
    //   });
  }, []);

  return (
    <button onClick={handleSubscribe} className="subscribe-button page-button">
      Subscribe
    </button>
  );
};

export default Subscriber;
