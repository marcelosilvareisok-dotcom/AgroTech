import React, { useState, useRef } from 'react';
import { User, Store as StoreIcon, Camera, Save, Check } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { AudioGuide } from '@/components/AudioGuide';

export function Profile() {
  const { profile, setProfile } = useAppContext();
  const [name, setName] = useState(profile.name);
  const [storeName, setStoreName] = useState(profile.storeName);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [isSaved, setIsSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({ name, storeName, avatar });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <AudioGuide text="Bem-vindo ao seu perfil. Aqui você pode alterar seu nome, o nome da sua loja e sua foto de perfil. Lembre-se de salvar as alterações." />
      
      <div>
        <h2 className="text-4xl font-black text-white tracking-tighter">
          Meu <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Perfil</span>
        </h2>
        <p className="text-gray-400 mt-2 font-medium">Gerencie suas informações pessoais e da sua loja.</p>
      </div>

      <div className="bg-[#111] rounded-2xl border border-[#333] shadow-xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-600"></div>
        <form onSubmit={handleSave} className="p-6 md:p-8 space-y-8 relative z-10">
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-br from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-xl rounded-full"></div>
              <div className="w-32 h-32 rounded-full bg-[#0a0a0a] border-4 border-[#222] shadow-2xl overflow-hidden flex items-center justify-center relative z-10 group-hover:border-green-500/50 transition-colors">
                {avatar ? (
                  <img src={avatar} alt="Avatar" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <User className="w-16 h-16 text-green-500/50 group-hover:text-green-400 transition-colors" />
                )}
              </div>
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-[#111] border border-green-500/50 text-green-400 p-2.5 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:bg-[#1a1a1a] hover:text-green-300 hover:scale-110 transition-all z-20"
              >
                <Camera className="w-5 h-5" />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
            <div className="text-center sm:text-left pt-2">
              <h3 className="text-xl font-black text-white">Foto de Perfil</h3>
              <p className="text-sm text-gray-400 mt-1 font-medium">Clique no ícone de câmera para alterar sua foto.</p>
            </div>
          </div>

          <hr className="border-[#222]" />

          {/* Form Fields */}
          <div className="space-y-5">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                <User className="w-4 h-4 text-green-500" />
                Seu Nome
              </label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-[#0a0a0a] border border-[#333] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-green-500/50 focus:border-transparent outline-none transition-all font-medium"
                placeholder="Ex: João da Silva"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                <StoreIcon className="w-4 h-4 text-green-500" />
                Nome da sua Loja
              </label>
              <input 
                type="text" 
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                required
                className="w-full bg-[#0a0a0a] border border-[#333] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-green-500/50 focus:border-transparent outline-none transition-all font-medium"
                placeholder="Ex: Agro Silva"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <div className="relative group">
              <div className={`absolute -inset-0.5 rounded-xl blur opacity-40 transition duration-500 ${isSaved ? 'bg-green-500' : 'bg-gradient-to-r from-green-500 to-emerald-500 group-hover:opacity-70'}`}></div>
              <button 
                type="submit"
                className={`relative px-8 py-3 rounded-xl font-black flex items-center gap-2 transition-all uppercase tracking-wide text-sm ${
                  isSaved 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                    : 'bg-[#111] text-green-400 border border-green-500/50 hover:bg-[#1a1a1a]'
                }`}
              >
                {isSaved ? (
                  <>
                    <Check className="w-5 h-5" />
                    Salvo com sucesso!
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Salvar Alterações
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
