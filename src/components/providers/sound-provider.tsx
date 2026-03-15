"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playGlassCrack: () => void;
}

const SoundContext = createContext<SoundContextType>({
  isMuted: true,
  toggleMute: () => {},
  playGlassCrack: () => {},
});

export const useSound = () => useContext(SoundContext);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(true);
  const hasPlayedRef = useRef(false);
  const howlRef = useRef<{ unload: () => void; fade: (from: number, to: number, duration: number) => void } | null>(null);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const playGlassCrack = useCallback(() => {
    if (hasPlayedRef.current || isMuted) return;
    hasPlayedRef.current = true;

    // Dynamically import Howler to avoid SSR issues
    import("howler").then(({ Howl }) => {
      const sound = new Howl({
        src: ["/sounds/glass-crack.mp3"],
        volume: 0.12,
        html5: true,
      });
      howlRef.current = sound;
      sound.play();
      // Fade out after 2 seconds
      setTimeout(() => {
        sound.fade(0.12, 0, 1000);
      }, 1000);
    });
  }, [isMuted]);

  useEffect(() => {
    return () => {
      if (howlRef.current) {
        howlRef.current.unload();
      }
    };
  }, []);

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playGlassCrack }}>
      {children}
    </SoundContext.Provider>
  );
}
