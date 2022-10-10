import { useState, useEffect } from "react";
import axios from "../../API/axios";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
// Testing it out
import useRefreshToken from "../../Hooks/useRefreshToken";

const User = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();

  const refresh = useRefreshToken();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        // const response = await axios.get(
        const response = await axiosPrivate.get(
          "http://localhost:4000/users/",
          {
            signal: controller.signal,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.error(err);
        // navigate("/auth/signin", { state: { from: location }, replace: true });
      }
    };
    getUsers();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No Users to display</p>
      )}
      <button onClick={() => refresh()}>Refresh</button>
    </article>
  );
};
export default User;
