"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { CountdownGate } from "./components/CountdownGate";
import { COUNTDOWN_TARGET } from "./content";
import { EndingSection } from "./components/EndingSection";
import { GallerySection } from "./components/GallerySection";
import { GameSection } from "./components/GameSection";
import { HeroSection } from "./components/HeroSection";
import { MemoriesSection } from "./components/MemoriesSection";
import { PasswordGate } from "./components/PasswordGate";
import { PromiseSection } from "./components/PromiseSection";
import { StorySection } from "./components/StorySection";
import { motion } from "framer-motion";

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isCountdownDone, setIsCountdownDone] = useState(false);

  useEffect(() => {
    setIsCountdownDone(Date.now() >= COUNTDOWN_TARGET.getTime());
  }, []);

  return (
    <div className="min-h-screen bg-[#fffafc]">
      <AnimatePresence mode="wait">
        {!isCountdownDone ? (
          <CountdownGate
            key="countdown"
            onComplete={() => setIsCountdownDone(true)}
          />
        ) : null}
        {isCountdownDone && !isUnlocked ? (
          <PasswordGate key="get" onUnlock={() => setIsUnlocked(true)} />
        ) : null}
      </AnimatePresence>
      {isUnlocked ? (
        <motion.main
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <HeroSection />
          <StorySection />
          <MemoriesSection />
          <GameSection />
          <PromiseSection />
          <GallerySection />
          <EndingSection />
        </motion.main>
      ) : null}
    </div>
  );
}
