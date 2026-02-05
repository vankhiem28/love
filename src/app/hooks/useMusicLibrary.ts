"use client";

import { useCallback, useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import type { Id } from "../../../convex/_generated/dataModel";
import type { MusicTrack, StoredMusicTrack } from "../types";
import { api } from "../../../convex/_generated/api";

type UploadState = "idle" | "uploading" | "success" | "error";

export const useMusicLibrary = () => {
  const tracks = useQuery(api.music.listTracks);
  const generateUploadUrl = useMutation(api.music.generateUploadUrl);
  const createTrack = useMutation(api.music.createTrack);

  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const normalizedTracks = useMemo<MusicTrack[]>(() => {
    if (!tracks) {
      return [];
    }
    return (tracks as StoredMusicTrack[]).map((track) => ({
      id: track._id,
      title: track.title,
      artist: track.artist ?? undefined,
      src: track.url,
    }));
  }, [tracks]);

  const uploadTrack = useCallback(
    async (file: File, title: string, artist?: string) => {
      setUploadState("uploading");
      setErrorMessage(null);

      try {
        const uploadUrl = await generateUploadUrl();
        const uploadResponse = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });

        if (!uploadResponse.ok) {
          throw new Error("Upload failed");
        }

        const { storageId } = (await uploadResponse.json()) as {
          storageId: string;
        };

        await createTrack({
          storageId: storageId as Id<"_storage">,
          title,
          artist,
        });

        setUploadState("success");
        return true;
      } catch (error) {
        setUploadState("error");
        setErrorMessage(
          error instanceof Error ? error.message : "Upload error"
        );
        return false;
      }
    },
    [createTrack, generateUploadUrl]
  );

  return {
    tracks: normalizedTracks,
    uploadState,
    errorMessage,
    uploadTrack,
    hasLoaded: tracks !== undefined,
  };
};
