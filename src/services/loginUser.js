import { SendRequest } from "../apiUtils";

export default (loginData) => {
  return SendRequest("/auth/login/", "POST", loginData);
};
