import { SendRequest } from "../apiUtils";

export default (gameState, authToken) => {
  return SendRequest("/gameData", "POST", gameState, authToken);
};
