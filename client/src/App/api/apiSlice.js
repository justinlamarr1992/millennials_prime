import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../Features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  // TODO: change this when it gets to production
  // Use this in compasriosn to axios becasue of redux tool kit
  baseUrl: "http://localhost:4000",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const authtest = getState().auth;
    const token = getState().auth.token;
    const getstate = getState();
    console.log(getstate);
    if (token) {
      // TODO: bug fixing
      console.log(authtest);
      console.log(token);
      headers.set("Authorization", `Bearer ${token}`);
      // headers: { Authorization: `Bearer ${user.token}` }, past form of headers
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery("refresh", api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store the new token
      // Only getting token back from api with this example can customise for other stuff that would be needed
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry the original query with the new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
