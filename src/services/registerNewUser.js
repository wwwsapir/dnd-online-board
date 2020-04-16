import { SendRequest } from "../apiUtils";

export default (userData) => {
  return SendRequest("/auth/register/", "POST", userData);
};
