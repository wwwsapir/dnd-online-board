import { SendRequest } from "../apiUtils";

export default (authToken) => {
  return SendRequest("/auth/user/" + authToken, "GET");
};
