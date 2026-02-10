"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useWhisperChat, WhisperAuthor } from "../hooks/useWhisperChat";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const AUTHOR_LABEL: Record<WhisperAuthor, string> = {
  anh: "Anh",
  em: "Em",
};

export const WhisperChatSection = () => {
  const { messages, isSending, error, hasLoaded, sendMessage, markRead, isRead } =
    useWhisperChat();
  const [text, setText] = useState("");
  const [author, setAuthor] = useState<WhisperAuthor>("anh");

  const visibleMessages = useMemo(
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
    <section className="relative overflow-hidden bg-[#fff8fb] py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#ffe6f2_0%,_transparent_60%)] opacity-80" />
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#ffe3f1]/70 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#e9defa]/70 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Whisper"
            title="Chat thì thầm"
            subtitle="Tin nhắn sẽ tan sau 24 giờ hoặc ngay khi em mở ra."
          />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="relative overflow-hidden rounded-[30px] border border-white/80 bg-white/90 p-6 shadow-[0_26px_70px_rgba(93,64,80,0.16)]">
              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#ffe3f1]/70 blur-2xl" />
              <div className="pointer-events-none absolute -left-12 bottom-0 h-28 w-28 rounded-full bg-[#e9defa]/70 blur-2xl" />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#b07a8a]">
                  Hộp thư thì thầm
                </span>
                <span className="rounded-full border border-[#f3cfe0] bg-[#fff7fb] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#b07a8a]">
                  {visibleMessages.length} tin mới
                </span>
              </div>

              <div className="mt-6 flex max-h-[360px] flex-col gap-4 overflow-y-auto pr-1">
                {!hasLoaded ? (
                  <div className="space-y-3">
                    {[0, 1, 2].map((index) => (
                      <div
                        key={`loading-${index}`}
                        className="h-12 rounded-2xl border border-white/80 bg-[#f8e8ef] animate-pulse"
                      />
                    ))}
                  </div>
                ) : visibleMessages.length === 0 ? (
                  <div className="rounded-2xl border border-white/80 bg-white/80 px-4 py-6 text-center text-sm text-[#8a5d6d]">
                    Hôm nay chưa có thì thầm nào. Gửi một câu trước nhé.
                  </div>
                ) : (
                  visibleMessages.map((message) => {
                    const isMine = message.author === "anh";
                    return (
                      <button
                        key={message._id}
                        type="button"
                        onClick={() => markRead(message._id)}
                        className={`group relative max-w-[85%] rounded-3xl border px-4 py-3 text-left text-sm shadow-[0_12px_30px_rgba(93,64,80,0.12)] transition hover:-translate-y-0.5 ${
                          isMine
                            ? "ml-auto border-[#f3cfe0] bg-[radial-gradient(circle_at_top,_#ffe8f1,_#fffafc_70%)] text-[#4b2b36]"
                            : "border-white/80 bg-white/85 text-[#5a2f3a]"
                        }`}
                      >
                        <div className="mb-1 text-[10px] uppercase tracking-[0.3em] text-[#b07a8a]">
                          {AUTHOR_LABEL[message.author]}
                        </div>
                        <p className="text-sm font-semibold">
                          {message.text}
                        </p>
                        <span className="mt-2 block text-[9px] uppercase tracking-[0.3em] text-[#c48b9d]">
                          Chạm để mở & tan
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="relative rounded-[30px] border border-white/80 bg-white/90 p-6 shadow-[0_26px_70px_rgba(93,64,80,0.16)]">
              <div className="pointer-events-none absolute -right-12 -top-10 h-24 w-24 rounded-full bg-[#ffe3f1]/70 blur-2xl" />
              <div className="pointer-events-none absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-[#e9defa]/70 blur-2xl" />

              <p className="text-[10px] uppercase tracking-[0.35em] text-[#b07a8a]">
                Gửi thì thầm mới
              </p>
              <h3 className="mt-3 font-display text-2xl text-[#4b2b36]">
                Gửi một câu dễ thương
              </h3>
              <p className="mt-2 text-sm text-[#7b4a5b]">
                Tin nhắn sẽ biến mất sau 24 giờ, hoặc ngay khi người kia mở ra.
              </p>

              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(AUTHOR_LABEL) as WhisperAuthor[]).map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setAuthor(value)}
                      className={`rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] transition ${
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
                  className="min-h-[120px] w-full rounded-3xl border border-white/80 bg-white/80 px-4 py-3 text-sm text-[#5a2f3a] outline-none transition focus:border-[#f1b7cf]"
                  placeholder="Viết một câu thì thầm..."
                />
                {error ? (
                  <p className="text-sm text-[#c1667f]">{error}</p>
                ) : null}
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full rounded-full bg-[#4b2b36] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-[0_14px_30px_rgba(75,43,54,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSending ? "Đang gửi..." : "Gửi thì thầm"}
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
