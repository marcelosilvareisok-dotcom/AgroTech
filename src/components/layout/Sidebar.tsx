import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Store, Sprout, Users, Settings, LogOut, X } from 'lucide-react';
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
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}
      
      <aside className={cn(
        "fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-green-900 text-white flex flex-col transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sprout className="w-8 h-8 text-green-400" />
            <h1 className="text-2xl font-bold tracking-tight">AgroTech</h1>
          </div>
          <button onClick={onClose} className="md:hidden text-green-200 hover:text-white">
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
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors',
                  isActive
                    ? 'bg-green-800 text-green-50'
                    : 'text-green-200 hover:bg-green-800/50 hover:text-white'
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-green-800/50">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-green-200 hover:bg-green-800/50 hover:text-white transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
}
