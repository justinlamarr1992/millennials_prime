import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

const Subscriber = ({ userTo, userFrom }) => {
  const axiosPrivate = useAxiosPrivate();

  const subscribeNumberVariable = { userTo, userFrom };

  const [subscriberNumber, setSubscriberNumber] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  const [userToTest, setUserToTest] = useState({});
  const [userFromTest, setUserFromTest] = useState({});

  // const userTo = "Is this ist hardedcoded";
  // const userFrom = "It Maybe";

  const handleSubscribe = async () => {
    if (subscribed) {
      // when already subscribed
      try {
        const response = await axiosPrivate.post(
          "/subscribe/unsubscribe",
          { userTo, userFrom },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        setSubscriberNumber(subscriberNumber - 1);
        setSubscribed(!subscribed);
        console.log("NEW UNSUBSCRIBE REQUEST: ", response);
      } catch (err) {
        if (!err?.originalStatus) {
          // isLoading: true until timeout occurs
          alert("No Server Response");
        } else if (err.originalStatus === 401) {
          console.log(err);
        } else {
          alert("Unsubscribing Failed");
        }
      }
    } else {
      //   try {
      //     const response = await axiosPrivate.post(
      //       "/users/user",
      //       { userTo, userFrom },
      //       {
      //         headers: { "Content-Type": "application/json" },
      //         withCredentials: true,
      //       }
      //     );
      //     console.log("RESPONSE FOR NEW CODE", response);
      //     // setUserToTest()
      //     // setUserFromTest()
      //   } catch (err) {
      //     console.log(err);
      //   }
      // }
      //{
      // when no subscribed
      try {
        const response = await axiosPrivate.post(
          "/subscribe/subscribe",
          { userTo, userFrom },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        setSubscriberNumber(subscriberNumber + 1);
        setSubscribed(!subscribed);
        console.log("NEW SUBSCRIBE REQUEST: ", response);
      } catch (err) {
        if (!err?.originalStatus) {
          // isLoading: true until timeout occurs
          alert("No Server Response");
        } else if (err.originalStatus === 401) {
          console.log(err);
        } else {
          alert("Subscribing failed Failed");
        }
      }
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    console.log(userTo);
    console.log(userFrom);

    const getSubscribes = async () => {
      // const varibles = { userTo, userFrom };
      try {
        const response = await axiosPrivate.post(
          "http://localhost:4000/subscribe/",
          { userTo, userFrom },
          // subscribeNumberVariable,
          {
            signal: controller.signal,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(response);
        setSubscriberNumber(response.data.subscriberNumber);
        console.log(subscriberNumber);
        // isMounted && setUsers(userNames);
      } catch (err) {
        // alert(err);
        console.error(err);
      }
    };
    getSubscribes();
    const getSubscribed = async () => {
      // const varibles = { userTo, userFrom };

      try {
        const response = await axiosPrivate.post(
          "http://localhost:4000/subscribe/subscribed",
          { userTo, userFrom },
          // subscribeNumberVariable,

          {
            signal: controller.signal,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        setSubscribed(response.data.subscribed);
        console.log(subscribed);
      } catch (err) {
        // TODO: Findout how to solve this errro
        // alert(err);
        console.error(err);
      }
    };
    getSubscribed();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <button
      onClick={handleSubscribe}
      className={`page-button  ${
        subscribed ? "subscribed-button" : "subscribe-button"
      }
      `}
    >
      {subscriberNumber} {subscribed ? "Subscribed" : "Subscribe"}
    </button>
  );
};

export default Subscriber;
