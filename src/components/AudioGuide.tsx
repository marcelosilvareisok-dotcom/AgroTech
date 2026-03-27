import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioGuideProps {
  text: string;
}

export function AudioGuide({ text }: AudioGuideProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const toggleAudio = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 group">
      <div className={`absolute -inset-1 rounded-full blur transition duration-500 ${isPlaying ? 'bg-green-500 opacity-70 animate-pulse' : 'bg-gradient-to-r from-green-500 to-emerald-500 opacity-40 group-hover:opacity-70'}`}></div>
      <button
        onClick={toggleAudio}
        className={`relative p-4 rounded-full shadow-xl transition-all flex items-center gap-3 border ${
          isPlaying 
            ? 'bg-[#1a1a1a] text-green-400 border-green-500 scale-105' 
            : 'bg-[#111] text-green-400 border-green-500/50 hover:bg-[#1a1a1a] hover:scale-105 hover:border-green-400'
        }`}
        title="Ouvir instruções em áudio"
      >
        {isPlaying ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        <span className="font-bold uppercase tracking-wider text-xs hidden md:inline pr-2">
          {isPlaying ? 'Parar Áudio' : 'Ouvir Instruções'}
        </span>
      </button>
    </div>
  );
}
