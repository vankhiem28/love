"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FLIP_GAME_CONFIG } from "../game-config";
import { useFlipCardGame } from "../hooks/useFlipCardGame";
import { useGameAccess } from "../hooks/useGameAccess";
import { useGiftService } from "../hooks/useGiftService";

export const FlipCardGame = () => {
  const { cards, revealedId, selectedReward, handleFlip, resetGame } =
    useFlipCardGame();
  const { isLocked, playCount, registerPlay, submitPhrase } =
    useGameAccess();
  const { saveGiftOpen } = useGiftService();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const [unlockPhrase, setUnlockPhrase] = useState("");
  const [unlockError, setUnlockError] = useState("");
  const [isUnlocking, setIsUnlocking] = useState(false);

  useEffect(() => {
    if (selectedReward) {
      setIsModalOpen(true);
    }
  }, [selectedReward]);

  const handleReset = () => {
    if (isLocked) {
      setIsUnlockModalOpen(true);
      return;
    }
    resetGame();
    setIsModalOpen(false);
    setAccountNumber("");
    setSubmitError("");
    setIsSaved(false);
  };

  const handleCardFlip = async (cardId: string) => {
    if (isLocked) {
      setIsUnlockModalOpen(true);
      return;
    }

    const result = await registerPlay();
    if (result.locked) {
      setIsUnlockModalOpen(true);
      return;
    }

    handleFlip(cardId);
  };

  const handleSave = async () => {
    if (!selectedReward) {
      setSubmitError("Chưa có phần thưởng để lưu.");
      return;
    }
    if (!accountNumber.trim()) {
      setSubmitError("Vui lòng nhập số tài khoản.");
      return;
    }

    try {
      setIsSaving(true);
      setSubmitError("");
      await saveGiftOpen({
        rewardLabel: selectedReward,
        accountNumber: accountNumber.trim(),
      });
      setIsSaved(true);
    } catch (error) {
      setSubmitError("Lưu chưa thành công. Thử lại nhé.");
    } finally {
      setIsSaving(false);
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
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-full border border-[#f1c7d6] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#7b4a5b] transition hover:border-[#e8a6bf]"
          >
            Chơi lại
          </button>
          <span className="text-xs uppercase tracking-[0.3em] text-[#b08998]">
            {playCount}/{FLIP_GAME_CONFIG.maxPlays} lượt
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {cards.map((card) => {
          const isRevealed = revealedId === card.id;
          const isDisabled = revealedId !== null && !isRevealed;

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

      <p className="mt-4 text-sm text-[#7a5564]">
        Chọn một thẻ và lật để mở món quà nho nhỏ nhé.
      </p>

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
                Em trúng {selectedReward}
              </h4>
              <p className="mt-2 text-sm text-[#6d4b5a]">
                Nhập số tài khoản để anh gửi món quà nhỏ nhé.
              </p>
              <input
                className="mt-5 w-full rounded-full border border-[#f1c7d6] bg-white px-5 py-3 text-center text-base text-[#4b2b36] outline-none transition focus:border-[#e8a6bf] focus:ring-2 focus:ring-[#f7d3e1]"
                placeholder="Số tài khoản"
                value={accountNumber}
                onChange={(event) => setAccountNumber(event.target.value)}
              />
              {submitError ? (
                <p className="mt-3 text-sm text-[#c1667f]">{submitError}</p>
              ) : null}
              {isSaved ? (
                <p className="mt-3 text-sm text-[#5c8a7b]">
                  Đã lưu rồi nhé. Anh sẽ chuyển quà liền.
                </p>
              ) : null}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full border border-[#f1c7d6] bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#7b4a5b]"
                >
                  Để sau
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving || isSaved}
                  className="rounded-full bg-[#4b2b36] px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? "Đang lưu..." : isSaved ? "Đã lưu" : "Lưu lại"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isUnlockModalOpen ? (
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
                Hết lượt rồi
              </p>
              <h4 className="font-display mt-2 text-2xl text-[#4b2b36]">
                Nhập câu mở khóa
              </h4>
              <p className="mt-2 text-sm text-[#6d4b5a]">
                Gợi ý: {FLIP_GAME_CONFIG.unlockPhrase}
              </p>
              <input
                className="mt-5 w-full rounded-full border border-[#f1c7d6] bg-white px-5 py-3 text-center text-base text-[#4b2b36] outline-none transition focus:border-[#e8a6bf] focus:ring-2 focus:ring-[#f7d3e1]"
                placeholder="Nhập câu mở khóa"
                value={unlockPhrase}
                onChange={(event) => {
                  setUnlockPhrase(event.target.value);
                  setUnlockError("");
                }}
              />
              {unlockError ? (
                <p className="mt-3 text-sm text-[#c1667f]">{unlockError}</p>
              ) : null}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsUnlockModalOpen(false)}
                  className="rounded-full border border-[#f1c7d6] bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#7b4a5b]"
                >
                  Để sau
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    setIsUnlocking(true);
                    const result = await submitPhrase(unlockPhrase);
                    if (!result.ok) {
                      setUnlockError(result.error ?? "Không đúng rồi.");
                      setIsUnlocking(false);
                      return;
                    }
                    setUnlockPhrase("");
                    setUnlockError("");
                    setIsUnlockModalOpen(false);
                    setIsUnlocking(false);
                    resetGame();
                  }}
                  disabled={isUnlocking}
                  className="rounded-full bg-[#4b2b36] px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isUnlocking ? "Đang mở..." : "Mở thêm lượt"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
