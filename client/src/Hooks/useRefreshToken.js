import axios from "../API/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      // console.log("Response Prev ", JSON.stringify(prev));
      // console.log("Response ", response.data.accessToken);
      return {
        ...prev,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
        _id: response.data._id,
      };
    });
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
