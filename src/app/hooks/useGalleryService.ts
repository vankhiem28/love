"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

export type GalleryPhoto = {
  _id: string;
  url: string | null;
  caption: string;
  createdAt: number;
};

export const useGalleryService = (limit: number) => {
  const photos = useQuery(api.gallery.listPhotos, { limit });
  const generateUploadUrl = useMutation(api.gallery.generateUploadUrl);
  const createPhoto = useMutation(api.gallery.createPhoto);

  const uploadPhoto = async (file: File, caption: string) => {
    const uploadUrl = await generateUploadUrl({});

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

    await createPhoto({
      storageId: storageId as Id<"_storage">,
      caption,
    });
  };

  return {
    photos: (photos ?? []) as GalleryPhoto[],
    uploadPhoto,
  };
};
