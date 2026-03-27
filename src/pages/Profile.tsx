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
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Meu Perfil</h2>
        <p className="text-gray-500 mt-1">Gerencie suas informações pessoais e da sua loja.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <form onSubmit={handleSave} className="p-6 md:p-8 space-y-8">
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-green-100 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
                {avatar ? (
                  <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-16 h-16 text-green-600" />
                )}
              </div>
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-green-600 text-white p-2.5 rounded-full shadow-lg hover:bg-green-700 transition-colors group-hover:scale-110"
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
              <h3 className="text-xl font-bold text-gray-900">Foto de Perfil</h3>
              <p className="text-sm text-gray-500 mt-1">Clique no ícone de câmera para alterar sua foto.</p>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Form Fields */}
          <div className="space-y-5">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                <User className="w-4 h-4 text-gray-400" />
                Seu Nome
              </label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                placeholder="Ex: João da Silva"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                <StoreIcon className="w-4 h-4 text-gray-400" />
                Nome da sua Loja
              </label>
              <input 
                type="text" 
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                placeholder="Ex: Agro Silva"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <button 
              type="submit"
              className={`px-8 py-3 rounded-xl font-medium flex items-center gap-2 transition-all shadow-sm ${
                isSaved 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-green-600 text-white hover:bg-green-700 shadow-green-600/20'
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
        </form>
      </div>
    </div>
  );
}
