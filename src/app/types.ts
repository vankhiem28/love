export type MusicTrack = {
  id: string;
  title: string;
  artist?: string;
  src: string;
};

export type StoredMusicTrack = {
  _id: string;
  title: string;
  artist?: string;
  storageId: string;
  url: string;
  createdAt: number;
};
