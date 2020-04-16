import { SendRequest } from "../apiUtils";

export default (authToken) => {
  return SendRequest("/gameData", "GET", undefined, authToken);
};
