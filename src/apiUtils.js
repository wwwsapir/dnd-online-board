export const CallLoginAPI = (loginData) => {
  return sendRequest("/auth/login/", "POST", loginData);
};

export const CallRegisterAPI = (userData) => {
  return sendRequest("/auth/register/", "POST", userData);
};

export const CallResetPasswordSendAPI = (resetData) => {
  return sendRequest("/auth/reset_password/send", "POST", resetData);
};

export const CallCheckPasswordTokenMatches = (authToken) => {
  return sendRequest("/auth/user/" + authToken, "GET");
};

export const CallResetPasswordResetAPI = (resetData) => {
  return sendRequest("/auth/reset_password/reset", "POST", resetData);
};

export const CallEraseGameDataAPI = (authToken) => {
  return sendRequest("/gameData/delete", "DELETE", undefined, authToken);
};

export const CallGetGameDataAPI = (authToken) => {
  return sendRequest("/gameData", "GET", undefined, authToken);
};

export const CallSaveNewGameDataAPI = (gameState, authToken) => {
  return sendRequest("/gameData", "POST", gameState, authToken);
};

export const CallUpdateGameDataAPI = (gameState, authToken) => {
  return sendRequest("/gameData", "PATCH", gameState, authToken);
};

export const API_URL = "http://localhost:9000";

const createRequest = (method, bodyObject) => {
  return {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyObject),
  };
};

const sendRequest = async (
  urlEnd,
  method,
  bodyObject = undefined,
  authToken = null
) => {
  const url = API_URL + urlEnd;
  const req = createRequest(method, bodyObject);
  if (authToken) {
    req.headers["auth-token"] = authToken;
  }
  console.debug("sending: ", req, url);
  try {
    const res = await fetch(url, req);
    const data = await res.json();
    console.debug("response: ", { status: res.status, body: data });
    return { status: res.status, body: data };
  } catch (err) {
    console.error(
      "Error with request " + method + " to url " + url,
      "body:",
      bodyObject,
      err.message
    );
  }
};
