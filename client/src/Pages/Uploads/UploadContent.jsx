import React, { useRef, useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import {
  textUpload,
  imagesUpload,
  videoUpload,
  musicUpload,
  episodeUpload,
  eCommUpload,
} from "../../Components/forms/UploadForms";
import FileUpload from "../../Components/reusuables/post/FileUpload";
import Dropzone from "react-dropzone";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

import "./upload.css";
import useAuth from "../../Hooks/useAuth";

const UploadContent = () => {
  const { auth } = useAuth();
  const _id = auth._id;

  const [upload, setUpload] = useState("");
  // const [uploaded, setUploaded] = useState("");
  const [artwork, setArtwork] = useState(false);

  const [userPosting, setUserPosting] = useState({});

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // This equals his privacy
  const [prime, setPrime] = useState(0);
  // Will think of changing later
  const [category, setCategory] = useState("");
  const [file, setFile] = useState([]);
  // const [file, setFile] = useState("");
  const [duration, setDuration] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [videoID, setVideoID] = useState("");

  const [object, setObject] = useState({
    userPosting,
    title,
    description,
    prime,
    category,
    file,
    duration,
    thumbnail,
  });

  const uploadRef = useRef(false);
  const artworkRef = useRef(false);

  const axiosPrivate = useAxiosPrivate();

  let formData = new FormData();

  // console.log(_id);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axiosPrivate.get(`/users/${_id}`);
        setUserPosting(response.data);
      } catch (err) {
        alert("Change this later because you have an err", err);
      }
    };
    getUserInfo();

    return () => {
      // this now gets called when the component unmounts
    };
  }, [_id]);

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

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

  const handleChangeTitle = (e) => {
    // console.log(e.currentTarget.value);
    setTitle(e.currentTarget.value);
    setObject({ ...object, title: title });
  };
  const handleChangeDescription = (e) => {
    // console.log(e.currentTarget.value);
    setDescription(e.currentTarget.value);
    setObject({ ...object, description: description });
  };
  const handleWhoChange = (e) => {
    // console.log(e.currentTarget.value);
    setPrime(e.currentTarget.value);
    setObject({ ...object, prime: prime });
  };

  const handleCategoryChange = (e) => {
    setCategory(e.currentTarget.value);
    setObject({ ...object, category: category });
  };

  const onDrop = async (files) => {
    // const base64 = await convertToBase64(files[0]);
    // // console.log(base64);
    // setFile(base64);
    // setObject({ ...object, file: file });

    setFile(files[0]);
    setObject({ ...object, file: file });
  };

  console.log(object);
  // const onDrop = (files) => {
  //   let formData = new FormData();
  //   console.log(files);
  //   formData.append("file", files[0]);

  //   // i may be able to replicate this the same for pictures music and all that lets see if it works
  //   axiosPrivate
  //     .post("http://localhost:4000/videos/createVideoFiles", formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //       withCredentials: true,
  //     })
  //     .then((response) => {
  //       if (response.data.success) {
  //         let variable = {
  //           filePath: response.data.filePath,
  //           fileName: response.data.fileName,
  //         };
  //         console.log(response.data);

  //         setFilePath(response.data.filePath);
  //         //generate thumbnail with this file path
  //         axiosPrivate
  //           .post("http://localhost:4000/videos/createThumbnail", variable, {
  //             withCredentials: true,
  //           })
  //           .then((response) => {
  //             // console.log(response);
  //             if (response.data.success) {
  //               setDuration(response.data.fileDuration);
  //               setThumbnail(response.data.thumbsFilePath);
  //               console.log("Thumbnail post ran");
  //             } else {
  //               alert("Failed to make the thumbnails");
  //             }
  //           });
  //       } else {
  //         alert("failed to save the video in server");
  //       }
  //     });
  // };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      title === "" ||
      description === "" ||
      category === "" ||
      file === []
      // file === ""
      // duration === "" ||
      // thumbnail === ""
    ) {
      console.log(title);
      console.log(description);
      console.log(category);
      console.log(file);
      return alert("Fill all of the fields");
    }

    const variables = {
      userPosting: _id,
      title: title,
      description: description,
      prime: prime,
      file: file,
      category: category,
      duration: duration,
      thumbnail: thumbnail,
      videoID: videoID,
    };
    console.log(variables);

    const bodyTest = "THIS IS A STATIC BODY ITEM";

    try {
      const response = await axiosPrivate.post("/testUploads/", variables, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success) {
        console.log(response.data);
        setVideoID(response.data.files[0]._id);
        alert("Video Uploaded Successfully");
      } else {
        alert("Failed to upload Video");
      }
    } catch (err) {
      console.log(err);
    }

    // TRYING TRY BLOCK HERE BUT WILL PUT INSIDE OF TRY ABOVE
    console.log(videoID);

    // try {
    //   const response = await axiosPrivate.post(
    //     "/testUploads/update",
    //     variables,
    //     {}
    //   );
    // } catch (err) {
    //   console.log(err);
    // }
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
          <form onSubmit={onSubmit}>
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
                  <input
                    type="text"
                    value={title}
                    onChange={handleChangeTitle}
                  />
                </div>
                <div className="label-input">
                  <label htmlFor="">Description of the Video</label>
                  <input
                    type="text"
                    value={description}
                    onChange={handleChangeDescription}
                  />
                </div>
                <div className="label-input">
                  <label htmlFor="">Who is the video for?</label>
                  <select onChange={handleWhoChange}>
                    <option value="" disabled selected>
                      Select your option
                    </option>
                    <option key={1} value={1}>
                      Millennial's
                    </option>
                    <option key={2} value={2}>
                      Primes
                    </option>
                  </select>
                </div>
                <div className="label-input">
                  <label htmlFor="">What's the Category for the Video?</label>
                  <select onChange={handleCategoryChange}>
                    <option value="" disabled selected>
                      Select your option
                    </option>
                    <option key={1} value={"All News"}>
                      All News
                    </option>
                    <option key={2} value={"Music"}>
                      Music
                    </option>
                    <option key={3} value={"Movie's"}>
                      Movie's
                    </option>
                    <option key={4} value={"Politics"}>
                      Politics
                    </option>
                    <option key={5} value={"Good Stuff"}>
                      Good Stuff
                    </option>
                    <option key={6} value={"Prime Stuff"}>
                      Prime Stuff
                    </option>
                  </select>
                </div>
                {/* TODO: Make this its own function so multiple uploads can use it */}
                <h6 className="text-gray">Import Video Here</h6>
                <Dropzone
                  // onDrop={(acceptedFiles) => console.log(acceptedFiles)}
                  onDrop={onDrop}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input type="file" name="" {...getInputProps()} />
                        {/*  */}
                        <h1>Drag Here</h1>
                      </div>
                    </section>
                  )}
                </Dropzone>
                {thumbnail !== "" && (
                  <div>
                    <img
                      src={`http://localhost:4000/${thumbnail}`}
                      alt="Lets see"
                    />
                  </div>
                )}
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
            {/* may have to add a different submit button because the submit but now is tied to from that only accepts mp4.s */}
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
