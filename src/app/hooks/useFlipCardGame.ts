"use client";

import { useCallback, useMemo, useState } from "react";
import {
  FLIP_CARD_FRONT_LABELS,
  FLIP_CARD_REWARD_LABELS,
} from "../content";

type FlipCard = {
  id: string;
  frontLabel: string;
  rewardLabel: string;
};

const shuffle = <T,>(items: T[]) => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const buildDeck = (): FlipCard[] => {
  const rewards = shuffle(FLIP_CARD_REWARD_LABELS);
  return FLIP_CARD_FRONT_LABELS.map((frontLabel, index) => ({
    id: `${index}-${frontLabel}`,
    frontLabel,
    rewardLabel: rewards[index] ?? rewards[0],
  }));
};

export const useFlipCardGame = () => {
  const [cards, setCards] = useState<FlipCard[]>(() => buildDeck());
  const [revealedId, setRevealedId] = useState<string | null>(null);
  const [selectedReward, setSelectedReward] = useState<string | null>(null);

  const revealedCard = useMemo(
    () => cards.find((card) => card.id === revealedId) ?? null,
    [cards, revealedId]
  );

  const handleFlip = useCallback(
    (cardId: string) => {
      if (revealedId) {
        return;
      }
      const selected = cards.find((card) => card.id === cardId);
      if (!selected) {
        return;
      }
      setRevealedId(cardId);
      setSelectedReward(selected.rewardLabel);
    },
    [cards, revealedId]
  );

  const resetGame = useCallback(() => {
    setCards(buildDeck());
    setRevealedId(null);
    setSelectedReward(null);
  }, []);

  return {
    cards,
    revealedId,
    revealedCard,
    selectedReward,
    handleFlip,
    resetGame,
  };
};
