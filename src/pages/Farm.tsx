import React from 'react';
import { Sprout, Map, Calendar, Activity, Plus } from 'lucide-react';
import { Crop } from '@/types';
import { AudioGuide } from '@/components/AudioGuide';

const crops: Crop[] = [
  {
    id: '1',
    name: 'Milho Safrinha',
    plantedDate: '15 Fev 2026',
    harvestDate: '20 Jun 2026',
    status: 'Saudável',
    area: 45,
    expectedYield: 270
  },
  {
    id: '2',
    name: 'Soja',
    plantedDate: '10 Out 2025',
    harvestDate: '05 Mar 2026',
    status: 'Colheita',
    area: 120,
    expectedYield: 420
  },
  {
    id: '3',
    name: 'Feijão Carioca',
    plantedDate: '05 Mar 2026',
    harvestDate: '15 Mai 2026',
    status: 'Atenção',
    area: 20,
    expectedYield: 45
  }
];

export function Farm() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <AudioGuide text="Bem-vindo à gestão da sua fazenda. Você tem 185 hectares plantados divididos em 3 culturas. A soja está em período de colheita, enquanto o feijão carioca requer atenção. Clique em Nova Plantação para registrar uma nova área." />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Minha Fazenda</h2>
          <p className="text-gray-500 mt-1">Gerencie suas plantações, áreas e produtividade.</p>
        </div>
        <button className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors shadow-sm shadow-green-600/20">
          <Plus className="w-5 h-5" />
          Nova Plantação
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-emerald-100 text-emerald-600 rounded-xl">
            <Map className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Área Total Plantada</p>
            <p className="text-3xl font-bold text-gray-900">185 ha</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-xl">
            <Sprout className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Culturas Ativas</p>
            <p className="text-3xl font-bold text-gray-900">3</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-amber-100 text-amber-600 rounded-xl">
            <Activity className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Produtividade Est.</p>
            <p className="text-3xl font-bold text-gray-900">735 t</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Lotes e Plantações</h3>
          <div className="flex gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <Calendar className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-sm border-b border-gray-100">
                <th className="p-4 font-medium">Cultura</th>
                <th className="p-4 font-medium">Área (ha)</th>
                <th className="p-4 font-medium">Plantio</th>
                <th className="p-4 font-medium">Previsão Colheita</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {crops.map(crop => (
                <tr key={crop.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <Sprout className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-gray-900">{crop.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{crop.area}</td>
                  <td className="p-4 text-gray-600">{crop.plantedDate}</td>
                  <td className="p-4 text-gray-600">{crop.harvestDate}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      crop.status === 'Saudável' ? 'bg-emerald-100 text-emerald-700' :
                      crop.status === 'Colheita' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {crop.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-green-600 hover:text-green-800 font-medium text-sm transition-colors">
                      Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
