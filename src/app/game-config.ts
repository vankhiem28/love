export const GAME_CONFIG = {
  spawnIntervalMs: 850,
  minSpeed: 35,
  maxSpeed: 80,
  minSize: 16,
  maxSize: 26,
  basketWidth: 90,
  basketHeight: 18,
  catchOffset: 12,
  winCount: 12,
} as const;

export const FLIP_GAME_CONFIG = {
  maxPlays: 2,
  unlockPhrase: "Em yêu anh",
} as const;
