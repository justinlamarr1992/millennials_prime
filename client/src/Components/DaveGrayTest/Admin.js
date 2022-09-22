import { Link } from "react-router-dom";
import Users from "./User";

const Admin = () => {
  return (
    <section>
      <h1>Admin Page</h1>
      <br />
      <Users />
      <br />
      <div>
        <Link to="/"></Link>
      </div>
    </section>
  );
};

export default Admin;
