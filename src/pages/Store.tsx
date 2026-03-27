import React, { useState } from 'react';
import { ShoppingCart, Filter, Star, Plus, MessageCircle, X, Camera } from 'lucide-react';
import { Product } from '@/types';
import { AudioGuide } from '@/components/AudioGuide';
import { CameraScanner } from '@/components/CameraScanner';
import { analyzeProductImage } from '@/services/ai';
import { useAppContext } from '@/contexts/AppContext';

const categories = ['Todos', 'Sementes', 'Fertilizantes', 'Equipamentos', 'Defensivos'];

export function Store() {
  const { profile } = useAppContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    category: 'Sementes',
    price: 0,
    stock: 0,
    image: ''
  });

  const filteredProducts = activeCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const shareOnWhatsApp = (product: Product) => {
    const message = `Olá Geraldo Barbosa Marinho! 🌾\n\nVeja essa oferta imperdível na ${profile.storeName} que separei para você:\n\n🚜 *${product.name}*\n💰 Por apenas: *R$ ${product.price.toFixed(2).replace('.', ',')}*\n\nEssa é a oportunidade perfeita para aumentarmos a produtividade da nossa lavoura com o melhor custo-benefício do mercado!\n\nVamos aproveitar?\n\nAcesse: https://agro-tech-pi.vercel.app/fazenda`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: newProduct.name || 'Novo Produto',
      category: newProduct.category as any,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      image: newProduct.image || 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&q=80&w=400',
      description: newProduct.description || 'Sem descrição'
    };
    setProducts([product, ...products]);
    setIsAddModalOpen(false);
    setNewProduct({ category: 'Sementes', price: 0, stock: 0, image: '' });
  };

  const handleScanProduct = async (base64Image: string) => {
    setIsScanning(false);
    setIsAnalyzing(true);
    setIsAddModalOpen(true); // Open modal to show loading state
    
    try {
      const data = await analyzeProductImage(base64Image);
      setNewProduct({
        name: data.name || '',
        category: categories.includes(data.category) ? data.category : 'Sementes',
        price: data.price || 0,
        description: data.description || '',
        stock: 10, // default
        image: `data:image/jpeg;base64,${base64Image}` // Use the captured image
      });
    } catch (error) {
      alert("Erro ao analisar a imagem com IA. Preencha manualmente.");
      setNewProduct(prev => ({ ...prev, image: `data:image/jpeg;base64,${base64Image}` }));
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <AudioGuide text={`Bem-vindo à ${profile.storeName}. Você pode adicionar novos produtos usando a câmera do seu celular para preenchimento automático com Inteligência Artificial.`} />
      
      {isScanning && (
        <CameraScanner 
          onCapture={handleScanProduct} 
          onClose={() => setIsScanning(false)} 
          title="Escanear Produto"
        />
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">{profile.storeName}</span>
          </h2>
          <p className="text-gray-400 mt-2 font-medium">Gerencie seus produtos e encontre o que precisa.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-40 group-hover:opacity-70 transition duration-500"></div>
            <button 
              onClick={() => setIsScanning(true)}
              className="relative w-full bg-[#111] text-green-400 hover:text-green-300 border border-[#333] px-4 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Camera className="w-5 h-5" />
              Escanear
            </button>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex-1 md:flex-none bg-[#111] border border-[#333] text-white hover:bg-[#1a1a1a] hover:border-green-500/50 px-4 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
          >
            <Plus className="w-5 h-5" />
            Adicionar
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex items-center gap-2 text-gray-500 mr-2">
          <Filter className="w-5 h-5" />
          <span className="font-bold uppercase tracking-wider text-xs">Filtros:</span>
        </div>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
              activeCategory === cat 
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)] border-none' 
                : 'bg-[#111] text-gray-400 border border-[#333] hover:border-green-500/50 hover:text-green-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-[#111] rounded-2xl border border-dashed border-[#333]">
          <ShoppingCart className="w-16 h-16 mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-bold text-white">Nenhum produto encontrado</h3>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">Sua loja está vazia. Clique em "Escanear" ou "Adicionar" para cadastrar seu primeiro produto.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-[#111] rounded-2xl border border-[#333] overflow-hidden hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:border-green-500/30 transition-all group flex flex-col relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
              <div className="relative h-48 overflow-hidden bg-[#0a0a0a] shrink-0">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-black tracking-wider text-green-400 border border-green-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  {product.category}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  <Star className="w-4 h-4 fill-current drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" />
                  <Star className="w-4 h-4 fill-current drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" />
                  <Star className="w-4 h-4 fill-current drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" />
                  <Star className="w-4 h-4 fill-current drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" />
                  <Star className="w-4 h-4 fill-current text-gray-600" />
                  <span className="text-xs font-bold text-gray-500 ml-1">(24)</span>
                </div>
                <h3 className="font-bold text-white text-xl leading-tight mb-2 line-clamp-2 group-hover:text-green-400 transition-colors">{product.name}</h3>
                <p className="text-sm text-gray-400 line-clamp-2 mb-6 flex-1">{product.description}</p>
                
                <div className="flex items-end justify-between mt-auto pt-4 border-t border-[#222]">
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Preço</p>
                    <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => shareOnWhatsApp(product)}
                      className="bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] p-3 rounded-xl transition-colors border border-[#25D366]/30"
                      title="Compartilhar com Geraldo no WhatsApp"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </button>
                    <button className="bg-[#1a1a1a] hover:bg-green-500 text-white hover:text-black p-3 rounded-xl transition-all border border-[#333] hover:border-green-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#111] border border-[#333] rounded-2xl w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-[#222] flex justify-between items-center bg-[#0a0a0a]">
              <h3 className="text-xl font-black text-white">Adicionar Novo Produto</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-500 hover:text-white p-1 rounded-lg hover:bg-[#222] transition-colors"
                disabled={isAnalyzing}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddProduct} className="p-5 space-y-4">
              {isAnalyzing && (
                <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <Camera className="w-4 h-4" />
                  Analisando imagem com IA...
                </div>
              )}

              {newProduct.image && !isAnalyzing && (
                <div className="w-full h-32 rounded-xl overflow-hidden bg-[#0a0a0a] border border-[#333] relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <img src={newProduct.image} alt="Preview" className="w-full h-full object-cover opacity-80" />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Nome do Produto</label>
                <input 
                  type="text" 
                  required
                  disabled={isAnalyzing}
                  className="w-full bg-[#0a0a0a] border border-[#333] text-white rounded-xl px-4 py-3 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none transition-all disabled:opacity-50 placeholder:text-gray-600 font-medium"
                  value={newProduct.name || ''}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                  placeholder="Ex: Semente de Milho"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Categoria</label>
                  <select 
                    disabled={isAnalyzing}
                    className="w-full bg-[#0a0a0a] border border-[#333] text-white rounded-xl px-4 py-3 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none transition-all disabled:opacity-50 font-medium appearance-none"
                    value={newProduct.category}
                    onChange={e => setNewProduct({...newProduct, category: e.target.value as any})}
                  >
                    {categories.filter(c => c !== 'Todos').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Preço (R$)</label>
                  <input 
                    type="number" 
                    required
                    min="0"
                    step="0.01"
                    disabled={isAnalyzing}
                    className="w-full bg-[#0a0a0a] border border-[#333] text-white rounded-xl px-4 py-3 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none transition-all disabled:opacity-50 font-medium"
                    value={newProduct.price || ''}
                    onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                  />
                </div>
              </div>

              {!newProduct.image && (
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">URL da Imagem</label>
                  <input 
                    type="url" 
                    disabled={isAnalyzing}
                    className="w-full bg-[#0a0a0a] border border-[#333] text-white rounded-xl px-4 py-3 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none transition-all disabled:opacity-50 placeholder:text-gray-600 font-medium"
                    value={newProduct.image || ''}
                    onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                    placeholder="https://..."
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Descrição</label>
                <textarea 
                  rows={3}
                  disabled={isAnalyzing}
                  className="w-full bg-[#0a0a0a] border border-[#333] text-white rounded-xl px-4 py-3 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-none disabled:opacity-50 placeholder:text-gray-600 font-medium"
                  value={newProduct.description || ''}
                  onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                  placeholder="Detalhes do produto..."
                ></textarea>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  disabled={isAnalyzing}
                  className="flex-1 bg-[#222] hover:bg-[#333] text-white border border-[#444] px-4 py-3 rounded-xl font-bold transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <div className="flex-1 relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
                  <button 
                    type="submit"
                    disabled={isAnalyzing}
                    className="relative w-full bg-black text-green-400 hover:text-green-300 border border-[#333] px-4 py-3 rounded-xl font-bold transition-colors disabled:opacity-50"
                  >
                    Salvar Produto
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

