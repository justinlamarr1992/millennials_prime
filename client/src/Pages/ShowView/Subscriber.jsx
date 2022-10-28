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
    // try {
    //   const response = await axiosPrivate.post(
    //     "http://localhost:4000/subscribe/",
    //     subscribeNumberVariable
    //   );
    //   console.log(JSON.stringify(response?.data));
    //   // TODO: Make this in the use State and not on click
    //   setSubscriberNumber(response.data.subscriberNumber);
    //   console.log(response.data.subscriberNumber);
    // } catch (err) {
    //   console.log(err);
    //   alert("Failed to Get Subscriber Numbers");
    // }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    console.log(userTo);
    console.log(userFrom);

    const getSubscribes = async () => {
      try {
        // const response = await axios.get(
        const response = await axiosPrivate.post(
          "http://localhost:4000/subscribe/",
          {
            signal: controller.signal,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        setSubscriberNumber(response.data.subscriberNumber);
        console.log(subscriberNumber);
        // isMounted && setUsers(userNames);
      } catch (err) {
        alert("Failed to get The Subscriber Number");
        console.error(err);
        // navigate("/auth/signin", { state: { from: location }, replace: true });
      }
    };
    getSubscribes();
    const getSubscribed = async () => {
      try {
        // const response = await axios.get(
        const response = await axiosPrivate.post(
          "http://localhost:4000/subscribed/",
          {
            signal: controller.signal,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
      } catch (err) {
        alert("Failed to get The Subscribed Info");
        console.error(err);
        // navigate("/auth/signin", { state: { from: location }, replace: true });
      }
    };
    getSubscribed();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <button onClick={handleSubscribe} className="subscribe-button page-button">
      Subscribe
    </button>
  );
};

export default Subscriber;
