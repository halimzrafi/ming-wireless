"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/components/providers/sound-provider";

export function MuteToggle() {
  const { isMuted, toggleMute } = useSound();

  return (
    <button
      onClick={toggleMute}
      className="p-2 rounded-full text-[#94A3B8] hover:text-white hover:bg-white/5 transition-all"
      aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
    >
      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
    </button>
  );
}
