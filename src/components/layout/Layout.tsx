import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Heart, LayoutGrid } from 'lucide-react';

export function Layout() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-pink-500/30">
      <header className="flex items-center justify-between px-6 py-6 max-w-5xl mx-auto">
        <Link to="/" className="flex items-center gap-2 text-white font-bold tracking-wider text-sm">
          <Heart className="w-5 h-5 text-red-500 fill-red-500" />
          INABALÁVEL
        </Link>
        <Link to="/" className="flex items-center gap-2 bg-[#111] border border-[#222] hover:bg-[#222] text-xs font-semibold tracking-widest uppercase px-5 py-2.5 rounded-full transition-colors">
          <LayoutGrid className="w-4 h-4" />
          Dashboard
        </Link>
      </header>
      <main className="max-w-5xl mx-auto px-6 pb-32">
        <Outlet />
      </main>
    </div>
  );
}
