"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FLIP_GAME_CONFIG } from "../game-config";
import { useFlipCardGame } from "../hooks/useFlipCardGame";
import { useGameAccess } from "../hooks/useGameAccess";
import { useGiftService } from "../hooks/useGiftService";

export const FlipCardGame = () => {
  const { cards, revealedId, selectedReward, handleFlip } = useFlipCardGame();
  const { isLocked, playCount, registerPlay } = useGameAccess();
  const { saveFixedGiftOpen } = useGiftService();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    if (selectedReward) {
      setIsModalOpen(true);
    }
  }, [selectedReward]);

  const handleCardFlip = async (cardId: string) => {
    if (isLocked || revealedId || isRegistering) {
      return;
    }

    setIsRegistering(true);
    setSaveError("");

    try {
      const result = await registerPlay();
      if (result.locked) {
        return;
      }

      handleFlip(cardId);
      await saveFixedGiftOpen();
    } catch (error) {
      setSaveError("Lưu phần quà chưa kịp rồi, thử lại xíu nha.");
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="rounded-[30px] border border-white/80 bg-white/80 p-6 shadow-[0_20px_60px_rgba(94,63,78,0.12)] backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[#b07a8a]">
            Flip the card
          </p>
          <h3 className="font-display mt-2 text-2xl text-[#4b2b36]">
            Lật thẻ quà bí mật
          </h3>
          <p className="mt-2 text-xs uppercase tracking-[0.32em] text-[#b08998]">
            Chọn thật khéo nha, chỉ 1 lần thôi đó 😜
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#b08998]">
            {Math.min(playCount, FLIP_GAME_CONFIG.maxPlays)}/
            {FLIP_GAME_CONFIG.maxPlays} lượt
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {cards.map((card) => {
          const isRevealed = revealedId === card.id;
          const isDisabled =
            isLocked || (revealedId !== null && !isRevealed);

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => void handleCardFlip(card.id)}
              disabled={isDisabled}
              className={`flip-card group relative h-36 rounded-[22px] border border-white/80 bg-white/80 text-left shadow-[0_15px_40px_rgba(94,63,78,0.12)] transition ${isDisabled ? "opacity-60" : "hover:-translate-y-1"
                } ${isRevealed ? "flipped" : ""}`}
            >
              <div className="flip-card-inner h-full w-full">
                <div className="flip-card-face flex h-full flex-col items-start justify-between rounded-[22px] bg-[radial-gradient(circle_at_top,_#ffe4ec,_#fffafc_60%,_#e8e0f0)] p-4">
                  <p className="text-xs uppercase tracking-[0.32em] text-[#b07a8a]">
                    Quà bí mật
                  </p>
                  <p className="font-display text-2xl text-[#4b2b36]">
                    {card.frontLabel}
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-[#b992a1]">
                    Lật để nhận
                  </p>
                </div>
                <div className="flip-card-face flip-card-back flex h-full flex-col items-start justify-between rounded-[22px] bg-[radial-gradient(circle_at_top,_#fff4f7,_#f7e7f0_65%,_#e6d8f2)] p-4">
                  <p className="text-xs uppercase tracking-[0.32em] text-[#b07a8a]">
                    Phần quà
                  </p>
                  <p className="font-display text-2xl text-[#4b2b36]">
                    {card.rewardLabel}
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-[#b992a1]">
                    Chúc mừng em
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {isLocked ? (
        <p className="mt-4 text-sm text-[#c1667f]">
          Em bé đã hết lượt chơi. Nếu muốn chơi lại thì mở zalo và nhắn tới
          người này 🙂‍↕️ là &quot;Em Yêu Anh ❤️&quot;
          {/* <span className="ml-2 align-super text-[6px] uppercase tracking-[0.35em] text-[#d8a2b3]">
            100 lần
          </span> */}
        </p>
      ) : (
        <p className="mt-4 text-sm text-[#7a5564]">
          Chọn một thẻ và lật để mở món quà nho nhỏ nhé.
        </p>
      )}

      <AnimatePresence>
        {isModalOpen ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-md overflow-hidden rounded-[28px] bg-white p-6 text-center shadow-[0_30px_80px_rgba(95,66,80,0.25)]"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#ffe3f1]/70 blur-2xl" />
              <div className="pointer-events-none absolute -left-12 bottom-0 h-36 w-36 rounded-full bg-[#e9defa]/70 blur-2xl" />

              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#f3cfe0] bg-[#fff7fb] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#b07a8a]">
                  Quà 14-2
                </span>

                <div className="mt-4 rounded-2xl border border-white/80 bg-[radial-gradient(circle_at_top,_#ffe8f1,_#fffafc_60%,_#efe8f8)] px-5 py-4 shadow-[0_16px_40px_rgba(93,64,80,0.08)]">
                  <p className="text-[10px] uppercase tracking-[0.32em] text-[#b07a8a]">
                    Món quà của anh
                  </p>
                  <h4 className="font-display mt-2 text-3xl text-[#4b2b36]">
                    {FLIP_GAME_CONFIG.fixedRewardLabel}
                  </h4>
                </div>

                <div className="mt-4 rounded-2xl border border-[#f3cfe0] bg-white/85 px-5 py-4 text-left text-sm text-[#6d4b5a] shadow-[0_16px_40px_rgba(93,64,80,0.06)]">
                  <p className="font-semibold text-[#5a2f3a]">
                    Anh thấy rồi nhá, anh gửi liền ❤️
                  </p>
                  <p className="mt-2 leading-relaxed">
                    Năm nay mình ở xa nên anh không thể gửi quà trực tiếp cho em
                    được.
                  </p>
                  <p className="mt-2 leading-relaxed">
                    Số tiền này không lớn, nhưng là một chút quan tâm để em tự
                    thưởng cho mình — mua một món em thích, hoặc tự chọn một
                    món thật “em là em” cũng được nha.
                  </p>
                  <p className="mt-2 leading-relaxed">
                    Anh hẹn khi gặp lại sẽ bù một món quà thật dễ thương hơn nữa.
                  </p>
                </div>
              </div>
              {saveError ? (
                <p className="mt-3 text-sm text-[#c1667f]">{saveError}</p>
              ) : null}
              <div className="mt-6 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full bg-[#4b2b36] px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
