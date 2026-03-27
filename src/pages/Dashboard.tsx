import React from 'react';
import { ChevronDown, Github } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

export function Dashboard() {
  const { profile } = useAppContext();
  
  // Split name into first and last for the typography effect
  const nameParts = profile.name.split(' ');
  const firstName = nameParts[0] || 'Seu';
  const lastName = nameParts.slice(1).join(' ') || 'Nome';

  return (
    <div className="pt-12 md:pt-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#222] bg-[#111] text-xs font-medium text-gray-400 tracking-wide mb-8">
        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
        DESENVOLVEDOR & AUTOMAÇÃO COM IA
      </div>

      {/* Typography */}
      <h1 className="text-[5rem] md:text-[8rem] leading-[0.85] font-bold tracking-tighter">
        <span className="text-white block">{firstName}</span>
        <span className="text-[#555] block">{lastName}</span>
      </h1>

      {/* Subtitle */}
      <p className="mt-8 text-lg md:text-xl text-[#888] max-w-2xl leading-relaxed font-light">
        Especialista em <span className="text-white font-normal">Automação, Agentes de IA e Desenvolvimento</span> com experiência em otimização de processos, integrações via API e soluções No-code/Low-code.
      </p>

      {/* Stats */}
      <div className="flex flex-wrap gap-12 md:gap-20 mt-16">
        <div>
          <p className="text-xs tracking-widest text-[#666] uppercase font-semibold mb-2">Projetos</p>
          <p className="text-5xl md:text-6xl font-bold text-white tracking-tighter">2+</p>
        </div>
        <div>
          <p className="text-xs tracking-widest text-[#666] uppercase font-semibold mb-2">Automações</p>
          <p className="text-5xl md:text-6xl font-bold text-white tracking-tighter">10+</p>
        </div>
        <div>
          <p className="text-xs tracking-widest text-[#666] uppercase font-semibold mb-2">Agentes IA</p>
          <p className="text-5xl md:text-6xl font-bold text-white tracking-tighter">5+</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mt-16">
        <button className="bg-white hover:bg-gray-200 text-black px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-colors">
          <ChevronDown className="w-5 h-5" /> Ver Projetos
        </button>
        <button className="bg-[#111] hover:bg-[#222] border border-[#333] text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-colors">
          <Github className="w-5 h-5" /> GitHub
        </button>
      </div>

      {/* Floating Bottom Button */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="relative group cursor-pointer">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-500"></div>
          <button className="relative bg-black border border-[#333] text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 tracking-wide">
            ❤️ PROJETOS INABALÁVEIS ❤️ 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
