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
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Minha Fazenda</h2>
          <p className="text-gray-500 mt-1">Gestão de plantações, áreas e produtividade.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={() => setIsScanning(true)}
            className="flex-1 md:flex-none bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Camera className="w-5 h-5" />
            Escanear Plantação
          </button>
          <button className="flex-1 md:flex-none bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors shadow-sm shadow-green-600/20">
            <Plus className="w-5 h-5" />
            Nova Plantação
          </button>
        </div>
      </div>

      {isAnalyzing && (
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
          <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-xl font-bold text-gray-900">Analisando imagem com Inteligência Artificial...</h3>
          <p className="text-gray-500 mt-2">Identificando cultura, saúde e possíveis pragas.</p>
        </div>
      )}

      {analysisResult && (
        <div className="bg-white rounded-2xl border border-green-100 shadow-sm overflow-hidden animate-in zoom-in-95 duration-300">
          <div className="bg-green-50 p-4 border-b border-green-100 flex justify-between items-center">
            <h3 className="font-bold text-green-800 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Resultado da Análise IA
            </h3>
            <button onClick={() => setAnalysisResult(null)} className="text-green-600 hover:bg-green-100 p-1 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3 h-48 rounded-xl overflow-hidden bg-gray-100 shrink-0">
              <img src={analysisResult.image} alt="Análise" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-sm text-gray-500">Identificação</p>
                <p className="text-xl font-bold text-gray-900">{analysisResult.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">Status de Saúde</p>
                  <p className={`font-bold ${
                    analysisResult.status === 'Saudável' ? 'text-green-600' : 
                    analysisResult.status === 'Atenção' ? 'text-amber-500' : 'text-blue-600'
                  }`}>{analysisResult.status}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">Produtividade Est.</p>
                  <p className="font-bold text-gray-900">{analysisResult.expectedYield} sacas/ha</p>
                </div>
              </div>
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                <p className="text-sm font-bold text-amber-800 mb-1">Recomendação da IA:</p>
                <p className="text-sm text-amber-900">{analysisResult.recommendations}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-start gap-4 shadow-sm">
          <div className="bg-green-100 p-3 rounded-xl text-green-600 shrink-0">
            <Map className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Área Total Plantada</p>
            <h3 className="text-2xl font-black text-gray-900 mt-1">
              {crops.reduce((acc, crop) => acc + crop.area, 0)} ha
            </h3>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-start gap-4 shadow-sm">
          <div className="bg-amber-100 p-3 rounded-xl text-amber-600 shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Culturas em Atenção</p>
            <h3 className="text-2xl font-black text-gray-900 mt-1">
              {crops.filter(c => c.status === 'Atenção').length}
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-start gap-4 shadow-sm">
          <div className="bg-blue-100 p-3 rounded-xl text-blue-600 shrink-0">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Culturas Ativas</p>
            <h3 className="text-2xl font-black text-gray-900 mt-1">{crops.length}</h3>
          </div>
        </div>
      </div>

      {/* Crops List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Lotes de Plantio</h3>
        </div>
        <div className="overflow-x-auto">
          {crops.length === 0 ? (
            <div className="text-center py-12">
              <Sprout className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">Nenhuma plantação registrada ainda.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 text-gray-500 text-sm">
                  <th className="p-4 font-medium border-b border-gray-100">Cultura</th>
                  <th className="p-4 font-medium border-b border-gray-100">Área (ha)</th>
                  <th className="p-4 font-medium border-b border-gray-100">Plantio</th>
                  <th className="p-4 font-medium border-b border-gray-100">Colheita Prev.</th>
                  <th className="p-4 font-medium border-b border-gray-100">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {crops.map((crop) => (
                  <tr key={crop.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-medium text-gray-900">{crop.name}</td>
                    <td className="p-4 text-gray-600">{crop.area}</td>
                    <td className="p-4 text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {crop.plantedDate}
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{crop.harvestDate}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        crop.status === 'Saudável' ? 'bg-green-100 text-green-700' :
                        crop.status === 'Atenção' ? 'bg-amber-100 text-amber-700' :
                        'bg-blue-100 text-blue-700'
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
