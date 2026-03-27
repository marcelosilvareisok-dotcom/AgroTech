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
    <div className="fixed inset-0 bg-black z-[100] flex flex-col animate-in fade-in duration-300">
      <div className="p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent text-white absolute top-0 left-0 right-0 z-10">
        <h3 className="font-bold text-lg">{title}</h3>
        <button onClick={() => { stopCamera(); onClose(); }} className="p-2 bg-black/50 rounded-full hover:bg-white/20 transition-colors">
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        {/* Marcador de foco visual */}
        <div className="absolute inset-0 border-[1px] border-white/20 m-12 rounded-2xl shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] pointer-events-none flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-white/50 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="p-8 bg-gradient-to-t from-black/90 to-transparent absolute bottom-0 left-0 right-0 flex justify-center items-center">
        <button 
          onClick={handleCapture} 
          disabled={isProcessing}
          className={`w-20 h-20 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center transition-transform active:scale-95 ${isProcessing ? 'opacity-50' : 'hover:scale-105'}`}
        >
          {isProcessing ? (
            <RefreshCw className="w-8 h-8 text-green-600 animate-spin" />
          ) : (
            <Camera className="w-10 h-10 text-black" />
          )}
        </button>
      </div>
    </div>
  );
}
