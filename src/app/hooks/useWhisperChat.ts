"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const READ_STORAGE_KEY = "whisper-read";

export type WhisperAuthor = "anh" | "em";

export type WhisperMessage = {
  _id: string;
  text: string;
  author: WhisperAuthor;
  createdAt: number;
  expiresAt: number;
};

export const useWhisperChat = () => {
  const messages = useQuery(api.whispers.listActiveMessages);
  const createMessage = useMutation(api.whispers.createMessage);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [readIds, setReadIds] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const stored = window.localStorage.getItem(READ_STORAGE_KEY);
    if (!stored) {
      return;
    }
    try {
      const parsed = JSON.parse(stored) as string[];
      setReadIds(parsed);
    } catch {
      setReadIds([]);
    }
  }, []);

  const persistReadIds = (next: string[]) => {
    setReadIds(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(READ_STORAGE_KEY, JSON.stringify(next));
    }
  };

  const markRead = (id: string) => {
    if (readIds.includes(id)) {
      return;
    }
    persistReadIds([...readIds, id]);
  };

  const isRead = (id: string) => readIds.includes(id);

  const orderedMessages = useMemo(() => {
    if (!messages) {
      return [] as WhisperMessage[];
    }
    const normalized = messages as WhisperMessage[];
    return [...normalized].sort((a, b) => a.createdAt - b.createdAt);
  }, [messages]);

  const sendMessage = async (text: string, author: WhisperAuthor) => {
    const trimmed = text.trim();
    if (!trimmed) {
      setError("Chưa có nội dung để gửi.");
      return false;
    }

    setIsSending(true);
    setError(null);

    try {
      await createMessage({ text: trimmed, author });
      return true;
    } catch (err) {
      setError("Gửi chưa thành công. Thử lại nhé.");
      return false;
    } finally {
      setIsSending(false);
    }
  };

  return {
    messages: orderedMessages,
    isSending,
    error,
    hasLoaded: messages !== undefined,
    sendMessage,
    markRead,
    isRead,
  };
};
