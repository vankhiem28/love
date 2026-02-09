"use client";

import { useEffect, useMemo, useState } from "react";
import type { MusicTrack } from "../types";
import { usePlaylistPlayer } from "../hooks/usePlaylistPlayer";
import { useMusicLibrary } from "../hooks/useMusicLibrary";

type MusicPlayerProps = {
  tracks: MusicTrack[];
};

export const MusicPlayer = ({ tracks }: MusicPlayerProps) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadArtist, setUploadArtist] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const { tracks: libraryTracks, uploadState, errorMessage, uploadTrack, hasLoaded } =
    useMusicLibrary();

  const playlistTracks = useMemo(() => {
    if (hasLoaded && libraryTracks.length > 0) {
      return libraryTracks;
    }
    return tracks;
  }, [hasLoaded, libraryTracks, tracks]);

  useEffect(() => {
    if (!isUploadOpen) {
      return;
    }
    setUploadMessage(null);
  }, [isUploadOpen]);
  const {
    currentTrack,
    currentIndex,
    isPlaying,
    isReady,
    toggle,
    selectTrack,
    next,
    prev,
  } = usePlaylistPlayer({
    tracks: playlistTracks,
    loop: true,
    autoStartOnInteraction: true,
  });

  const handleUpload = async () => {
    if (!uploadFile || !uploadTitle.trim()) {
      setUploadMessage("Vui lòng chọn file và nhập tên bài.");
      return;
    }

    const success = await uploadTrack(
      uploadFile,
      uploadTitle.trim(),
      uploadArtist.trim() ? uploadArtist.trim() : undefined
    );

    if (success) {
      setUploadMessage("Đã upload bài mới!");
      setUploadTitle("");
      setUploadArtist("");
      setUploadFile(null);
      setIsUploadOpen(false);
    } else {
      setUploadMessage(errorMessage ?? "Upload thất bại.");
    }
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-6 sm:w-[360px]">
      <div className="music-panel rounded-3xl border border-white/60 bg-white/70 px-3 py-2 shadow-[0_20px_45px_rgba(93,64,80,0.2)] backdrop-blur sm:px-4 sm:py-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={prev}
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/80 text-xs font-semibold uppercase tracking-[0.25em] text-[#7b4a5b] transition hover:-translate-y-0.5 sm:flex"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => void toggle()}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f5cfe0] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7b4a5b] shadow-[0_10px_25px_rgba(245,207,224,0.6)] transition hover:-translate-y-0.5 sm:h-12 sm:w-12 sm:text-sm"
          >
            {isPlaying ? "Stop" : "Play"}
          </button>
          <button
            type="button"
            onClick={next}
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/80 text-xs font-semibold uppercase tracking-[0.25em] text-[#7b4a5b] transition hover:-translate-y-0.5 sm:flex"
          >
            Next
          </button>
          <div className="min-w-0 flex-1">
            <div className="hidden sm:block">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#9a6b7b]">
                {isReady ? (isPlaying ? "Đang phát" : "Tạm dừng") : "Đang tải"}
              </div>
              <div className="truncate text-sm font-semibold text-[#5a2f3a]">
                {currentTrack.title}
              </div>
              <div className="truncate text-[11px] text-[#8b5a6b]">
                {currentTrack.artist ?? "Playlist của tụi mình"}
              </div>
            </div>
            <div className="sm:hidden">
              <div className="text-[9px] uppercase tracking-[0.25em] text-[#9a6b7b]">
                {isReady ? (isPlaying ? "Đang phát" : "Tạm dừng") : "Đang tải"}
              </div>
              <div className="truncate text-xs font-semibold text-[#5a2f3a]">
                {currentTrack.title}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsListOpen((prevOpen) => !prevOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/80 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#7b4a5b] transition hover:-translate-y-0.5 sm:h-10 sm:w-10 sm:text-[10px]"
          >
            List
          </button>
        </div>
        <div className="mt-3 hidden items-center justify-between sm:flex">
          <div className="text-[11px] text-[#9a6b7b]">
            {currentIndex + 1}/{playlistTracks.length} bài
          </div>
          {isPlaying ? (
            <div className="music-bars">
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={`bar-${index}`}
                  className="music-bar"
                  style={{ animationDelay: `${index * 0.15}s` }}
                />
              ))}
            </div>
          ) : (
            <div className="text-[11px] text-[#9a6b7b]">
              Chạm để bật nhạc
            </div>
          )}
        </div>
      </div>
      {isListOpen ? (
        <div className="mt-2 max-h-[50vh] overflow-y-auto rounded-3xl border border-white/60 bg-white/80 p-3 shadow-[0_18px_40px_rgba(93,64,80,0.18)] backdrop-blur sm:mt-3 sm:max-h-none">
          <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-[#9a6b7b]">
            <span>Danh sách</span>
            <button
              type="button"
              onClick={() => setIsUploadOpen(true)}
              className="rounded-full border border-white/60 bg-white/80 px-3 py-1 text-[9px] font-semibold tracking-[0.25em] text-[#7b4a5b]"
            >
              Upload
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {playlistTracks.map((track, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => selectTrack(index)}
                  className={`flex items-center justify-between rounded-2xl border px-3 py-2 text-left text-xs transition ${
                    isActive
                      ? "border-[#f1b7cf] bg-[#ffeef5] text-[#6a3948]"
                      : "border-white/70 bg-white/70 text-[#7b4a5b] hover:-translate-y-0.5"
                  }`}
                >
                  <div className="min-w-0">
                    <div className="truncate font-semibold">{track.title}</div>
                    <div className="truncate text-[10px] text-[#9a6b7b]">
                      {track.artist ?? "Playlist của tụi mình"}
                    </div>
                  </div>
                  {isActive ? (
                    <span className="ml-3 text-[10px] uppercase tracking-[0.25em] text-[#c96b88]">
                      Now
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
      {isUploadOpen ? (
        <div className="mt-2 max-h-[60vh] overflow-y-auto rounded-3xl border border-white/60 bg-white/90 p-4 shadow-[0_18px_40px_rgba(93,64,80,0.18)] backdrop-blur sm:mt-3 sm:max-h-none">
          <div className="mb-3 text-[10px] uppercase tracking-[0.35em] text-[#9a6b7b]">
            Upload bài nhạc
          </div>
          <div className="flex flex-col gap-3 text-xs text-[#7b4a5b]">
            <label className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#9a6b7b]">
                Tên bài
              </span>
              <input
                value={uploadTitle}
                onChange={(event) => setUploadTitle(event.target.value)}
                className="rounded-2xl border border-white/70 bg-white/80 px-3 py-2 text-sm text-[#5a2f3a] focus:outline-none"
                placeholder="Nhập tên bài"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#9a6b7b]">
                Nghệ sĩ (tuỳ chọn)
              </span>
              <input
                value={uploadArtist}
                onChange={(event) => setUploadArtist(event.target.value)}
                className="rounded-2xl border border-white/70 bg-white/80 px-3 py-2 text-sm text-[#5a2f3a] focus:outline-none"
                placeholder="Nhập nghệ sĩ"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#9a6b7b]">
                File nhạc
              </span>
              <input
                type="file"
                accept="audio/*"
                onChange={(event) =>
                  setUploadFile(event.target.files?.[0] ?? null)
                }
                className="text-xs text-[#7b4a5b]"
              />
            </label>
            {uploadMessage ? (
              <div className="text-[11px] text-[#c96b88]">{uploadMessage}</div>
            ) : null}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsUploadOpen(false)}
                className="rounded-full border border-white/70 bg-white/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7b4a5b]"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={() => void handleUpload()}
                className="rounded-full bg-[#f5cfe0] px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#7b4a5b] shadow-[0_10px_25px_rgba(245,207,224,0.6)]"
              >
                {uploadState === "uploading" ? "Đang tải..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
