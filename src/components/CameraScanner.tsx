import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw } from 'lucide-react';

interface CameraScannerProps {
  onCapture: (base64Image: string) => void;
  onClose: () => void;
  title?: string;
}

export function CameraScanner({ onCapture, onClose, title = "Escanear" }: CameraScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Erro ao acessar a câmera:", err);
      alert("Não foi possível acessar a câmera. Verifique as permissões.");
      onClose();
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleCapture = () => {
    if (videoRef.current && !isProcessing) {
      setIsProcessing(true);
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        // Pega apenas os dados base64 sem o prefixo data:image/jpeg;base64,
        const base64Image = canvas.toDataURL('image/jpeg', 0.8).split(',')[1]; 
        stopCamera();
        onCapture(base64Image);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-[#050505] z-[100] flex flex-col animate-in fade-in duration-300">
      <div className="p-4 flex justify-between items-center bg-gradient-to-b from-[#050505]/90 to-transparent text-white absolute top-0 left-0 right-0 z-10">
        <h3 className="font-black text-lg tracking-wide uppercase">{title}</h3>
        <button onClick={() => { stopCamera(); onClose(); }} className="p-2 bg-[#111] border border-[#333] rounded-full hover:bg-[#1a1a1a] hover:text-green-400 transition-colors">
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <div className="flex-1 relative bg-[#050505] flex items-center justify-center overflow-hidden">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        {/* Marcador de foco visual */}
        <div className="absolute inset-0 border-[2px] border-green-500/30 m-12 rounded-2xl shadow-[0_0_0_9999px_rgba(5,5,5,0.7)] pointer-events-none flex items-center justify-center relative">
          <div className="absolute -inset-1 bg-green-500/20 blur-xl rounded-2xl"></div>
          <div className="w-16 h-16 border-4 border-green-400/50 rounded-full animate-pulse shadow-[0_0_15px_rgba(74,222,128,0.5)]"></div>
        </div>
      </div>

      <div className="p-8 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent absolute bottom-0 left-0 right-0 flex justify-center items-center">
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur opacity-50 group-hover:opacity-80 transition duration-500"></div>
          <button 
            onClick={handleCapture} 
            disabled={isProcessing}
            className={`relative w-20 h-20 bg-[#111] rounded-full border-4 border-green-500/50 flex items-center justify-center transition-transform active:scale-95 ${isProcessing ? 'opacity-50' : 'hover:scale-105 hover:border-green-400'}`}
          >
            {isProcessing ? (
              <RefreshCw className="w-8 h-8 text-green-400 animate-spin" />
            ) : (
              <Camera className="w-10 h-10 text-green-400" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
