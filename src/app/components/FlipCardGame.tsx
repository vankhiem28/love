"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FLIP_GAME_CONFIG } from "../game-config";
import { useFlipCardGame } from "../hooks/useFlipCardGame";
import { useGameAccess } from "../hooks/useGameAccess";

export const FlipCardGame = () => {
  const { cards, revealedId, selectedReward, handleFlip } = useFlipCardGame();
  const { isLocked, playCount, registerPlay } = useGameAccess();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (selectedReward) {
      setIsModalOpen(true);
    }
  }, [selectedReward]);

  const handleCardFlip = async (cardId: string) => {
    if (isLocked || revealedId) {
      return;
    }

    const result = await registerPlay();
    if (result.locked) {
      return;
    }

    handleFlip(cardId);
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
          Bạn đã hết lượt chơi. Nếu muốn chơi lại thì mở zalo và nhắn tới người này 🙂‍↕️ là &quot;Em Yêu Anh ❤️&quot;
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
              className="w-full max-w-md rounded-[28px] bg-white p-6 text-center shadow-[0_30px_80px_rgba(95,66,80,0.25)]"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
            >
              <p className="text-xs uppercase tracking-[0.35em] text-[#b07a8a]">
                Quà 14-2
              </p>
              <h4 className="font-display mt-2 text-2xl text-[#4b2b36]">
                {FLIP_GAME_CONFIG.fixedRewardLabel}
              </h4>
              <p className="mt-2 text-sm text-[#6d4b5a]">
                Anh thấy rồi nhá, anh gửi liền ❤️
              </p>
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
