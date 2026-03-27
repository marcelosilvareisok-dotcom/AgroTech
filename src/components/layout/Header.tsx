import React from 'react';
import { Bell, Search, ShoppingCart, User, MessageCircle, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const shareAppOnWhatsApp = () => {
    const message = `Olá Geraldo Barbosa Marinho! 🌾\n\nDescobri o *AgroTech*, uma plataforma completa para revolucionar a gestão da nossa fazenda. \n\nLá nós temos acesso a:\n✅ Loja com preços imbatíveis de fábrica\n✅ Gestão inteligente de safra e lotes\n✅ Previsão do tempo e alertas climáticos\n\nVenha fazer parte do futuro do agronegócio com a gente! 🚜🌱`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="hidden sm:flex items-center bg-gray-50 rounded-full px-4 py-2 w-full max-w-md border border-gray-200 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-200 transition-all">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar sementes, equipamentos..."
            className="bg-transparent border-none outline-none ml-3 w-full text-sm text-gray-700 placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <Link to="/carrinho" className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            3
          </span>
        </Link>

        <button 
          onClick={shareAppOnWhatsApp}
          className="hidden lg:flex items-center gap-2 bg-[#25D366]/10 text-[#25D366] px-4 py-2 rounded-full font-bold hover:bg-[#25D366]/20 transition-colors border border-[#25D366]/30 ml-2"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm">Convidar Geraldo</span>
        </button>

        <div className="flex items-center gap-3 pl-3 md:pl-6 border-l border-gray-200">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-gray-900">João Agricultor</p>
            <p className="text-xs text-gray-500">Fazenda Boa Esperança</p>
          </div>
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 flex-shrink-0">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
