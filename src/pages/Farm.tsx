import React, { useState } from 'react';
import { Sprout, Map, Calendar, Activity, Plus, Camera, X } from 'lucide-react';
import { Crop } from '@/types';
import { AudioGuide } from '@/components/AudioGuide';
import { CameraScanner } from '@/components/CameraScanner';
import { analyzeCropImage } from '@/services/ai';

export function Farm() {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleScanCrop = async (base64Image: string) => {
    setIsScanning(false);
    setIsAnalyzing(true);
    
    try {
      const data = await analyzeCropImage(base64Image);
      setAnalysisResult({ ...data, image: `data:image/jpeg;base64,${base64Image}` });
    } catch (error) {
      alert("Erro ao analisar a imagem com IA. Tente novamente.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <AudioGuide text="Bem-vindo à gestão da sua fazenda. Você pode usar a câmera para escanear folhas, pragas ou plantações e receber uma análise automática com Inteligência Artificial sobre a saúde da sua lavoura." />
      
      {isScanning && (
        <CameraScanner 
          onCapture={handleScanCrop} 
          onClose={() => setIsScanning(false)} 
          title="Escanear Plantação/Praga"
        />
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter">
            Minha <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Fazenda</span>
          </h2>
          <p className="text-gray-400 mt-2 font-medium">Gestão de plantações, áreas e produtividade.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-40 group-hover:opacity-70 transition duration-500"></div>
            <button 
              onClick={() => setIsScanning(true)}
              className="relative w-full bg-[#111] text-green-400 hover:text-green-300 border border-[#333] px-4 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Camera className="w-5 h-5" />
              Escanear Plantação
            </button>
          </div>
          <button className="flex-1 md:flex-none bg-[#111] border border-[#333] text-white hover:bg-[#1a1a1a] hover:border-green-500/50 px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
            <Plus className="w-5 h-5" />
            Nova Plantação
          </button>
        </div>
      </div>

      {isAnalyzing && (
        <div className="bg-[#111] rounded-2xl p-8 border border-[#333] shadow-[0_0_30px_rgba(16,185,129,0.1)] text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent"></div>
          <div className="w-16 h-16 border-4 border-[#222] border-t-green-500 rounded-full animate-spin mx-auto mb-4 relative z-10 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
          <h3 className="text-xl font-black text-white relative z-10">Analisando imagem com Inteligência Artificial...</h3>
          <p className="text-gray-400 mt-2 relative z-10">Identificando cultura, saúde e possíveis pragas.</p>
        </div>
      )}

      {analysisResult && (
        <div className="bg-[#111] rounded-2xl border border-green-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)] overflow-hidden animate-in zoom-in-95 duration-300 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-600"></div>
          <div className="bg-[#0a0a0a] p-4 border-b border-[#222] flex justify-between items-center">
            <h3 className="font-black text-green-400 flex items-center gap-2 tracking-wide uppercase text-sm">
              <Activity className="w-5 h-5" />
              Resultado da Análise IA
            </h3>
            <button onClick={() => setAnalysisResult(null)} className="text-gray-500 hover:text-white p-1 rounded-lg hover:bg-[#222] transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3 h-48 rounded-xl overflow-hidden bg-[#0a0a0a] shrink-0 border border-[#333] relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <img src={analysisResult.image} alt="Análise" className="w-full h-full object-cover opacity-80" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Identificação</p>
                <p className="text-2xl font-black text-white">{analysisResult.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0a0a0a] p-4 rounded-xl border border-[#222]">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Status de Saúde</p>
                  <p className={`font-black text-lg ${
                    analysisResult.status === 'Saudável' ? 'text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]' : 
                    analysisResult.status === 'Atenção' ? 'text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]' : 'text-blue-400 drop-shadow-[0_0_5px_rgba(96,165,250,0.5)]'
                  }`}>{analysisResult.status}</p>
                </div>
                <div className="bg-[#0a0a0a] p-4 rounded-xl border border-[#222]">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Produtividade Est.</p>
                  <p className="font-black text-white text-lg">{analysisResult.expectedYield} <span className="text-sm font-medium text-gray-500">sacas/ha</span></p>
                </div>
              </div>
              <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/30">
                <p className="text-xs font-black text-amber-400 uppercase tracking-wider mb-2">Recomendação da IA:</p>
                <p className="text-sm text-gray-300 leading-relaxed">{analysisResult.recommendations}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111] p-6 rounded-2xl border border-[#333] flex items-start gap-4 shadow-xl hover:border-green-500/30 transition-colors group relative overflow-hidden">
          <div className="absolute -inset-2 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-xl rounded-full"></div>
          <div className="bg-green-500/10 p-3 rounded-xl text-green-400 shrink-0 border border-green-500/20 relative z-10">
            <Map className="w-6 h-6" />
          </div>
          <div className="relative z-10">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Área Total Plantada</p>
            <h3 className="text-3xl font-black text-white mt-1">
              {crops.reduce((acc, crop) => acc + crop.area, 0)} <span className="text-lg text-gray-500">ha</span>
            </h3>
          </div>
        </div>
        
        <div className="bg-[#111] p-6 rounded-2xl border border-[#333] flex items-start gap-4 shadow-xl hover:border-amber-500/30 transition-colors group relative overflow-hidden">
          <div className="absolute -inset-2 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-xl rounded-full"></div>
          <div className="bg-amber-500/10 p-3 rounded-xl text-amber-400 shrink-0 border border-amber-500/20 relative z-10">
            <Activity className="w-6 h-6" />
          </div>
          <div className="relative z-10">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Culturas em Atenção</p>
            <h3 className="text-3xl font-black text-white mt-1">
              {crops.filter(c => c.status === 'Atenção').length}
            </h3>
          </div>
        </div>

        <div className="bg-[#111] p-6 rounded-2xl border border-[#333] flex items-start gap-4 shadow-xl hover:border-blue-500/30 transition-colors group relative overflow-hidden">
          <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-xl rounded-full"></div>
          <div className="bg-blue-500/10 p-3 rounded-xl text-blue-400 shrink-0 border border-blue-500/20 relative z-10">
            <Sprout className="w-6 h-6" />
          </div>
          <div className="relative z-10">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Culturas Ativas</p>
            <h3 className="text-3xl font-black text-white mt-1">{crops.length}</h3>
          </div>
        </div>
      </div>

      {/* Crops List */}
      <div className="bg-[#111] rounded-2xl border border-[#333] shadow-xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-700 to-gray-500"></div>
        <div className="p-6 border-b border-[#222] bg-[#0a0a0a]">
          <h3 className="text-lg font-black text-white uppercase tracking-wide">Lotes de Plantio</h3>
        </div>
        <div className="overflow-x-auto">
          {crops.length === 0 ? (
            <div className="text-center py-16">
              <Sprout className="w-16 h-16 mx-auto text-gray-700 mb-4" />
              <p className="text-gray-500 font-medium">Nenhuma plantação registrada ainda.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0a0a0a] text-gray-500 text-xs uppercase tracking-wider border-b border-[#222]">
                  <th className="p-4 font-bold">Cultura</th>
                  <th className="p-4 font-bold">Área (ha)</th>
                  <th className="p-4 font-bold">Plantio</th>
                  <th className="p-4 font-bold">Colheita Prev.</th>
                  <th className="p-4 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {crops.map((crop) => (
                  <tr key={crop.id} className="border-b border-[#222] hover:bg-[#1a1a1a] transition-colors">
                    <td className="p-4 font-bold text-white">{crop.name}</td>
                    <td className="p-4 text-gray-400 font-medium">{crop.area}</td>
                    <td className="p-4 text-gray-400 font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        {crop.plantedDate}
                      </div>
                    </td>
                    <td className="p-4 text-gray-400 font-medium">{crop.harvestDate}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${
                        crop.status === 'Saudável' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                        crop.status === 'Atenção' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                        'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }`}>
                        {crop.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
