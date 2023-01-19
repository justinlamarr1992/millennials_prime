import { Link } from "react-router-dom";
import Users from "./User";

const AdminPage = () => {
  return (
    <div className="page">
      <div
      // className={"home-container " + (modal ? "user-true" : "user-false")}
      // ref={widthRef}
      >
        <h1>This is the admin Page</h1>
        <Link to={`/prime-news/upload-content`}>
          <button>Upload Content</button>
        </Link>
        <Users />
      </div>
    </div>
  );
};

export default AdminPage;
