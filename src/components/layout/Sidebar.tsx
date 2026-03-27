import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Store, Sprout, Users, Settings, LogOut, X, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Painel', path: '/' },
  { icon: Store, label: 'Loja Agrícola', path: '/loja' },
  { icon: Sprout, label: 'Minha Fazenda', path: '/fazenda' },
  { icon: Users, label: 'Comunidade', path: '/comunidade' },
  { icon: Settings, label: 'Configurações', path: '/configuracoes' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const shareAppOnWhatsApp = () => {
    const message = `Olá Geraldo Barbosa Marinho! 🌾\n\nDescobri o *AgroTech*, uma plataforma completa para revolucionar a gestão da nossa fazenda. \n\nLá nós temos acesso a:\n✅ Loja com preços imbatíveis de fábrica\n✅ Gestão inteligente de safra e lotes\n✅ Previsão do tempo e alertas climáticos\n\nVenha fazer parte do futuro do agronegócio com a gente! 🚜🌱\n\nAcesse: https://agro-tech-pi.vercel.app/fazenda`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 md:hidden transition-opacity backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      
      <aside className={cn(
        "fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-[#0a0a0a] border-r border-[#222] text-white flex flex-col transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full blur opacity-70"></div>
              <Sprout className="w-8 h-8 text-white relative z-10" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">AgroTech</h1>
          </div>
          <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300',
                  isActive
                    ? 'bg-[#1a1a1a] text-white border border-[#333] shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                    : 'text-gray-400 hover:bg-[#111] hover:text-white border border-transparent'
                )
              }
            >
              <item.icon className={cn("w-5 h-5", "transition-colors")} />
              <span className="font-medium tracking-wide text-sm">{item.label}</span>
            </NavLink>
          ))}
          
          <div className="pt-4 mt-4 border-t border-[#222]">
            <div className="relative group cursor-pointer" onClick={shareAppOnWhatsApp}>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-40 group-hover:opacity-70 transition duration-500"></div>
              <button 
                className="relative w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-black text-white border border-[#333] transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-green-400" />
                <span className="font-bold text-sm tracking-wide text-left">Convidar Geraldo</span>
              </button>
            </div>
          </div>
        </nav>

        <div className="p-4 mt-auto border-t border-[#222]">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-400 hover:bg-[#111] hover:text-white transition-colors border border-transparent">
            <LogOut className="w-5 h-5" />
            <span className="font-medium tracking-wide text-sm">Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
}
