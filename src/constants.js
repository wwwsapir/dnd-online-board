import React from "react";

const CHARACTER_IMAGES_PATH = process.env.PUBLIC_URL + "/images/characters/";

export const AVATAR_IMAGE_URLS = {
  ranger: CHARACTER_IMAGES_PATH + "ranger.png",
  rogue: CHARACTER_IMAGES_PATH + "rogue.png",
  sorcerer: CHARACTER_IMAGES_PATH + "sorcerer.png",
  warlock: CHARACTER_IMAGES_PATH + "warlock.png",
  fighter: CHARACTER_IMAGES_PATH + "fighter.png",
  scorbat: CHARACTER_IMAGES_PATH + "scorbat.png",
  dragon: CHARACTER_IMAGES_PATH + "dragon.png",
  beetle: CHARACTER_IMAGES_PATH + "beetle.png",
  balrog: CHARACTER_IMAGES_PATH + "balrog.png",
  alligator: CHARACTER_IMAGES_PATH + "alligator.png",
};

export const MIN_CHARACTER_SIZE_SQUARES = 1;
export const MAX_CHARACTER_SIZE_SQUARES = 6;
export const MIN_SPELL_CIRCLE_RADIUS_FEET = 5;
export const MAX_SPELL_CIRCLE_RADIUS_FEET = 60;

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
