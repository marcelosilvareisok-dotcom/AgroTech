import React from 'react';
import { CloudRain, Droplets, Sun, Wind, TrendingUp, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AudioGuide } from '@/components/AudioGuide';

const data = [
  { name: 'Jan', chuva: 120, temp: 28 },
  { name: 'Fev', chuva: 150, temp: 29 },
  { name: 'Mar', chuva: 180, temp: 27 },
  { name: 'Abr', chuva: 90, temp: 25 },
  { name: 'Mai', chuva: 40, temp: 22 },
  { name: 'Jun', chuva: 20, temp: 20 },
  { name: 'Jul', chuva: 10, temp: 19 },
];

export function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <AudioGuide text="Bem-vindo ao painel da sua fazenda. Hoje a temperatura é de 28 graus e está ensolarado. Você tem um alerta amarelo para risco de geada na madrugada de quinta-feira. Sua área plantada atual é de 120 hectares." />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter">
            Visão <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Geral</span>
          </h2>
          <p className="text-gray-400 mt-2 font-medium">Bem-vindo de volta! Aqui está o resumo da sua fazenda hoje.</p>
        </div>
        <div className="bg-[#111] px-5 py-3 rounded-2xl border border-[#333] shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center gap-4 w-full md:w-auto relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Sun className="w-8 h-8 text-orange-500 flex-shrink-0 relative z-10 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
          <div className="relative z-10">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Hoje, 27 Mar</p>
            <p className="text-xl font-black text-white">28°C <span className="text-sm font-medium text-gray-400 ml-1">Ensolarado</span></p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Área Plantada', value: '120 ha', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', shadow: 'shadow-[0_0_15px_rgba(52,211,153,0.1)]' },
          { label: 'Previsão de Chuva', value: '15 mm', icon: CloudRain, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', shadow: 'shadow-[0_0_15px_rgba(96,165,250,0.1)]' },
          { label: 'Umidade do Solo', value: '68%', icon: Droplets, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', shadow: 'shadow-[0_0_15px_rgba(34,211,238,0.1)]' },
          { label: 'Velocidade do Vento', value: '12 km/h', icon: Wind, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', shadow: 'shadow-[0_0_15px_rgba(192,132,252,0.1)]' },
        ].map((stat, i) => (
          <div key={i} className={`bg-[#111] p-6 rounded-2xl border ${stat.border} ${stat.shadow} hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden group`}>
            <div className={`absolute -inset-2 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-xl rounded-full`}></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-black text-white mt-1">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-[#111] p-6 rounded-2xl border border-[#333] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
          <h3 className="text-xl font-bold text-white mb-6 tracking-tight">Histórico de Clima <span className="text-gray-500 text-sm font-medium ml-2">(Precipitação mm)</span></h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorChuva" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', borderRadius: '12px', border: '1px solid #333', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)', color: '#fff' }}
                  itemStyle={{ color: '#60a5fa', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="chuva" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorChuva)" />
              </AreaChart>
            </ResponsiveContainer>
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
            {[
              { title: 'Risco de Geada', desc: 'Previsão de queda brusca de temperatura na madrugada de quinta.', color: 'border-blue-500/50 bg-blue-500/10 text-blue-400' },
              { title: 'Estoque Baixo', desc: 'Fertilizante NPK 10-10-10 abaixo de 20% do ideal.', color: 'border-amber-500/50 bg-amber-500/10 text-amber-400' },
              { title: 'Manutenção', desc: 'Trator principal precisa de troca de óleo em 50h.', color: 'border-gray-500/50 bg-gray-500/10 text-gray-400' },
            ].map((alert, i) => (
              <div key={i} className={`p-4 rounded-xl border-l-4 ${alert.color} transition-all hover:bg-opacity-20 cursor-pointer`}>
                <p className="font-bold text-white">{alert.title}</p>
                <p className="text-sm mt-1 opacity-80">{alert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
