import { SendRequest } from "../apiUtils";

export default (resetData) => {
  return SendRequest("/auth/reset_password/send", "POST", resetData);
};
