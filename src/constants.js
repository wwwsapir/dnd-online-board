import React from "react";

const IMAGES_PATH = process.env.PUBLIC_URL + "/images/";

const CHARACTER_IMAGES_PATH = IMAGES_PATH + "characters/";
const MAP_IMAGES_PATH = IMAGES_PATH + "maps/";
const MISC_IMAGES_PATH = IMAGES_PATH + "misc/";
const CURSOR_IMAGES_PATH = IMAGES_PATH + "cursors/";

export const AVATAR_IMG_URLS = {
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

export const CURSOR_IMAGES = {
  move: CURSOR_IMAGES_PATH + "move.png",
  pointer: CURSOR_IMAGES_PATH + "pointer.png",
  delete: CURSOR_IMAGES_PATH + "delete.png",
};

export const PLAYERS_GAME_URL =
  "https://wwwsapir.github.io/dnd-online-board/#/game/";

export const GAMEPLAY_IMG_PATH = MISC_IMAGES_PATH + "gameplay.png";
export const DEFAULT_MAP_IMG_PATH = MAP_IMAGES_PATH + "default.jpg";

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
