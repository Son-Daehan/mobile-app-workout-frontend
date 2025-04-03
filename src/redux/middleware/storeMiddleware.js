import { setAuthorizationHeader } from "../../services/axiosInstance";

const tokenMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // Check if auth state changed and set the token
  if (
    action.type === "auth/loginUser/fulfilled" ||
    action.type === "auth/logout"
  ) {
    const token = store.getState().auth.accessToken;
    setAuthorizationHeader(token);
  }

  return result;
};

export default tokenMiddleware;
