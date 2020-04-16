import { SendRequest } from "../apiUtils";

export default (resetData) => {
  return SendRequest("/auth/reset_password/reset", "POST", resetData);
};
