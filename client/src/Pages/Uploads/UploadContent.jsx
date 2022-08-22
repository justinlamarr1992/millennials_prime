import React, { useRef, useState } from "react";
import { useEffect } from "react";
import FileUpload from "../../Components/reusuables/post/FileUpload";

import "./upload.css";
const UploadContent = () => {
  const [upload, setUpload] = useState("");
  const uploadRef = useRef(false);
  function uploadCheck(e) {
    if (uploadRef.current.selectedIndex == 0) {
      console.log("select an answer");
    } else if (uploadRef.current.selectedIndex == 1) {
      setUpload("text");
      console.log(upload);
      return (
        <div className="label-input">
          <label htmlFor="">Text</label>
          <input type="text" />
        </div>
      );
    } else if (uploadRef.current.selectedIndex == 2) {
      setUpload("images");
      console.log(upload);
      return (
        <div className="label-input">
          <label htmlFor="">Text</label>
          <input type="text" />
        </div>
      );
    } else if (uploadRef.current.selectedIndex == 3) {
      setUpload("videos");
      console.log(upload);
      return (
        <div className="label-input">
          <label htmlFor="">Text</label>
          <input type="text" />
        </div>
      );
    } else if (uploadRef.current.selectedIndex == 4) {
      setUpload("music");
      console.log(upload);
      return (
        <div className="label-input">
          <label htmlFor="">Text</label>
          <input type="text" />
        </div>
      );
    } else if (uploadRef.current.selectedIndex == 5) {
      setUpload("episode");
      console.log(upload);
      return (
        <div className="label-input">
          <label htmlFor="">Text</label>
          <input type="text" />
        </div>
      );
    } else if (uploadRef.current.selectedIndex == 6) {
      setUpload("e-commerence");
      console.log(upload);
      return (
        <div className="label-input">
          <label htmlFor="">Text</label>
          <input type="text" />
        </div>
      );
    }
    console.log(uploadRef.current.selectedIndex);
  }

  return (
    <div
      className="page"
      style={{ paddingLeft: "calc(var(--nav-w) - 2%)", height: "100vh" }}
    >
      <div className="upload-container">
        <section className="upload-content norm-container con-shade">
          {/* <Video /> */}
          <h2 className="view-container-heading">
            Millennials Prime News Upload
          </h2>
          <form>
            <div className="label-input">
              <label htmlFor="">What type of Upload is this?</label>
              <select
                name="upload"
                id="upload"
                ref={uploadRef}
                onChange={uploadCheck}
              >
                <option value="" disabled selected>
                  Select your option
                </option>
                <option value="text">Text</option>
                <option value="images">Images</option>
                <option value="videos">Video</option>
                <option value="music">Music</option>
                <option value="episode">Episode</option>
                <option value="e-commerence">E-Commerence</option>
              </select>
              {/* {upload == } */}
              {/* Last working on if user selects text, image... then the blocks below change to
              which format to uplaod to database
              will use useref/ usestate to decided based on dropdown then 
              inputs specifcally for that post option */}
            </div>
            {this.uploadCheck()}
            {/* {upload ? } */}
            {/* <div className="label-input">
              <label htmlFor="">Name of the Upload?</label>
              <input type="text" />
            </div>
            <div className="label-input">
              <label htmlFor="">Description of the Upload?</label>
              <input type="text" />
            </div> */}
            {/* <div className="label-input testing-form">
              <label htmlFor="">
                What was your first objective when you founded your business?
              </label> */}
            {/* TODO: create/ update component for video uploads */}
            {/* Maybe have a separate route for Prime videos to their own collections 
            Instead of the one big video collection*/}
            {/* <FileUpload />
            </div> */}
            <button class="feed-reply-post page-button connect-btn clickable con-shade">
              Upload
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};
export default UploadContent;
