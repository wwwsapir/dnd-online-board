import { SendRequest } from "../apiUtils";

export default (authToken) => {
  return SendRequest("/gameData/delete", "DELETE", undefined, authToken);
};
