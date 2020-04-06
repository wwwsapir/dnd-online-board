import React from "react";

const imageBaseUrl = "https://drive.google.com/uc?id=";

export const AVATAR_IMAGE_URLS = {
  ranger: imageBaseUrl + "1MIyJ4ATQToPI_RN7RfiFQPDmuKBWHz_j",
  rogue: imageBaseUrl + "1bRC8T6ywHD6f23cdLnp2WmWaIImY7YXM",
  sorcerer: imageBaseUrl + "1TK0i8R3td1vj0Xlo1kZmS0Zu7H2c90kK",
  warlock: imageBaseUrl + "1PMrMr1T9WVBa8x5FDqV2ZIOK6Uam_Hw5",
  fighter: imageBaseUrl + "1HJxgNpcvnkyH2Bx36ynbQgIhmBPK1XfA",
  scorbat: imageBaseUrl + "1R4CXRmvvWFQwSWH5blj71R9si4q_ePHb",
  dragon: imageBaseUrl + "13hzS-a0ZeHNe9f1lkWpfTVrj3prDAs0U",
  beetle: imageBaseUrl + "1Iy7IJvd4PT7ImBPjSJRrf7Ytc7ZYiOgs",
  balrog: imageBaseUrl + "1-ShPk6rbliyWzEd7yEFqrJoOZwn1awAM"
};

export const MIN_CHARACTER_SIZE_SQUARES = 1;
export const MAX_CHARACTER_SIZE_SQUARES = 6;
export const MIN_SPELL_CIRCLE_RADIUS_FEET = 5;
export const MAX_SPELL_CIRCLE_RADIUS_FEET = 60;

export const API_URL = "http://localhost:9000";

export const DefaultFallbackComponent = ({ componentStack, error }) => (
  <div>
    <p>
      <strong>
        Oops! An error occured! I guess I haven't done enough QA because I
        really wanted to show you the project early! But hey, at least I caught
        the error using a boundary :)
      </strong>
    </p>
    <p>Here’s what I know about the error:</p>
    <p>
      <strong>Error:</strong> {error.toString()}
    </p>
    <p>
      <strong>Stacktrace:</strong> {componentStack}
    </p>
  </div>
);

export const CreateRequest = (method, bodyObject) => {
  return {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyObject)
  };
};

export const SendRequest = async (urlEnd, method, bodyObject) => {
  const url = API_URL + urlEnd;
  const req = CreateRequest(method, bodyObject);
  try {
    const response = await fetch(url, req);
    return response.json();
  } catch (err) {
    console.error(
      "Error with request " + method + " to url " + url,
      "body:",
      bodyObject
    );
  }
};
