// import React, { useState, useRef, useEffect } from "react";
// import { useParams } from "react-router-dom";

// import NavBar from "../../Components/nav/NavBar";
// import FeedEpisode from "../../Components/reusuables/post/FeedEpisode";
// import FeedMusic from "../../Components/reusuables/post/FeedMusic";
// import FeedPhoto from "../../Components/reusuables/post/FeedPhoto";
// import FeedStore from "../../Components/reusuables/post/FeedStore";
// import FeedText from "../../Components/reusuables/post/FeedText";
// import FeedVideo from "../../Components/reusuables/post/FeedVideo";
// import PrimeUpdateVideo from "../../Components/reusuables/post/PrimeUpdateVideo";
// import SearchBar from "../../Components/reusuables/SearchBar";
// import ProfileModal from "../../Components/user/ProfileModal";

// import "../../Components/user/user.css";
// import FeedPost from "../../Components/reusuables/post/FeedPost";
// import useFetch from "../../Hooks/useFetch";

// import { textData } from "../../Components/reusuables/post/data";

// const TestUser = () => {
//   const [modal, setModal] = useState(true);
//   const [pageWidth, setPageWidth] = useState("var(--home-per)");
//   const widthRef = useRef(null);

//   const { id } = useParams();
//   // Youtube
//   const {
//     data: page,
//     error,
//     isPending,
//   } = useFetch("http://localhost:3000/testuser/" + id);

//   useEffect(() => {
//     console.log(
//       "the width of the user container is ",
//       widthRef.current.offsetWidth
//     );
//   }, []);

//   const onClick = () => {
//     setModal(!modal);
//     pageWidthChange();
//   };

//   const pageWidthChange = () => {
//     if (modal == true) {
//       // console.log("true");
//       setPageWidth(widthRef.current.offsetWidth);
//       // widthRef.current.width = "100px";
//       // console.log(pageWidth);
//     } else {
//       // console.log("false");
//       setPageWidth(widthRef.current.offsetWidth);
//       // widthRef.current.width = "100px";
//       // console.log(pageWidth);
//     }
//   };
//   return (
//     <div className="page">
//       {isPending && <div>Loading...</div>}
//       {error && <div>{error}</div>}
//       {page && (
//         <div
//           className={"user-container " + (modal ? "user-true" : "user-false")}
//           ref={widthRef}
//         >
//           {/* <div>Client Stuff: {JSON.stringify(params)}</div> */}
//           <div className="prime-video">
//             <SearchBar />
//             <PrimeUpdateVideo />
//             <FeedPost />
//             <h1>Toggle Feed Selections</h1>
//             {/* <div
//               className={
//                 modal ? "feed-section-no-wrap" : "feed-section-wrapped"
//               }
//             >
//               <FeedText modal={modal} setModal={setModal} />
//               <FeedPhoto modal={modal} setModal={setModal} />
//               <FeedVideo modal={modal} setModal={setModal} />
//               <FeedEpisode modal={modal} setModal={setModal} />
//               <FeedMusic modal={modal} setModal={setModal} />
//               <FeedStore modal={modal} setModal={setModal} />
//             </div> */}
//           </div>
//           <button className="test-modal-button" onClick={onClick}>
//             Modal Test Button
//           </button>
//           {modal && <ProfileModal />}
//         </div>
//       )}
//     </div>
//   );
// };
// export default TestUser;
