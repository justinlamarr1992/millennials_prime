import React, { useState } from "react";
import UserPostInfo from "../UserPostInfo";
import User from "../../../Assets/Images/user.jpeg";
import "./connectedUsers.css";
const ConnectUserBox = ({
  data,
  handleConnect,
  // verified
}) => {
  const [verified, setVerified] = useState(false);

  // const data = props.data;
  // console.log(props, data);
  const handleVerified = () => {};

  return (
    <div>
      {/* Once hard coding startes take this out and find way to make section a prime color user */}
      {/* Connected Prime Memeber */}
      <section
        className={
          verified
            ? "prime-container con-shade connected-user-container"
            : "norm-container con-shade connected-user-container"
        }
      >
        <div className="connected-user-info-pic-container square-container">
          <img
            className="connected-user-info-pic square-container-contents"
            src={data.pic}
            alt="User Image here"
          />
        </div>
        <div className="connected-user-info-name">
          <h4>{data.user}</h4>
        </div>
        <div className="connected-user-info-desc">
          <h4 className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, est
            nesciunt, porro veritatis animi voluptas saepe blanditiis provident
            iure fugiat cum laudantium dolor necessitatibus architecto.
            Distinctio officia in cumque aliquid!
          </h4>
        </div>
        <div className="connected-user-industry">
          <h4 className="connected-user-industry-heading ">Industry</h4>
          <h4
            className={
              verified
                ? "connected-user-industry-title prime-industry-match"
                : "connected-user-industry-title industry-match"
            }
          >
            Graphic Designer
          </h4>
        </div>
        <div className="connected-user-button">
          <button
            // onClick={connectHandle(data.id)}
            className={
              verified
                ? "page-button verified-btn connected-prime-btn-shade clickable"
                : "page-button norm-btn connected-btn-shade clickable"
            }
          >
            Connected
          </button>
        </div>
      </section>

      {/* Connected Member */}
      {/* <section className="norm-container con-shade connected-user-container">
        <img
          className="connected-user-info-pic"
          src={User}
          alt="User Image here"
        />
        <div className="connected-user-info-name">
          <h4>Justin Williams</h4>
        </div>

        <div className="connected-user-info-desc">
          <h4 className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, est
            nesciunt, porro veritatis animi voluptas saepe blanditiis provident
            iure fugiat cum laudantium dolor necessitatibus architecto.
            Distinctio officia in cumque aliquid!
          </h4>
        </div>
        <div className="connected-user-industry">
          <h4 className="connected-user-industry-heading">Industry</h4>
          <h4 className="connected-user-industry-title industry-match">
            Graphic Designer
          </h4>
        </div>
        <div className="connected-user-button">
          <button className="page-button connect-btn connected-btn-shade clickable">
            Connected
          </button>
        </div>
      </section> */}

      {/* Not Connected Prime member */}
      {/* <section className="prime-container con-shade connected-user-container">
        <img
          className="connected-user-info-pic"
          src={User}
          alt="User Image here"
        />
        <div className="connected-user-info-name">
          <h4>Justin Williams</h4>
        </div>

        <div className="connected-user-info-desc">
          <h4 className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, est
            nesciunt, porro veritatis animi voluptas saepe blanditiis provident
            iure fugiat cum laudantium dolor necessitatibus architecto.
            Distinctio officia in cumque aliquid!
          </h4>
        </div>
        <div className="connected-user-industry">
          <h4 className="connected-user-industry-heading">Industry</h4>
          <h4 className="connected-user-industry-title">Clothing</h4>
        </div>
        <div className="connected-user-button">
          <button className="page-button connected-btn p-con-shade clickable">
            Connect
          </button>
        </div>
      </section> */}

      {/* Not Connected Member */}
      {/* <section className="norm-container con-shade connected-user-container">
        <img
          className="connected-user-info-pic"
          src={User}
          alt="User Image here"
        />
        <div className="connected-user-info-name">
          <h4>Justin Williams</h4>
        </div>

        <div className="connected-user-info-desc">
          <h4 className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, est
            nesciunt, porro veritatis animi voluptas saepe blanditiis provident
            iure fugiat cum laudantium dolor necessitatibus architecto.
            Distinctio officia in cumque aliquid!
          </h4>
        </div>
        <div className="connected-user-industry">
          <h4 className="connected-user-industry-heading">Industry</h4>
          <h4 className="connected-user-industry-title">Clothing</h4>
        </div>
        <div className="connected-user-button">
          <button className="page-button connect-btn p-con-shade clickable">
            Connect
          </button>
        </div>
      </section> */}
    </div>
  );
};
export default ConnectUserBox;
