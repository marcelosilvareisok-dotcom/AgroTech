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
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Visão Geral</h2>
          <p className="text-gray-500 mt-1">Bem-vindo de volta! Aqui está o resumo da sua fazenda hoje.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3 w-full md:w-auto">
          <Sun className="w-6 h-6 text-orange-500 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-gray-500">Hoje, 27 Mar</p>
            <p className="text-lg font-bold text-gray-900">28°C <span className="text-sm font-normal text-gray-500">Ensolarado</span></p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Área Plantada', value: '120 ha', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100' },
          { label: 'Previsão de Chuva', value: '15 mm', icon: CloudRain, color: 'text-blue-600', bg: 'bg-blue-100' },
          { label: 'Umidade do Solo', value: '68%', icon: Droplets, color: 'text-cyan-600', bg: 'bg-cyan-100' },
          { label: 'Velocidade do Vento', value: '12 km/h', icon: Wind, color: 'text-gray-600', bg: 'bg-gray-100' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Histórico de Clima (Precipitação mm)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorChuva" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="chuva" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorChuva)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Alertas da Fazenda
          </h3>
          <div className="space-y-4">
            {[
              { title: 'Risco de Geada', desc: 'Previsão de queda brusca de temperatura na madrugada de quinta.', color: 'border-blue-500 bg-blue-50' },
              { title: 'Estoque Baixo', desc: 'Fertilizante NPK 10-10-10 abaixo de 20% do ideal.', color: 'border-amber-500 bg-amber-50' },
              { title: 'Manutenção', desc: 'Trator principal precisa de troca de óleo em 50h.', color: 'border-gray-500 bg-gray-50' },
            ].map((alert, i) => (
              <div key={i} className={`p-4 rounded-xl border-l-4 ${alert.color}`}>
                <p className="font-semibold text-gray-900">{alert.title}</p>
                <p className="text-sm text-gray-600 mt-1">{alert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
