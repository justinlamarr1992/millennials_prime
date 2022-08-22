import React, { useRef, useState } from "react";

import {
  textUpload,
  imagesUpload,
  videoUpload,
  musicUpload,
  episodeUpload,
  eCommUpload,
} from "../../Components/forms/UploadForms";
import { useEffect } from "react";
import FileUpload from "../../Components/reusuables/post/FileUpload";

import "./upload.css";
const UploadContent = () => {
  const [upload, setUpload] = useState("");
  const [artwork, setArtwork] = useState(false);
  const uploadRef = useRef(false);
  const artworkRef = useRef(false);

  function uploadCheck(e) {
    if (uploadRef.current.selectedIndex == 0) {
      console.log("select an answer");
    } else if (uploadRef.current.selectedIndex == 1) {
      setUpload("text");
      console.log(upload);
      // return (
      //   <div className="label-input">
      //     <label htmlFor="">Text</label>
      //     <input type="text" />
      //   </div>
      // );
    } else if (uploadRef.current.selectedIndex == 2) {
      setUpload("images");
      console.log(upload);
      // return (
      //   <div className="label-input">
      //     <label htmlFor="">Text</label>
      //     <input type="text" />
      //   </div>
      // );
    } else if (uploadRef.current.selectedIndex == 3) {
      setUpload("videos");
      console.log(upload);
      // return (
      //   <div className="label-input">
      //     <label htmlFor="">Text</label>
      //     <input type="text" />
      //   </div>
      // );
    } else if (uploadRef.current.selectedIndex == 4) {
      setUpload("music");
      console.log(upload);
      // return (
      //   <div className="label-input">
      //     <label htmlFor="">Text</label>
      //     <input type="text" />
      //   </div>
      // );
    } else if (uploadRef.current.selectedIndex == 5) {
      setUpload("episode");
      console.log(upload);
      // return (
      //   <div className="label-input">
      //     <label htmlFor="">Text</label>
      //     <input type="text" />
      //   </div>
      // );
    } else if (uploadRef.current.selectedIndex == 6) {
      setUpload("e-commerence");
      console.log(upload);
      // return (
      //   <div className="label-input">
      //     <label htmlFor="">Text</label>
      //     <input type="text" />
      //   </div>
      // );
    }
    console.log(uploadRef.current.selectedIndex);
  }
  const artworkCheck = (e) => {
    if (artworkRef.current.selectedIndex == 0) {
      console.log("select an answer");
    } else if (artworkRef.current.selectedIndex == 1) {
      setArtwork(true);
    } else {
      setArtwork(false);
    }
    console.log(artwork);
  };

  return (
    <div
      className="page"
      style={{ paddingLeft: "calc(var(--nav-w) - 2%)", height: "100vh" }}
    >
      <div className="upload-container">
        <section className="upload-content norm-container con-shade">
          <h2 className="view-container-heading">
            Millennials Prime News Upload
          </h2>
          {/* TODO: make sure the dynamioc changes allow to upload to different post */}
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

              {/* Last working on if user selects text, image... then the blocks below change to
              which format to uplaod to database
              will use useref/ usestate to decided based on dropdown then 
              inputs specifcally for that post option */}
            </div>
            {upload == "text" && (
              <>
                <div className="label-input">
                  <label htmlFor="">Title of the Text?</label>
                  <input type="text" />
                </div>
                {/* Later change this to text area */}
                <div className="label-input">
                  <label htmlFor="">What would you like to say?</label>
                  <input type="text" />
                </div>
              </>
            )}
            {upload == "images" && (
              <>
                {/* TODO: Find way to add multiple images and name each */}
                <div className="label-input">
                  <label htmlFor="">Description of the Images</label>
                  <input type="text" />
                </div>
                <h6 className="text-gray">Import Images Here</h6>
              </>
            )}
            {upload == "videos" && (
              <>
                <div className="label-input">
                  <label htmlFor="">Title of the Video</label>
                  <input type="text" />
                </div>
                <h6 className="text-gray">Import Video Here</h6>
                {/* TODO: Import Video */}
              </>
            )}
            {upload == "music" && (
              <>
                {/* TODO: Find way to add multiple songs from file as in an album like theme */}
                <div className="label-input">
                  <label htmlFor="">What's the name of the Song?</label>
                  <input type="text" />
                </div>
                <div className="label-input">
                  <label htmlFor="">Who is the Artist and Features?</label>
                  <input type="text" />
                </div>
                {/* TODO: Import song  */}
                <h6 className="text-gray">FUTURE Import song here </h6>
                <div className="label-input">
                  <label htmlFor="">Do you have album artwork?</label>
                  <select
                    name="albumartwork"
                    id="albumartwork"
                    ref={artworkRef}
                    onChange={artworkCheck}
                  >
                    <option value="" disabled selected>
                      Select your option
                    </option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                {/* TODO: Import Artwork  */}
                {artwork && <h6 className="text-gray">Import Picture here</h6>}
              </>
            )}
            {upload == "episode" && (
              <>
                {/* TODO: Find way to add multiple songs from file as in an album like theme */}
                <div className="label-input">
                  <label htmlFor="">What's the name of the Show?</label>
                  <input type="text" />
                </div>
                <div className="label-input">
                  <label htmlFor="">What's the Episode title?</label>
                  <input type="text" />
                </div>
                {/* TODO: Import Episode  */}
                <h6 className="text-gray">FUTURE Import Episode here </h6>
              </>
            )}
            {upload == "e-commerence" && (
              <>
                {/* TODO: Find way to add multiple songs from file as in an album like theme */}
                <div className="label-input">
                  <label htmlFor="">What's the name of the item?</label>
                  <input type="text" />
                </div>
                <div className="label-input">
                  <label htmlFor="">Give a brief description of the item</label>
                  <input type="text" />
                </div>
                <div className="label-input">
                  <label htmlFor="">What will be the price of this item?</label>
                  <input type="number" />
                </div>
                {/* TODO: Import image of item  */}
                <h6 className="text-gray">FUTURE Import item here </h6>
              </>
            )}
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
