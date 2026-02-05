"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { useGalleryService } from "../hooks/useGalleryService";
const DEFAULT_LIMIT = 12;
const LOAD_MORE_STEP = 12;

export const GallerySection = () => {
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const { photos, uploadPhoto } = useGalleryService(limit);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState<{
    url: string;
    caption: string;
  } | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Chọn một tấm hình trước nhé.");
      return;
    }
    if (!caption.trim()) {
      setError("Nhập vài dòng mô tả nhé.");
      return;
    }

    try {
      setIsUploading(true);
      setError("");
      setSuccess("");
      await uploadPhoto(selectedFile, caption.trim());
      setSelectedFile(null);
      setCaption("");
      setSuccess("Đã lưu hình vào album rồi nhé.");
    } catch (uploadError) {
      setError("Upload chưa thành công, thử lại nhé.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className="relative bg-[#fffafc] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Gallery"
            title="Album của tụi mình"
            subtitle="Thêm hình và vài dòng ghi chú để lưu lại những khoảnh khắc đẹp."
          />
        </Reveal>

        <div className="mt-12 grid gap-6">
          <Reveal>
            <div className="flex items-center justify-between rounded-[22px] border border-white/80 bg-white/80 px-5 py-4 shadow-[0_16px_45px_rgba(93,64,80,0.12)] backdrop-blur">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[#b07a8a]">
                  Album
                </p>
                <h3 className="font-display mt-2 text-2xl text-[#4b2b36]">
                  Kho ảnh của tụi mình
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(true)}
                className="rounded-full bg-[#4b2b36] px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white"
              >
                Thêm hình
              </button>
            </div>
          </Reveal>

          <Reveal>
            {photos.length === 0 ? (
              <div className="rounded-[22px] border border-dashed border-[#f1c7d6] bg-white/70 p-6 text-center text-sm text-[#b08998]">
                Album đang trống, em thử thêm hình nhé ❤️.
              </div>
            ) : (
              <div className="columns-2 gap-4 lg:columns-3">
                {photos.map((photo) => (
                  <div
                    key={photo._id}
                    className="mb-4 break-inside-avoid rounded-[22px] border border-white/70 bg-white/80 p-3 shadow-[0_12px_30px_rgba(93,64,80,0.12)]"
                    style={{ breakInside: "avoid" }}
                  >
                    {photo.url ? (
                      <button
                        type="button"
                        onClick={() =>
                          setPreviewPhoto({
                            url: photo.url ?? "",
                            caption: photo.caption,
                          })
                        }
                        className="w-full"
                      >
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          className="w-full rounded-[18px] object-cover"
                          loading="lazy"
                        />
                      </button>
                    ) : (
                      <div className="h-40 w-full rounded-[18px] bg-[#f9edf2]" />
                    )}
                    <p className="mt-3 text-sm text-[#6f4e5d]">{photo.caption}</p>
                  </div>
                ))}
              </div>
            )}
            {isLoadingMore ? (
              <div className="columns-2 gap-4 lg:columns-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="mb-4 break-inside-avoid rounded-[22px] border border-white/70 bg-white/80 p-3 shadow-[0_12px_30px_rgba(93,64,80,0.12)]"
                    style={{ breakInside: "avoid" }}
                  >
                    <div className="h-40 w-full animate-pulse rounded-[18px] bg-[#f6e9ef]" />
                    <div className="mt-3 h-4 w-3/4 animate-pulse rounded-full bg-[#f3dde7]" />
                  </div>
                ))}
              </div>
            ) : null}
            {photos.length >= limit ? (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    const preserveY = window.scrollY;
                    setIsLoadingMore(true);
                    setLimit((current) => current + LOAD_MORE_STEP);
                    window.requestAnimationFrame(() => {
                      window.scrollTo({ top: preserveY });
                      window.setTimeout(() => setIsLoadingMore(false), 350);
                    });
                  }}
                  className="rounded-full border border-[#f1c7d6] bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#7b4a5b]"
                >
                  Xem thêm
                </button>
              </div>
            ) : null}
          </Reveal>
        </div>
      </div>
      <AnimatePresence>
        {isUploadModalOpen ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsUploadModalOpen(false)}
          >
            <motion.div
              className="w-full max-w-md rounded-[26px] bg-white p-6 shadow-[0_30px_80px_rgba(95,66,80,0.25)]"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            >
              <p className="text-xs uppercase tracking-[0.35em] text-[#b07a8a]">
                Thêm hình
              </p>
              <h4 className="font-display mt-2 text-2xl text-[#4b2b36]">
                Lưu thêm kỷ niệm
              </h4>
              <div className="mt-5 space-y-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0] ?? null;
                    setSelectedFile(file);
                    setError("");
                    setSuccess("");
                  }}
                  className="w-full rounded-2xl border border-[#f1c7d6] bg-white px-4 py-2 text-xs text-[#6f4e5d]"
                />
                <textarea
                  value={caption}
                  onChange={(event) => {
                    setCaption(event.target.value);
                    setError("");
                    setSuccess("");
                  }}
                  rows={3}
                  placeholder="Ghi chú nhỏ cho tấm hình..."
                  className="w-full rounded-2xl border border-[#f1c7d6] bg-white px-4 py-2 text-xs text-[#6f4e5d] outline-none focus:border-[#e8a6bf] focus:ring-2 focus:ring-[#f7d3e1]"
                />
                {error ? (
                  <p className="text-sm text-[#c1667f]">{error}</p>
                ) : null}
                {success ? (
                  <p className="text-sm text-[#5c8a7b]">{success}</p>
                ) : null}
                <div className="flex flex-wrap items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(false)}
                    className="rounded-full border border-[#f1c7d6] px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#7b4a5b]"
                  >
                    Đóng
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      await handleUpload();
                      if (!error) {
                        setIsUploadModalOpen(false);
                      }
                    }}
                    disabled={isUploading}
                    className="rounded-full bg-[#4b2b36] px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isUploading ? "Đang lưu..." : "Lưu vào album"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
        {previewPhoto ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewPhoto(null)}
          >
            <motion.div
              className="max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-[26px] bg-white shadow-[0_30px_80px_rgba(95,66,80,0.25)]"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex max-h-[75vh] w-full items-center justify-center bg-[#f9edf2]">
                <img
                  src={previewPhoto.url}
                  alt={previewPhoto.caption}
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                />
              </div>
              <div className="flex items-center justify-between gap-3 px-5 py-4">
                <p className="text-sm text-[#6f4e5d]">{previewPhoto.caption}</p>
                <button
                  type="button"
                  onClick={() => setPreviewPhoto(null)}
                  className="rounded-full border border-[#f1c7d6] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#7b4a5b]"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
};
