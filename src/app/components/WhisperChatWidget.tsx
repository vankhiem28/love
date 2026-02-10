"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useWhisperChat, WhisperAuthor } from "../hooks/useWhisperChat";

const AUTHOR_LABEL: Record<WhisperAuthor, string> = {
  anh: "Anh",
  em: "Em",
};

export const WhisperChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [author, setAuthor] = useState<WhisperAuthor>("anh");
  const { messages, isSending, error, hasLoaded, sendMessage, markRead, isRead } =
    useWhisperChat();

  const unreadMessages = useMemo(
    () => messages.filter((message) => !isRead(message._id)),
    [messages, isRead]
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ok = await sendMessage(text, author);
    if (ok) {
      setText("");
    }
  };

  return (
    <div className="fixed right-4 top-4 z-[70] flex flex-col items-end gap-3 sm:right-6 sm:top-6">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-start sm:justify-end sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Đóng chat"
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/15"
            />
            <motion.div
              className="relative flex w-full max-w-[420px] flex-col overflow-hidden rounded-[28px] border border-white/80 bg-white/94 shadow-[0_24px_60px_rgba(93,64,80,0.2)] backdrop-blur sm:mt-14 sm:h-[70vh]"
              initial={{ y: 18, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 12, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center justify-between border-b border-white/80 px-5 py-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.32em] text-[#b07a8a]">
                    Chat thì thầm
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#4b2b36]">
                    Tan sau 24h
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-[#f1c7d6] px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-[#b07a8a]"
                >
                  Đóng
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-4">
                {!hasLoaded ? (
                  <div className="space-y-3">
                    {[0, 1, 2].map((index) => (
                      <div
                        key={`loading-${index}`}
                        className="h-12 rounded-2xl border border-white/80 bg-[#f8e8ef] animate-pulse"
                      />
                    ))}
                  </div>
                ) : unreadMessages.length === 0 ? (
                  <div className="rounded-2xl border border-white/80 bg-white/80 px-4 py-6 text-center text-sm text-[#8a5d6d]">
                    Hôm nay chưa có thì thầm nào. Gửi một câu trước nhé.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {unreadMessages.map((message) => (
                      <button
                        key={message._id}
                        type="button"
                        onClick={() => markRead(message._id)}
                        className={`w-full rounded-2xl border px-4 py-3 text-left text-sm shadow-[0_12px_30px_rgba(93,64,80,0.12)] transition hover:-translate-y-0.5 ${
                          message.author === "anh"
                            ? "border-[#f3cfe0] bg-[radial-gradient(circle_at_top,_#ffe8f1,_#fffafc_70%)] text-[#4b2b36]"
                            : "border-white/80 bg-white/85 text-[#5a2f3a]"
                        }`}
                      >
                        <div className="mb-1 text-[10px] uppercase tracking-[0.3em] text-[#b07a8a]">
                          {AUTHOR_LABEL[message.author]}
                        </div>
                        <p className="text-sm font-semibold">{message.text}</p>
                        <span className="mt-2 block text-[9px] uppercase tracking-[0.28em] text-[#c48b9d]">
                          Chạm để mở & tan
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <form
                className="border-t border-white/80 bg-white/90 px-5 py-4"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(AUTHOR_LABEL) as WhisperAuthor[]).map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setAuthor(value)}
                      className={`rounded-full border px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] transition ${
                        author === value
                          ? "border-[#f1b7cf] bg-[#ffeef5] text-[#6a3948]"
                          : "border-white/70 bg-white/80 text-[#7b4a5b]"
                      }`}
                    >
                      {AUTHOR_LABEL[value]}
                    </button>
                  ))}
                </div>
                <textarea
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  className="mt-3 min-h-[120px] w-full resize-none rounded-3xl border border-white/80 bg-white/80 px-4 py-3 text-sm text-[#5a2f3a] outline-none transition focus:border-[#f1b7cf]"
                  placeholder="Viết một câu thì thầm..."
                />
                {error ? (
                  <p className="mt-2 text-sm text-[#c1667f]">{error}</p>
                ) : null}
                <button
                  type="submit"
                  disabled={isSending}
                  className="mt-3 w-full rounded-full bg-[#4b2b36] px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-[0_12px_24px_rgba(75,43,54,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSending ? "Đang gửi..." : "Gửi thì thầm"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/80 bg-white/90 text-2xl text-[#b8647f] shadow-[0_16px_40px_rgba(93,64,80,0.18)] backdrop-blur transition hover:-translate-y-0.5"
      >
        <span className="absolute inset-0 rounded-full pulse-ring" />
        🤫
        {unreadMessages.length > 0 ? (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#ff7aa2] px-1 text-[10px] font-semibold text-white ring-2 ring-white">
            {unreadMessages.length}
          </span>
        ) : null}
      </button>
    </div>
  );
};
