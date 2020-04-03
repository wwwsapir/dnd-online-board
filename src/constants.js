import React from "react";

const imageBaseUrl = "https://drive.google.com/uc?id=";

export const avatarImageURLs = {
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

export const MyFallbackComponent = ({ componentStack, error }) => (
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
