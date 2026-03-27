import React from 'react';
import { Sprout, Map, Activity, AlertTriangle } from 'lucide-react';
import { AudioGuide } from '@/components/AudioGuide';
import { useAppContext } from '@/contexts/AppContext';

export function Dashboard() {
  const { crops } = useAppContext();

  const areaTotal = crops.reduce((acc, crop) => acc + crop.area, 0);
  const culturasAtivas = crops.length;
  const culturasAtencao = crops.filter(c => c.status === 'Atenção');

  const audioText = crops.length > 0 
    ? `Bem-vindo ao painel da sua fazenda. Sua área plantada atual é de ${areaTotal} hectares com ${culturasAtivas} culturas ativas.`
    : "Bem-vindo ao painel da sua fazenda. Você ainda não adicionou nenhuma plantação. Vá para a aba Fazenda para começar.";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <AudioGuide text={audioText} />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter">
            Visão <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Geral</span>
          </h2>
          <p className="text-gray-400 mt-2 font-medium">Bem-vindo de volta! Aqui está o resumo da sua fazenda hoje.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111] p-6 rounded-2xl border border-green-500/20 shadow-[0_0_15px_rgba(52,211,153,0.1)] hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden group">
          <div className="absolute -inset-2 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-xl rounded-full"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3 rounded-xl bg-green-500/10">
              <Map className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Área Plantada</p>
              <p className="text-2xl font-black text-white mt-1">{areaTotal} <span className="text-sm text-gray-500">ha</span></p>
            </div>
          </div>
        </div>

        <div className="bg-[#111] p-6 rounded-2xl border border-blue-500/20 shadow-[0_0_15px_rgba(96,165,250,0.1)] hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden group">
          <div className="absolute -inset-2 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-xl rounded-full"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3 rounded-xl bg-blue-500/10">
              <Sprout className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Culturas Ativas</p>
              <p className="text-2xl font-black text-white mt-1">{culturasAtivas}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#111] p-6 rounded-2xl border border-amber-500/20 shadow-[0_0_15px_rgba(251,191,36,0.1)] hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden group">
          <div className="absolute -inset-2 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-xl rounded-full"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3 rounded-xl bg-amber-500/10">
              <Activity className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Em Atenção</p>
              <p className="text-2xl font-black text-white mt-1">{culturasAtencao.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-[#111] p-6 rounded-2xl border border-[#333] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-red-500"></div>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3 tracking-tight">
          <div className="relative">
            <div className="absolute -inset-1 bg-amber-500 rounded-full blur opacity-50"></div>
            <AlertTriangle className="w-5 h-5 text-amber-400 relative z-10" />
          </div>
          Alertas da Fazenda
        </h3>
        <div className="space-y-4">
          {culturasAtencao.length === 0 ? (
            <div className="p-4 rounded-xl border border-green-500/20 bg-green-500/5 text-center">
              <p className="text-green-400 font-medium">Nenhum alerta no momento. Tudo certo com suas plantações!</p>
            </div>
          ) : (
            culturasAtencao.map((crop, i) => (
              <div key={i} className="p-4 rounded-xl border-l-4 border-amber-500/50 bg-amber-500/10 transition-all hover:bg-opacity-20 cursor-pointer">
                <p className="font-bold text-white">Atenção: {crop.name}</p>
                <p className="text-sm mt-1 text-amber-400/80">A cultura plantada em {crop.plantedDate} requer sua atenção.</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
