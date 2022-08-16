import React, { useState } from "react";
import Message from "./Message";
import Progress from "./Progress";
import axios from "axios";

export const FileUpload = ({ user }) => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [upLoadPercentage, setUploadPercentage] = useState(0);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    // may have to make 0hook for this but lets try axios
    // if its easy change all use hooks to axios
    try {
      const res = await axios.post("api/post/photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
          // Clear Percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        },
      });
      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
      setMessage("File Uploaded");
    } catch (err) {
      if (err.response.status === 500) {
        console.log(err);
        setMessage("Problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  return (
    <div>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div>
          <input type="file" onChange={onChange} />
          <label htmlFor="">{fileName}</label>
        </div>
        <Progress percentage={upLoadPercentage} />

        <button className="btn">submit</button>
      </form>
      {uploadedFile ? (
        <div>
          <h3>{uploadedFile.name}</h3>
          <img src={uploadedFile.filePath} alt="" />
        </div>
      ) : null}
    </div>
  );
};

export default FileUpload;
