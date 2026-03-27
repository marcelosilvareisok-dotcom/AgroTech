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
    <button
      onClick={toggleAudio}
      className={`fixed bottom-6 right-6 p-4 rounded-full shadow-xl transition-all z-40 flex items-center gap-3 ${
        isPlaying 
          ? 'bg-green-800 text-white animate-pulse scale-105' 
          : 'bg-green-600 text-white hover:bg-green-700 hover:scale-105'
      }`}
      title="Ouvir instruções em áudio"
    >
      {isPlaying ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
      <span className="font-medium hidden md:inline pr-2">
        {isPlaying ? 'Parar Áudio' : 'Ouvir Instruções'}
      </span>
    </button>
  );
}
