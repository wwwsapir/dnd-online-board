export const API_URL_DEV = "http://localhost:9000";
export const API_URL = "https://dnd-online-board.herokuapp.com";

const createRequest = (method, bodyObject) => {
  return {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyObject),
  };
};

export const SendRequest = async (
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
    console.debug("result:", res);
    const data = await res.json();
    console.debug("response: ", { status: res.status, body: data });
    return { status: res.status, body: data };
  } catch (err) {
    console.error(
      "Error with request " + method + " to url " + url,
      "body:",
      bodyObject,
      err.message,
      err.stack ? err.stack : null
    );
  }
};
